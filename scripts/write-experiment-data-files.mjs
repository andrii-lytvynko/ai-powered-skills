import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const genDir = path.join(root, 'scripts', '.generated');

const categories = JSON.parse(fs.readFileSync(path.join(genDir, 'categories.json'), 'utf8'));
const initialAgents = JSON.parse(fs.readFileSync(path.join(genDir, 'initial-agents.json'), 'utf8'));
const skillsCatalog = JSON.parse(fs.readFileSync(path.join(genDir, 'skills-catalog.json'), 'utf8'));

const EXISTING_AGENTS = [
  { id: 'a1', name: 'Alex Chen', groups: ['Support', 'Technical Help _ EMEA'] },
  { id: 'a2', name: 'Maria Garcia', groups: ['Billing Support', 'Support'] },
  { id: 'a3', name: 'James Wilson', groups: ['Technical Help _ EMEA', 'Support'] },
  { id: 'a4', name: 'Sarah Kim', groups: ['Support', 'Refunds'] },
  { id: 'a5', name: 'David Okonkwo', groups: ['Billing Support', 'Refunds'] },
  { id: 'a6', name: 'Emma Thompson', groups: ['Support', 'Technical Help _ EMEA'] },
  { id: 'a7', name: 'Lucas Müller', groups: ['Technical Help _ EMEA'] },
  { id: 'a8', name: 'Yuki Tanaka', groups: ['Support', 'Billing Support'] },
  { id: 'a9', name: 'Sofia Rossi', groups: ['Billing Support', 'Support'] },
  { id: 'a10', name: 'Noah Patel', groups: ['Refunds', 'Support'] },
  { id: 'a11', name: 'Chloe Martin', groups: ['Technical Help _ EMEA', 'Support'] },
  { id: 'a12', name: 'Ethan Brown', groups: ['Support'] },
  { id: 'a13', name: 'Priya Nair', groups: ['Support', 'Technical Help _ EMEA'] },
  { id: 'a14', name: 'Tomas Silva', groups: ['Billing Support', 'Support'] },
  { id: 'a15', name: 'Hannah Schneider', groups: ['Technical Help _ EMEA'] },
  { id: 'a16', name: 'Omar Haddad', groups: ['Support', 'Refunds'] },
  { id: 'a17', name: 'Mei Lin', groups: ['Support', 'Billing Support'] },
  { id: 'a18', name: 'Daniel Kowalski', groups: ['Technical Help _ EMEA', 'Support'] },
  { id: 'a19', name: 'Isabella Costa', groups: ['Billing Support', 'Support'] },
  { id: 'a20', name: "Liam O'Connor", groups: ['Support', 'Refunds'] },
];

function jsString(s) {
  return JSON.stringify(s);
}

function renderAgentPool() {
  return EXISTING_AGENTS.map((a) =>
    `  { id: ${jsString(a.id)}, name: ${jsString(a.name)}, groups: ${JSON.stringify(a.groups)}, photoUrl: agentPhoto(${jsString(a.id)}) },`
  ).join('\n');
}

function renderSkillAgents(agentEntries) {
  if (!agentEntries.length) return '[]';
  const lines = agentEntries.map(
    ({ agentId, proficiency }) => `        assignAgent(${jsString(agentId)}, ${proficiency}),`
  );
  return `[\n${lines.join('\n')}\n      ]`;
}

function renderCategories() {
  return categories.map((cat) => {
    const skills = cat.skills.map((skill) => `      {
        id: ${jsString(skill.id)},
        name: ${jsString(skill.name)},
        tickets: ${jsString(skill.tickets)},
        intents: ${jsString(skill.intents)},
        confidence: ${skill.confidence},
        agents: ${renderSkillAgents(skill.agentEntries)},
      },`).join('\n');

    return `  {
    id: ${jsString(cat.id)},
    name: ${jsString(cat.name)},
    skills: [
${skills}
    ],
  },`;
  }).join('\n');
}

