import { useState, useRef, useCallback } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  Anchor,
  Button,
  Field,
  Input,
  Select,
  Tag,
  Toggle,
} from "@zendesk-ui/react-components";
import TopBar from "../TopBar/TopBar";
import PageSidebarNav from "../PageSidebarNav";

import {
  adminCenterPrimaryNavItems as primaryNavItems,
  adminCenterSecondaryNavSections as secondaryNavSections,
  ObjectsIcon as FlowIcon,
} from "../AdminCenterNav";

import CopilotSidebar from "../CopilotSidebar/CopilotSidebar";
import { ChevronDownIcon } from "../Icons";

import {
  RecommendationsBanner,
  RecommendationsDrawer,
  ROUTING_PAGE_RECOMMENDATIONS,
} from "../RoutingRecommendations";

import "./RoutingConfigPage.css";

function GripIcon({ className }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="3" r="1" fill="currentColor" />
      <circle cx="8" cy="3" r="1" fill="currentColor" />
      <circle cx="4" cy="6" r="1" fill="currentColor" />
      <circle cx="8" cy="6" r="1" fill="currentColor" />
      <circle cx="4" cy="9" r="1" fill="currentColor" />
      <circle cx="8" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

function BookOpenIcon({ className }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.667 7.00483L7.53471 5.41987C5.03666 4.86475 2.66699 6.76563 2.66699 9.32463V22.5278C2.66699 24.4026 3.96913 26.026 5.79927 26.4326L14.667 28.4032V7.00483Z"
        fill="#5C6970"
      />
      <path
        d="M17.3337 28.4032L26.2014 26.4326C28.0315 26.026 29.3337 24.4026 29.3337 22.5278V9.32463C29.3337 6.76563 26.9639 4.86475 24.4659 5.41987L17.3337 7.00483V28.4032Z"
        fill="#5C6970"
      />
    </svg>
  );
}

