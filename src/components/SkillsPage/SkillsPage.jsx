import { useState, useCallback } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useSkillsMatrix } from '../../hooks/useSkillsMatrix';
import { Anchor, Button } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';
import { Table, Head, HeaderRow, HeaderCell, Body, Row, Cell } from '@zendeskgarden/react-tables';
import { MD, SM } from '@zendeskgarden/react-typography';
import TopBar from '../TopBar/TopBar';
import PageSidebarNav from '../PageSidebarNav';
import CopilotSidebar from '../CopilotSidebar/CopilotSidebar';
import AgentSkillModal from '../AgentSkillModal';
import { ChevronDownIcon, SparkleIcon } from '../Icons';
import './SkillsPage.css';

function HomeIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M11.4163 2.87911C10.5632 2.29258 9.43683 2.29258 8.58367 2.87911L3.58367 6.31661C2.90529 6.78299 2.5 7.55347 2.5 8.37671V15C2.5 16.3807 3.61929 17.5 5 17.5H7.08333C7.54357 17.5 7.91667 17.1269 7.91667 16.6666V13.75C7.91667 12.5994 8.84942 11.6666 10 11.6666C11.1506 11.6666 12.0833 12.5994 12.0833 13.75V16.6666C12.0833 17.1269 12.4564 17.5 12.9167 17.5H15C16.3808 17.5 17.5 16.3807 17.5 15V8.37671C17.5 7.55347 17.0947 6.78299 16.4163 6.31661L11.4163 2.87911Z" fill="currentColor"/>
    </svg>
  );
}

function AccountIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.666 15.8333V5C16.666 3.61929 15.5468 2.5 14.166 2.5H5.83268C4.45197 2.5 3.33268 3.61929 3.33268 5V15.8333H2.49935C2.03912 15.8333 1.66602 16.2064 1.66602 16.6667C1.66602 17.1269 2.03912 17.5 2.49935 17.5H17.4993C17.9596 17.5 18.3327 17.1269 18.3327 16.6667C18.3327 16.2064 17.9596 15.8333 17.4993 15.8333H16.666ZM7.49935 5.83333C7.03912 5.83333 6.66602 6.20643 6.66602 6.66667C6.66602 7.1269 7.03912 7.5 7.49935 7.5H8.33268C8.79293 7.5 9.16602 7.1269 9.16602 6.66667C9.16602 6.20643 8.79293 5.83333 8.33268 5.83333H7.49935Z" fill="currentColor"/>
    </svg>
  );
}

function PeopleIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.9165 5.83333C2.9165 3.99238 4.40888 2.5 6.24983 2.5C8.09078 2.5 9.58315 3.99238 9.58315 5.83333C9.58315 7.67428 8.09078 9.16667 6.24983 9.16667C4.40888 9.16667 2.9165 7.67428 2.9165 5.83333Z" fill="currentColor"/>
      <path d="M6.24962 10C8.6419 10 10.9112 11.6506 11.7558 14.6779C12.1974 16.2609 10.8473 17.5 9.46132 17.5H3.03791C1.65194 17.5 0.301851 16.2609 0.743465 14.6779C1.58805 11.6506 3.8573 10 6.24962 10Z" fill="currentColor"/>
    </svg>
  );
}

function AIIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M9.99402 4.07296C9.94635 3.65203 9.59052 3.33385 9.16685 3.33342C8.74327 3.33298 8.38668 3.65043 8.33818 4.07126C8.1122 6.03045 7.53038 7.37449 6.61874 8.28614C5.7071 9.19775 4.36305 9.77958 2.40387 10.0056C1.98303 10.0541 1.66558 10.4107 1.66602 10.8342C1.66645 11.2579 1.98463 11.6137 2.40556 11.6614C4.33161 11.8796 5.70627 12.4613 6.64108 13.3792C7.57082 14.2922 8.16367 15.6342 8.33593 17.5738C8.37418 18.0042 8.73493 18.3339 9.16693 18.3334C9.59902 18.3329 9.95902 18.0023 9.99627 17.5719C10.1613 15.6652 10.7537 14.2928 11.6895 13.3569C12.6254 12.4211 13.9978 11.8287 15.9045 11.6637C16.3349 11.6264 16.6655 11.2664 16.666 10.8343C16.6665 10.4023 16.3368 10.0416 15.9064 10.0033C13.9668 9.83108 12.6248 9.23825 11.7119 8.30848C10.7939 7.37367 10.2122 5.99901 9.99402 4.07296Z" fill="currentColor"/>
    </svg>
  );
}

function FlowIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10.0002 1.25C8.47324 1.25 7.22039 2.42328 7.09396 3.91747C5.10461 4.75431 3.55308 6.42324 2.87382 8.48983C2.73011 8.92708 2.96805 9.398 3.40529 9.54175C3.84251 9.68542 4.31345 9.4475 4.45715 9.01025C4.95174 7.50553 6.04335 6.27005 7.45089 5.58491C7.94924 6.47877 8.90407 7.08333 10.0002 7.08333C11.611 7.08333 12.9168 5.7775 12.9168 4.16667C12.9168 2.55583 11.611 1.25 10.0002 1.25Z" fill="currentColor"/>
    </svg>
  );
}

function PaperPlaneIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.33546 4.64336C1.86867 3.243 3.31833 1.97185 4.64571 2.6176L16.7403 8.50146C17.9904 9.10962 17.9904 10.8908 16.7403 11.499L4.64571 17.3828C3.31833 18.0285 1.86868 16.7574 2.33546 15.357L3.84335 10.8334H7.4995C7.95974 10.8334 8.33284 10.4603 8.33284 10C8.33284 9.53979 7.95974 9.16671 7.4995 9.16671H3.84324L2.33546 4.64336Z" fill="currentColor"/>
    </svg>
  );
}

function MonitorIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M1.66602 5C1.66602 3.61929 2.78531 2.5 4.16602 2.5H15.8327C17.2134 2.5 18.3327 3.61929 18.3327 5V11.6667C18.3327 13.0474 17.2134 14.1667 15.8327 14.1667H4.16602C2.78531 14.1667 1.66602 13.0474 1.66602 11.6667V5Z" fill="currentColor"/>
    </svg>
  );
}

function GridIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.50195 4.9995C2.50195 3.61995 3.62031 2.50159 4.99987 2.50159H6.66654C8.0461 2.50159 9.16445 3.61995 9.16445 4.9995V6.66617C9.16445 8.04574 8.0461 9.16413 6.66654 9.16413H4.99987C3.62031 9.16413 2.50195 8.04574 2.50195 6.66617V4.9995Z" fill="currentColor"/>
      <path d="M10.8353 4.9995C10.8353 3.61995 11.9536 2.50159 13.3332 2.50159H14.9999C16.3795 2.50159 17.4978 3.61995 17.4978 4.9995V6.66617C17.4978 8.04574 16.3795 9.16413 14.9999 9.16413H13.3332C11.9536 9.16413 10.8353 8.04574 10.8353 6.66617V4.9995Z" fill="currentColor"/>
    </svg>
  );
}

const primaryNavItems = [
  { id: 'home', icon: HomeIcon, label: 'Home' },
  { id: 'account', icon: AccountIcon, label: 'Account' },
  { id: 'people', icon: PeopleIcon, label: 'People' },
  { id: 'channels', icon: PaperPlaneIcon, label: 'Channels' },
  { id: 'ai', icon: AIIcon, label: 'AI' },
  { id: 'workspaces', icon: MonitorIcon, label: 'Workspaces' },
  { id: 'objects', icon: FlowIcon, label: 'Objects and rules', active: true },
  { id: 'apps', icon: GridIcon, label: 'Apps and integrations' },
];

const secondaryNavSections = [
  {
    title: 'Custom objects',
    items: [
      { id: 'objects', label: 'Objects' },
      { id: 'relationships', label: 'Relationships' },
    ],
  },
  {
    title: 'Omnichannel routing',
    items: [
      { id: 'routing-config', label: 'Routing configurations' },
      { id: 'queues', label: 'Queues' },
      { id: 'capacity-rules', label: 'Capacity rules' },
      { id: 'agent-statuses', label: 'Agent statuses' },
      { id: 'status-timeout', label: 'Status timeout' },
    ],
  },
  {
    title: 'Business rules',
    items: [
      { id: 'triggers', label: 'Triggers' },
      { id: 'skills', label: 'Skills' },
      { id: 'automations', label: 'Automations' },
      { id: 'sla', label: 'Service level agreement' },
      { id: 'schedules', label: 'Schedules' },
    ],
  },
];

