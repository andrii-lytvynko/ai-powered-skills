import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, IconButton, Table, LG, MD, SM } from '@zendesk-ui/react-components';
import AgentAvatar from '../AgentAvatar';
import { ChevronDownIcon } from '../Icons';
import { PlusIcon } from './icons';
import { useLocalStorage } from './hooks/useLocalStorage';
import SkillRadarChart, { getSkillGraphDescription } from './SkillRadarChart';
import {
  SKILLS,
  INITIAL_AGENTS,
  getCategorySkillGroups,
  formatSkillsAssigned,
  formatSkillsAssignedCompact,
  normalizeAgents,
} from './agentSkillsData';
import './AgentSkillsManager.css';


function CategoryAvailableSkillsTable({ skills, agentId, onAddSkill }) {
  if (skills.length === 0) return null;

  return (
    <div className="agent-skills-manager__category-available">
      <SM isBold className="agent-skills-manager__category-available-title" tag="span">
        Available skills
      </SM>
      <div className="agent-skills-manager__available-skills-scroll agent-skills-manager__available-skills-scroll--category">
        <div className="agent-skills-manager__table-header">
          <Table className="agent-skills-manager__available-skills-table" size="small">
            <Table.Head>
              <Table.HeaderRow>
                <Table.HeaderCell>Skill name</Table.HeaderCell>
                <Table.HeaderCell className="agent-skills-manager__col-add" />
              </Table.HeaderRow>
            </Table.Head>
          </Table>
        </div>
        <div className="agent-skills-manager__table-body-scroll agent-skills-manager__scroll">
          <Table className="agent-skills-manager__available-skills-table" size="small">
            <Table.Body>
              {skills.map((skill) => (
                <Table.Row key={skill.id}>
                  <Table.Cell>
                    <SM tag="span">{skill.name}</SM>
                  </Table.Cell>
                  <Table.Cell className="agent-skills-manager__cell-add">
                    <IconButton
                      isBasic
                      size="small"
                      className="agent-skills-manager__add-skill-btn"
                      aria-label={`Add ${skill.name}`}
                      onClick={() => onAddSkill(agentId, skill.id)}
                    >
                      <PlusIcon />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}


function AgentDetailPanel({
  agent,
  skills,
  onClose,
  onScoreChange,
  onRemoveSkill,
  onAddSkill,
}) {
  const categoryGroups = getCategorySkillGroups(agent, skills);
  const totalAssignedSkills = categoryGroups.reduce(
    (sum, group) => sum + group.assignedSkills.length,
    0,
  );
  const [collapsedCategories, setCollapsedCategories] = useState(() => new Set());

  useEffect(() => {
    const groups = getCategorySkillGroups(agent, skills);
    setCollapsedCategories(
      new Set(groups.slice(1).map((group) => group.categoryId)),
    );
  }, [agent.id]);

  const toggleCategory = useCallback((categoryId) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  return (
    <div className="agent-skills-manager__detail">
      <div className="agent-skills-manager__detail-header">
        <IconButton
          isBasic
          aria-label="Back to agents list"
          onClick={onClose}
          className="agent-skills-manager__back-btn"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconButton>
        <AgentAvatar agent={agent} size="header" />
        <div className="agent-skills-manager__detail-agent">
          <LG isBold tag="span">{agent.name}</LG>
          <SM className="agent-skills-manager__detail-meta" tag="span">
            {formatSkillsAssigned(agent)}
          </SM>
        </div>
      </div>

      <div className="agent-skills-manager__detail-body agent-skills-manager__scroll">
        <section className="agent-skills-manager__section">
          <MD isBold className="agent-skills-manager__section-title" tag="span">Skills by category</MD>
          <SM className="agent-skills-manager__section-description" tag="span">
            {getSkillGraphDescription(totalAssignedSkills)}
          </SM>
          {categoryGroups.length === 0 ? (
            <div className="skill-radar__empty">
              <MD tag="span">No skills assigned yet. Add a skill to get started.</MD>
            </div>
          ) : (
            <div className="agent-skills-manager__skill-graphs">
              {categoryGroups.map((group, index) => {
                const isCollapsed = collapsedCategories.has(group.categoryId);
                const headerId = `agent-skill-cat-${agent.id}-${group.categoryId}`;
                const panelId = `agent-skill-cat-panel-${agent.id}-${group.categoryId}`;

                return (
                  <div
                    key={group.categoryId}
                    className="agent-skills-manager__graph-category"
                    data-collapsed={isCollapsed ? 'true' : 'false'}
                    style={{ '--graph-cat-index': index }}
                  >
                    <button
                      type="button"
                      id={headerId}
                      className="agent-skills-manager__graph-category-toggle"
                      onClick={() => toggleCategory(group.categoryId)}
                      aria-expanded={!isCollapsed}
                      aria-controls={panelId}
                    >
                      <ChevronDownIcon
                        className={`agent-skills-manager__graph-category-chevron${
                          isCollapsed ? ' agent-skills-manager__graph-category-chevron--collapsed' : ''
                        }`}
                      />
                      <span className="agent-skills-manager__graph-category-heading">
                        <MD isBold className="agent-skills-manager__graph-category-title" tag="span">
                          {group.categoryName}
                        </MD>
                        <SM className="agent-skills-manager__graph-category-meta" tag="span">
                          {group.assignedSkills.length}{' '}
                          {group.assignedSkills.length === 1 ? 'skill' : 'skills'} assigned
                          {group.unassignedSkills.length > 0 && (
                            <>
                              {' · '}
                              {group.unassignedSkills.length} available
                            </>
                          )}
                        </SM>
                      </span>
                    </button>
                    {!isCollapsed && (
                      <div
                        id={panelId}
                        className="agent-skills-manager__graph-category-body"
                        role="region"
                        aria-labelledby={headerId}
                      >
                        {group.assignedSkills.length > 0 ? (
                          <SkillRadarChart
                            skills={group.assignedSkills}
                            onScoreChange={(skillId, score) => onScoreChange(agent.id, skillId, score)}
                            onRemove={(skillId) => onRemoveSkill(agent.id, skillId)}
                          />
                        ) : (
                          <SM className="agent-skills-manager__graph-category-empty" tag="span">
                            No skills assigned in this category.
                          </SM>
                        )}
                        <CategoryAvailableSkillsTable
                          skills={group.unassignedSkills}
                          agentId={agent.id}
                          onAddSkill={onAddSkill}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}


function useAgentSkillsState({
  controlledAgents,
  onAgentsChange,
  skillsCatalog,
  isActive = true,
}) {
  const [storedAgents, setStoredAgents] = useLocalStorage('zenbox:agentSkills:v2', INITIAL_AGENTS);
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const isControlled = controlledAgents != null && typeof onAgentsChange === 'function';
  const skills = skillsCatalog ?? SKILLS;
  const templateAgents = isControlled ? controlledAgents : INITIAL_AGENTS;
  const sourceAgents = isControlled ? controlledAgents : storedAgents;

  const agents = useMemo(
    () => normalizeAgents(sourceAgents, { templateAgents, skills }),
    [sourceAgents, templateAgents, skills],
  );

  const setAgents = useCallback((updater) => {
    const applyUpdate = (current) => {
      const normalized = normalizeAgents(current, { templateAgents, skills });
      const next = typeof updater === 'function' ? updater(normalized) : updater;
      return normalizeAgents(next, { templateAgents, skills });
    };

    if (isControlled) {
      onAgentsChange(applyUpdate(controlledAgents));
      return;
    }

    setStoredAgents((prev) => applyUpdate(prev));
  }, [controlledAgents, isControlled, onAgentsChange, setStoredAgents, skills, templateAgents]);

  useEffect(() => {
    if (!isActive) {
      setSelectedAgentId(null);
    }
  }, [isActive]);

  const selectedAgent = useMemo(
    () => agents.find((agent) => agent.id === selectedAgentId) ?? null,
    [agents, selectedAgentId],
  );

  const updateAgent = useCallback((agentId, updater) => {
    setAgents((prev) =>
      prev.map((agent) => (agent.id === agentId ? updater(agent) : agent)),
    );
  }, [setAgents]);

  const handleScoreChange = useCallback((agentId, skillId, score) => {
    const safeScore = Math.max(1, Math.min(5, Math.round(Number(score) || 1)));
    updateAgent(agentId, (agent) => ({
      ...agent,
      skills: { ...agent.skills, [skillId]: safeScore },
    }));
  }, [updateAgent]);

  const handleRemoveSkill = useCallback((agentId, skillId) => {
    updateAgent(agentId, (agent) => {
      const nextSkills = { ...agent.skills };
      delete nextSkills[skillId];
      return { ...agent, skills: nextSkills };
    });
  }, [updateAgent]);

  const handleAddSkill = useCallback((agentId, skillId) => {
    updateAgent(agentId, (agent) => ({
      ...agent,
      skills: { ...agent.skills, [skillId]: 3 },
    }));
  }, [updateAgent]);

  const handleRemoveAllSkills = useCallback((agentId) => {
    updateAgent(agentId, (agent) => ({ ...agent, skills: {} }));
    if (selectedAgentId === agentId) {
      setSelectedAgentId(null);
    }
  }, [selectedAgentId, updateAgent]);

  const handleRowClick = useCallback((agentId) => {
    setSelectedAgentId(agentId);
  }, []);

  const handleViewSkills = useCallback((agentId) => {
    setSelectedAgentId(agentId);
  }, []);

  return {
    agents,
    skills,
    selectedAgentId,
    selectedAgent,
    handleRowClick,
    handleViewSkills,
    handleScoreChange,
    handleRemoveSkill,
    handleAddSkill,
    handleRemoveAllSkills,
    setSelectedAgentId,
  };
}

function SplitLayoutPanel({
  agents,
  skills,
  selectedAgentId,
  selectedAgent,
  handleRowClick,
  handleViewSkills,
  handleScoreChange,
  handleRemoveSkill,
  handleAddSkill,
  handleRemoveAllSkills,
  setSelectedAgentId,
}) {
  const isPreviewOpen = selectedAgentId !== null;

  return (
    <div
      className="agent-skills-manager__layout"
      data-preview-open={isPreviewOpen ? 'true' : 'false'}
    >
      <div className="agent-skills-manager__table-area">
        <div className="agent-skills-manager__agents-table">
          <div className="agent-skills-manager__table-header">
            <Table
              className={`agent-skills-manager__table${isPreviewOpen ? ' agent-skills-manager__table--compact' : ''}`}
            >
              <Table.Head>
                <Table.HeaderRow>
                  <Table.HeaderCell>Agent</Table.HeaderCell>
                  <Table.HeaderCell className="agent-skills-manager__col-skills-assigned">
                    Skills assigned
                  </Table.HeaderCell>
                </Table.HeaderRow>
              </Table.Head>
            </Table>
          </div>
          <div className="agent-skills-manager__table-body-scroll agent-skills-manager__scroll">
            <Table
              className={`agent-skills-manager__table${isPreviewOpen ? ' agent-skills-manager__table--compact' : ''}`}
            >
              <Table.Body>
                {agents.map((agent) => (
                  <Table.Row
                    key={agent.id}
                    isSelected={selectedAgentId === agent.id}
                    className="agent-skills-manager__row"
                    onClick={() => handleRowClick(agent.id)}
                  >
                    <Table.Cell>
                      <div className="agent-skills-manager__agent-cell">
                        <AgentAvatar agent={agent} size="extrasmall" />
                        <SM tag="span" className="agent-skills-manager__agent-name">{agent.name}</SM>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="agent-skills-manager__col-skills-assigned">
                      <SM
                        tag="span"
                        className="agent-skills-manager__skills-count"
                        title={isPreviewOpen ? formatSkillsAssigned(agent) : undefined}
                      >
                        {isPreviewOpen
                          ? formatSkillsAssignedCompact(agent)
                          : formatSkillsAssigned(agent)}
                      </SM>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>

      <aside
        className="agent-skills-manager__preview"
        data-open={isPreviewOpen ? 'true' : 'false'}
        aria-label="Agent skill details"
        aria-hidden={!isPreviewOpen}
      >
        <div className="agent-skills-manager__preview-shell">
          {selectedAgent && (
            <AgentDetailPanel
              key={selectedAgent.id}
              agent={selectedAgent}
              skills={skills}
              onClose={() => setSelectedAgentId(null)}
              onScoreChange={handleScoreChange}
              onRemoveSkill={handleRemoveSkill}
              onAddSkill={handleAddSkill}
            />
          )}
        </div>
      </aside>
    </div>
  );
}

export default function AgentSkillsPanel({
  embedded = false,
  agents: controlledAgents,
  onAgentsChange,
  skillsCatalog,
  isActive = true,
}) {
  const state = useAgentSkillsState({
    controlledAgents,
    onAgentsChange,
    skillsCatalog,
    isActive,
  });

  const panelClassName = [
    'agent-skills-manager__panel',
    embedded ? 'agent-skills-manager--embedded' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={panelClassName}>
      <SplitLayoutPanel {...state} />
    </div>
  );
}
