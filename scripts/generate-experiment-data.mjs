import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const exp = path.join(root, 'experiment');

const discovered = JSON.parse(fs.readFileSync(path.join(exp, '06_discovered_skills.json'), 'utf8'));
const agents = JSON.parse(fs.readFileSync(path.join(exp, '08_agents.json'), 'utf8'));
const annotated = JSON.parse(fs.readFileSync(path.join(exp, '07_annotated_train_tickets.json'), 'utf8'));

const CATEGORY_MAP = {
  'login-and-access': [
    'Access Management', 'Authentication', 'API Authentication', 'SSO',
    'OAuth Authentication', 'OAuth Permissions', 'Multi-Factor Authentication',
    'Identity Management', 'Account Recovery', 'Okta', 'Okta Administration',
    'SCIM Provisioning', 'Login Event Triggers',
  ],
  'user-and-account-management': [
    'User Management', 'Account Management', 'Account Ownership Transfer',
    'Account Migration', 'Role Configuration', 'Role Mapping', 'Team Management',
    'Team Training', 'Tenant Administration', 'Workspace Administration',
    'Administration', 'Admin Console', 'Admin Settings', 'Licensing',
  ],
  'billing-and-subscriptions': [
    'Billing', 'Subscription Management', 'Stripe Integration', 'Xero Integration',
    'Product Catalog',
  ],
  'data-management-and-migration': [
    'Data Management', 'Data Mapping', 'Data Migration', 'Data Import', 'Data Export',
    'Data Integration', 'Data Deduplication', 'Data Recovery', 'Data Residency',
    'CSV', 'CSV Import', 'CSV Export', 'Excel', 'Contact Merge Troubleshooting',
    'CRM Data Management', 'File Organization', 'Pagination',
  ],
  'integrations-and-api': [
    'API Support', 'Webhook Processing', 'Rate Limiting', 'Salesforce Integration',
    'HubSpot Integration', 'Jira Integration', 'Slack Integration',
    'Microsoft Teams Integration', 'Google Drive Integration', 'CRM Integration',
    'CRM Configuration', 'CRM Support', 'Sandbox Environment Management',
    'Environment Configuration',
  ],
  'workflow-and-configuration': [
    'Workflow Automation', 'Workflow Configuration', 'Workflow Administration',
    'Automation', 'Automated Reminders', 'Notification Configuration',
    'Form Configuration', 'Custom Fields', 'Feature Configuration',
    'Queue Configuration', 'Checklist Configuration', 'Project Configuration',
    'Project Templates', 'Project Archiving', 'Time Zone Configuration',
    'Tag Management', 'Task Management',
  ],
  'reporting-and-operations': [
    'Reporting', 'Dashboard Reporting', 'Campaign Reporting', 'Audit Logging',
    'Compliance', 'Incident Management', 'Escalation Management',
    'Performance Troubleshooting', 'SLA Configuration', 'SLA Management',
    'Ticketing System', 'Customer Support', 'Sales Operations', 'Sales Training',
    'Training', 'Email Deliverability',
  ],
  language: ['French', 'German', 'Polish', 'Portuguese', 'Spanish'],
};

const CATEGORY_NAMES = {
  'login-and-access': 'Login and access',
  'user-and-account-management': 'User and account management',
  'billing-and-subscriptions': 'Billing and subscriptions',
  'data-management-and-migration': 'Data management and migration',
  'integrations-and-api': 'Integrations and API',
  'workflow-and-configuration': 'Workflow and configuration',
  'reporting-and-operations': 'Reporting and operations',
  language: 'Language',
};

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
];

