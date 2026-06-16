import { useMemo, useState } from 'react';
import { Modal, Header, Body, Footer, FooterItem, Close } from '@zendeskgarden/react-modals';
import { Button } from '@zendeskgarden/react-buttons';
import { Field, MediaInput, Checkbox, Label } from '@zendeskgarden/react-forms';
import { Table, Head, HeaderRow, HeaderCell, Body as TableBody, Row, Cell } from '@zendeskgarden/react-tables';
import { SM } from '@zendeskgarden/react-typography';
import { Avatar } from '@zendeskgarden/react-avatars';
import { Tag } from '@zendeskgarden/react-tags';
import { SearchIcon } from '../Icons';
import { getInitials } from '../../data/skillsData';
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
      <Header tag="h2">Add agents to skill &apos;{skill.name}&apos;</Header>
      <Body>
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
              <Table size="small" className="add-agents-modal__table">
                <Head>
                  <HeaderRow>
                    <HeaderCell isMinimum />
                    <HeaderCell>Name</HeaderCell>
                    <HeaderCell>Groups</HeaderCell>
                  </HeaderRow>
                </Head>
                <TableBody>
                  {filteredAgents.map((agent) => {
                    const isSelected = selectedIds.has(agent.id);
                    return (
                      <Row
                        key={agent.id}
                        className={`add-agents-modal__row${isSelected ? ' add-agents-modal__row--selected' : ''}`}
                        onClick={() => toggleAgent(agent.id)}
                      >
                        <Cell isMinimum className="add-agents-modal__checkbox-cell">
                          <Field>
                            <Checkbox
                              checked={isSelected}
                              onChange={() => toggleAgent(agent.id)}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Label hidden>{`Select ${agent.name}`}</Label>
                            </Checkbox>
                          </Field>
                        </Cell>
                        <Cell>
                          <div className="add-agents-modal__agent-cell">
                            <span className="add-agents-modal__avatar">
                              <Avatar size="small" backgroundColor={agent.color}>
                                <span>{getInitials(agent.name)}</span>
                              </Avatar>
                            </span>
                            <SM isBold className="add-agents-modal__agent-name">{agent.name}</SM>
                          </div>
                        </Cell>
                        <Cell>
                          <SM className="add-agents-modal__groups">
                            {formatGroups(agent.groups)}
                          </SM>
                        </Cell>
                      </Row>
                    );
                  })}
                </TableBody>
              </Table>
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
                    <Avatar size="extrasmall" backgroundColor={agent.color}>
                      <span>{getInitials(agent.name)}</span>
                    </Avatar>
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
      </Body>
      <Footer>
        <FooterItem>
          <Button isBasic onClick={onClose}>
            Cancel
          </Button>
        </FooterItem>
        <FooterItem>
          <Button isPrimary onClick={handleSave} disabled={!hasChanges}>
            Save
          </Button>
        </FooterItem>
      </Footer>
      <Close aria-label="Close" />
    </Modal>
  );
}
