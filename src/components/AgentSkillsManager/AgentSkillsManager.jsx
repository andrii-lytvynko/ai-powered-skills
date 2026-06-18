import { Modal, Button } from '@zendesk-ui/react-components';
import AgentSkillsPanel from './AgentSkillsPanel';
import './AgentSkillsManager.css';

export default function AgentSkillsManager({
  isOpen,
  onClose,
  agents,
  onAgentsChange,
  skillsCatalog,
}) {
  if (!isOpen) return null;

  return (
    <Modal
      isLarge
      onClose={onClose}
      aria-label="Manage agent skills"
      className="agent-skills-manager__modal"
    >
      <Modal.Header>Manage agent skills</Modal.Header>
      <Modal.Close aria-label="Close modal" />
      <Modal.Body className="agent-skills-manager__body">
        <AgentSkillsPanel
          agents={agents}
          onAgentsChange={onAgentsChange}
          skillsCatalog={skillsCatalog}
          isActive={isOpen}
        />
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterItem>
          <Button isPrimary onClick={onClose}>
            Done
          </Button>
        </Modal.FooterItem>
      </Modal.Footer>
    </Modal>
  );
}