const NEW_AGENTS = [
  { id: 'a13', name: "Priya Nair", groups: ['Support', 'Technical Help _ EMEA'] },
  { id: 'a14', name: 'Tomas Silva', groups: ['Billing Support', 'Support'] },
  { id: 'a15', name: 'Hannah Schneider', groups: ['Technical Help _ EMEA'] },
  { id: 'a16', name: 'Omar Haddad', groups: ['Support', 'Refunds'] },
  { id: 'a17', name: 'Mei Lin', groups: ['Support', 'Billing Support'] },
  { id: 'a18', name: 'Daniel Kowalski', groups: ['Technical Help _ EMEA', 'Support'] },
  { id: 'a19', name: 'Isabella Costa', groups: ['Billing Support', 'Support'] },
  { id: 'a20', name: "Liam O'Connor", groups: ['Support', 'Refunds'] },
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function skillToCategory(skillName) {
  for (const [catId, skills] of Object.entries(CATEGORY_MAP)) {
    if (skills.includes(skillName)) return catId;
  }
  return 'reporting-and-operations';
}

function intentFor(skillName) {
  const lang = ['French', 'German', 'Polish', 'Portuguese', 'Spanish'];
  if (lang.includes(skillName)) {
    return `General support in ${skillName} across billing, configuration, and troubleshooting`;
  }
  const lower = skillName.toLowerCase();
  if (lower.includes('integration')) {
    return `${skillName} setup, sync errors, authentication, and field mapping`;
  }
  if (lower.includes('authentication') || lower.includes('sso') || lower.includes('oauth') || lower.includes('okta') || lower.includes('scim')) {
    return `${skillName} setup, login failures, token issues, and permission errors`;
  }
  if (lower.includes('billing') || lower.includes('subscription') || lower.includes('stripe') || lower.includes('xero')) {
    return `${skillName} inquiries, invoice errors, plan changes, and payment issues`;
  }
  if (lower.includes('data') || lower.includes('csv') || lower.includes('import') || lower.includes('export') || lower.includes('migration')) {
    return `${skillName} requests, mapping errors, validation failures, and recovery`;
  }
  if (lower.includes('workflow') || lower.includes('automation')) {
    return `${skillName} rules, triggers, routing logic, and execution errors`;
  }
  if (lower.includes('reporting') || lower.includes('dashboard') || lower.includes('audit')) {
    return `${skillName} access, filters, exports, and data accuracy issues`;
  }
  return `${skillName} configuration, troubleshooting, and how-to questions`;
}

// Ticket counts per skill
const ticketCounts = {};
for (const ticket of annotated) {
  const rs = ticket.required_skills || {};
  for (const skill of Object.keys(rs)) {
    ticketCounts[skill] = (ticketCounts[skill] || 0) + 1;
  }
}

// Agent coverage per skill
const agentsPerSkill = {};
for (const agent of agents) {
  for (const [skill, score] of Object.entries(agent.skill_scores)) {
    if (!agentsPerSkill[skill]) agentsPerSkill[skill] = [];
    agentsPerSkill[skill].push({ agentIdx: agent.id, score });
  }
}

function confidenceFor(skillName) {
  const tickets = ticketCounts[skillName] || 0;
  const coverage = (agentsPerSkill[skillName] || []).length;
  const ticketScore = Math.min(1, tickets / 120) * 8;
  const coverageScore = Math.min(1, coverage / 20) * 6;
  return Math.round(Math.min(96, Math.max(84, 84 + ticketScore + coverageScore)));
}

function formatTickets(n) {
  return n.toLocaleString('en-US');
}

function agentIdForExperimentIdx(idx) {
  return `a${idx + 1}`;
}

const skillNameToId = Object.fromEntries(discovered.map((n) => [n, slugify(n)]));

// Build categories
const categories = Object.entries(CATEGORY_NAMES).map(([catId, catName]) => {
  const skillNames = CATEGORY_MAP[catId].filter((n) => discovered.includes(n));
  const skills = skillNames.map((name) => {
    const id = skillNameToId[name];
    const tickets = ticketCounts[name] || 0;
    const agentEntries = (agentsPerSkill[name] || [])
      .sort((a, b) => a.agentIdx - b.agentIdx)
      .map(({ agentIdx, score }) => ({
        agentId: agentIdForExperimentIdx(agentIdx),
        proficiency: score,
      }));

    return {
      id,
      name,
      tickets: formatTickets(tickets),
      ticketCount: tickets,
      intents: intentFor(name),
      confidence: confidenceFor(name),
      agentEntries,
    };
  });

  return { id: catId, name: catName, skills };
});

// Verify all discovered skills are categorized
const categorized = new Set(Object.values(CATEGORY_MAP).flat());
const missing = discovered.filter((s) => !categorized.has(s));
if (missing.length) {
  console.warn('Uncategorized skills:', missing);
}

const allAgents = [...EXISTING_AGENTS, ...NEW_AGENTS];

// Build INITIAL_AGENTS for agentSkillsData
const initialAgents = agents.map((agent) => {
  const protoId = agentIdForExperimentIdx(agent.id);
  const poolAgent = allAgents.find((a) => a.id === protoId);
  const skills = {};
  for (const [skillName, score] of Object.entries(agent.skill_scores)) {
    const skillId = skillNameToId[skillName];
    if (skillId) skills[skillId] = score;
  }
  const initials = poolAgent.name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  return {
    id: protoId,
    name: poolAgent.name,
    initials,
    photoUrl: `agentPhoto('${protoId}')`,
    skills,
  };
});

const outDir = path.join(root, 'scripts', '.generated');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'categories.json'), JSON.stringify(categories, null, 2));
fs.writeFileSync(path.join(outDir, 'initial-agents.json'), JSON.stringify(initialAgents, null, 2));
fs.writeFileSync(path.join(outDir, 'skills-catalog.json'), JSON.stringify(
  discovered.map((name) => ({ id: skillNameToId[name], name })),
  null,
  2,
));

console.log(`Generated ${discovered.length} skills, ${allAgents.length} agents`);
console.log(`Output: ${outDir}`);
