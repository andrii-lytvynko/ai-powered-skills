import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  AGENT_POOL,
  DEFAULT_SKILL_CATEGORIES,
  getCategorySummary,
  findSkill,
} from '../data/skillsData';

const STORAGE_KEY = 'zenbox:skills:matrix';

function cloneCategories(categories) {
  return categories.map((cat) => ({
    ...cat,
    skills: cat.skills.map((skill) => ({
      ...skill,
      agents: skill.agents.map((agent) => ({ ...agent })),
    })),
  }));
}

export function useSkillsMatrix() {
  const [categories, setCategories] = useLocalStorage(STORAGE_KEY, DEFAULT_SKILL_CATEGORIES);

  const summary = useMemo(() => getCategorySummary(categories), [categories]);

  const setProficiency = useCallback(
    (skillId, agentId, level) => {
      const clamped = Math.min(5, Math.max(1, level));
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          skills: cat.skills.map((skill) =>
            skill.id !== skillId
              ? skill
              : {
                  ...skill,
                  agents: skill.agents.map((agent) =>
                    agent.id !== agentId ? agent : { ...agent, proficiency: clamped }
                  ),
                }
          ),
        }))
      );
    },
    [setCategories]
  );

  const removeAgentFromSkill = useCallback(
    (skillId, agentId) => {
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          skills: cat.skills.map((skill) =>
            skill.id !== skillId
              ? skill
              : {
                  ...skill,
                  agents: skill.agents.filter((agent) => agent.id !== agentId),
                }
          ),
        }))
      );
    },
    [setCategories]
  );

  const addAgentsToSkill = useCallback(
    (skillId, agentIds, defaultProficiency = 3) => {
      const idsToAdd = Array.isArray(agentIds) ? agentIds : [agentIds];
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          skills: cat.skills.map((skill) => {
            if (skill.id !== skillId) return skill;

            const existingIds = new Set(skill.agents.map((agent) => agent.id));
            const newAgents = idsToAdd
              .filter((id) => !existingIds.has(id))
              .map((id) => {
                const poolAgent = AGENT_POOL.find((agent) => agent.id === id);
                if (!poolAgent) return null;
                return {
                  ...poolAgent,
                  proficiency: defaultProficiency,
                };
              })
              .filter(Boolean);

            return {
              ...skill,
              agents: [...skill.agents, ...newAgents],
            };
          }),
        }))
      );
    },
    [setCategories]
  );

  const syncSkillAgents = useCallback(
    (skillId, selectedAgentIds, defaultProficiency = 3) => {
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          skills: cat.skills.map((skill) => {
            if (skill.id !== skillId) return skill;

            const existingById = new Map(skill.agents.map((agent) => [agent.id, agent]));
            const nextAgents = selectedAgentIds
              .map((id) => {
                if (existingById.has(id)) return existingById.get(id);
                const poolAgent = AGENT_POOL.find((agent) => agent.id === id);
                if (!poolAgent) return null;
                return { ...poolAgent, proficiency: defaultProficiency };
              })
              .filter(Boolean);

            return { ...skill, agents: nextAgents };
          }),
        }))
      );
    },
    [setCategories]
  );

  const resetMatrix = useCallback(() => {
    setCategories(cloneCategories(DEFAULT_SKILL_CATEGORIES));
  }, [setCategories]);

  const getSkillById = useCallback(
    (skillId) => findSkill(categories, skillId),
    [categories]
  );

  return {
    categories,
    summary,
    setProficiency,
    removeAgentFromSkill,
    addAgentsToSkill,
    syncSkillAgents,
    resetMatrix,
    getSkillById,
  };
}
