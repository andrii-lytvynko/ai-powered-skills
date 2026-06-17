import { useState, useCallback, useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useSkillsMatrix } from "../../hooks/useSkillsMatrix";
import {
  Anchor,
  Button,
  IconButton,
  MD,
  SM,
  Table,
  Tag,
} from "@zendesk-ui/react-components";
import { Tabs, TabList, Tab, TabPanel } from "@zendeskgarden/react-tabs";
import TopBar from "../TopBar/TopBar";
import PageSidebarNav from "../PageSidebarNav";
import CopilotSidebar from "../CopilotSidebar/CopilotSidebar";
import AgentSkillModal from "../AgentSkillModal";
import SkillFormModal from "../SkillFormModal";
import CategoryFormModal from "../CategoryFormModal";
import { AgentSkillsPanel } from "../AgentSkillsManager";
import { buildAgentsFromMatrix, buildSkillsCatalog } from "../../utils/agentSkillsMatrixBridge";
import { ChevronDownIcon, PlusIcon, SparkleIcon } from "../Icons";

import {
  adminCenterPrimaryNavItems as primaryNavItems,
  adminCenterSecondaryNavSections as secondaryNavSections,
  PeopleIcon,
} from "../AdminCenterNav";

import "./SkillsPage.css";

export default function SkillsPage({
  onProductChange,
  selectedProduct,
  products,
  onSubPageChange,
  initialCopilotFlow,
}) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [, setAiSkillEnabled] = useLocalStorage(
    "zenbox:routing:aiSkillEnabled",
    false,
  );
  const [skillsApproved, setSkillsApproved] = useLocalStorage(
    "zenbox:routing:showSkillMatrix",
    false,
  );
  const [isCopilotOpen, setIsCopilotOpen] = useState(!!initialCopilotFlow);
  const [activeCopilotFlow, setActiveCopilotFlow] = useState(
    initialCopilotFlow || null,
  );
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [activeSkillsTab, setActiveSkillsTab] = useState("skills");
  const [agentsViewStarted, setAgentsViewStarted] = useState(false);

  // Collapse state: set of collapsed category ids
  const [collapsedCategories, setCollapsedCategories] = useState(new Set());

  // Modal state
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [skillForm, setSkillForm] = useState(null); // { mode: 'create'|'edit', categoryId, skill? }

  const {
    categories,
    summary,
    setProficiency,
    removeAgentFromSkill,
    syncSkillAgents,
    syncAgentAssignments,
    getSkillById,
    addCategory,
    addSkill,
    updateSkill,
  } = useSkillsMatrix();

  const selectedSkill = selectedSkillId ? getSkillById(selectedSkillId) : null;

  const managerAgents = useMemo(
    () => buildAgentsFromMatrix(categories),
    [categories],
  );
  const skillsCatalog = useMemo(
    () => buildSkillsCatalog(categories),
    [categories],
  );

  const handleManagerAgentsChange = useCallback(
    (nextAgents) => {
      syncAgentAssignments(nextAgents);
    },
    [syncAgentAssignments],
  );

  const showAgentsPanel = summary.totalAssignments > 0 || agentsViewStarted;

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

  const toggleCategory = (categoryId) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const handleCreateCategory = (name) => {
    addCategory(name);
    setCategoryFormOpen(false);
  };

  const handleSaveSkill = ({ name, intents, categoryId }) => {
    if (skillForm?.mode === "edit") {
      updateSkill(skillForm.skill.id, { name, intents, categoryId });
    } else {
      addSkill(categoryId, { name, intents });
    }
    setSkillForm(null);
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
            <div className={`skills-page__content${skillsApproved ? " skills-page__content--with-tabs" : ""}`}>
              <nav className="skills-breadcrumbs" aria-label="Breadcrumb">
                <Anchor href="#" className="skills-breadcrumbs__link">
                  Objects and rules
                </Anchor>
                <ChevronDownIcon className="skills-breadcrumbs__sep" />
                <Anchor href="#" className="skills-breadcrumbs__link">
                  Business rules
                </Anchor>
                <ChevronDownIcon className="skills-breadcrumbs__sep" />
                <SM
                  className="skills-breadcrumbs__current"
                  aria-current="page"
                >
                  Skills
                </SM>
              </nav>

              <div className="skills-page-header">
                <div className="skills-page-header__text">
                  <h1 className="skills-page-header__title">Skills</h1>
                  <MD className="skills-page-header__description">
                    Manage agent skills used for skill-based routing. AI intent
                    detection groups skills by category and matches them to
                    tickets.
                  </MD>
                </div>
                {skillsApproved && <Tag hue="green">Active</Tag>}
              </div>

              {!skillsApproved ? (
                <div className="skills-empty-state">
                  <img
                    src={`${import.meta.env.BASE_URL}recco-banner-bg.svg`}
                    alt=""
                    aria-hidden
                    className="skills-empty-state__bg"
                  />
                  <div className="skills-empty-state__icon-wrap" aria-hidden="true">
                    <img
                      src={`${import.meta.env.BASE_URL}recco-sparkle.svg`}
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden
                    />
                  </div>
                  <MD className="skills-empty-state__title">
                    Generate your skills matrix with AI
                  </MD>
                  <SM className="skills-empty-state__body">
                    Using admin copilot, analyze historical ticket assignments
                    and get proposed product and language skills for your team.
                    Review and adjust agent proficiency before you activate
                    skill-based routing.
                  </SM>
                  <Button
                    isPill
                    isPrimary
                    onClick={() => {
                      setActiveCopilotFlow("skills-activation");
                      setIsCopilotOpen(true);
                    }}
                  >
                    Activate skill-based routing
                  </Button>
                </div>
              ) : (
                <Tabs
                  selectedItem={activeSkillsTab}
                  onChange={setActiveSkillsTab}
                  className="skills-page-tabs"
                >
                  <TabList>
                    <Tab item="skills">Skills</Tab>
                    <Tab item="agents">Agents</Tab>
                  </TabList>
                  <TabPanel item="skills">
                    <div className="skills-matrix-view">
                      <div className="skills-matrix-view__toolbar">
                        <SM className="skills-matrix-view__summary">
                          <strong>{summary.totalSkills} skills</strong>
                          {" · "}
                          {summary.totalAssignments} agent-skill pairs
                          {" · "}
                          {summary.agentsCovered} of {summary.totalAgents} agents
                          covered
                        </SM>
                        <Button
                          isBasic
                          size="small"
                          onClick={() => setCategoryFormOpen(true)}
                        >
                          <Button.StartIcon>
                            <PlusIcon />
                          </Button.StartIcon>
                          Create category
                        </Button>
                      </div>

                      {categories.map((category) => {
                        const isCollapsed = collapsedCategories.has(category.id);
                        const headerId = `skills-cat-${category.id}`;
                        const tableId = `skills-table-${category.id}`;

                        return (
                          <section
                            key={category.id}
                            className="skills-category"
                            aria-labelledby={headerId}
                          >
                            <div className="skills-category__header">
                              <button
                                type="button"
                                className="skills-category__toggle"
                                onClick={() => toggleCategory(category.id)}
                                aria-expanded={!isCollapsed}
                                aria-controls={tableId}
                              >
                                <ChevronDownIcon
                                  className={`skills-category__chevron${isCollapsed ? " skills-category__chevron--collapsed" : ""}`}
                                />
                                <h2
                                  id={headerId}
                                  className="skills-category__title"
                                >
                                  {category.name}
                                </h2>
                                <SM className="skills-category__count">
                                  {category.skills.length}{" "}
                                  {category.skills.length === 1 ? "skill" : "skills"}
                                </SM>
                              </button>

                              <Button
                                isBasic
                                size="small"
                                className="skills-category__add-skill"
                                onClick={() =>
                                  setSkillForm({
                                    mode: "create",
                                    categoryId: category.id,
                                  })
                                }
                              >
                                <Button.StartIcon>
                                  <PlusIcon />
                                </Button.StartIcon>
                                Add skill
                              </Button>
                            </div>

                            {!isCollapsed && (
                              <Table
                                id={tableId}
                                className="skills-category__table skills-category__table-enter"
                              >
                                <Table.Head>
                                  <Table.HeaderRow>
                                    <Table.HeaderCell>Skill name</Table.HeaderCell>
                                    <Table.HeaderCell>Intents</Table.HeaderCell>
                                    <Table.HeaderCell>Avg confidence</Table.HeaderCell>
                                    <Table.HeaderCell>Agents assigned</Table.HeaderCell>
                                    <Table.HeaderCell isMinimum />
                                  </Table.HeaderRow>
                                </Table.Head>
                                <Table.Body>
                                  {category.skills.length === 0 ? (
                                    <Table.Row>
                                      <Table.Cell colSpan={5}>
                                        <SM className="skills-category__empty">
                                          No skills in this category yet. Add a skill to get started.
                                        </SM>
                                      </Table.Cell>
                                    </Table.Row>
                                  ) : (
                                    category.skills.map((skill) => (
                                      <Table.Row key={skill.id}>
                                        <Table.Cell>
                                          <SM isBold>{skill.name}</SM>
                                        </Table.Cell>
                                        <Table.Cell className="skills-category__intents">
                                          <SM>{skill.intents}</SM>
                                        </Table.Cell>
                                        <Table.Cell>
                                          <div className="skills-confidence-cell">
                                            <div className="skills-confidence-cell__bar-track">
                                              <div
                                                className="skills-confidence-cell__bar-fill"
                                                style={{ width: `${skill.confidence}%` }}
                                              />
                                            </div>
                                            <SM className="skills-confidence-cell__value">
                                              {skill.confidence}%
                                            </SM>
                                          </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                          <Anchor
                                            as="button"
                                            onClick={() => handleOpenAgents(skill.id)}
                                          >
                                            {skill.agents.length}{" "}
                                            {skill.agents.length === 1
                                              ? "agent"
                                              : "agents"}{" "}
                                            assigned
                                          </Anchor>
                                        </Table.Cell>
                                      </Table.Row>
                                    ))
                                  )}
                                </Table.Body>
                              </Table>
                            )}
                          </section>
                        );
                      })}
                    </div>
                  </TabPanel>
                  <TabPanel item="agents">
                    <div className="skills-agents-view">
                      {showAgentsPanel ? (
                        <AgentSkillsPanel
                          embedded
                          agents={managerAgents}
                          onAgentsChange={handleManagerAgentsChange}
                          skillsCatalog={skillsCatalog}
                          isActive={activeSkillsTab === "agents"}
                        />
                      ) : (
                        <div className="skills-agents-empty">
                          <div className="skills-agents-empty__icon-wrap">
                            <PeopleIcon className="skills-agents-empty__icon" />
                          </div>
                          <MD className="skills-agents-empty__title">
                            No skills assigned to agents yet
                          </MD>
                          <SM className="skills-agents-empty__body">
                            Assign skills to agents so skill-based routing can match tickets to the
                            right expertise. Select agents and set proficiency scores for each skill.
                          </SM>
                          <Button isPrimary onClick={() => setAgentsViewStarted(true)}>
                            Assign skills to agents
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabPanel>
                </Tabs>
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
            onSetProficiency={(agentId, level) =>
              setProficiency(selectedSkillId, agentId, level)
            }
            onRemoveAgent={(agentId) =>
              removeAgentFromSkill(selectedSkillId, agentId)
            }
            onSyncAgents={(agentIds) =>
              syncSkillAgents(selectedSkillId, agentIds)
            }
          />
        )}

        {categoryFormOpen && (
          <CategoryFormModal
            onClose={() => setCategoryFormOpen(false)}
            onSave={handleCreateCategory}
          />
        )}

        {skillForm && (
          <SkillFormModal
            mode={skillForm.mode}
            categories={categories}
            initialCategoryId={skillForm.categoryId}
            initialSkill={skillForm.skill}
            onClose={() => setSkillForm(null)}
            onSave={handleSaveSkill}
          />
        )}
      </div>
    </div>
  );
}