const skillsDataJs = `import { assetUrl } from '../utils/assetUrl';

const agentPhoto = (id) => assetUrl(\`agents/\${id}.jpg\`);

const AVATAR_COLORS = [
  '#68737d',
  '#8b5cf6',
  '#10b981',
  '#0284c7',
  '#ea580c',
  '#9333ea',
  '#059669',
  '#dc2626',
  '#2563eb',
  '#7c3aed',
  '#0d9488',
  '#ca8a04',
];

export function getAgentColor(idOrName) {
  const key = String(idOrName);
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const AGENT_POOL_RAW = [
${renderAgentPool()}
];

export const AGENT_POOL = AGENT_POOL_RAW.map((agent) => ({
  ...agent,
  color: getAgentColor(agent.id),
}));

export function getAgentById(id) {
  return AGENT_POOL.find((agent) => agent.id === id) ?? null;
}

export function getAgentPhotoUrl(id) {
  return getAgentById(id)?.photoUrl ?? agentPhoto(id);
}

function assignAgent(agentId, proficiency) {
  const poolAgent = AGENT_POOL.find((agent) => agent.id === agentId);
  if (!poolAgent) return null;
  return { ...poolAgent, proficiency };
}

export const DEFAULT_SKILL_CATEGORIES = [
${renderCategories()}
];

export function getAllSkills(categories) {
  return categories.flatMap((cat) =>
    cat.skills.map((skill) => ({ ...skill, categoryId: cat.id, categoryName: cat.name }))
  );
}

export function findSkill(categories, skillId) {
  for (const cat of categories) {
    const skill = cat.skills.find((s) => s.id === skillId);
    if (skill) {
      return { ...skill, categoryId: cat.id, categoryName: cat.name };
    }
  }
  return null;
}

export function getCategorySummary(categories) {
  const allSkills = getAllSkills(categories);
  const totalAssignments = allSkills.reduce((sum, s) => sum + s.agents.length, 0);
  const uniqueAgentIds = new Set(
    allSkills.flatMap((s) => s.agents.map((a) => a.id))
  );
  const avgConfidence =
    allSkills.length > 0
      ? Math.round(allSkills.reduce((sum, s) => sum + s.confidence, 0) / allSkills.length * 10) / 10
      : 0;

  return {
    totalSkills: allSkills.length,
    totalCategories: categories.length,
    totalAssignments,
    agentsCovered: uniqueAgentIds.size,
    totalAgents: AGENT_POOL.length,
    avgConfidence,
    agentsWithZeroSkills: AGENT_POOL.length - uniqueAgentIds.size,
    totalTickets: 1000,
  };
}

export function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function uniqueSlug(name, categories) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const allIds = new Set(
    categories.flatMap((cat) => [cat.id, ...cat.skills.map((s) => s.id)])
  );

  if (!allIds.has(base)) return base;

  let counter = 2;
  while (allIds.has(\`\${base}-\${counter}\`)) counter += 1;
  return \`\${base}-\${counter}\`;
}
`;

function renderInitialAgents() {
  return initialAgents.map((agent) => {
    const skillEntries = Object.entries(agent.skills)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([id, score]) => `      ${jsString(id)}: ${score},`)
      .join('\n');
    const skillsBlock = skillEntries
      ? `{\n${skillEntries}\n    }`
      : '{}';

    return `  {
    id: ${jsString(agent.id)},
    name: ${jsString(agent.name)},
    initials: ${jsString(agent.initials)},
    photoUrl: agentPhoto(${jsString(agent.id)}),
    skills: ${skillsBlock},
  },`;
  }).join('\n');
}

function renderSkillsCatalog() {
  return skillsCatalog.map((s) => `  { id: ${jsString(s.id)}, name: ${jsString(s.name)} },`).join('\n');
}

