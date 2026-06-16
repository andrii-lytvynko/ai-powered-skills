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

export const AGENT_POOL = AGENT_POOL_RAW.map((agent) => ({
  ...agent,
  color: getAgentColor(agent.id),
}));

export function getAgentById(id) {
  return AGENT_POOL.find((agent) => agent.id === id) ?? null;
}

function assignAgents(indices, proficiencies) {
  return indices.map((idx, i) => ({
    ...AGENT_POOL[idx],
    proficiency: proficiencies[i],
  }));
}

export const DEFAULT_SKILL_CATEGORIES = [
  {
    id: 'product',
    name: 'Product',
    skills: [
      {
        id: 'billing-disputes',
        name: 'Billing disputes',
        tickets: '1,240',
        intents: 'Charge disputes, invoice errors, payment failures, double charges',
        confidence: 89,
        agents: assignAgents([0, 1, 2, 3, 4, 5, 6, 7], [5, 4, 4, 3, 5, 4, 3, 2]),
      },
      {
        id: 'product-configuration',
        name: 'Product configuration',
        tickets: '980',
        intents: 'Setup, integrations, feature config, API questions',
        confidence: 90,
        agents: assignAgents([0, 2, 3, 5, 6, 8, 9, 10], [4, 5, 3, 4, 5, 3, 4, 2]),
      },
      {
        id: 'refund-processing',
        name: 'Refund processing',
        tickets: '870',
        intents: 'Return requests, refund eligibility, policy exceptions, prorated credits',
        confidence: 90,
        agents: assignAgents([1, 2, 4, 5, 7, 8, 9], [5, 4, 4, 3, 5, 3, 4]),
      },
      {
        id: 'account-migration',
        name: 'Account migration',
        tickets: '420',
        intents: 'Platform migration, data transfer, onboarding from competitor',
        confidence: 89,
        agents: assignAgents([0, 3, 6, 10, 11], [4, 3, 5, 4, 3]),
      },
      {
        id: 'subscription-management',
        name: 'Subscription management',
        tickets: '1,560',
        intents: 'Plan changes, renewals, cancellations, trial conversions',
        confidence: 88,
        agents: assignAgents([0, 1, 2, 3, 4, 5, 6, 7, 8], [5, 4, 4, 5, 3, 4, 4, 3, 5]),
      },
      {
        id: 'compliance-security',
        name: 'Compliance and security',
        tickets: '310',
        intents: 'Data requests (GDPR/CCPA), security incidents, access control',
        confidence: 88,
        agents: assignAgents([2, 4, 7, 11], [5, 4, 5, 3]),
      },
      {
        id: 'technical-troubleshooting',
        name: 'Technical troubleshooting',
        tickets: '720',
        intents: 'Error diagnosis, connectivity issues, performance problems',
        confidence: 87,
        agents: assignAgents([0, 2, 5, 6, 9, 10], [4, 5, 3, 4, 5, 3]),
      },
      {
        id: 'onboarding',
        name: 'Onboarding',
        tickets: '540',
        intents: 'New account setup, first-time configuration, training requests',
        confidence: 91,
        agents: assignAgents([1, 3, 5, 8, 10], [4, 5, 4, 3, 5]),
      },
    ],
  },
  {
    id: 'language',
    name: 'Language',
    skills: [
      {
        id: 'english',
        name: 'English',
        tickets: '18,420',
        intents: 'General support in English across all product areas',
        confidence: 94,
        agents: assignAgents([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [5, 5, 4, 5, 4, 5, 4, 4, 5, 4, 3, 5]),
      },
      {
        id: 'spanish',
        name: 'Spanish',
        tickets: '3,210',
        intents: 'General support in Spanish across all product areas',
        confidence: 92,
        agents: assignAgents([1, 4, 8, 9], [5, 4, 5, 4]),
      },
      {
        id: 'german',
        name: 'German',
        tickets: '1,890',
        intents: 'General support in German across all product areas',
        confidence: 91,
        agents: assignAgents([6, 7, 11], [5, 4, 3]),
      },
      {
        id: 'french',
        name: 'French',
        tickets: '1,540',
        intents: 'General support in French across all product areas',
        confidence: 90,
        agents: assignAgents([5, 10, 11], [5, 4, 4]),
      },
      {
        id: 'portuguese',
        name: 'Portuguese',
        tickets: '980',
        intents: 'General support in Portuguese across all product areas',
        confidence: 89,
        agents: assignAgents([4, 9], [5, 4]),
      },
      {
        id: 'japanese',
        name: 'Japanese',
        tickets: '760',
        intents: 'General support in Japanese across all product areas',
        confidence: 93,
        agents: assignAgents([7, 8], [5, 5]),
      },
      {
        id: 'italian',
        name: 'Italian',
        tickets: '620',
        intents: 'General support in Italian across all product areas',
        confidence: 88,
        agents: assignAgents([8, 9], [5, 4]),
      },
      {
        id: 'dutch',
        name: 'Dutch',
        tickets: '410',
        intents: 'General support in Dutch across all product areas',
        confidence: 87,
        agents: assignAgents([6, 10], [4, 3]),
      },
    ],
  },
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
