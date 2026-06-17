import { Modal, Header, Body, Close, Footer, FooterItem } from '@zendeskgarden/react-modals';
import { Button } from '@zendeskgarden/react-buttons';
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
      <Header>Manage agent skills</Header>
      <Close aria-label="Close modal" />
      <Body className="agent-skills-manager__body">
        <AgentSkillsPanel
          agents={agents}
          onAgentsChange={onAgentsChange}
          skillsCatalog={skillsCatalog}
          isActive={isOpen}
        />
      </Body>
      <Footer>
        <FooterItem>
          <Button isPrimary onClick={onClose}>
            Done
          </Button>
        </FooterItem>
      </Footer>
    </Modal>
  );
}
