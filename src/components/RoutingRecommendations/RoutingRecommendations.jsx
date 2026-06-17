import { useState } from 'react';
import { Anchor, Button, IconButton } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';
import { SparkleIcon, ChevronDownIcon } from '../Icons';
import DataWidget from '../DataWidget';
import './RoutingRecommendations.css';

// ─── Local icons ─────────────────────────────────────────────────────────────

function PromoCloseIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronLeftIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SendIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 8L2.5 2.5L5.5 8L2.5 13.5L13.5 8Z" fill="currentColor"/>
    </svg>
  );
}

// ─── Feature icons ───────────────────────────────────────────────────────────

function SparkleFeatureIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.5L8.73 5.51L12 4L9.83 7.27L14 8L9.83 8.73L12 12L8.73 10.49L8 14.5L7.27 10.49L4 12L6.17 8.73L2 8L6.17 7.27L4 4L7.27 5.51L8 1.5Z" fill="currentColor"/>
    </svg>
  );
}

function FlowFeatureIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.00016 1C7.17936 1 6.51221 1.63364 6.44597 2.43973C5.38913 2.87981 4.56163 3.75905 4.19933 4.85323C4.12406 5.08112 4.2497 5.32667 4.47759 5.40194C4.70547 5.47721 4.9511 5.35157 5.02638 5.12369C5.29427 4.32295 5.8898 3.67736 6.64046 3.31196C6.90629 3.78605 7.41553 4.10834 8.00016 4.10834C8.84388 4.10834 9.52516 3.42706 9.52516 2.58334C9.52516 1.73962 8.84388 1 8.00016 1Z" fill="currentColor"/>
      <path d="M11.0636 3.81772C10.9021 3.63406 10.6271 3.61437 10.4434 3.77584C10.2598 3.9373 10.2401 4.21231 10.4016 4.396C10.8767 4.93587 11.167 5.64189 11.167 6.41672C11.167 6.49193 11.1644 6.5667 11.1594 6.64089C10.6104 6.63196 10.0789 6.90706 9.7964 7.40454C9.36596 8.15516 9.61597 9.10527 10.3666 9.5357C11.1172 9.96613 12.0673 9.71611 12.4977 8.96549C12.8969 8.26885 12.6902 7.39737 12.0554 6.94671C12.0768 6.77234 12.0836 6.5949 12.0836 6.41672C12.0836 5.41321 11.7355 4.49346 11.0636 3.81772Z" fill="currentColor"/>
      <path d="M4.40053 7.40449C3.97009 6.65386 3.01997 6.40385 2.26935 6.83428C1.51872 7.26471 1.26871 8.21483 1.69914 8.96545C2.09982 9.66255 3.00368 9.93775 3.74473 9.56698C4.43535 10.0804 5.29136 10.3889 6.21682 10.3889C6.47657 10.3889 6.73173 10.3652 6.97952 10.3196C7.21669 10.2753 7.37219 10.0469 7.32783 9.80972C7.28348 9.57251 7.05506 9.41705 6.81789 9.46141C6.62713 9.49746 6.43017 9.51672 6.21682 9.51672C5.55284 9.51672 4.93431 9.31616 4.42138 8.96471C4.70153 8.50956 4.72636 7.91819 4.40053 7.40449Z" fill="currentColor"/>
    </svg>
  );
}

function RocketFeatureIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.5C7.33333 1.5 6.5 2.5 6 4C5.5 5.5 5.5 7 5.5 7L9 7C9 7 9 5.5 8.5 4C8 2.5 8.66667 1.5 8 1.5Z" fill="currentColor"/>
      <path d="M5.5 7C5.5 7 4 7.5 3 9C2 10.5 2 12 2 12H5.5V7Z" fill="currentColor"/>
      <path d="M9 7V12H12.5C12.5 12 12.5 10.5 11.5 9C10.5 7.5 9 7 9 7Z" fill="currentColor"/>
      <path d="M5.5 12H9V14.5H5.5V12Z" fill="currentColor"/>
    </svg>
  );
}

// ─── Routing-page recommendation data ────────────────────────────────────────
// These are the two recommendations shown on the Predictive routing
// configuration page. They are a subset of the full INITIAL_RECOMMENDATIONS
// data in QueuesPage.