function ChartBarIcon({ className }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.30825 2.5C8.61792 2.5 8.05827 3.05964 8.05827 3.75V16.2508C8.05827 16.9412 8.61792 17.5008 9.30825 17.5008H10.6999C11.3903 17.5008 11.9499 16.9412 11.9499 16.2508V3.75C11.9499 3.05964 11.3903 2.5 10.6999 2.5H9.30825Z"
        fill="#5C6970"
      />
      <path
        d="M3.75 10.8342C3.05964 10.8342 2.5 11.3938 2.5 12.0842V16.2508C2.5 16.9412 3.05964 17.5008 3.75 17.5008H5.14167C5.83203 17.5008 6.39167 16.9412 6.39167 16.2508V12.0842C6.39167 11.3938 5.83203 10.8342 5.14167 10.8342H3.75Z"
        fill="#5C6970"
      />
      <path
        d="M13.6165 7.91667C13.6165 7.22631 14.1762 6.66667 14.8665 6.66667H16.2582C16.9486 6.66667 17.5082 7.22631 17.5082 7.91667V16.2508C17.5082 16.9412 16.9486 17.5008 16.2582 17.5008H14.8665C14.1762 17.5008 13.6165 16.9412 13.6165 16.2508V7.91667Z"
        fill="#5C6970"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 2H2C1.44772 2 1 2.44772 1 3V10C1 10.5523 1.44772 11 2 11H9C9.55228 11 10 10.5523 10 10V7M7 1H11M11 1V5M11 1L5.5 6.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const INITIAL_PRIORITIES = [
  "Agent execution time",
  "CSAT",
  "SLA compliance",
  "Assignment accuracy",
  "First contact resolution",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function RoutingConfigPage({
  onProductChange,
  selectedProduct,
  products,
  onSubPageChange,
  initialCopilotFlow,
  appliedRecommendationIds,
  onRecommendationApplied,
}) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeSubPage, setActiveSubPage] = useState("routing-config");
  const [priorities, setPriorities] = useLocalStorage(
    "zenbox:routing:priorities",
    INITIAL_PRIORITIES,
  );
  const [dragIndex, setDragIndex] = useState(null);
  const [wfmEnabled, setWfmEnabled] = useLocalStorage(
    "zenbox:routing:wfmEnabled",
    false,
  );
  const [qaEnabled, setQaEnabled] = useLocalStorage(
    "zenbox:routing:qaEnabled",
    false,
  );
  const [aiSkillEnabled, setAiSkillEnabled] = useLocalStorage(
    "zenbox:routing:aiSkillEnabled",
    false,
  );
  const [, setSkillsApproved] = useLocalStorage(
    "zenbox:routing:showSkillMatrix",
    false,
  );
  const [assignmentMethod, setAssignmentMethod] = useLocalStorage(
    "zenbox:routing:assignmentMethod",
    "highest-spare",
  );
  const [isCopilotOpen, setIsCopilotOpen] = useState(!!initialCopilotFlow);
  const [activeCopilotFlow, setActiveCopilotFlow] = useState(
    initialCopilotFlow || null,
  );
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [recommendations, setRecommendations] = useState(() =>
    appliedRecommendationIds
      ? ROUTING_PAGE_RECOMMENDATIONS.filter(
          (r) => !appliedRecommendationIds.has(r.id),
        )
      : ROUTING_PAGE_RECOMMENDATIONS,
  );

  const wfmCardRef = useRef(null);

  const handleToggleNav = () => setIsNavCollapsed(!isNavCollapsed);
  const handleSubPageSelect = (itemId) => {
    setActiveSubPage(itemId);
    if (onSubPageChange) onSubPageChange(itemId);
  };

  const handleWfmActivated = useCallback(() => {
    setWfmEnabled(true);
    requestAnimationFrame(() => {
      wfmCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, []);

  const handleOpenRecommendations = useCallback(() => {
    setIsCopilotOpen(false);
    setIsRecommendationsOpen(true);
  }, []);

  const handleApplyRecommendation = useCallback(() => {
    if (!selectedRecommendation) return;

    if (selectedRecommendation.id === "skills-based") {
      setRecommendations((prev) =>
        prev.filter((r) => r.id !== selectedRecommendation.id),
      );
      onRecommendationApplied?.("skills-based");
      setIsRecommendationsOpen(false);
      setSelectedRecommendation(null);
      onSubPageChange?.("skills", { copilotFlow: "skills-activation" });
      return;
    } else if (selectedRecommendation.id === "wfm-data") {
      setRecommendations((prev) =>
        prev.filter((r) => r.id !== selectedRecommendation.id),
      );
      onRecommendationApplied?.("wfm-data");
      setIsRecommendationsOpen(false);
      setSelectedRecommendation(null);
      setActiveCopilotFlow("wfm-activation");
      setIsCopilotOpen(true);
      return;
    }

    setRecommendations((prev) =>
      prev.filter((r) => r.id !== selectedRecommendation.id),
    );
    onRecommendationApplied?.(selectedRecommendation.id);
    setIsRecommendationsOpen(false);
    setSelectedRecommendation(null);
  }, [selectedRecommendation, onRecommendationApplied]);

  // ── Drag-to-reorder handlers ────────────────────────────────────────────────
  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragIndex === null || dragIndex === index) return;
    const next = [...priorities];
    const [dragged] = next.splice(dragIndex, 1);
    next.splice(index, 0, dragged);
    setPriorities(next);
    setDragIndex(index);
  };

  const handleDragEnd = () => setDragIndex(null);

  return (
    <div className="routing-config-page">
      <TopBar
        pageTitle="Omnichannel routing"
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
        isCopilotOpen={isCopilotOpen}
        onToggleCopilot={() => setIsCopilotOpen((v) => !v)}
      />
      <div className="routing-config-page__body">
        <PageSidebarNav
          primaryItems={primaryNavItems}
          secondaryHeading="Objects and rules"
          secondarySections={secondaryNavSections}
          activeItem={activeSubPage}
          onItemSelect={handleSubPageSelect}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={handleToggleNav}
        />

        <div className="routing-config-page__content-column">
          <main className="routing-config-page__main">
            <div className="routing-config-page__content">
              {/* ── Breadcrumbs ─────────────────────────────────────── */}
              <nav className="rc-breadcrumbs" aria-label="Breadcrumb">
                <Anchor href="#" className="rc-breadcrumbs__link">
                  Objects and rules
                </Anchor>
                <ChevronDownIcon className="rc-breadcrumbs__sep" />
                <Anchor href="#" className="rc-breadcrumbs__link">
                  Omnichannel routing
                </Anchor>
                <ChevronDownIcon className="rc-breadcrumbs__sep" />
                <Anchor href="#" className="rc-breadcrumbs__link">
                  Routing configurations
                </Anchor>
                <ChevronDownIcon className="rc-breadcrumbs__sep" />
                <span className="rc-breadcrumbs__current">
                  Predictive routing configuration
                </span>
              </nav>

              {/* ── Page header ──────────────────────────────────────── */}
              <div className="rc-page-header rc-section rc-section--header">
                <div className="rc-page-header__text">
                  <h1 className="rc-page-header__title">
                    Predictive routing configuration
                  </h1>
                  <p className="rc-page-header__description">
                    Configure the AI-powered routing engine that determines how
                    tickets are distributed to team members. Prioritize the
                    metrics that matter most, connect data sources, and enable
                    skill-based matching. All other settings will be used from{" "}
                    <Anchor href="#" className="rc-inline-link">
                      General routing configuration
                      <ExternalLinkIcon className="rc-inline-link__icon" />
                    </Anchor>
                  </p>
                </div>
              </div>

              {/* ── Recommendation banner ────────────────────────────── */}
              <RecommendationsBanner
                count={recommendations.length}
                onViewRecommendations={handleOpenRecommendations}
              />

              {/* ── Section 1: Routing engine model ─────────────────── */}
              <section
                className="rc-section"
                aria-labelledby="rc-routing-engine-title"
              >
                <div className="rc-section__head">
                  <h2
                    id="rc-routing-engine-title"
                    className="rc-section__title"
                  >
                    Routing engine model
                  </h2>
                  <p className="rc-section__description">
                    Define the core behavior of the predictive routing engine —
                    how it evaluates tickets and selects agents.
                  </p>
                </div>

                <div className="rc-form-group">
                  {/* Predictive routing policy */}
                  <div className="rc-form-field">
                    <div className="rc-form-field__label-row">
                      <span className="rc-form-field__label">
                        Predictive routing policy
                      </span>
                    </div>
                    <p className="rc-form-field__hint">
                      Defines how routing engine evaluates and selects agents.{" "}
                      <Anchor href="#" className="rc-inline-link">
                        Learn about predictive routing policies
                        <ExternalLinkIcon className="rc-inline-link__icon" />
                      </Anchor>
                    </p>
                    <Field className="rc-form-field__input-wrap">
                      <Field.Label hidden>
                        Predictive routing policy
                      </Field.Label>
                      <Input
                        placeholder="Workpile policy"
                        className="rc-input"
                      />
                    </Field>
                  </div>

                  {/* Assignment method */}
                  <div className="rc-form-field">
                    <div className="rc-form-field__label-row">
                      <span className="rc-form-field__label">
                        Assignment method
                      </span>
                    </div>
                    <p className="rc-form-field__hint">
                      Determines which agent receives the ticket when multiple
                      agents qualify.
                    </p>
                    <Field className="rc-form-field__input-wrap">
                      <Field.Label hidden>Assignment method</Field.Label>
                      <Select
                        value={assignmentMethod}
                        onChange={(e) => setAssignmentMethod(e.target.value)}
                        className="rc-select"
                      >
                        <option value="highest-spare">
                          Highest percentage spare capacity
                        </option>
                        <option value="least-busy">Least busy agent</option>
                        <option value="round-robin">Round robin</option>
                      </Select>
                    </Field>
                  </div>
                </div>
              </section>

              {/* ── Section 2: Optimization priorities ──────────────── */}
              <section
                className="rc-section"
                aria-labelledby="rc-priorities-title"
              >
                <div className="rc-section__head">
                  <h2 id="rc-priorities-title" className="rc-section__title">
                    Optimization priorities
                  </h2>
                  <p className="rc-section__description">
                    The routing engine uses these metrics to score and rank
                    agents for each ticket. Drag to reorder — metrics higher in
                    the list carry more weight in routing decisions.
                  </p>
                </div>

                <ul
                  className="rc-priority-list"
                  aria-label="Optimization priorities"
                >
                  {priorities.map((item, index) => (
                    <li
                      key={item}
                      className={`rc-draggable-item${dragIndex === index ? " rc-draggable-item--dragging" : ""}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <GripIcon
                        className="rc-draggable-item__grip"
                        aria-hidden="true"
                      />
                      <span className="rc-draggable-item__label">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* ── Section 3: Data Sources ──────────────────────────── */}
              <section
                className="rc-section"
                aria-labelledby="rc-data-sources-title"
              >
                <div className="rc-section__head">
                  <h2 id="rc-data-sources-title" className="rc-section__title">
                    Data sources
                  </h2>
                  <p className="rc-section__description">
                    Connect external data to enrich routing decisions. The
                    routing engine uses these inputs alongside built-in
                    performance data to make smarter assignments.{" "}
                    <Anchor href="#" className="rc-inline-link">
                      Learn about data sources integration
                      <ExternalLinkIcon className="rc-inline-link__icon" />
                    </Anchor>
                  </p>
                </div>

                <div className="rc-integration-cards">
                  <div
                    className="rc-integration-card"
                    ref={wfmCardRef}
                    data-activated={wfmEnabled ? "true" : "false"}
                  >
                    <div className="rc-integration-card__body">
                      <div className="rc-integration-card__info">
                        <div className="rc-integration-card__title-row">
                          <span className="rc-integration-card__title">
                            Workforce management integration
                          </span>
                          <Tag
                            {...(wfmEnabled ? { hue: "green" } : {})}
                            className={wfmEnabled ? "" : "rc-tag-inactive"}
                          >
                            {wfmEnabled ? "Active" : "Inactive"}
                          </Tag>
                        </div>
                        <p className="rc-integration-card__description">
                          Sync agent schedules from your WFM tool to automate
                          queue assignments and status changes. The routing
                          engine will use schedule data to determine agent
                          availability in real time.
                        </p>
                      </div>
                      <Field className="rc-integration-card__toggle-field">
                        <Toggle
                          checked={wfmEnabled}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRecommendations((prev) =>
                                prev.filter((r) => r.id !== "wfm-data"),
                              );
                              onRecommendationApplied?.("wfm-data");
                              setActiveCopilotFlow("wfm-activation");
                              setIsCopilotOpen(true);
                            } else {
                              setWfmEnabled(false);
                            }
                          }}
                        >
                          <Field.Label hidden>
                            Workforce management integration
                          </Field.Label>
                        </Toggle>
                      </Field>
                    </div>
                  </div>

                  <div className="rc-integration-card">
                    <div className="rc-integration-card__body">
                      <div className="rc-integration-card__info">
                        <div className="rc-integration-card__title-row">
                          <span className="rc-integration-card__title">
                            Quality assurance integration
                          </span>
                          <Tag className="rc-tag-inactive">Inactive</Tag>
                        </div>
                        <p className="rc-integration-card__description">
                          Connect QA review scores and AutoQA data to the
                          routing engine. Agents with higher quality scores on
                          relevant ticket types will be prioritized in routing
                          decisions.
                        </p>
                      </div>
                      <Field className="rc-integration-card__toggle-field">
                        <Toggle
                          checked={qaEnabled}
                          onChange={(e) => setQaEnabled(e.target.checked)}
                        >
                          <Field.Label hidden>
                            Quality assurance integration
                          </Field.Label>
                        </Toggle>
                      </Field>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Section 4: Skill-based routing ───────────────────── */}
              <section
                className="rc-section"
                aria-labelledby="rc-skill-routing-title"
              >
                <div className="rc-section__head">
                  <h2 id="rc-skill-routing-title" className="rc-section__title">
                    Skill-based routing
                  </h2>
                  <p className="rc-section__description">
                    Automatically match tickets to agents with the right
                    expertise. Skills are created and managed by AI based on
                    historical performance data and ticket intent detection.{" "}
                    <Anchor href="#" className="rc-inline-link">
                      Powered by Intelligent triage
                      <ExternalLinkIcon className="rc-inline-link__icon" />
                    </Anchor>
                  </p>
                </div>

                <div className="rc-integration-cards">
                  <div
                    className="rc-integration-card"
                    data-activated={aiSkillEnabled ? "true" : "false"}
                  >
                    <div className="rc-integration-card__body">
                      <div className="rc-integration-card__info">
                        <div className="rc-integration-card__title-row">
                          <span className="rc-integration-card__title">
                            AI skill matching
                          </span>
                          <Tag
                            {...(aiSkillEnabled ? { hue: "green" } : {})}
                            className={aiSkillEnabled ? "" : "rc-tag-inactive"}
                          >
                            {aiSkillEnabled ? "Active" : "Inactive"}
                          </Tag>
                        </div>
                        <p className="rc-integration-card__description">
                          Automatically match tickets to agents with the right
                          expertise using AI intent detection. Skills are
                          generated and managed from historical performance data
                          — no triggers or manual tagging required.
                        </p>
                      </div>
                      <Field className="rc-integration-card__toggle-field">
                        <Toggle
                          checked={aiSkillEnabled}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRecommendations((prev) =>
                                prev.filter((r) => r.id !== "skills-based"),
                              );
                              onRecommendationApplied?.("skills-based");
                              onSubPageChange?.("skills", {
                                copilotFlow: "skills-activation",
                              });
                            } else {
                              setAiSkillEnabled(false);
                              setSkillsApproved(false);
                            }
                          }}
                        >
                          <Field.Label hidden>AI skill matching</Field.Label>
                        </Toggle>
                      </Field>
                    </div>
                  </div>

                  {aiSkillEnabled && (
                    <div className="rc-skill-manage">
                      <SM className="rc-skill-manage__status">
                        AI skill matching is active. Skills are grouped by
                        product and language categories.
                      </SM>
                      <Button
                        isBasic
                        onClick={() => onSubPageChange?.("skills")}
                      >
                        Manage agent skills
                      </Button>
                    </div>
                  )}
                </div>
              </section>

              {/* ── Section 5: Predictive routing resources ──────────── */}
              <section
                className="rc-section rc-section--resources"
                aria-labelledby="rc-resources-title"
              >
                <div className="rc-section__head">
                  <h2 id="rc-resources-title" className="rc-section__title">
                    Predictive routing resources
                  </h2>
                </div>

                <div className="rc-resource-tiles">
                  <div className="rc-resource-tile">
                    <BookOpenIcon
                      className="rc-resource-tile__icon"
                      aria-hidden="true"
                    />
                    <div className="rc-resource-tile__body">
                      <span className="rc-resource-tile__title">
                        How to enable predictive routing to a queue?
                      </span>
                      <Anchor
                        href="#"
                        className="rc-inline-link rc-resource-tile__link"
                      >
                        Open article
                        <ExternalLinkIcon className="rc-inline-link__icon" />
                      </Anchor>
                    </div>
                  </div>

                  <div className="rc-resource-tile">
                    <FlowIcon
                      className="rc-resource-tile__icon rc-resource-tile__icon--lg"
                      aria-hidden="true"
                    />
                    <div className="rc-resource-tile__body">
                      <span className="rc-resource-tile__title">
                        Configure routing queue
                      </span>
                      <Anchor
                        href="#"
                        className="rc-inline-link rc-resource-tile__link"
                      >
                        Create queue
                        <ExternalLinkIcon className="rc-inline-link__icon" />
                      </Anchor>
                    </div>
                  </div>

                  <div className="rc-resource-tile">
                    <ChartBarIcon
                      className="rc-resource-tile__icon"
                      aria-hidden="true"
                    />
                    <div className="rc-resource-tile__body">
                      <span className="rc-resource-tile__title">
                        Predictive routing dashboard
                      </span>
                      <Anchor
                        href="#"
                        className="rc-inline-link rc-resource-tile__link"
                      >
                        Open dashboard
                        <ExternalLinkIcon className="rc-inline-link__icon" />
                      </Anchor>
                    </div>
                  </div>
                </div>
              </section>
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
          onWfmActivated={handleWfmActivated}
        />

        <RecommendationsDrawer
          isOpen={isRecommendationsOpen}
          onClose={() => {
            setIsRecommendationsOpen(false);
            setSelectedRecommendation(null);
          }}
          selectedRecommendation={selectedRecommendation}
          onSelectRecommendation={setSelectedRecommendation}
          onApplyRecommendation={handleApplyRecommendation}
          recommendations={recommendations}
        />
      </div>
    </div>
  );
}
