import { useMemo, useState } from 'react';
import {
  Button,
  Checkbox,
  Field,
  MD,
  MediaInput,
  Modal,
  SM,
  Table,
  Tag,
} from '@zendesk-ui/react-components';
import { SearchIcon } from '../Icons';
import AgentAvatar from '../AgentAvatar';
import './AddAgentsModal.css';

function formatGroups(groups) {
  return groups.join(', ');
}

export default function AddAgentsModal({
  skill,
  allAgents,
  onClose,
  onSave,
}) {
  const initialSelectedIds = useMemo(
    () => new Set(skill.agents.map((agent) => agent.id)),
    [skill.agents]
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState(() => new Set(initialSelectedIds));

  const hasChanges = useMemo(() => {
    if (selectedIds.size !== initialSelectedIds.size) return true;
    for (const id of selectedIds) {
      if (!initialSelectedIds.has(id)) return true;
    }
    return false;
  }, [selectedIds, initialSelectedIds]);

  const filteredAgents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allAgents;
    return allAgents.filter((agent) => agent.name.toLowerCase().includes(query));
  }, [allAgents, searchQuery]);

  const selectedAgents = useMemo(
    () => allAgents.filter((agent) => selectedIds.has(agent.id)),
    [allAgents, selectedIds]
  );

  const toggleAgent = (agentId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(agentId)) {
        next.delete(agentId);
      } else {
        next.add(agentId);
      }
      return next;
    });
  };

  const removeAgent = (agentId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(agentId);
      return next;
    });
  };

  const handleSave = () => {
    onSave?.(Array.from(selectedIds));
  };

  return (
    <Modal
      onClose={onClose}
      isLarge
      isCentered
      className="add-agents-modal"
      style={{ width: 'min(1040px, calc(100vw - 48px))' }}
    >
      <Modal.Header tag="h2">
        Add agents — <strong>{skill.name}</strong>
      </Modal.Header>
      <Modal.Body>
        <div className="add-agents-modal__layout">
          <div className="add-agents-modal__main">
            <Field className="add-agents-modal__search">
              <MediaInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search agents"
                end={<SearchIcon />}
              />
            </Field>

            <div className="add-agents-modal__table-wrap">
              {filteredAgents.length === 0 ? (
                <div className="add-agents-modal__no-results">
                  <MD className="add-agents-modal__no-results-text">
                    No agents match your search.
                  </MD>
                </div>
              ) : (
                <Table size="small" className="add-agents-modal__table">
                  <Table.Head>
                    <Table.HeaderRow>
                      <Table.HeaderCell isMinimum />
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Groups</Table.HeaderCell>
                    </Table.HeaderRow>
                  </Table.Head>
                  <Table.Body>
                    {filteredAgents.map((agent) => {
                      const isSelected = selectedIds.has(agent.id);
                      return (
                        <Table.Row
                          key={agent.id}
                          className={`add-agents-modal__row${isSelected ? ' add-agents-modal__row--selected' : ''}`}
                          onClick={() => toggleAgent(agent.id)}
                        >
                          <Table.Cell isMinimum className="add-agents-modal__checkbox-cell">
                            <Field>
                              <Checkbox
                                checked={isSelected}
                                onChange={() => toggleAgent(agent.id)}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Field.Label hidden>{`Select ${agent.name}`}</Field.Label>
                              </Checkbox>
                            </Field>
                          </Table.Cell>
                          <Table.Cell>
                            <div className="add-agents-modal__agent-cell">
                              <AgentAvatar agent={agent} size="small" />
                              <SM isBold className="add-agents-modal__agent-name">{agent.name}</SM>
                            </div>
                          </Table.Cell>
                          <Table.Cell>
                            <SM className="add-agents-modal__groups">
                              {formatGroups(agent.groups)}
                            </SM>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              )}
            </div>
          </div>

          <aside className="add-agents-modal__sidebar" aria-label="Agents with skill">
            <SM isBold className="add-agents-modal__sidebar-title">
              Agents with skill ({selectedAgents.length})
            </SM>
            <div className="add-agents-modal__chips">
              {selectedAgents.length === 0 ? (
                <SM className="add-agents-modal__empty">No agents selected</SM>
              ) : (
                selectedAgents.map((agent, index) => (
                  <Tag
                    key={agent.id}
                    isPill
                    size="large"
                    className="add-agents-modal__chip"
                    style={{ '--chip-index': index }}
                  >
                    <AgentAvatar agent={agent} size="extrasmall" className="add-agents-modal__chip-avatar" />
                    <span className="add-agents-modal__chip-name">{agent.name}</span>
                    <Tag.Close
                      aria-label={`Remove ${agent.name}`}
                      onClick={() => removeAgent(agent.id)}
                    />
                  </Tag>
                ))
              )}
            </div>
          </aside>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterItem>
          <Button isBasic onClick={onClose}>
            Cancel
          </Button>
        </Modal.FooterItem>
        <Modal.FooterItem>
          <Button isPrimary onClick={handleSave} disabled={!hasChanges}>
            Save
          </Button>
        </Modal.FooterItem>
      </Modal.Footer>
      <Modal.Close aria-label="Close" />
    </Modal>
  );
}
