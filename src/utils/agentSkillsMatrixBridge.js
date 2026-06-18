import { AGENT_POOL, getAllSkills, getInitials, getAgentPhotoUrl } from '../data/skillsData';

export function buildSkillsCatalog(categories) {
  return getAllSkills(categories).map((skill) => ({
    id: skill.id,
    name: skill.name,
    categoryId: skill.categoryId,
    categoryName: skill.categoryName,
  }));
}

export function buildAgentsFromMatrix(categories) {
  const skillsByAgent = new Map();

  categories.forEach((category) => {
    category.skills.forEach((skill) => {
      skill.agents.forEach((agent) => {
        if (!skillsByAgent.has(agent.id)) {
          skillsByAgent.set(agent.id, {});
        }
        skillsByAgent.get(agent.id)[skill.id] = agent.proficiency;
      });
    });
  });

  return AGENT_POOL.map((poolAgent) => ({
    id: poolAgent.id,
    name: poolAgent.name,
    initials: getInitials(poolAgent.name),
    photoUrl: getAgentPhotoUrl(poolAgent.id),
    skills: skillsByAgent.get(poolAgent.id) ?? {},
  }));
}

export function applyAgentChangesToMatrix(categories, managerAgents) {
  const skillsByAgent = new Map(
    managerAgents.map((agent) => [agent.id, agent.skills ?? {}]),
  );

  return categories.map((category) => ({
    ...category,
    skills: category.skills.map((skill) => {
      const nextAgents = [];

      managerAgents.forEach((agent) => {
        const rawProficiency = skillsByAgent.get(agent.id)?.[skill.id];
        if (rawProficiency == null) return;

        const poolAgent = AGENT_POOL.find((candidate) => candidate.id === agent.id);
        if (!poolAgent) return;

        const proficiency = Math.min(5, Math.max(1, Math.round(Number(rawProficiency) || 1)));
        nextAgents.push({ ...poolAgent, proficiency });
      });

      return { ...skill, agents: nextAgents };
    }),
  }));
}
