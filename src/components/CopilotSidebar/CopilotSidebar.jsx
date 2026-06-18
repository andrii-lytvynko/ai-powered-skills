import { useState, useEffect, useRef } from 'react';
import { IconButton, SM, MD } from '@zendesk-ui/react-components';
import { ClockIcon, EditNoteIcon, CloseIcon, SparkleIcon, InfoIcon } from '../Icons';
import { useSkillsMatrix } from '../../hooks/useSkillsMatrix';
import AgentSkillModal from '../AgentSkillModal';
import './CopilotSidebar.css';

// ─── Static data ────────────────────────────────────────────

const PROMPTS = [
  { id: 1, text: 'Route specific tickets to assignee', variant: 'default' },
  { id: 2, text: 'Show me performance data of Predictive routing queues for last 7 days', variant: 'featured' },
  { id: 3, text: 'Explain intent', variant: 'default' },
];

const THINKING_STEPS = [
  { id: 1, text: 'Connecting to HyperArc...', duration: 800 },
  { id: 2, text: 'Fetching queue performance data...', duration: 1100 },
  { id: 3, text: 'Generating analysis...', duration: 700 },
];

const WFM_THINKING_STEPS = [
  { id: 1, text: 'Synchronizing WFM and routing data...', duration: 900 },
  { id: 2, text: 'Configuring agent schedule sync...', duration: 1000 },
  { id: 3, text: 'Synchronizing queue and agent status schedules...', duration: 1100 },
  { id: 4, text: 'Enabling break window enforcement...', duration: 800 },
  { id: 5, text: 'Enabling overflow handling...', duration: 700 },
];

const WFM_CHANGED_ITEMS = [
  { heading: 'Schedule-based queue assignment', body: 'Agents automatically moved between queues based on WFM schedule. No manual reassignment needed.' },
  { heading: 'Automatic status sync', body: 'Agent status updates when scheduled activity changes (Online, Away, Break, Focus).' },
  { heading: 'Break enforcement', body: 'Agents set to Away during breaks, returned to Online when breaks end.' },
  { heading: 'Overflow handling', body: 'Understaffed queues pull eligible agents from secondary groups automatically.' },
];

const SKILLS_THINKING_STEPS = [
  { id: 1, text: 'Analyzing historical ticket assignments...', duration: 1000 },
  { id: 2, text: 'Analyzing agent performance data...', duration: 900 },
  { id: 3, text: 'Classifying ticket intents and defining skill categories...', duration: 1200 },
  { id: 4, text: 'Generating product and language skills matrix...', duration: 800 },
];

const SKILLS_ACTIVATING_STEPS = [
  { id: 1, text: 'Activating AI skill matching...', duration: 900 },
  { id: 2, text: 'Applying skill matrix to routing engine...', duration: 800 },
];

const METRICS = [
  { id: 1, label: 'Agent handle time',  value: '18%',        subtitle: '10.3 min', showChevron: true  },
  { id: 2, label: 'Requester wait time', value: '24%',       subtitle: '2.4 min',  showChevron: true  },
  { id: 3, label: 'Total time saved',   value: '~42 hrs/wk', subtitle: null,       showChevron: false },
];

const SESSIONS = [
  {
    id: 's1',
    title: 'Predictive routing performance',
    preview: 'Agent handle time ↓18%, Requester wait time ↓24%, 42 hrs/wk saved',
    timestamp: 'Just now',
    isActive: true,
  },
  {
    id: 's2',
    title: 'Route tickets to assignee',
    preview: 'Set routing rules for Billing and Support groups',
    timestamp: '2 hours ago',
    isActive: false,
  },
  {
    id: 's3',
    title: 'Queue capacity planning',
    preview: 'Staffing recommendations for peak traffic hours',
    timestamp: 'Yesterday',
    isActive: false,
  },
  {
    id: 's4',
    title: 'Intent analysis for Billing',
    preview: 'Top intents: payment failure, refund, cancellation',
    timestamp: '3 days ago',
    isActive: false,
  },
];

// ─── Icon helpers ────────────────────────────────────────────

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 14L14 8L2 2V6.667L10 8L2 9.333V14Z" fill="currentColor"/>
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDownSmIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function StepSpinner() {
  return (
    <span className="copilot-step__spinner" aria-hidden="true">
      <span className="copilot-step__dot" />
      <span className="copilot-step__dot" />
      <span className="copilot-step__dot" />
    </span>
  );
}

function SessionIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 1.5C4.0 1.5 1.5 4.0 1.5 7C1.5 8.2 1.9 9.3 2.6 10.2L1.5 12.5L4.0 11.5C4.9 12.1 5.9 12.5 7 12.5C10.0 12.5 12.5 10.0 12.5 7C12.5 4.0 10.0 1.5 7 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Main component ──────────────────────────────────────────

export default function CopilotSidebar({
  isOpen,
  onClose,
  initialFlow,
  onWfmActivated,
  onSkillsActivated,
  skillsCategories: skillsCategoriesProp,
  skillsSummary: skillsSummaryProp,
  onSetProficiency: onSetProficiencyProp,
  onRemoveAgentFromSkill: onRemoveAgentFromSkillProp,
  onSyncSkillAgents: onSyncSkillAgentsProp,
  getSkillById: getSkillByIdProp,
}) {
  const internalMatrix = useSkillsMatrix();
  const categories = skillsCategoriesProp ?? internalMatrix.categories;
  const summary = skillsSummaryProp ?? internalMatrix.summary;
  const setProficiency = onSetProficiencyProp ?? internalMatrix.setProficiency;
  const removeAgentFromSkill = onRemoveAgentFromSkillProp ?? internalMatrix.removeAgentFromSkill;
  const syncSkillAgents = onSyncSkillAgentsProp ?? internalMatrix.syncSkillAgents;
  const getSkillById = getSkillByIdProp ?? internalMatrix.getSkillById;

  const [phase, setPhase] = useState('welcome');
  const [thinkingStep, setThinkingStep] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [sessions, setSessions] = useState(SESSIONS);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const timersRef = useRef([]);
  const hasAutoStartedWfm = useRef(false);
  const wfmSessionAdded = useRef(false);
  const hasAutoStartedSkills = useRef(false);
  const skillsSessionAdded = useRef(false);
  const hasAutoStartedApproval = useRef(false);
  const approvedSessionAdded = useRef(false);

  const selectedSkill = selectedSkillId ? getSkillById(selectedSkillId) : null;

  const skillsSummaryRows = [
    { label: 'Total skills', value: `${summary.totalSkills} skills` },
    { label: 'Categories', value: `${summary.totalCategories} categories` },
    { label: 'Total assignments', value: `${summary.totalAssignments} agent-skill pairs` },
    { label: 'Agents covered', value: `${summary.agentsCovered} of ${summary.totalAgents}` },
    { label: 'Avg confidence', value: `${summary.avgConfidence}%` },
    { label: 'Agents with 0 skills', value: `${summary.agentsWithZeroSkills} agents` },
  ];

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const handleFeaturedPromptClick = () => {
    if (phase !== 'welcome') return;
    setPhase('thinking');
    setThinkingStep(0);

    let elapsed = 0;
    THINKING_STEPS.forEach((step, i) => {
      const showDelay = i === 0 ? 60 : elapsed + 100;
      const resolveDelay = showDelay + step.duration;

      const showTimer = setTimeout(() => setThinkingStep(i), showDelay);
      const resolveTimer = setTimeout(() => setThinkingStep(i + 1), resolveDelay);

      timersRef.current.push(showTimer, resolveTimer);
      elapsed = resolveDelay;
    });

    const responseTimer = setTimeout(() => setPhase('response'), elapsed + 120);
    timersRef.current.push(responseTimer);
  };

  const handleSessionClick = (session) => {
    setShowHistory(false);
    if (!session.isActive) {
      clearAllTimers();
      setPhase('welcome');
      setThinkingStep(0);
    }
  };

  // Reset state when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      clearAllTimers();
      setPhase('welcome');
      setThinkingStep(0);
      setShowHistory(false);
      setSessions(SESSIONS);
      setSelectedSkillId(null);
      hasAutoStartedWfm.current = false;
      wfmSessionAdded.current = false;
      hasAutoStartedSkills.current = false;
      skillsSessionAdded.current = false;
      hasAutoStartedApproval.current = false;
      approvedSessionAdded.current = false;
    }
    return () => clearAllTimers();
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-start WFM activation flow when opened via recommendation
  useEffect(() => {
    if (!isOpen || initialFlow !== 'wfm-activation' || hasAutoStartedWfm.current) return;
    hasAutoStartedWfm.current = true;

    const startTimer = setTimeout(() => {
      setPhase('wfm-thinking');
      setThinkingStep(0);

      let elapsed = 0;
      WFM_THINKING_STEPS.forEach((step, i) => {
        const showDelay = i === 0 ? 60 : elapsed + 100;
        const resolveDelay = showDelay + step.duration;
        const showTimer = setTimeout(() => setThinkingStep(i), showDelay);
        const resolveTimer = setTimeout(() => setThinkingStep(i + 1), resolveDelay);
        timersRef.current.push(showTimer, resolveTimer);
        elapsed = resolveDelay;
      });

      const responseTimer = setTimeout(() => setPhase('wfm-response'), elapsed + 120);
      timersRef.current.push(responseTimer);
    }, 300);

    return () => {
      clearTimeout(startTimer);
      hasAutoStartedWfm.current = false;
    };
  }, [isOpen, initialFlow]); // eslint-disable-line react-hooks/exhaustive-deps

  // Notify parent and save to history when WFM activation completes
  useEffect(() => {
    if (phase === 'wfm-response') {
      if (onWfmActivated) {
        onWfmActivated();
      }
      if (!wfmSessionAdded.current) {
        wfmSessionAdded.current = true;
        setSessions(prev => [
          {
            id: 'wfm-activation',
            title: 'WFM integration activation',
            preview: 'Schedule sync, break enforcement, and overflow handling activated',
            timestamp: 'Just now',
            isActive: true,
          },
          ...prev.map(s => ({ ...s, isActive: false })),
        ]);
      }
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-start skills activation flow when opened via recommendation
  useEffect(() => {
    if (!isOpen || initialFlow !== 'skills-activation' || hasAutoStartedSkills.current) return;
    hasAutoStartedSkills.current = true;

    const startTimer = setTimeout(() => {
      setPhase('skills-thinking');
      setThinkingStep(0);

      let elapsed = 0;
      SKILLS_THINKING_STEPS.forEach((step, i) => {
        const showDelay = i === 0 ? 60 : elapsed + 100;
        const resolveDelay = showDelay + step.duration;
        const showTimer = setTimeout(() => setThinkingStep(i), showDelay);
        const resolveTimer = setTimeout(() => setThinkingStep(i + 1), resolveDelay);
        timersRef.current.push(showTimer, resolveTimer);
        elapsed = resolveDelay;
      });

      const responseTimer = setTimeout(() => setPhase('skills-response'), elapsed + 120);
      timersRef.current.push(responseTimer);
    }, 300);

    return () => {
      clearTimeout(startTimer);
      hasAutoStartedSkills.current = false;
    };
  }, [isOpen, initialFlow]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save to history when skills analysis completes (matrix ready for review)
  useEffect(() => {
    if (phase === 'skills-response') {
      if (!skillsSessionAdded.current) {
        skillsSessionAdded.current = true;
        setSessions(prev => [
          {
            id: 'skills-activation',
            title: 'Skill-based routing activation',
            preview: `${summary.totalSkills} skills in ${summary.totalCategories} categories, ${summary.totalAssignments} agent-skill pairs`,
            timestamp: 'Just now',
            isActive: true,
          },
          ...prev.map(s => ({ ...s, isActive: false })),
        ]);
      }
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Notify parent and save to history when user approves and activation completes
  useEffect(() => {
    if (phase === 'skills-activated') {
      if (onSkillsActivated) {
        onSkillsActivated();
      }
      if (!approvedSessionAdded.current) {
        approvedSessionAdded.current = true;
        setSessions(prev => prev.map(s =>
          s.id === 'skills-activation'
            ? { ...s, preview: `AI skill matching active — ${summary.totalSkills} skills, ${summary.totalAssignments} agent-skill pairs` }
            : s
        ));
      }
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleApprove = () => {
    if (hasAutoStartedApproval.current) return;
    hasAutoStartedApproval.current = true;

    setPhase('skills-activating');
    setThinkingStep(0);

    let elapsed = 0;
    SKILLS_ACTIVATING_STEPS.forEach((step, i) => {
      const showDelay = i === 0 ? 60 : elapsed + 100;
      const resolveDelay = showDelay + step.duration;
      const showTimer = setTimeout(() => setThinkingStep(i), showDelay);
      const resolveTimer = setTimeout(() => setThinkingStep(i + 1), resolveDelay);
      timersRef.current.push(showTimer, resolveTimer);
      elapsed = resolveDelay;
    });

    const doneTimer = setTimeout(() => setPhase('skills-activated'), elapsed + 120);
    timersRef.current.push(doneTimer);
  };

  const isWfmFlow = phase === 'wfm-thinking' || phase === 'wfm-response';
  const isSkillsFlow = ['skills-thinking', 'skills-response', 'skills-activating', 'skills-activated'].includes(phase);
  const inConversation = phase === 'thinking' || phase === 'response' || isWfmFlow || isSkillsFlow;
  const convTitle = isWfmFlow
    ? 'WFM integration activation'
    : isSkillsFlow
    ? 'Skill-based routing activation'
    : 'Predictive routing performance';

  return (
    <aside
      className="copilot-sidebar"
      data-open={isOpen ? 'true' : 'false'}
      aria-label="Admin Copilot"
      aria-hidden={!isOpen}
    >
      <div className="copilot-sidebar__shell">
        <div className="copilot-sidebar__blob" aria-hidden="true" />

        {/* ── Header ── */}
        <div className="copilot-sidebar__header" data-history={showHistory}>

          {/* Back button — only in history mode */}
          <div className="copilot-sidebar__header-back" aria-hidden={!showHistory}>
            {showHistory && (
              <button
                type="button"
                className="copilot-sidebar__back-btn"
                aria-label="Back"
                onClick={() => setShowHistory(false)}
              >
                <ChevronLeftIcon />
              </button>
            )}
          </div>

          {/* Title area */}
          <div className="copilot-sidebar__header-label">
            {showHistory && (
              <span
                key="history-title"
                className="copilot-sidebar__header-title copilot-sidebar__header-title--history"
              >
                Conversation history
              </span>
            )}
            {!showHistory && inConversation && (
              <div key="conv-title" className="copilot-sidebar__conv-title">
                <span className="copilot-sidebar__conv-title-text">{convTitle}</span>
                <span className="copilot-sidebar__conv-chevron"><ChevronDownIcon /></span>
              </div>
            )}
          </div>

          {/* Action icons */}
          <div className="copilot-sidebar__header-actions">
            {!showHistory && (
              <IconButton
                aria-label="View history"
                isBasic
                size="small"
                onClick={() => setShowHistory(true)}
              >
                <ClockIcon />
              </IconButton>
            )}
            <IconButton aria-label="Notes" isBasic size="small">
              <EditNoteIcon />
            </IconButton>
            <IconButton aria-label="Close Copilot" isBasic size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>

        {/* ── Body (page-stack container) ── */}
        <div className="copilot-sidebar__body">

          {/* Main content — slides left when history opens */}
          <div
            className="copilot-sidebar__content"
            data-phase={phase}
            data-pushed={showHistory}
            aria-hidden={showHistory}
          >

            {/* WELCOME */}
            {phase === 'welcome' && (
              <div className="copilot-sidebar__welcome">
                <div className="copilot-sidebar__welcome-title">
                  <div className="copilot-sidebar__sparkle-wrap">
                    <SparkleIcon className="copilot-sidebar__sparkle" />
                  </div>
                  <h2 className="copilot-sidebar__heading">How can I help?</h2>
                </div>
                <div className="copilot-sidebar__prompts">
                  {PROMPTS.map((prompt) => (
                    <button
                      key={prompt.id}
                      className={`copilot-sidebar__prompt copilot-sidebar__prompt--${prompt.variant}`}
                      type="button"
                      onClick={prompt.variant === 'featured' ? handleFeaturedPromptClick : undefined}
                    >
                      <SM>{prompt.text}</SM>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* THINKING + RESPONSE (predictive routing) */}
            {(phase === 'thinking' || phase === 'response') && (
              <div className="copilot-conv">
                <div className="copilot-conv__user-bubble-wrap">
                  <div className="copilot-conv__user-bubble">
                    <MD>Show me performance data of Predictive routing queues for last 7 days</MD>
                  </div>
                </div>

                {phase === 'thinking' && (
                  <div className="copilot-conv__thinking" aria-live="polite">
                    {THINKING_STEPS.map((step, i) => {
                      const isVisible = thinkingStep >= i;
                      const isComplete = thinkingStep > i;
                      if (!isVisible) return null;
                      return (
                        <div
                          key={step.id}
                          className={`copilot-step copilot-step--visible${isComplete ? ' copilot-step--done' : ''}`}
                        >
                          <span className="copilot-step__indicator">
                            {isComplete ? <CheckIcon /> : <StepSpinner />}
                          </span>
                          <SM className="copilot-step__text">{step.text}</SM>
                        </div>
                      );
                    })}
                  </div>
                )}

                {phase === 'response' && (
                  <div className="copilot-conv__response" aria-live="polite">
                    <div className="copilot-resp__text copilot-resp__text--1">
                      <MD>
                        You have 8 queue that uses Predictive routing{' '}
                        <strong>Billing</strong>{' '}
                        queue. Here&rsquo;s the metric gains that we noticed in the last 7 days.
                      </MD>
                    </div>

                    <div className="copilot-resp__metrics">
                      {METRICS.map((metric, i) => (
                        <div
                          key={metric.id}
                          className="copilot-metric-card"
                          style={{ '--card-index': i }}
                        >
                          <div className="copilot-metric-card__header">
                            <span className="copilot-metric-card__info-icon"><InfoIcon /></span>
                            <SM className="copilot-metric-card__label" isBold>{metric.label}</SM>
                          </div>
                          <div className="copilot-metric-card__value-row">
                            {metric.showChevron && (
                              <span className="copilot-metric-card__chevron"><ChevronDownSmIcon /></span>
                            )}
                            <span className="copilot-metric-card__value">{metric.value}</span>
                            {metric.subtitle && (
                              <span className="copilot-metric-card__subtitle">{metric.subtitle}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="copilot-resp__text copilot-resp__text--2">
                      <MD>
                        You can drill in into real-time dashboards to check deeper how Predictive routing is performing for your queue.
                      </MD>
                    </div>

                    <div className="copilot-resp__actions">
                      <button type="button" className="copilot-resp__pill">
                        <SM>Go to ticket dashboard</SM>
                      </button>
                      <button type="button" className="copilot-resp__pill">
                        <SM>Dismiss</SM>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* WFM THINKING + RESPONSE */}
            {isWfmFlow && (
              <div className="copilot-conv">
                <div className="copilot-conv__user-bubble-wrap">
                  <div className="copilot-conv__user-bubble">
                    <MD>Activate Workforce management integration</MD>
                  </div>
                </div>

                {phase === 'wfm-thinking' && (
                  <div className="copilot-conv__thinking" aria-live="polite">
                    {WFM_THINKING_STEPS.map((step, i) => {
                      const isVisible = thinkingStep >= i;
                      const isComplete = thinkingStep > i;
                      if (!isVisible) return null;
                      return (
                        <div
                          key={step.id}
                          className={`copilot-step copilot-step--visible${isComplete ? ' copilot-step--done' : ''}`}
                        >
                          <span className="copilot-step__indicator">
                            {isComplete ? <CheckIcon /> : <StepSpinner />}
                          </span>
                          <SM className="copilot-step__text">{step.text}</SM>
                        </div>
                      );
                    })}
                  </div>
                )}

                {phase === 'wfm-response' && (
                  <div className="copilot-conv__response" aria-live="polite">
                    <div className="copilot-resp__text copilot-resp__text--1">
                      <MD>
                        Workforce management integration has been activated. Routing will now
                        automatically sync with your WFM schedules to manage agent queue
                        assignments and status changes.
                      </MD>
                    </div>

                    <div className="copilot-resp__text copilot-resp__text--wfm-label">
                      <MD><strong>What changed:</strong></MD>
                    </div>

                    <div className="copilot-resp__wfm-list">
                      {WFM_CHANGED_ITEMS.map((item, i) => (
                        <div
                          key={i}
                          className="copilot-wfm-item"
                          style={{ '--wfm-item-index': i }}
                        >
                          <SM>
                            <strong>{item.heading}</strong>{' — '}{item.body}
                          </SM>
                        </div>
                      ))}
                    </div>

                    <div className="copilot-resp__actions">
                      <button type="button" className="copilot-resp__pill">
                        <SM>Show more insights</SM>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SKILLS THINKING + RESPONSE */}
            {isSkillsFlow && (
              <div className="copilot-conv">
                <div className="copilot-conv__user-bubble-wrap">
                  <div className="copilot-conv__user-bubble">
                    <MD>Activate skill-based routing</MD>
                  </div>
                </div>

                {phase === 'skills-thinking' && (
                  <div className="copilot-conv__thinking" aria-live="polite">
                    {SKILLS_THINKING_STEPS.map((step, i) => {
                      const isVisible = thinkingStep >= i;
                      const isComplete = thinkingStep > i;
                      if (!isVisible) return null;
                      return (
                        <div
                          key={step.id}
                          className={`copilot-step copilot-step--visible${isComplete ? ' copilot-step--done' : ''}`}
                        >
                          <span className="copilot-step__indicator">
                            {isComplete ? <CheckIcon /> : <StepSpinner />}
                          </span>
                          <SM className="copilot-step__text">{step.text}</SM>
                        </div>
                      );
                    })}
                  </div>
                )}

                {['skills-response', 'skills-activating', 'skills-activated'].includes(phase) && (
                  <div className="copilot-conv__response" aria-live="polite">
                    <div className="copilot-resp__skills-header copilot-resp__text--1">
                      <p className="copilot-resp__skills-title">Skills matrix · Generated · Ready for review</p>
                      <MD>
                        {summary.totalSkills} skills in {summary.totalCategories} categories identified from 34,120 tickets across 90 days. Adjust agent proficiency or remove assignments before you approve.
                      </MD>
                    </div>

                    {categories.map((category, catIndex) => (
                      <div key={category.id} className="copilot-skills-category" style={{ '--skills-cat-index': catIndex }}>
                        <SM isBold className="copilot-skills-category__title">{category.name}</SM>
                        <div className="copilot-resp__skills-list">
                          {category.skills.map((item, i) => (
                            <div key={item.id} className="copilot-skills-desc-item" style={{ '--skills-desc-index': i }}>
                              <SM>
                                <strong>{item.name} · {item.tickets} tickets (90 days)</strong>
                              </SM>
                              <ul className="copilot-skills-desc-item__list">
                                <li><SM>{item.intents} — intents</SM></li>
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="copilot-resp__text copilot-resp__text--skills-note">
                      <MD>
                        Review your skill matrix to ensure accuracy. Click an agent count to adjust proficiency or remove a skill from an agent. Incoming tickets will be automatically tagged with the matching skill using AI intent detection.
                      </MD>
                    </div>

                    <div
                      className="copilot-skill-card"
                      style={{ '--skill-card-index': 0 }}
                    >
                      <div className="copilot-skill-card__header">
                        <span className="copilot-skill-card__header-label">Skill matrix preview</span>
                        <span className="copilot-skill-card__header-icon" aria-hidden="true">
                          <ChevronDownSmIcon />
                        </span>
                      </div>
                      <div className="copilot-skill-card__content">
                        {categories.map((category) => (
                          <div key={category.id} className="copilot-skill-card__category">
                            <SM isBold className="copilot-skill-card__category-label">{category.name}</SM>
                            {category.skills.map((row, i) => (
                              <div key={row.id} className="copilot-skill-card__row" style={{ '--skill-row-index': i }}>
                                <SM><strong>{row.name}</strong>{' · '}</SM>
                                <button
                                  type="button"
                                  className="copilot-skill-card__agent-count-btn"
                                  onClick={() => setSelectedSkillId(row.id)}
                                >
                                  <SM className="copilot-skill-card__agent-count">
                                    {row.agents.length} agents assigned
                                  </SM>
                                </button>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className="copilot-skill-card"
                      style={{ '--skill-card-index': 1 }}
                    >
                      <div className="copilot-skill-card__header">
                        <span className="copilot-skill-card__header-label">Skill matrix summary</span>
                        <span className="copilot-skill-card__header-icon" aria-hidden="true">
                          <ChevronDownSmIcon />
                        </span>
                      </div>
                      <div className="copilot-skill-card__content">
                        {skillsSummaryRows.map((row, i) => (
                          <div key={i} className="copilot-skill-card__row" style={{ '--skill-row-index': i }}>
                            <SM><strong>{row.label}</strong>{' · '}</SM>
                            <SM className="copilot-skill-card__agent-count">{row.value}</SM>
                          </div>
                        ))}
                      </div>
                    </div>

                    {phase === 'skills-response' && (
                      <div className="copilot-resp__actions">
                        <button type="button" className="copilot-resp__pill" onClick={handleApprove}>
                          <SM>Approve</SM>
                        </button>
                        <button type="button" className="copilot-resp__pill">
                          <SM>Dismiss</SM>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Second turn: user approves → activating → activated */}
                {(phase === 'skills-activating' || phase === 'skills-activated') && (
                  <>
                    <div className="copilot-conv__user-bubble-wrap">
                      <div className="copilot-conv__user-bubble">
                        <MD>Activate AI skill matching and add the skill matrix section below it</MD>
                      </div>
                    </div>

                    {phase === 'skills-activating' && (
                      <div className="copilot-conv__thinking" aria-live="polite">
                        {SKILLS_ACTIVATING_STEPS.map((step, i) => {
                          const isVisible = thinkingStep >= i;
                          const isComplete = thinkingStep > i;
                          if (!isVisible) return null;
                          return (
                            <div
                              key={step.id}
                              className={`copilot-step copilot-step--visible${isComplete ? ' copilot-step--done' : ''}`}
                            >
                              <span className="copilot-step__indicator">
                                {isComplete ? <CheckIcon /> : <StepSpinner />}
                              </span>
                              <SM className="copilot-step__text">{step.text}</SM>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {phase === 'skills-activated' && (
                      <div className="copilot-conv__response" aria-live="polite">
                        <div className="copilot-resp__text copilot-resp__text--skills-approved-note">
                          <MD>
                            AI skill matching is now active. {summary.totalSkills} skills in {summary.totalCategories} categories defined, {summary.totalAssignments} agent-skill pairs established.
                          </MD>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* ── History panel — slides in from the right ── */}
          <div
            className="copilot-history"
            data-visible={showHistory}
            aria-hidden={!showHistory}
            role="region"
            aria-label="Conversation history"
          >
            <div className="copilot-history__list">
              {sessions.map((session, i) => (
                <button
                  key={session.id}
                  type="button"
                  className={`copilot-history__item${session.isActive ? ' copilot-history__item--active' : ''}`}
                  style={{ '--item-index': i }}
                  onClick={() => handleSessionClick(session)}
                >
                  <div className="copilot-history__item-icon">
                    <SessionIcon />
                    {session.isActive && <span className="copilot-history__active-dot" />}
                  </div>
                  <div className="copilot-history__item-body">
                    <div className="copilot-history__item-top">
                      <span className="copilot-history__item-title">{session.title}</span>
                      <span className="copilot-history__item-time">{session.timestamp}</span>
                    </div>
                    <span className="copilot-history__item-preview">{session.preview}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>{/* /body */}

        {selectedSkill && (
          <AgentSkillModal
            skill={selectedSkill}
            editable={phase === 'skills-response'}
            onClose={() => setSelectedSkillId(null)}
            onSetProficiency={(agentId, level) => setProficiency(selectedSkillId, agentId, level)}
            onRemoveAgent={(agentId) => removeAgentFromSkill(selectedSkillId, agentId)}
            onSyncAgents={(agentIds) => syncSkillAgents(selectedSkillId, agentIds)}
          />
        )}

        {/* Disclaimer — only in welcome state, not in history */}
        {phase === 'welcome' && !showHistory && (
          <div className="copilot-sidebar__disclaimer">
            <SM className="copilot-sidebar__disclaimer-text">Powered by AI</SM>
            <InfoIcon className="copilot-sidebar__disclaimer-icon" />
          </div>
        )}

        {/* Input */}
        <div className="copilot-sidebar__input-area">
          <div className="copilot-sidebar__input-outline">
            <span className="copilot-sidebar__input-placeholder">Ask admin copilot</span>
            <button type="button" className="copilot-sidebar__send-btn" aria-label="Send message">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
