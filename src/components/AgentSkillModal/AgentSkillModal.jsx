import { useState } from "react";
import {
  Button,
  IconButton,
  MD,
  Modal,
  SM,
} from "@zendesk-ui/react-components";
import { CloseIcon } from "../Icons";
import AgentAvatar from "../AgentAvatar";
import { AGENT_POOL } from "../../data/skillsData";
import AddAgentsModal from "../AddAgentsModal";
import ProficiencyDots from "./ProficiencyDots";
import "./AgentSkillModal.css";

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
    <Modal onClose={onClose} className="agent-skill-modal">
      <Modal.Header tag="h2">
        <div className="agent-skill-modal__header">
          <div>
            {skill.name}
            <SM className="agent-skill-modal__subtitle">
              {agentCount} {agentCount === 1 ? "agent" : "agents"} assigned
            </SM>
          </div>
          {editable && (
            <Button
              type="button"
              size="small"
              onClick={() => setIsAddAgentsOpen(true)}
            >
              Add agents
            </Button>
          )}
        </div>
      </Modal.Header>
      <Modal.Body>
        {agentCount === 0 ? (
          <MD className="agent-skill-modal__empty">
            No agents are assigned to this skill. Add agents from the skills
            matrix to route tickets.
          </MD>
        ) : (
          <ul className="agent-skill-modal__list">
            {skill.agents.map((agent, index) => (
              <li
                key={agent.id}
                className="agent-skill-modal__row"
                style={{ "--row-index": index }}
              >
                <div className="agent-skill-modal__agent">
                  <AgentAvatar agent={agent} size="small" />
                  <SM isBold className="agent-skill-modal__name">
                    {agent.name}
                  </SM>
                </div>
                <div className="agent-skill-modal__proficiency">
                  <ProficiencyDots
                    level={agent.proficiency}
                    editable={editable}
                    agentName={agent.name}
                    onChange={(level) => onSetProficiency?.(agent.id, level)}
                  />
                </div>
                {editable && (
                  <IconButton
                    aria-label={`Remove ${agent.name} from ${skill.name}`}
                    isBasic
                    size="small"
                    className="agent-skill-modal__remove"
                    onClick={() => onRemoveAgent?.(agent.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Close aria-label="Close" />
    </Modal>
  );
}