export const ROUTING_PAGE_RECOMMENDATIONS = [
  {
    id: 'skills-based',
    title: 'Activate skills-based routing',
    subtitle: 'Assignment quality and CSAT could improve',
    featureColor: '#e7e9f8',
    featureTextColor: '#3b44a9',
    FeatureIcon: FlowFeatureIcon,
    tag: 'Automation',
    rationale: "We've identified patterns in your routing data that suggest skills-based routing would significantly improve your assignment quality and overall CSAT.",
    showQueues: false,
    supportingInsightsType: 'bullets',
    supportingInsightsContent: {
      items: [
        [{ bold: true, text: '34%' }, { text: ' of tickets are reassigned at least once before resolution' }],
        [{ text: 'Tickets assigned to non-specialist agents score ' }, { bold: true, text: '18 pts' }, { text: ' lower in ' }, { bold: true, text: 'CSAT' }],
        [{ bold: true, text: '22%' }, { text: ' of Tier 1 tickets escalate to the same 5 agents in Tier 2' }],
        [{ text: 'We detected 6 distinct ticket intent clusters with ' }, { bold: true, text: '>90%' }, { text: ' classification confidence' }],
      ],
      link: 'View related tickets',
    },
    nextStepsType: 'bullets',
    nextStepsContent: [
      'We will analyze historical assignments to understand who handled what',
      "We will analyze agent performance to find each agent's strengths",
      'We will classify ticket intents to define meaningful skills',
      'We will generate a skills matrix mapping agents to skills',
      'You review and adjust before anything goes live',
    ],
    nextStepsLink: 'Learn about skill-based routing',
    ctaLabel: 'Turn on',
  },
  {
    id: 'wfm-data',
    title: 'Integrate workforce management data',
    subtitle: 'Schedule adherence could improve by up to 39%',
    featureGradient: 'linear-gradient(87deg, #eef8f4 8.88%, #d9ecfc 100%)',
    featureTextColor: '#186146',
    FeatureIcon: RocketFeatureIcon,
    tag: 'Automation',
    rationale: "Significant gaps exist between agent scheduled activities and their actual routing status. Syncing your WFM schedule with omnichannel routing would reduce idle time, improve adherence, and ensure the right agents are available at the right times.",
    showQueues: false,
    supportingInsightsType: 'bullets',
    supportingInsightsContent: {
      items: [
        [{ bold: true, text: 'Schedule adherence rate: 61%' }, { text: ' — agents are active outside their scheduled windows 39% of the time.' }],
        [{ bold: true, text: '3.2 hrs/day average idle time' }, { text: ' per agent during scheduled online hours across your top 5 queues.' }],
        [{ bold: true, text: '14 understaffed intervals per week' }, { text: ' concentrated between 9–11 AM, when ticket volume peaks.' }],
        [{ bold: true, text: 'Avg 4.7 min delay' }, { text: " between a scheduled status change and the agent's actual status update in Agent Workspace." }],
      ],
      link: 'View adherence report',
    },
    nextStepsType: 'numbered',
    nextStepsContent: [
      { heading: 'Sync agent schedules to routing', body: 'Agents will be automatically assigned to the correct queue based on their WFM schedule. No manual moves needed.' },
      { heading: 'Auto-update agent status', body: 'Agent status in Agent Workspace will change automatically when their scheduled activity changes — Online, Away, Break, Focus.' },
      { heading: 'Enforce break windows', body: 'Agents will be set to Away during scheduled breaks and returned to Online when the break ends.' },
      { heading: 'Enable overflow handling', body: 'If a queue is understaffed relative to the schedule, eligible agents from secondary groups will be automatically pulled in.' },
    ],
    ctaLabel: 'Turn on',
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

export function RecommendationsBanner({ onViewRecommendations, count }) {
  if (count === 0) {
    return null;
  }

  const title = count === 1
    ? 'Review 1 new recommendation'
    : `Review ${count} new recommendations`;

  return (
    <section className="recco-banner" aria-label="Routing recommendations">
      <div className="recco-banner__panel">
        <img
          src={`${import.meta.env.BASE_URL}recco-banner-bg.svg`}
          alt=""
          aria-hidden
          className="recco-banner__bg"
        />

        <div className="recco-banner__main">
          <div className="recco-banner__icon" aria-hidden="true">
            <img
              src={`${import.meta.env.BASE_URL}recco-sparkle.svg`}
              alt=""
              width={20}
              height={20}
              className="recco-banner__icon-img"
              aria-hidden
            />
          </div>

          <div className="recco-banner__text">
            <span className="recco-banner__title">{title}</span>
            <span className="recco-banner__subtitle">Add improvements in a few clicks</span>
          </div>
        </div>

        <div className="recco-banner__action">
          <Button isPill onClick={onViewRecommendations}>
            View recommendations
          </Button>
        </div>
      </div>
    </section>
  );
}

export function RecommendationCard({ title, subtitle, featureColor, featureGradient, featureTextColor, FeatureIcon, tag, index, onClick }) {
  return (
    <div
      className="queue-recommendations-card"
      style={{ '--card-index': index }}
      role="article"
      onClick={onClick}
    >
      <div className="queue-recommendations-card__body">
        <div className="queue-recommendations-card__text">
          <span className="queue-recommendations-card__title">{title}</span>
          <span className="queue-recommendations-card__subtitle">{subtitle}</span>
        </div>
        <div className="queue-recommendations-card__tags">
          <span
            className="queue-recommendations-card__feature-tag"
            style={{
              background: featureGradient || featureColor,
              color: featureTextColor,
            }}
          >
            <FeatureIcon className="queue-recommendations-card__feature-icon" />
          </span>
          <Tag>{tag}</Tag>
        </div>
      </div>
      <IconButton
        className="queue-recommendations-card__chevron"
        aria-label={`View ${title}`}
        isBasic
        onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
}

export function RecommendationDetailView({ recommendation, onBack, onClose, onApply, inactiveQueues = [] }) {
  const [insightsOpen, setInsightsOpen] = useState(true);
  const [nextStepsOpen, setNextStepsOpen] = useState(false);

  const rationaleText = recommendation.rationale
    ?? `Based on a 30-day background evaluation, we compared predictive routing against current round-robin assignment for ${inactiveQueues.length} queues. Predictive routing would have produced significantly better outcomes.`;

  const ctaLabel = recommendation.ctaLabel ?? 'Apply recommendation';

  return (
    <div className="recco-detail" key={recommendation.id}>
      {/* Navigation bar */}
      <div className="recco-detail__nav">
        <button className="recco-detail__back-btn" onClick={onBack}>
          <ChevronLeftIcon className="recco-detail__back-icon" />
          <span>Back</span>
        </button>
        <IconButton
          isBasic
          aria-label="Close recommendation"
          onClick={onClose}
          className="recco-detail__nav-close"
        >
          <PromoCloseIcon />
        </IconButton>
      </div>

      {/* Scrollable content */}
      <div className="recco-detail__content">
        {/* Header */}
        <div className="recco-detail__header">
          <h2 className="recco-detail__title">{recommendation.title}</h2>
          <p className="recco-detail__subtitle">{recommendation.subtitle}</p>
          <div className="recco-detail__tags">
            <span
              className="recco-detail__feature-tag"
              style={{
                background: recommendation.featureGradient || recommendation.featureColor,
                color: recommendation.featureTextColor,
              }}
            >
              <recommendation.FeatureIcon className="recco-detail__feature-icon" />
            </span>
            <Tag>{recommendation.tag}</Tag>
          </div>
        </div>

        {/* Rationale */}
        <div className="recco-detail__section">
          <p className="recco-detail__section-heading">Rationale</p>
          <p className="recco-detail__section-body">{rationaleText}</p>
        </div>

        {/* Affected queues — only for recommendations that reference queues */}
        {recommendation.showQueues && inactiveQueues.length > 0 && (
          <div className="recco-detail__queues">
            <div className="recco-detail__queues-header">Queues</div>
            {inactiveQueues.map(queue => (
              <div key={queue.id} className="recco-detail__queue-row">
                <Anchor href="#" onClick={e => e.preventDefault()}>{queue.name}</Anchor>
              </div>
            ))}
          </div>
        )}

        {/* Accordions */}
        <div className="recco-detail__accordions">
          {/* Supporting insights */}
          <div className="recco-detail__accordion">
            <button
              className="recco-detail__accordion-header"
              onClick={() => setInsightsOpen(v => !v)}
              aria-expanded={insightsOpen}
            >
              <span className="recco-detail__accordion-label">Supporting insights</span>
              <ChevronDownIcon
                className={`recco-detail__accordion-chevron${insightsOpen ? ' recco-detail__accordion-chevron--open' : ''}`}
              />
            </button>
            <div className={`recco-detail__accordion-body${insightsOpen ? ' recco-detail__accordion-body--open' : ''}`}>
              <div className="recco-detail__accordion-inner recco-detail__accordion-inner--widgets">
                {recommendation.supportingInsightsType === 'bullets' ? (
                  <>
                    <ul className="recco-detail__accordion-list">
                      {recommendation.supportingInsightsContent?.items?.map((parts, i) => (
                        <li key={i} className="recco-detail__accordion-list-item">
                          {parts.map((part, j) =>
                            part.bold
                              ? <strong key={j}>{part.text}</strong>
                              : <span key={j}>{part.text}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                    {recommendation.supportingInsightsContent?.link && (
                      <Anchor
                        href="#"
                        onClick={e => e.preventDefault()}
                        className="recco-detail__insights-link"
                      >
                        {recommendation.supportingInsightsContent.link}
                      </Anchor>
                    )}
                  </>
                ) : (
                  (recommendation.supportingInsightsContent || []).map((widget, i) => (
                    <DataWidget key={i} {...widget} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div className="recco-detail__accordion">
            <button
              className="recco-detail__accordion-header"
              onClick={() => setNextStepsOpen(v => !v)}
              aria-expanded={nextStepsOpen}
            >
              <span className="recco-detail__accordion-label">Next steps</span>
              <ChevronDownIcon
                className={`recco-detail__accordion-chevron${nextStepsOpen ? ' recco-detail__accordion-chevron--open' : ''}`}
              />
            </button>
            <div className={`recco-detail__accordion-body${nextStepsOpen ? ' recco-detail__accordion-body--open' : ''}`}>
              <div className="recco-detail__accordion-inner">
                {recommendation.nextStepsType === 'numbered' ? (
                  <ol className="recco-detail__accordion-list recco-detail__accordion-list--numbered">
                    {recommendation.nextStepsContent?.map((step, i) => (
                      <li key={i} className="recco-detail__accordion-list-item">
                        <strong>{step.heading}</strong>{' — '}{step.body}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="recco-detail__accordion-list">
                    {recommendation.nextStepsContent?.map((step, i) => (
                      <li key={i} className="recco-detail__accordion-list-item">{step}</li>
                    ))}
                  </ul>
                )}
                {recommendation.nextStepsLink && (
                  <Anchor
                    href="#"
                    onClick={e => e.preventDefault()}
                    className="recco-detail__insights-link"
                  >
                    {recommendation.nextStepsLink}
                  </Anchor>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sample footnote */}
        <p className="recco-detail__sample">
          Based on a sample of 48,200 tickets from Mar 14, 2026 to Apr 15, 2026.
        </p>

        {/* Ask admin copilot */}
        <div className="recco-detail__copilot">
          <p className="recco-detail__copilot-heading">Ask admin copilot</p>
          <div className="recco-detail__copilot-chips">
            <button className="recco-detail__copilot-chip" type="button">
              <SparkleIcon className="recco-detail__copilot-chip-icon" />
              Share more insights
            </button>
          </div>
          <div className="recco-detail__copilot-input">
            <span className="recco-detail__copilot-placeholder">Ask admin copilot</span>
            <button className="recco-detail__copilot-send" type="button" aria-label="Send">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="recco-detail__footer">
        <Button isBasic onClick={onBack}>Decline</Button>
        <div className="recco-detail__split-btn">
          <Button isPrimary className="recco-detail__split-btn-main" onClick={onApply}>
            {ctaLabel}
          </Button>
          <IconButton
            isPrimary
            className="recco-detail__split-btn-dropdown"
            aria-label="More options"
          >
            <ChevronDownIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export function RecommendationsDrawer({ isOpen, onClose, selectedRecommendation, onSelectRecommendation, onApplyRecommendation, inactiveQueues = [], recommendations }) {
  return (
    <aside
      className="queue-recommendations-sidebar"
      data-open={isOpen ? 'true' : 'false'}
      aria-label="AI recommendations"
      aria-hidden={!isOpen}
    >
      <div className="queue-recommendations-sidebar__shell">
        {selectedRecommendation ? (
          <RecommendationDetailView
            recommendation={selectedRecommendation}
            onBack={() => onSelectRecommendation(null)}
            onClose={onClose}
            onApply={onApplyRecommendation}
            inactiveQueues={inactiveQueues}
          />
        ) : (
          <>
            <div className="queue-recommendations-sidebar__header">
              <span className="queue-recommendations-sidebar__heading">New recommendations</span>
              <IconButton
                className="queue-recommendations-sidebar__close"
                aria-label="Close recommendations"
                isBasic
                onClick={onClose}
              >
                <PromoCloseIcon />
              </IconButton>
            </div>

            <div className="queue-recommendations-sidebar__content">
              {recommendations.map((rec, i) => (
                <RecommendationCard
                  key={rec.id}
                  {...rec}
                  index={i}
                  onClick={() => onSelectRecommendation(rec)}
                />
              ))}

              <div className="queue-recommendations-sidebar__footer">
                <span className="queue-recommendations-sidebar__footer-title">Explore more recommendations</span>
                <p className="queue-recommendations-sidebar__footer-body">
                  Discover additional recommendations that can be applied across Zendesk to enhance your workflows.
                </p>
                <Anchor href="#" className="queue-recommendations-sidebar__footer-link">
                  Go to recommendations
                </Anchor>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
