import { useState, useRef, useEffect } from 'react';
import { Anchor, Button } from '@zendeskgarden/react-buttons';
import { Tag as GardenTag } from '@zendeskgarden/react-tags';
import { 
  ChevronDownIcon, 
  SearchIcon,
  PlusIcon,
  CheckIcon
} from '../Icons';
import TopBar from '../TopBar/TopBar';
import { assetUrl } from '../../utils/assetUrl';
import './QueueEditPage.css';

// External link icon
function ExternalLinkIcon({ className }) {
  return <span className={className} aria-hidden="true" />;
}

// Close/X icon for tags
function CloseIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Help icon
function HelpIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 2.5V4.5M10 15.5V17.5M17.5 10H15.5M4.5 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// Info icon for tooltips
function InfoIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="5" r="0.75" fill="currentColor"/>
    </svg>
  );
}

// Check circle icon for validation success
function CheckCircleIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Warning icon for validation error
function WarningIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1L15 14H1L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="11.5" r="0.75" fill="currentColor"/>
    </svg>
  );
}

// Sparkle icon for analyzing state
function SparkleAnalyzingIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" fill="url(#sparkle-gradient)" />
      <defs>
        <linearGradient id="sparkle-gradient" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8DD44A" />
          <stop offset="1" stopColor="#038153" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Large sparkle icon for analyzing header
function SparkleHeaderIcon({ className }) {
  return (
    <img 
      className={className} 
      src={assetUrl('/assets/Sparkle-063d706a-c098-4781-a5bc-a30e5b22cedf.png')} 
      alt="" 
      width="40" 
      height="40"
    />
  );
}

// Chevron up icon for collapsible section
function ChevronUpIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Info icon for metrics cards
function MetricsInfoIcon({ className }) {
  return (
    <img 
      className={className} 
      src={assetUrl('/assets/info-18f1df92-474a-4b7f-9d28-76109bee24c9.png')} 
      alt="" 
      width="16" 
      height="16"
    />
  );
}

// Chevron down icon for metrics improvement indicator
function MetricsChevronDownIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Rocket icon for enabled state
function RocketIcon({ className }) {
  return (
    <img 
      className={className} 
      src={assetUrl('/assets/Rocket-ad39e3fa-c92b-4207-a15a-c01e01d35d5c.png')} 
      alt="" 
      width="40" 
      height="40"
    />
  );
}

// Book open icon
function BookOpenIcon({ className }) {
  return (
    <img 
      className={className} 
      src={assetUrl('/assets/Book_open-706cd137-7b94-449e-afad-ba613a78f0d9.png')} 
      alt="Book open" 
      width="40" 
      height="40"
    />
  );
}

// Metrics card component for results view
function MetricsCard({ type, data }) {
  const isAhtOrRwt = type === 'aht' || type === 'rwt';
  const isTts = type === 'tts';
  const isConfidence = type === 'confidence';

  const getLabel = () => {
    switch (type) {
      case 'aht': return 'Agent handle time';
      case 'rwt': return 'Requester wait time';
      case 'tts': return 'Estimated time saved';
      case 'confidence': return 'Confidence score';
      default: return '';
    }
  };

  const getConfidenceColorClass = (level) => {
    switch (level) {
      case 'high': return 'predictive-routing__metric-value--success';
      case 'medium': return 'predictive-routing__metric-value--warning';
      case 'low':
      case 'insufficient': return 'predictive-routing__metric-value--danger';
      default: return 'predictive-routing__metric-value--success';
    }
  };

  const getConfidenceLabel = (level) => {
    switch (level) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      case 'insufficient': return 'Insufficient';
      default: return '';
    }
  };

  return (
    <div className="predictive-routing__metric-card">
      <div className="predictive-routing__metric-header">
        <MetricsInfoIcon className="predictive-routing__metric-info-icon" />
        <span className="predictive-routing__metric-label">{getLabel()}</span>
      </div>
      <div className="predictive-routing__metric-content">
        <div className="predictive-routing__metric-value-row">
          {isAhtOrRwt && (
            <>
              <MetricsChevronDownIcon className="predictive-routing__metric-chevron" />
              <span className="predictive-routing__metric-value predictive-routing__metric-value--success">
                {data.improvement}
              </span>
              <span className="predictive-routing__metric-detail">
                {data.predicted} predicted
              </span>
            </>
          )}
          {isTts && (
            <>
              <span className="predictive-routing__metric-value predictive-routing__metric-value--success">
                {data.timeSaved}
              </span>
              <span className="predictive-routing__metric-detail">
                {data.timeSavedNote}
              </span>
            </>
          )}
          {isConfidence && (
            <>
              <span className={`predictive-routing__metric-value ${getConfidenceColorClass(data.confidence.level)}`}>
                {data.confidence.score}
              </span>
              <span className="predictive-routing__metric-detail">
                {getConfidenceLabel(data.confidence.level)}
              </span>
            </>
          )}
        </div>
        {isAhtOrRwt && (
          <div className="predictive-routing__metric-baseline">
            vs. {data.baseline} (90-day avg)
          </div>
        )}
        {isConfidence && (
          <div className="predictive-routing__metric-baseline">
            {data.confidence.detail}
          </div>
        )}
      </div>
    </div>
  );
}