export default function SkillsPage({
  onProductChange,
  selectedProduct,
  products,
  onSubPageChange,
  initialCopilotFlow,
}) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [, setAiSkillEnabled] = useLocalStorage('zenbox:routing:aiSkillEnabled', false);
  const [skillsApproved, setSkillsApproved] = useLocalStorage('zenbox:routing:showSkillMatrix', false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(!!initialCopilotFlow);
  const [activeCopilotFlow, setActiveCopilotFlow] = useState(initialCopilotFlow || null);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const {
    categories,
    summary,
    setProficiency,
    removeAgentFromSkill,
    syncSkillAgents,
    getSkillById,
  } = useSkillsMatrix();

  const selectedSkill = selectedSkillId ? getSkillById(selectedSkillId) : null;

  const handleSubPageSelect = (itemId) => {
    if (onSubPageChange) onSubPageChange(itemId);
  };

  const handleSkillsActivated = useCallback(() => {
    setAiSkillEnabled(true);
    setSkillsApproved(true);
  }, [setAiSkillEnabled, setSkillsApproved]);

  const handleOpenAgents = (skillId) => {
    setSelectedSkillId(skillId);
  };

  return (
    <div className="skills-page">
      <TopBar
        pageTitle="Omnichannel routing"
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
        isCopilotOpen={isCopilotOpen}
        onToggleCopilot={() => setIsCopilotOpen((v) => !v)}
      />

      <div className="skills-page__body">
        <PageSidebarNav
          primaryItems={primaryNavItems}
          secondaryHeading="Objects and rules"
          secondarySections={secondaryNavSections}
          activeItem="skills"
          onItemSelect={handleSubPageSelect}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed((v) => !v)}
        />

        <div className="skills-page__content-column">
          <main className="skills-page__main">
            <div className="skills-page__content">
              <nav className="skills-breadcrumbs" aria-label="Breadcrumb">
                <Anchor href="#" className="skills-breadcrumbs__link">Objects and rules</Anchor>
                <ChevronDownIcon className="skills-breadcrumbs__sep" />
                <Anchor href="#" className="skills-breadcrumbs__link">Business rules</Anchor>
                <ChevronDownIcon className="skills-breadcrumbs__sep" />
                <SM className="skills-breadcrumbs__current">Skills</SM>
              </nav>

              <div className="skills-page-header">
                <div className="skills-page-header__text">
                  <h1 className="skills-page-header__title">Skills</h1>
                  <MD className="skills-page-header__description">
                    Manage agent skills used for skill-based routing. Skills are grouped by category
                    and matched to tickets using AI intent detection.
                  </MD>
                </div>
                {skillsApproved && (
                  <Tag hue="green">Active</Tag>
                )}
              </div>

              {!skillsApproved ? (
                <div className="skills-empty-state">
                  <div className="skills-empty-state__icon-wrap">
                    <SparkleIcon className="skills-empty-state__icon" />
                  </div>
                  <MD className="skills-empty-state__title">Generate your skills matrix with AI</MD>
                  <SM className="skills-empty-state__body">
                    Admin Copilot analyzes historical ticket assignments and proposes product and
                    language skills for your team. Review and adjust agent proficiency before you
                    activate skill-based routing.
                  </SM>
                  <Button
                    isPrimary
                    onClick={() => {
                      setActiveCopilotFlow('skills-activation');
                      setIsCopilotOpen(true);
                    }}
                  >
                    Activate skill-based routing
                  </Button>
                </div>
              ) : (
                <div className="skills-matrix-view">
                  <div className="skills-matrix-view__summary">
                    <SM>
                      <strong>{summary.totalSkills} skills</strong>
                      {' · '}
                      {summary.totalAssignments} agent-skill pairs
                      {' · '}
                      {summary.agentsCovered} of {summary.totalAgents} agents covered
                    </SM>
                  </div>

                  {categories.map((category) => (
                    <section
                      key={category.id}
                      className="skills-category"
                      aria-labelledby={`skills-cat-${category.id}`}
                    >
                      <div className="skills-category__header">
                        <h2 id={`skills-cat-${category.id}`} className="skills-category__title">
                          {category.name}
                        </h2>
                        <SM className="skills-category__count">
                          {category.skills.length} skills
                        </SM>
                      </div>

                      <Table className="skills-category__table">
                        <Head>
                          <HeaderRow>
                            <HeaderCell>Skill name</HeaderCell>
                            <HeaderCell>Intents</HeaderCell>
                            <HeaderCell>Avg confidence</HeaderCell>
                            <HeaderCell>Agents assigned</HeaderCell>
                          </HeaderRow>
                        </Head>
                        <Body>
                          {category.skills.map((skill) => (
                            <Row key={skill.id}>
                              <Cell>
                                <SM isBold>{skill.name}</SM>
                              </Cell>
                              <Cell className="skills-category__intents">
                                <SM>{skill.intents}</SM>
                              </Cell>
                              <Cell>
                                <SM>{skill.confidence}%</SM>
                              </Cell>
                              <Cell>
                                <Anchor
                                  as="button"
                                  onClick={() => handleOpenAgents(skill.id)}
                                >
                                  {skill.agents.length} agents assigned
                                </Anchor>
                              </Cell>
                            </Row>
                          ))}
                        </Body>
                      </Table>
                    </section>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>

        <CopilotSidebar
          isOpen={isCopilotOpen}
          onClose={() => {
            setIsCopilotOpen(false);
            setActiveCopilotFlow(null);
          }}
          initialFlow={activeCopilotFlow}
          onSkillsActivated={handleSkillsActivated}
          skillsCategories={categories}
          skillsSummary={summary}
          onSetProficiency={setProficiency}
          onRemoveAgentFromSkill={removeAgentFromSkill}
          onSyncSkillAgents={syncSkillAgents}
          getSkillById={getSkillById}
        />

        {selectedSkill && (
          <AgentSkillModal
            skill={selectedSkill}
            editable
            onClose={() => setSelectedSkillId(null)}
            onSetProficiency={(agentId, level) => setProficiency(selectedSkillId, agentId, level)}
            onRemoveAgent={(agentId) => removeAgentFromSkill(selectedSkillId, agentId)}
            onSyncAgents={(agentIds) => syncSkillAgents(selectedSkillId, agentIds)}
          />
        )}
      </div>
    </div>
  );
}
