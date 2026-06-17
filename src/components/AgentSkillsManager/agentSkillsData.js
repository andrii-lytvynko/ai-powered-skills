import { getAgentPhotoUrl } from '../../data/skillsData';

export const MAX_SKILLS = 20;

export const SKILLS = [
  { id: 'billing-disputes', name: 'Billing Disputes' },
  { id: 'product-config', name: 'Product Configuration' },
  { id: 'refund-processing', name: 'Refund Processing' },
  { id: 'account-migration', name: 'Account Migration' },
  { id: 'subscription-mgmt', name: 'Subscription Management' },
  { id: 'compliance-security', name: 'Compliance and Security' },
  { id: 'escalation-handling', name: 'Escalation Handling' },
  { id: 'technical-troubleshooting', name: 'Technical Troubleshooting' },
  { id: 'order-fulfillment', name: 'Order Fulfillment' },
  { id: 'returns-exchanges', name: 'Returns and Exchanges' },
  { id: 'payment-processing', name: 'Payment Processing' },
  { id: 'fraud-investigation', name: 'Fraud Investigation' },
  { id: 'api-integrations', name: 'API Integrations' },
  { id: 'data-privacy', name: 'Data Privacy Requests' },
  { id: 'vip-support', name: 'VIP Customer Support' },
  { id: 'live-chat', name: 'Live Chat Support' },
  { id: 'social-media', name: 'Social Media Support' },
  { id: 'knowledge-base', name: 'Knowledge Base Management' },
  { id: 'sla-management', name: 'SLA Management' },
  { id: 'workforce-scheduling', name: 'Workforce Scheduling' },
];

export const INITIAL_AGENTS = [
  {
    id: 1,
    name: 'Shelly Baldwin',
    initials: 'SB',
    photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    skills: { 'billing-disputes': 4, 'refund-processing': 3, 'subscription-mgmt': 5 },
  },
  {
    id: 2,
    name: 'Anne Hicks',
    initials: 'AH',
    photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    skills: {
      'billing-disputes': 5,
      'product-config': 4,
      'refund-processing': 4,
      'account-migration': 3,
      'subscription-mgmt': 5,
    },
  },
  {
    id: 3,
    name: 'Emma Hunter',
    initials: 'EH',
    photoUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    skills: { 'product-config': 2, 'compliance-security': 4 },
  },
  {
    id: 4,
    name: 'Mike Long',
    initials: 'ML',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    skills: { 'account-migration': 3 },
  },
  {
    id: 5,
    name: 'Marlene Little',
    initials: 'MR',
    photoUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
    skills: {
      'billing-disputes': 3,
      'refund-processing': 5,
      'subscription-mgmt': 4,
      'compliance-security': 2,
    },
  },
  {
    id: 6,
    name: 'Jorge Meyer',
    initials: 'JM',
    photoUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
    skills: {
      'billing-disputes': 4,
      'product-config': 5,
      'refund-processing': 3,
      'account-migration': 4,
      'subscription-mgmt': 5,
      'compliance-security': 3,
      'escalation-handling': 4,
      'technical-troubleshooting': 5,
      'api-integrations': 3,
    },
  },
  {
    id: 7,
    name: 'Brian Steele',
    initials: 'BS',
    photoUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    skills: { 'product-config': 4, 'account-migration': 3, 'compliance-security': 5 },
  },
  {
    id: 8,
    name: 'Danny Perkins',
    initials: 'DP',
    photoUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    skills: {},
  },
  {
    id: 9,
    name: 'Fernando Price',
    initials: 'FP',
    photoUrl: 'https://randomuser.me/api/portraits/men/61.jpg',
    skills: { 'billing-disputes': 2, 'subscription-mgmt': 4 },
  },
  {
    id: 10,
    name: 'Christine Page',
    initials: 'CP',
    photoUrl: 'https://randomuser.me/api/portraits/women/90.jpg',
    skills: {
      'product-config': 3,
      'refund-processing': 4,
      'account-migration': 5,
      'compliance-security': 3,
      'order-fulfillment': 4,
      'payment-processing': 3,
    },
  },
  {
    id: 11,
    name: 'Kim Schmitt',
    initials: 'KS',
    photoUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
    skills: { 'billing-disputes': 5, 'refund-processing': 4, 'product-config': 3 },
  },
  {
    id: 12,
    name: 'Grace Patel',
    initials: 'GP',
    photoUrl: 'https://randomuser.me/api/portraits/women/57.jpg',
    skills: {
      'billing-disputes': 3,
      'product-config': 4,
      'refund-processing': 3,
      'subscription-mgmt': 4,
      'compliance-security': 5,
      'live-chat': 4,
      'sla-management': 3,
    },
  },
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
  return `${proficiency.toFixed(1)} / 5`;
}

export function formatSkillsAssigned(agent) {
  const count = getAssignedSkillCount(agent);
  if (count === 0) return '0 skills';
  if (count === 1) return '1 skill';
  return `${count} skills`;
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
