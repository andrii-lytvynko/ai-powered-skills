import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, IconButton } from '@zendeskgarden/react-buttons';
import { Table, Head, HeaderRow, HeaderCell, Body as TableBody, Row, Cell } from '@zendeskgarden/react-tables';
import { LG, MD, SM } from '@zendeskgarden/react-typography';
import AgentAvatar from '../AgentAvatar';
import { PlusIcon } from './icons';
import { useLocalStorage } from './hooks/useLocalStorage';
import SkillRadarChart, { getSkillGraphDescription } from './SkillRadarChart';
import {
  SKILLS,
  INITIAL_AGENTS,
  getAssignedSkillsList,
  formatSkillsAssigned,
  formatSkillsAssignedCompact,
  getUnassignedSkills,
  normalizeAgents,
} from './agentSkillsData';
import './AgentSkillsManager.css';

function OverflowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="8" cy="3" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="13" r="1.25" fill="currentColor" />
    </svg>
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
  const assignedSkills = getAssignedSkillsList(agent, skills);
  const unassignedSkills = getUnassignedSkills(agent, skills);

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
          <MD isBold className="agent-skills-manager__section-title" tag="span">Skill graph</MD>
          <SM className="agent-skills-manager__section-description" tag="span">
            {getSkillGraphDescription(assignedSkills.length)}
          </SM>
          <SkillRadarChart
            skills={assignedSkills}
            onScoreChange={(skillId, score) => onScoreChange(agent.id, skillId, score)}
            onRemove={(skillId) => onRemoveSkill(agent.id, skillId)}
          />
        </section>

        <section className="agent-skills-manager__section">
          <MD isBold className="agent-skills-manager__section-title" tag="span">Available skills</MD>
          <SM className="agent-skills-manager__section-description" tag="span">
            Add skills to include them on the graph for this agent.
          </SM>
          {unassignedSkills.length > 0 ? (
            <div className="agent-skills-manager__available-skills-scroll">
              <div className="agent-skills-manager__table-header">
                <Table className="agent-skills-manager__available-skills-table" size="small">
                  <Head>
                    <HeaderRow>
                      <HeaderCell>Skill name</HeaderCell>
                      <HeaderCell className="agent-skills-manager__col-add" />
                    </HeaderRow>
                  </Head>
                </Table>
              </div>
              <div className="agent-skills-manager__table-body-scroll agent-skills-manager__scroll">
                <Table className="agent-skills-manager__available-skills-table" size="small">
                  <TableBody>
                    {unassignedSkills.map((skill) => (
                      <Row key={skill.id}>
                        <Cell>
                          <SM tag="span">{skill.name}</SM>
                        </Cell>
                        <Cell className="agent-skills-manager__cell-add">
                          <IconButton
                            isBasic
                            size="small"
                            className="agent-skills-manager__add-skill-btn"
                            aria-label={`Add ${skill.name}`}
                            onClick={() => onAddSkill(agent.id, skill.id)}
                          >
                            <PlusIcon />
                          </IconButton>
                        </Cell>
                      </Row>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <SM className="agent-skills-manager__available-skills-empty" tag="span">
              All skills are assigned to this agent.
            </SM>
          )}
        </section>
      </div>
    </div>
  );
}

function AgentRowMenu({
  agent,
  isOpen,
  menuRef,
  onToggle,
  onViewSkills,
  onRemoveAllSkills,
}) {
  return (
    <div
      className="agent-skills-manager__menu-wrap"
      ref={isOpen ? menuRef : null}
    >
      <IconButton
        aria-label={`More options for ${agent.name}`}
        isBasic
        size="small"
        onClick={onToggle}
      >
        <OverflowIcon />
      </IconButton>

      {isOpen && (
        <div className="agent-skills-manager__actions-menu" role="menu">
          <Button
            isBasic
            className="agent-skills-manager__menu-item"
            role="menuitem"
            onClick={(event) => {
              event.stopPropagation();
              onViewSkills();
            }}
          >
            View skills
          </Button>
          <Button
            isBasic
            className="agent-skills-manager__menu-item"
            role="menuitem"
            onClick={(event) => {
              event.stopPropagation();
              onRemoveAllSkills();
            }}
          >
            Remove all skills
          </Button>
        </div>
      )}
    </div>
  );
}

function useAgentSkillsState({
  controlledAgents,
  onAgentsChange,
  skillsCatalog,
  isActive = true,
}) {
  const [storedAgents, setStoredAgents] = useLocalStorage('zenbox:agentSkills', INITIAL_AGENTS);
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

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
      setOpenMenuId(null);
    }
  }, [isActive]);

  useEffect(() => {
    if (openMenuId === null) return undefined;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

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
    setOpenMenuId(null);
    setSelectedAgentId(agentId);
  }, []);

  const toggleMenu = useCallback((event, agentId) => {
    event.stopPropagation();
    setOpenMenuId((prev) => (prev === agentId ? null : agentId));
  }, []);

  const handleViewSkills = useCallback((agentId) => {
    setSelectedAgentId(agentId);
    setOpenMenuId(null);
  }, []);

  return {
    agents,
    skills,
    selectedAgentId,
    selectedAgent,
    openMenuId,
    menuRef,
    handleRowClick,
    toggleMenu,
    handleViewSkills,
    handleScoreChange,
    handleRemoveSkill,
    handleAddSkill,
    handleRemoveAllSkills,
    setSelectedAgentId,
    setOpenMenuId,
  };
}