// Analyzing state content component (inline version)
function PredictiveRoutingAnalyzing({ queueId, queueName, progress, setProgress }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Simulation effect - progress through steps
  useEffect(() => {
    if (progress.currentStep >= progress.totalSteps) return;
    
    const stepDurations = [1500, 1500, 2500, 2000, 2000, 2000]; // ms per step
    const currentDuration = stepDurations[progress.currentStep] || 2000;
    
    const timer = setTimeout(() => {
      setProgress(prev => ({
        ...prev,
        completedSteps: prev.currentStep + 1,
        currentStep: prev.currentStep + 1
      }));
    }, currentDuration);
    
    return () => clearTimeout(timer);
  }, [progress.currentStep, progress.totalSteps, setProgress]);

  const getStepStatus = (stepIndex) => {
    if (stepIndex < progress.completedSteps) return 'completed';
    if (stepIndex === progress.currentStep) return 'active';
    return 'pending';
  };

  const renderStepText = (step, status) => {
    const textClass = status === 'pending' ? 'predictive-routing__step-text--pending' : '';
    
    if (step.boldText) {
      return (
        <span className={`predictive-routing__step-text ${textClass}`}>
          {step.textBefore}
          <strong>{step.boldText}</strong>
          {step.textAfter}
          {step.boldText2 && <strong>{step.boldText2}</strong>}
        </span>
      );
    }
    return <span className={`predictive-routing__step-text ${textClass}`}>{step.text}</span>;
  };

  return (
    <div className="predictive-routing__analyzing">
      {/* Header */}
      <div className="predictive-routing__analyzing-header">
        <SparkleHeaderIcon className="predictive-routing__sparkle-icon" />
        <div className="predictive-routing__analyzing-header-content">
          <h3 className="predictive-routing__analyzing-title">Evaluating {queueName} queue...</h3>
          <p className="predictive-routing__analyzing-subtitle">
            Queue evaluation could take up to 60 minutes. You&apos;ll receive an email when results are ready.
          </p>
        </div>
      </div>

      {/* Analysis card */}
      <div className="predictive-routing__analyzing-card">
        <div className="predictive-routing__analyzing-card-header">
          <SparkleAnalyzingIcon className="predictive-routing__analyzing-card-icon" />
          <span className="predictive-routing__analyzing-card-title">Analyzing your account data...</span>
        </div>
        
        {/* Collapsible section */}
        <div className="predictive-routing__progress-section">
          <button 
            type="button"
            className="predictive-routing__toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronUpIcon className={`predictive-routing__toggle-icon ${!isExpanded ? 'predictive-routing__toggle-icon--collapsed' : ''}`} />
            <span className="predictive-routing__toggle-text">
              {progress.completedSteps} of {progress.totalSteps} to-dos completed
            </span>
          </button>
          
          {isExpanded && (
            <div className="predictive-routing__steps">
              {getEvaluationSteps(queueId).map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div key={step.id} className={`predictive-routing__step predictive-routing__step--${status}`}>
                    <span className="predictive-routing__step-indicator">
                      {status === 'completed' && '✓'}
                      {status === 'active' && '◉'}
                      {status === 'pending' && '◯'}
                    </span>
                    {renderStepText(step, status)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Results view component (inline version)
function PredictiveRoutingResults({ queueName, results, onEnablePredictive, onDismiss }) {
  return (
    <div className="predictive-routing__results">
      {/* Header */}
      <div className="predictive-routing__results-header">
        <h3 className="predictive-routing__results-title">Evaluation results</h3>
        <p className="predictive-routing__results-subtitle">
          Based on your <strong>{queueName}</strong> queue data, Predictive routing could significantly improve efficiency.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="predictive-routing__metrics">
        <MetricsCard type="aht" data={results.aht} />
        <MetricsCard type="rwt" data={results.rwt} />
        <MetricsCard 
          type="tts" 
          data={{ timeSaved: results.timeSaved, timeSavedNote: results.timeSavedNote }} 
        />
        <MetricsCard type="confidence" data={results} />
      </div>

      {/* Disclaimer */}
      <p className="predictive-routing__disclaimer">
        Evaluation results are based on simulated data. Actual performance may vary once Predictive routing is live.
      </p>

      {/* Action Buttons */}
      <div className="predictive-routing__results-actions">
        <Button 
          isPrimary
          onClick={onEnablePredictive}
        >
          Turn on Predictive routing
        </Button>
        <Button 
          isBasic
          onClick={onDismiss}
        >
          Dismiss results
        </Button>
      </div>
    </div>
  );
}

// Simplified Predictive Routing Section Component - matches new Figma design
function PredictiveRoutingSection({ isPredictiveEnabled, onTogglePredictive, hideToggle, queueName }) {
  return (
    <section className="queue-edit-section">
      <div className="queue-edit-section__header">
        <h2 className="queue-edit-section__title">Predictive routing</h2>
        <p className="queue-edit-section__description">
          Route your messaging tickets faster with AI-powered ticket distribution.{' '}
          <Anchor href="#" className="queue-edit-section__link-inline">
            Learn about Predictive routing
          </Anchor>
        </p>
      </div>

      {/* Predictive routing card */}
      <div className={`predictive-routing-card ${isPredictiveEnabled ? 'predictive-routing-card--expanded' : ''}`}>
        <div className="predictive-routing-card__main">
          <div className="predictive-routing-card__content">
            <div className="predictive-routing-card__header">
              <h3 className="predictive-routing-card__title">
                Predictive routing
                <GardenTag size="medium" hue={isPredictiveEnabled ? 'green' : 'grey'}>
                  {isPredictiveEnabled ? 'On' : 'Off'}
                </GardenTag>
              </h3>
            </div>
            <p className="predictive-routing-card__description">
              {isPredictiveEnabled
                ? `Your ${queueName || 'queue'} is using Predictive routing to route messaging tickets.`
                : 'Turn on Predictive routing to route messaging tickets to agents using AI, or run an A/B test to see how it performs.'
              }
            </p>
            {!isPredictiveEnabled && (
              <Anchor href="#" className="predictive-routing-card__link">
                Learn about Predictive routing A/B tests
              </Anchor>
            )}
          </div>
          {!hideToggle && (
            <div className="predictive-routing-card__toggle">
              <button
                type="button"
                className={`toggle-switch ${isPredictiveEnabled ? 'toggle-switch--on' : ''}`}
                onClick={onTogglePredictive}
                aria-label={isPredictiveEnabled ? "Turn off Predictive routing" : "Turn on Predictive routing"}
              >
                <span className="toggle-switch__slider"></span>
              </button>
            </div>
          )}
        </div>

        {/* Expanded content when enabled */}
        {isPredictiveEnabled && (
          <div className="predictive-routing-card__expanded-content">
            <div className="predictive-routing-card__section">
              <h4 className="predictive-routing-card__section-title">Data dashboards</h4>
              <p className="predictive-routing-card__section-description">
                View dashboards to see how Predictive routing is performing.
              </p>
              <Button className="predictive-routing-card__dashboard-btn">
                Go to ticket dashboard
                <ExternalLinkIcon className="predictive-routing-card__btn-icon" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Tag component for multiselect
function Tag({ children, onRemove }) {
  return (
    <span className="queue-edit__tag">
      <span className="queue-edit__tag-text">{children}</span>
      <button 
        type="button" 
        className="queue-edit__tag-remove" 
        onClick={onRemove}
        aria-label={`Remove ${children}`}
      >
        <CloseIcon className="queue-edit__tag-remove-icon" />
      </button>
    </span>
  );
}

// Multiselect input component
// Available groups for selection
const AVAILABLE_GROUPS = [
  'Payroll',
  'Billing Team',
  'Finance Ops',
  'Payroll Specialists',
  'Sales',
  'Support',
  'Finance',
  'Success',
  'HR',
  'Sales Ops',
  'Engineering',
  'Product',
  'Marketing',
  'Customer Success',
  'Operations'
];

function MultiselectInput({ value = [], onChange, placeholder = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleToggleGroup = (group) => {
    if (value.includes(group)) {
      onChange(value.filter(v => v !== group));
    } else {
      onChange([...value, group]);
    }
  };

  const filteredGroups = AVAILABLE_GROUPS.filter(group =>
    group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="queue-edit__multiselect" ref={dropdownRef}>
      <div
        className={`queue-edit__multiselect-container ${isOpen ? 'queue-edit__multiselect-container--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="queue-edit__multiselect-tags">
          {value.length === 0 && (
            <span className="queue-edit__multiselect-placeholder">{placeholder || 'Select groups...'}</span>
          )}
          {value.map((item, index) => (
            <Tag
              key={index}
              onRemove={(e) => {
                e.stopPropagation();
                onChange(value.filter((_, i) => i !== index));
              }}
            >
              {item}
            </Tag>
          ))}
        </div>
        <ChevronDownIcon className={`queue-edit__multiselect-chevron ${isOpen ? 'queue-edit__multiselect-chevron--open' : ''}`} />
      </div>

      {isOpen && (
        <div className="queue-edit__multiselect-dropdown">
          <div className="queue-edit__multiselect-search">
            <SearchIcon className="queue-edit__multiselect-search-icon" />
            <input
              type="text"
              className="queue-edit__multiselect-search-input"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="queue-edit__multiselect-options">
            {filteredGroups.length === 0 && (
              <div className="queue-edit__multiselect-empty">No groups found</div>
            )}
            {filteredGroups.map((group) => (
              <button
                key={group}
                type="button"
                className={`queue-edit__multiselect-option ${value.includes(group) ? 'queue-edit__multiselect-option--selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleGroup(group);
                }}
              >
                <span className="queue-edit__multiselect-option-text">{group}</span>
                {value.includes(group) && (
                  <CheckIcon className="queue-edit__multiselect-option-check" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Condition row component
function ConditionRow({ condition, onRemove }) {
  return (
    <div className="queue-edit__condition-row">
      <div className="queue-edit__condition-field">
        <span className="queue-edit__condition-field-text">{condition.field || 'Ticket > Tags'}</span>
      </div>
      <div className="queue-edit__condition-field">
        <span className="queue-edit__condition-field-text">{condition.operator || 'Contains at least one of the following'}</span>
      </div>
      <div className="queue-edit__condition-field">
        <span className="queue-edit__condition-field-text queue-edit__condition-field-text--placeholder">{condition.value || ''}</span>
      </div>
      <button type="button" className="queue-edit__condition-remove" onClick={onRemove} aria-label="Remove condition">
        <CloseIcon className="queue-edit__condition-remove-icon" />
      </button>
    </div>
  );
}

// Subqueue row component
function SubqueueRow({ 
  subqueue, 
  onUpdate, 
  onRemove, 
  canRemove,
  isNew = false
}) {
  const rowRef = useRef(null);
  
  useEffect(() => {
    // Add entrance animation class for new rows
    if (isNew && rowRef.current) {
      rowRef.current.style.animation = 'subqueue-row-enter 0.3s ease-out';
    }
  }, [isNew]);

  return (
    <div className="subqueue-row" ref={rowRef}>
      {/* Name */}
      <div className="subqueue-row__field subqueue-row__field--name">
        <input
          type="text"
          className="subqueue-row__input"
          value={subqueue.name}
          onChange={(e) => onUpdate(subqueue.id, 'name', e.target.value)}
          placeholder="Subqueue name"
        />
      </div>

      {/* Percentage */}
      <div className="subqueue-row__field subqueue-row__field--percentage">
        <div className="subqueue-row__input-group">
          <input
            type="number"
            className="subqueue-row__input subqueue-row__input--number"
            value={subqueue.percentage}
            onChange={(e) => onUpdate(subqueue.id, 'percentage', parseInt(e.target.value) || 0)}
            min="0"
            max="100"
          />
          <span className="subqueue-row__input-suffix">%</span>
        </div>
      </div>

      {/* Priority */}
      <div className="subqueue-row__field subqueue-row__field--priority">
        <input
          type="number"
          className="subqueue-row__input subqueue-row__input--number"
          value={subqueue.priority}
          onChange={(e) => onUpdate(subqueue.id, 'priority', parseInt(e.target.value) || 1)}
          min="1"
          max="100"
        />
      </div>

      {/* Primary Groups */}
      <div className="subqueue-row__field subqueue-row__field--groups">
        <div className="subqueue-row__multiselect">
          <div className="subqueue-row__multiselect-tags">
            {subqueue.primaryGroups.slice(0, 1).map((group, idx) => (
              <span key={idx} className="subqueue-row__tag">
                {group}
                <button
                  type="button"
                  className="subqueue-row__tag-remove"
                  onClick={() => onUpdate(
                    subqueue.id, 
                    'primaryGroups', 
                    subqueue.primaryGroups.filter((_, i) => i !== idx)
                  )}
                >
                  <CloseIcon className="subqueue-row__tag-remove-icon" />
                </button>
              </span>
            ))}
            {subqueue.primaryGroups.length > 1 && (
              <span className="subqueue-row__more-link">+{subqueue.primaryGroups.length - 1} more</span>
            )}
          </div>
          <ChevronDownIcon className="subqueue-row__multiselect-chevron" />
        </div>
      </div>

      {/* Secondary Groups */}
      <div className="subqueue-row__field subqueue-row__field--groups">
        <div className="subqueue-row__multiselect">
          <div className="subqueue-row__multiselect-tags">
            {subqueue.secondaryGroups.slice(0, 1).map((group, idx) => (
              <span key={idx} className="subqueue-row__tag">
                {group}
                <button
                  type="button"
                  className="subqueue-row__tag-remove"
                  onClick={() => onUpdate(
                    subqueue.id,
                    'secondaryGroups',
                    subqueue.secondaryGroups.filter((_, i) => i !== idx)
                  )}
                >
                  <CloseIcon className="subqueue-row__tag-remove-icon" />
                </button>
              </span>
            ))}
            {subqueue.secondaryGroups.length > 1 && (
              <span className="subqueue-row__more-link">+{subqueue.secondaryGroups.length - 1} more</span>
            )}
          </div>
          <ChevronDownIcon className="subqueue-row__multiselect-chevron" />
        </div>
      </div>

      {/* Predictive Routing Toggle */}
      <div className="subqueue-row__field subqueue-row__field--predictive">
        <button
          type="button"
          className={`toggle-switch toggle-switch--small ${subqueue.assignmentMethod === 'Predictive routing' ? 'toggle-switch--on' : ''}`}
          onClick={() => onUpdate(
            subqueue.id,
            'assignmentMethod',
            subqueue.assignmentMethod === 'Predictive routing'
              ? 'Initial routing configuration'
              : 'Predictive routing'
          )}
          aria-label={subqueue.assignmentMethod === 'Predictive routing' ? "Turn off Predictive routing for this subqueue" : "Turn on Predictive routing for this subqueue"}
        >
          <span className="toggle-switch__slider"></span>
        </button>
        <span className="subqueue-row__toggle-label">
          {subqueue.assignmentMethod === 'Predictive routing' ? 'On' : 'Off'}
        </span>
      </div>

      {/* Remove button */}
      <div className="subqueue-row__field subqueue-row__field--actions">
        {canRemove && (
          <button
            type="button"
            className="subqueue-row__remove"
            onClick={() => onRemove(subqueue.id)}
            aria-label="Remove subqueue"
          >
            <CloseIcon className="subqueue-row__remove-icon" />
          </button>
        )}
      </div>
    </div>
  );
}

// Subqueue table component
function SubqueueTable({ 
  subqueues, 
  onAddSubqueue, 
  onRemoveSubqueue, 
  onUpdateSubqueue,
  totalPercentage,
  isPercentageValid,
  newSubqueueId
}) {
  const maxSubqueues = 5;
  const canAddMore = subqueues.length < maxSubqueues;
  const [prevValidState, setPrevValidState] = useState(isPercentageValid);
  const validationKey = useRef(0);
  
  // Track validation state changes for animation
  useEffect(() => {
    if (prevValidState !== isPercentageValid) {
      validationKey.current += 1;
      setPrevValidState(isPercentageValid);
    }
  }, [isPercentageValid, prevValidState]);
  
  return (
    <div className="subqueue-table">
      {/* Header row */}
      <div className="subqueue-header">
        <div className="subqueue-header__field subqueue-header__field--name">
          <span className="subqueue-header__label">Name</span>
        </div>
        <div className="subqueue-header__field subqueue-header__field--percentage">
          <span className="subqueue-header__label">Percentage</span>
          <InfoIcon className="subqueue-header__info-icon" />
        </div>
        <div className="subqueue-header__field subqueue-header__field--priority">
          <span className="subqueue-header__label">Priority</span>
          <InfoIcon className="subqueue-header__info-icon" />
        </div>
        <div className="subqueue-header__field subqueue-header__field--groups">
          <span className="subqueue-header__label">Primary groups</span>
          <InfoIcon className="subqueue-header__info-icon" />
        </div>
        <div className="subqueue-header__field subqueue-header__field--groups">
          <span className="subqueue-header__label">Secondary groups</span>
        </div>
        <div className="subqueue-header__field subqueue-header__field--predictive">
          <span className="subqueue-header__label">Predictive routing</span>
        </div>
        <div className="subqueue-header__field subqueue-header__field--actions" />
      </div>

      {/* Subqueue rows */}
      <div className="subqueue-rows">
        {subqueues.map((subqueue) => (
          <SubqueueRow
            key={subqueue.id}
            subqueue={subqueue}
            onUpdate={onUpdateSubqueue}
            onRemove={onRemoveSubqueue}
            canRemove={subqueues.length > 1}
            isNew={subqueue.id === newSubqueueId}
          />
        ))}
      </div>

      {/* Validation message */}
      <div 
        key={validationKey.current}
        className={`subqueue-validation ${isPercentageValid ? 'subqueue-validation--success' : 'subqueue-validation--warning'}`}
      >
        {isPercentageValid ? (
          <>
            <CheckCircleIcon className="subqueue-validation__icon" />
            <span className="subqueue-validation__text">The total percentages add up to 100%.</span>
          </>
        ) : (
          <>
            <WarningIcon className="subqueue-validation__icon" />
            <span className="subqueue-validation__text">
              The total percentages add up to {totalPercentage}%, not 100%.
            </span>
          </>
        )}
      </div>

      {/* Add subqueue button */}
      <Button
        className="subqueue-add-btn"
        onClick={onAddSubqueue}
        disabled={!canAddMore}
      >
        Add subqueue
      </Button>
      {!canAddMore && (
        <span className="subqueue-limit-text">Maximum of {maxSubqueues} subqueues reached.</span>
      )}
    </div>
  );
}


export default function QueueEditPage({ 
  queue, 
  isCreating = false,
  onBack, 
  onSave,
  navColumn,
  selectedProduct,
  products = [],
  onProductChange,
  isNavCollapsed = false,
}) {
  // Form state
  const [name, setName] = useState(queue?.name || '');
  const [description, setDescription] = useState(queue?.description || '');
  const [priority, setPriority] = useState(queue?.priority?.main || '1');
  const [conditionsAll, setConditionsAll] = useState(queue?.conditions?.all || [
    { field: 'Ticket > Tags', operator: 'Contains at least one of the following', value: '' }
  ]);
  const [conditionsAny, setConditionsAny] = useState(queue?.conditions?.any || []);
  const [distributeSubqueues, setDistributeSubqueues] = useState(queue?.distributeSubqueues || false);
  const [primaryGroups, setPrimaryGroups] = useState(
    queue?.primaryGroups?.items || ['Billing team', 'Finance']
  );
  const [enableSecondaryGroups, setEnableSecondaryGroups] = useState(
    queue?.secondaryGroups?.items?.length > 0
  );
  const [secondaryGroups, setSecondaryGroups] = useState(
    queue?.secondaryGroups?.items || ['Support T1']
  );
  const [assignmentMethod, setAssignmentMethod] = useState(
    queue?.assignmentMethod || 'Initial routing configuration'
  );

  // Subqueue state - initialized with one subqueue at 100%
  const [subqueues, setSubqueues] = useState(queue?.subqueues || [
    {
      id: 1,
      name: '',
      percentage: 100,
      priority: 1,
      primaryGroups: ['Billing'],
      secondaryGroups: ['HR'],
      assignmentMethod: 'Initial routing configuration'
    }
  ]);

  // Check if predictive routing is enabled
  // When subqueues are enabled, check if ANY subqueue has predictive routing on
  // Otherwise, use the global assignment method
  const isPredictiveEnabled = distributeSubqueues
    ? subqueues.some(sq => sq.assignmentMethod === 'Predictive routing')
    : assignmentMethod === 'Predictive routing';

  // Handle toggling predictive routing on/off
  const handleTogglePredictive = () => {
    if (isPredictiveEnabled) {
      setAssignmentMethod('Initial routing configuration');
    } else {
      setAssignmentMethod('Predictive routing');
    }
  };
  
  // Track newly added subqueue for animation
  const [newSubqueueId, setNewSubqueueId] = useState(null);

  // Generate unique ID for new subqueues
  const generateSubqueueId = () => {
    return Math.max(0, ...subqueues.map(sq => sq.id)) + 1;
  };

  // Add a new subqueue (max 5)
  const addSubqueue = () => {
    if (subqueues.length >= 5) return;
    const newId = generateSubqueueId();
    setNewSubqueueId(newId);
    setSubqueues([
      ...subqueues,
      {
        id: newId,
        name: '',
        percentage: 0,
        priority: 1,
        primaryGroups: [],
        secondaryGroups: [],
        assignmentMethod: 'Initial routing configuration'
      }
    ]);
    // Clear the newSubqueueId after animation completes
    setTimeout(() => setNewSubqueueId(null), 350);
  };

  // Remove a subqueue by ID
  const removeSubqueue = (id) => {
    if (subqueues.length <= 1) return;
    setSubqueues(subqueues.filter(sq => sq.id !== id));
  };

  // Update a subqueue field
  const updateSubqueue = (id, field, value) => {
    setSubqueues(subqueues.map(sq => 
      sq.id === id ? { ...sq, [field]: value } : sq
    ));
  };

  // Calculate total percentage
  const totalPercentage = subqueues.reduce((sum, sq) => sum + (parseInt(sq.percentage) || 0), 0);
  const isPercentageValid = totalPercentage === 100;

  const handleSave = () => {
    const updatedQueue = {
      ...queue,
      name,
      description,
      priority: { ...queue?.priority, main: priority },
      conditions: { all: conditionsAll, any: conditionsAny },
      distributeSubqueues,
      subqueues: distributeSubqueues ? subqueues : [],
      primaryGroups: { ...queue?.primaryGroups, items: primaryGroups },
      secondaryGroups: { ...queue?.secondaryGroups, items: enableSecondaryGroups ? secondaryGroups : [] },
      assignmentMethod
    };
    onSave(updatedQueue);
  };

  const addConditionAll = () => {
    setConditionsAll([...conditionsAll, { field: '', operator: '', value: '' }]);
  };

  const addConditionAny = () => {
    setConditionsAny([...conditionsAny, { field: '', operator: '', value: '' }]);
  };

  const removeConditionAll = (index) => {
    setConditionsAll(conditionsAll.filter((_, i) => i !== index));
  };

  const removeConditionAny = (index) => {
    setConditionsAny(conditionsAny.filter((_, i) => i !== index));
  };

  return (
    <div className="queue-edit-page">
      <TopBar
        pageTitle="Predictive routing"
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
      />
      <div className="queue-edit-page__body">
        {/* Navigation Column - passed from parent */}
        {navColumn}
        
        {/* Content Column */}
        <div className="queue-edit-page__content-column">
        
          <main className="queue-edit-page__main">
            <div className="queue-edit-page__content">
              {/* Breadcrumbs */}
              <div className="queue-edit-breadcrumbs">
                <button type="button" className="queue-edit-breadcrumbs__link" onClick={onBack}>Objects and rules</button>
                <ChevronDownIcon className="queue-edit-breadcrumbs__separator" />
                <button type="button" className="queue-edit-breadcrumbs__link" onClick={onBack}>Omnichannel routing</button>
                <ChevronDownIcon className="queue-edit-breadcrumbs__separator" />
                <button type="button" className="queue-edit-breadcrumbs__link" onClick={onBack}>Queues</button>
                <ChevronDownIcon className="queue-edit-breadcrumbs__separator" />
                <span className="queue-edit-breadcrumbs__current">{isCreating ? 'New queue' : (queue?.name || 'Queue')}</span>
              </div>

              {/* Page Header */}
              <div className="queue-edit-page-header">
                <h1 className="queue-edit-page-header__title">{isCreating ? 'Create queue' : (queue?.name || 'Queue')}</h1>
                <p className="queue-edit-page-header__description">
                  {isCreating 
                    ? 'Create a new queue and configure how work is routed across different groups.'
                    : 'Edit this queue and configure how work is routed across different groups.'}
                </p>
              </div>

              {/* Basic Info Section */}
              <section className="queue-edit-section">
                <div className="queue-edit-form">
                  <div className="queue-edit-form__field">
                    <label className="queue-edit-form__label">Name*</label>
                    <input 
                      type="text" 
                      className="queue-edit-form__input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="queue-edit-form__field">
                    <label className="queue-edit-form__label">Description</label>
                    <input 
                      type="text" 
                      className="queue-edit-form__input"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="For all billing queries"
                    />
                  </div>
                </div>
              </section>

              {/* Priority Section - hidden when subqueues are enabled */}
              {!distributeSubqueues && (
                <section className="queue-edit-section">
                  <div className="queue-edit-section__header">
                    <h2 className="queue-edit-section__title">Priority</h2>
                    <p className="queue-edit-section__description">
                      If a group receives work from more than one queue, work from the queue with the higher priority gets assigned first.
                    </p>
                  </div>

                  <div className="queue-edit-form">
                    <div className="queue-edit-form__field queue-edit-form__field--narrow">
                      <label className="queue-edit-form__label">Queue priority*</label>
                      <span className="queue-edit-form__hint">Enter a value between 1–100, where 1 is the highest priority.</span>
                      <input 
                        type="text" 
                        className="queue-edit-form__input"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      />
                    </div>
                  </div>
                </section>
              )}


              {/* Conditions Section */}
              <section className="queue-edit-section">
                <div className="queue-edit-section__header">
                  <h2 className="queue-edit-section__title">Conditions</h2>
                  <p className="queue-edit-section__description">
                    Define which work will be added to this queue.
                  </p>
                </div>

                {/* Meet ALL conditions */}
                <div className="queue-edit-conditions">
                  <label className="queue-edit-form__label">Meet ALL of the following conditions</label>
                  
                  <div className="queue-edit-conditions__list">
                    {conditionsAll.map((condition, index) => (
                      <ConditionRow 
                        key={index} 
                        condition={condition} 
                        onRemove={() => removeConditionAll(index)}
                      />
                    ))}
                  </div>

                  <Button className="queue-edit-conditions__add" onClick={addConditionAll}>
                    Add condition
                  </Button>
                </div>

                {/* Meet ANY conditions */}
                <div className="queue-edit-conditions">
                  <label className="queue-edit-form__label">Meet ANY of the following conditions</label>
                  
                  {conditionsAny.length > 0 && (
                    <div className="queue-edit-conditions__list">
                      {conditionsAny.map((condition, index) => (
                        <ConditionRow 
                          key={index} 
                          condition={condition} 
                          onRemove={() => removeConditionAny(index)}
                        />
                      ))}
                    </div>
                  )}

                  <Button className="queue-edit-conditions__add" onClick={addConditionAny}>
                    Add condition
                  </Button>
                </div>
              </section>

              {/* Predictive Routing Section */}
              <PredictiveRoutingSection
                isPredictiveEnabled={isPredictiveEnabled}
                onTogglePredictive={handleTogglePredictive}
                hideToggle={distributeSubqueues}
                queueName={name}
              />

              {/* Distribute subqueues checkbox */}
              <div className="queue-edit-checkbox queue-edit-checkbox--standalone">
                <input
                  type="checkbox"
                  id="distributeSubqueues"
                  className="queue-edit-checkbox__input"
                  checked={distributeSubqueues}
                  onChange={(e) => setDistributeSubqueues(e.target.checked)}
                />
                <div className="queue-edit-checkbox__content">
                  <label htmlFor="distributeSubqueues" className="queue-edit-checkbox__label">
                    Distribute tickets across subqueues
                  </label>
                  <p className="queue-edit-checkbox__hint">
                    Use defined percentages to divide tickets into as many as 5 subqueues. Each subqueue has its own primary and secondary groups.
                  </p>
                </div>
              </div>

              {/* Groups Section */}
              <section className="queue-edit-section">
                {!distributeSubqueues && (
                  <div className="queue-edit-section__header">
                    <h2 className="queue-edit-section__title">Groups</h2>
                    <p className="queue-edit-section__description">
                      Work is routed to the primary groups first.
                    </p>
                    <Anchor href="#" className="queue-edit-section__link">
                      Manage groups
                      <ExternalLinkIcon className="queue-edit-section__link-icon" />
                    </Anchor>
                  </div>
                )}

                {distributeSubqueues ? (
                  /* Subqueue Table - shown when distribute subqueues is enabled */
                  <SubqueueTable
                    subqueues={subqueues}
                    onAddSubqueue={addSubqueue}
                    onRemoveSubqueue={removeSubqueue}
                    onUpdateSubqueue={updateSubqueue}
                    totalPercentage={totalPercentage}
                    isPercentageValid={isPercentageValid}
                    newSubqueueId={newSubqueueId}
                  />
                ) : (
                  /* Standard Groups Form - shown when distribute subqueues is disabled */
                  <div className="queue-edit-form">
                    {/* Primary Groups */}
                    <div className="queue-edit-form__field">
                      <label className="queue-edit-form__label">Primary groups*</label>
                      <MultiselectInput 
                        value={primaryGroups}
                        onChange={setPrimaryGroups}
                      />
                    </div>

                    {/* Secondary Groups Toggle */}
                    <div className="queue-edit-checkbox queue-edit-checkbox--inline">
                      <button
                        type="button"
                        id="enableSecondaryGroups"
                        className="queue-edit-checkbox__custom"
                        role="checkbox"
                        aria-checked={enableSecondaryGroups}
                        onClick={() => setEnableSecondaryGroups(!enableSecondaryGroups)}
                      >
                        {enableSecondaryGroups ? (
                          <img src={assetUrl('/assets/Check square.svg')} alt="" width="20" height="20" />
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="14" height="14" rx="3" stroke="#5C6970" strokeWidth="1.5"/>
                          </svg>
                        )}
                      </button>
                      <label className="queue-edit-checkbox__label" onClick={() => setEnableSecondaryGroups(!enableSecondaryGroups)}>
                        Turn on secondary groups
                      </label>
                    </div>

                    {/* Secondary Groups */}
                    {enableSecondaryGroups && (
                      <div className="queue-edit-form__field queue-edit-form__field--animated">
                        <label className="queue-edit-form__label">Secondary groups</label>
                        <MultiselectInput 
                          value={secondaryGroups}
                          onChange={setSecondaryGroups}
                        />
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>

            {/* Footer */}
            <div className="queue-edit-page__footer">
              <div className="queue-edit-page__footer-actions">
                <Button isBasic onClick={onBack}>Cancel</Button>
                <Button isPrimary onClick={handleSave}>{isCreating ? 'Create' : 'Save'}</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