const agentSkillsDataJs = `import { getAgentPhotoUrl } from '../../data/skillsData';

const agentPhoto = (id) => getAgentPhotoUrl(id);

export const MAX_SKILLS = 120;

export const SKILLS = [
${renderSkillsCatalog()}
];

export const INITIAL_AGENTS = [
${renderInitialAgents()}
];

const AVATAR_COLORS = ['#68737d', '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

export function getAvatarColor(initials) {
  const code = (initials?.charCodeAt(0) || 0) + (initials?.charCodeAt(1) || 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

export function getSkillName(skillId, skills = SKILLS) {
  return skills.find((skill) => skill.id === skillId)?.name ?? skillId;
}

export function getAssignedSkillCount(agent) {
  return Object.keys(agent.skills ?? {}).length;
}

export function getSkillProficiency(agent) {
  const scores = Object.values(agent.skills ?? {})
    .map((score) => Number(score))
    .filter((score) => Number.isFinite(score));
  if (scores.length === 0) return null;
  const sum = scores.reduce((total, score) => total + score, 0);
  return sum / scores.length;
}

export function formatProficiency(agent) {
  const proficiency = getSkillProficiency(agent);
  if (proficiency === null) return '—';
  return \`\${proficiency.toFixed(1)} / 5\`;
}

export function formatSkillsAssigned(agent) {
  const count = getAssignedSkillCount(agent);
  if (count === 0) return '0 skills';
  if (count === 1) return '1 skill';
  return \`\${count} skills\`;
}

export function formatSkillsAssignedCompact(agent) {
  return String(getAssignedSkillCount(agent));
}

export function getAssignedSkillsList(agent, skills = SKILLS) {
  const validSkillIds = new Set(skills.map((skill) => skill.id));

  return Object.entries(agent.skills ?? {})
    .filter(([id]) => validSkillIds.has(id))
    .map(([id, score]) => {
      const numericScore = Number(score);
      const safeScore = Number.isFinite(numericScore)
        ? Math.max(1, Math.min(5, Math.round(numericScore)))
        : 1;
      return {
        id,
        name: getSkillName(id, skills),
        score: safeScore,
      };
    });
}

export function getUnassignedSkills(agent, skills = SKILLS) {
  const assigned = new Set(Object.keys(agent.skills ?? {}));
  return skills.filter((skill) => !assigned.has(skill.id));
}

function sanitizeAgentSkills(rawSkills, validSkillIds) {
  const skills = {};

  if (!rawSkills || typeof rawSkills !== 'object') {
    return skills;
  }

  Object.entries(rawSkills).forEach(([id, score]) => {
    if (!validSkillIds.has(id)) return;
    const numericScore = Number(score);
    if (Number.isFinite(numericScore)) {
      skills[id] = Math.max(1, Math.min(5, Math.round(numericScore)));
    }
  });

  return skills;
}

export function normalizeAgents(data, { templateAgents = INITIAL_AGENTS, skills = SKILLS } = {}) {
  const validSkillIds = new Set(skills.map((skill) => skill.id));
  const storedById = new Map();

  if (Array.isArray(data)) {
    data.forEach((agent) => {
      if (!agent || typeof agent !== 'object') return;
      if (agent.id == null || agent.id === '') return;
      storedById.set(String(agent.id), agent);
    });
  }

  return templateAgents.map((fallback) => {
    const agent = storedById.get(String(fallback.id));
    const nextSkills = agent
      ? sanitizeAgentSkills(agent.skills, validSkillIds)
      : sanitizeAgentSkills(fallback.skills, validSkillIds);

    const resolvedPhoto =
      (typeof agent?.photoUrl === 'string' && agent.photoUrl.trim())
      || (typeof fallback.photoUrl === 'string' && fallback.photoUrl.trim())
      || getAgentPhotoUrl(fallback.id)
      || '';

    return {
      id: fallback.id,
      name: typeof agent?.name === 'string' && agent.name.trim() ? agent.name : fallback.name,
      initials: typeof agent?.initials === 'string' && agent.initials.trim() ? agent.initials : fallback.initials,
      photoUrl: resolvedPhoto,
      skills: nextSkills,
    };
  });
}
`;

fs.writeFileSync(path.join(root, 'src/data/skillsData.js'), skillsDataJs);
fs.writeFileSync(path.join(root, 'src/components/AgentSkillsManager/agentSkillsData.js'), agentSkillsDataJs);
console.log('Wrote src/data/skillsData.js and agentSkillsData.js');