function SplitLayoutPanel({
  agents,
  skills,
  selectedAgentId,
  selectedAgent,
  openMenuId,
  menuRef,
  handleRowClick,
  toggleMenu,
  handleViewSkills,
  handleScoreChange,
  handleRemoveSkill,
  handleAddSkill,
  handleRemoveAllSkills,
  setSelectedAgentId,
  setOpenMenuId,
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
              <Head>
                <HeaderRow>
                  <HeaderCell>Agent</HeaderCell>
                  <HeaderCell className="agent-skills-manager__col-skills-assigned">
                    Skills assigned
                  </HeaderCell>
                  <HeaderCell className="agent-skills-manager__col-actions" />
                </HeaderRow>
              </Head>
            </Table>
          </div>
          <div className="agent-skills-manager__table-body-scroll agent-skills-manager__scroll">
            <Table
              className={`agent-skills-manager__table${isPreviewOpen ? ' agent-skills-manager__table--compact' : ''}`}
            >
              <TableBody>
                {agents.map((agent) => (
                  <Row
                    key={agent.id}
                    isSelected={selectedAgentId === agent.id}
                    className="agent-skills-manager__row"
                    onClick={() => handleRowClick(agent.id)}
                  >
                    <Cell>
                      <div className="agent-skills-manager__agent-cell">
                        <AgentAvatar agent={agent} size="extrasmall" />
                        <SM tag="span" className="agent-skills-manager__agent-name">{agent.name}</SM>
                      </div>
                    </Cell>
                    <Cell className="agent-skills-manager__col-skills-assigned">
                      <SM
                        tag="span"
                        className="agent-skills-manager__skills-count"
                        title={isPreviewOpen ? formatSkillsAssigned(agent) : undefined}
                      >
                        {isPreviewOpen
                          ? formatSkillsAssignedCompact(agent)
                          : formatSkillsAssigned(agent)}
                      </SM>
                    </Cell>
                    <Cell className="agent-skills-manager__cell-actions">
                      <AgentRowMenu
                        agent={agent}
                        isOpen={openMenuId === agent.id}
                        menuRef={menuRef}
                        onToggle={(event) => toggleMenu(event, agent.id)}
                        onViewSkills={() => handleViewSkills(agent.id)}
                        onRemoveAllSkills={() => {
                          handleRemoveAllSkills(agent.id);
                          setOpenMenuId(null);
                        }}
                      />
                    </Cell>
                  </Row>
                ))}
              </TableBody>
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
