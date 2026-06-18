import { useState } from "react";
import {
  Button,
  IconButton,
  MD,
  Modal,
  SM,
  Table,
} from "@zendesk-ui/react-components";
import { CloseIcon } from "../Icons";
import AgentAvatar from "../AgentAvatar";
import { AGENT_POOL } from "../../data/skillsData";
import AddAgentsModal from "../AddAgentsModal";
import ProficiencyDots from "./ProficiencyDots";
import "./AgentSkillModal.css";

function AgentTableColGroup({ editable }) {
  return (
    <colgroup>
      <col className="agent-skill-modal__col-agent" />
      <col className="agent-skill-modal__col-proficiency" />
      {editable ? <col className="agent-skill-modal__col-actions" /> : null}
    </colgroup>
  );
}

function AgentTableHeader({ editable }) {
  return (
    <Table.Head>
      <Table.HeaderRow>
        <Table.HeaderCell className="agent-skill-modal__col-agent">
          Agent name
        </Table.HeaderCell>
        <Table.HeaderCell className="agent-skill-modal__col-proficiency">
          Proficiency
        </Table.HeaderCell>
        {editable ? (
          <Table.HeaderCell
            isMinimum
            className="agent-skill-modal__col-actions"
          />
        ) : null}
      </Table.HeaderRow>
    </Table.Head>
  );
}

export default function AgentSkillModal({
  skill,
  editable = false,
  onClose,
  onSetProficiency,
  onRemoveAgent,
  onSyncAgents,
}) {
  const [isAddAgentsOpen, setIsAddAgentsOpen] = useState(false);

  if (!skill) return null;

  const agentCount = skill.agents.length;

  const handleSaveAgents = (selectedAgentIds) => {
    onSyncAgents?.(selectedAgentIds);
    setIsAddAgentsOpen(false);
  };

  if (isAddAgentsOpen) {
    return (
      <AddAgentsModal
        skill={skill}
        allAgents={AGENT_POOL}
        onClose={() => setIsAddAgentsOpen(false)}
        onSave={handleSaveAgents}
      />
    );
  }

  return (
    <Modal
      onClose={onClose}
      isLarge
      isCentered
      className="agent-skill-modal"
    >
      <Modal.Header tag="h2">
        <div className="agent-skill-modal__header">
          <div className="agent-skill-modal__header-text">
            {skill.name}
            <SM className="agent-skill-modal__subtitle">
              {agentCount} {agentCount === 1 ? "agent" : "agents"} assigned
            </SM>
          </div>
          <div className="agent-skill-modal__header-actions">
            {editable && (
              <Button
                type="button"
                size="small"
                onClick={() => setIsAddAgentsOpen(true)}
              >
                Add agents
              </Button>
            )}
            <Modal.Close aria-label="Close" />
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className="agent-skill-modal__body">
        {agentCount === 0 ? (
          <MD className="agent-skill-modal__empty">
            No agents are assigned to this skill. Add agents from the skills
            matrix to route tickets.
          </MD>
        ) : (
          <div className="agent-skill-modal__table">
            <div className="agent-skill-modal__table-header">
              <Table size="small" className="agent-skill-modal__table-grid">
                <AgentTableColGroup editable={editable} />
                <AgentTableHeader editable={editable} />
              </Table>
            </div>
            <div className="agent-skill-modal__table-body-scroll">
              <Table size="small" className="agent-skill-modal__table-grid">
                <AgentTableColGroup editable={editable} />
                <Table.Body>
                  {skill.agents.map((agent, index) => (
                    <Table.Row
                      key={agent.id}
                      className="agent-skill-modal__row"
                      style={{ "--row-index": index }}
                    >
                      <Table.Cell className="agent-skill-modal__col-agent">
                        <div className="agent-skill-modal__agent">
                          <AgentAvatar agent={agent} size="small" />
                          <SM isBold className="agent-skill-modal__name">
                            {agent.name}
                          </SM>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="agent-skill-modal__col-proficiency agent-skill-modal__proficiency-cell">
                        <ProficiencyDots
                          level={agent.proficiency}
                          editable={editable}
                          agentName={agent.name}
                          onChange={(level) =>
                            onSetProficiency?.(agent.id, level)
                          }
                        />
                      </Table.Cell>
                      {editable ? (
                        <Table.Cell
                          isMinimum
                          className="agent-skill-modal__col-actions agent-skill-modal__remove-cell"
                        >
                          <IconButton
                            aria-label={`Remove ${agent.name} from ${skill.name}`}
                            isBasic
                            size="small"
                            className="agent-skill-modal__remove"
                            onClick={() => onRemoveAgent?.(agent.id)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Table.Cell>
                      ) : null}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
