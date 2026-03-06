import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Tag } from '@zendeskgarden/react-tags';
import './QueuesTable.css';

// Grip icon for draggable rows
function GripIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="2" r="1" fill="currentColor"/>
      <circle cx="8" cy="2" r="1" fill="currentColor"/>
      <circle cx="4" cy="6" r="1" fill="currentColor"/>
      <circle cx="8" cy="6" r="1" fill="currentColor"/>
      <circle cx="4" cy="10" r="1" fill="currentColor"/>
      <circle cx="8" cy="10" r="1" fill="currentColor"/>
    </svg>
  );
}

// Tooltip component using portal
function Tooltip({ children, content, items = [] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipHeight = tooltipRef.current?.offsetHeight || 0;
      const tooltipWidth = tooltipRef.current?.offsetWidth || 0;
      
      // Position above the trigger by default
      let top = rect.top - tooltipHeight - 8;
      let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
      
      // If tooltip would go above viewport, position below
      if (top < 8) {
        top = rect.bottom + 8;
      }
      
      // Keep tooltip within viewport horizontally
      if (left < 8) {
        left = 8;
      } else if (left + tooltipWidth > window.innerWidth - 8) {
        left = window.innerWidth - tooltipWidth - 8;
      }
      
      setPosition({ top, left });
    }
  }, [isVisible]);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const tooltipContent = content || (items.length > 0 ? items.join(', ') : null);

  if (!tooltipContent) {
    return children;
  }

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="queues-table__tooltip-trigger"
      >
        {children}
      </span>
      {isVisible && createPortal(
        <div 
          ref={tooltipRef}
          className="queues-table__tooltip"
          style={{ 
            top: position.top, 
            left: position.left,
          }}
        >
          <div className="queues-table__tooltip-content">
            {items.length > 0 ? (
              <ul className="queues-table__tooltip-list">
                {items.map((item, index) => (
                  <li key={index} className="queues-table__tooltip-item">{item}</li>
                ))}
              </ul>
            ) : (
              tooltipContent
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// Overflow menu icon
function OverflowIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
    </svg>
  );
}

// Info icon for tooltips
function InfoIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="5" r="0.75" fill="currentColor"/>
    </svg>
  );
}

// Edit icon
function EditIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.333 2.00004C11.5085 1.82453 11.7163 1.68585 11.9451 1.5918C12.1739 1.49776 12.4191 1.45004 12.6663 1.45004C12.9135 1.45004 13.1587 1.49776 13.3875 1.5918C13.6163 1.68585 13.8241 1.82453 13.9997 2.00004C14.1752 2.17556 14.3138 2.38334 14.4079 2.61213C14.5019 2.84093 14.5497 3.08617 14.5497 3.33337C14.5497 3.58058 14.5019 3.82582 14.4079 4.05461C14.3138 4.28341 14.1752 4.49119 13.9997 4.66671L5.33301 13.3334L1.66634 14.3334L2.66634 10.6667L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Clone icon
function CloneIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5.5" y="5.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10.5 5.5V3C10.5 2.17157 9.82843 1.5 9 1.5H3C2.17157 1.5 1.5 2.17157 1.5 3V9C1.5 9.82843 2.17157 10.5 3 10.5H5.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// Delete icon (trash)
function DeleteIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.33333 4V2.66667C5.33333 2.29848 5.63181 2 6 2H10C10.3682 2 10.6667 2.29848 10.6667 2.66667V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.6667 4V13.3333C12.6667 13.7015 12.3682 14 12 14H4C3.63181 14 3.33333 13.7015 3.33333 13.3333V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66667 7.33333V10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.33333 7.33333V10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Bar chart icon for evaluate action
function BarChartActionIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="3" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="6.5" y="2" width="3" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="9" width="3" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function CellValue({ data }) {
  if (!data) return <span className="queues-table__cell-empty">-</span>;
  
  if (typeof data === 'string' || typeof data === 'number') {
    return <span>{data}</span>;
  }
  
  const { main, more, items = [] } = data;
  
  // Get the additional items (excluding the first one which is shown as main)
  const additionalItems = items.length > 1 ? items.slice(1) : [];
  
  return (
    <div className="queues-table__cell-value">
      <span className="queues-table__cell-main">{main}</span>
      {more > 0 && (
        <Tooltip items={additionalItems}>
          <span className="queues-table__cell-more">+ {more} more</span>
        </Tooltip>
      )}
    </div>
  );
}

// Subqueue cell that shows percentages in tooltip when available
function SubqueueCell({ queue }) {
  // Only show subqueue data if distributeSubqueues is enabled and subqueues are configured
  const hasSubqueues = queue.distributeSubqueues && queue.subqueues && queue.subqueues.length > 0;
  
  if (!hasSubqueues) {
    return <span className="queues-table__cell-empty">-</span>;
  }
  
  const firstSubqueue = queue.subqueues[0];
  const moreCount = queue.subqueues.length - 1;
  
  // Build tooltip items with percentages
  const tooltipItems = queue.subqueues.slice(1).map(sq => 
    `${sq.name}: ${sq.percentage}%`
  );
  
  // Main display without percentage
  const mainDisplay = firstSubqueue.name;
  
  return (
    <div className="queues-table__cell-value">
      <span className="queues-table__cell-main">{mainDisplay}</span>
      {moreCount > 0 && (
        <Tooltip items={tooltipItems}>
          <span className="queues-table__cell-more">+ {moreCount} more</span>
        </Tooltip>
      )}
    </div>
  );
}

// Priority cell
function PriorityCell({ queue }) {
  if (!queue.priority) {
    return <span className="queues-table__cell-empty">-</span>;
  }
  
  const { main, more, items = [] } = queue.priority;
  
  // Check if we have subqueue data
  const hasSubqueues = queue.distributeSubqueues && queue.subqueues && queue.subqueues.length > 0;
  
  // Build tooltip items
  let tooltipItems = [];
  if (hasSubqueues) {
    // Show each subqueue's priority
    tooltipItems = queue.subqueues.slice(1).map(sq => 
      `${sq.name}: Priority ${sq.priority}`
    );
  } else {
    tooltipItems = items.length > 1 ? items.slice(1) : [];
  }
  
  // Main display
  let mainDisplay = main;
  if (hasSubqueues && queue.subqueues[0]) {
    mainDisplay = `${queue.subqueues[0].name}: ${queue.subqueues[0].priority}`;
  }
  
  return (
    <div className="queues-table__cell-value">
      <span className="queues-table__cell-main">{mainDisplay}</span>
      {more > 0 && (
        <Tooltip items={tooltipItems}>
          <span className="queues-table__cell-more">+ {more} more</span>
        </Tooltip>
      )}
    </div>
  );
}

// Primary groups cell
function PrimaryGroupsCell({ queue }) {
  if (!queue.primaryGroups) {
    return <span className="queues-table__cell-empty">-</span>;
  }
  
  const { main, more, items = [] } = queue.primaryGroups;
  
  // Check if we have subqueue data
  const hasSubqueues = queue.distributeSubqueues && queue.subqueues && queue.subqueues.length > 0;
  
  // Build tooltip items
  let tooltipItems = [];
  if (hasSubqueues) {
    // Show each subqueue's primary groups
    tooltipItems = queue.subqueues.slice(1).map(sq => 
      `${sq.name}: ${sq.primaryGroups?.join(', ') || '-'}`
    );
  } else {
    tooltipItems = items.length > 1 ? items.slice(1) : [];
  }
  
  // Main display
  let mainDisplay = main;
  if (hasSubqueues && queue.subqueues[0]) {
    mainDisplay = `${queue.subqueues[0].name}: ${queue.subqueues[0].primaryGroups?.join(', ') || '-'}`;
  }
  
  return (
    <div className="queues-table__cell-value">
      <span className="queues-table__cell-main">{mainDisplay}</span>
      {more > 0 && (
        <Tooltip items={tooltipItems}>
          <span className="queues-table__cell-more">+ {more} more</span>
        </Tooltip>
      )}
    </div>
  );
}

// Secondary groups cell
function SecondaryGroupsCell({ queue }) {
  if (!queue.secondaryGroups) {
    return <span className="queues-table__cell-empty">-</span>;
  }
  
  const { main, more, items = [] } = queue.secondaryGroups;
  
  // Check if we have subqueue data
  const hasSubqueues = queue.distributeSubqueues && queue.subqueues && queue.subqueues.length > 0;
  
  // Build tooltip items
  let tooltipItems = [];
  if (hasSubqueues) {
    // Show each subqueue's secondary groups
    tooltipItems = queue.subqueues.slice(1).map(sq => 
      `${sq.name}: ${sq.secondaryGroups?.join(', ') || '-'}`
    );
  } else {
    tooltipItems = items.length > 1 ? items.slice(1) : [];
  }
  
  // Main display
  let mainDisplay = main;
  if (hasSubqueues && queue.subqueues[0]) {
    mainDisplay = `${queue.subqueues[0].name}: ${queue.subqueues[0].secondaryGroups?.join(', ') || '-'}`;
  }
  
  return (
    <div className="queues-table__cell-value">
      <span className="queues-table__cell-main">{mainDisplay}</span>
      {more > 0 && (
        <Tooltip items={tooltipItems}>
          <span className="queues-table__cell-more">+ {more} more</span>
        </Tooltip>
      )}
    </div>
  );
}

// Bar chart icon for Results ready badge
function BarChartIcon({ className }) {
  return (
    <img 
      className={className} 
      src="/assets/Bar_chart_square-3f73cdda-5fa1-4ad8-a82a-593e84e09a2b.png" 
      alt="" 
      width="12" 
      height="12"
    />
  );
}

// Figma-style light tooltip for predictive routing subqueue details
function PredictiveTooltip({ children, heading, items }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipHeight = tooltipRef.current?.offsetHeight || 0;
      const tooltipWidth = tooltipRef.current?.offsetWidth || 0;

      let top = rect.top - tooltipHeight - 8;
      let left = rect.left + rect.width / 2 - tooltipWidth / 2;

      if (top < 8) {
        top = rect.bottom + 8;
      }
      if (left < 8) left = 8;
      else if (left + tooltipWidth > window.innerWidth - 8) {
        left = window.innerWidth - tooltipWidth - 8;
      }

      setPosition({ top, left });
    }
  }, [isVisible]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>
      {isVisible && createPortal(
        <div
          ref={tooltipRef}
          className="queues-table__predictive-tooltip"
          style={{ top: position.top, left: position.left }}
        >
          <div className="queues-table__predictive-tooltip__card">
            <div className="queues-table__predictive-tooltip__content">
              {heading && (
                <p className="queues-table__predictive-tooltip__heading">{heading}</p>
              )}
              {items.length > 0 && (
                <ul className="queues-table__predictive-tooltip__list">
                  {items.map((item, i) => (
                    <li key={i} className="queues-table__predictive-tooltip__item">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="queues-table__predictive-tooltip__arrow" />
        </div>,
        document.body
      )}
    </>
  );
}

function PredictiveRoutingCell({ queue, onStartQueueEvaluation, isEvaluating, hasResults }) {
  // Check if predictive routing is enabled
  // If subqueues are enabled, check if ANY subqueue has predictive routing on
  const hasSubqueues = queue.distributeSubqueues && queue.subqueues && queue.subqueues.length > 0;
  const isPredictiveEnabled = hasSubqueues
    ? queue.subqueues.some(sq => sq.assignmentMethod === 'Predictive routing')
    : queue.assignmentMethod === 'Predictive routing';

  if (isPredictiveEnabled) {
    // Get subqueues that have predictive routing enabled (only if multiple subqueues exist)
    const hasMultipleSubqueues = hasSubqueues && queue.subqueues.length > 1;
    const subqueuesOn = hasMultipleSubqueues
      ? queue.subqueues.filter(sq => sq.assignmentMethod === 'Predictive routing')
      : [];

    const badge = (
      <Tag
        hue="green"
        size="medium"
        style={{ cursor: 'pointer' }}
        onClick={() => onStartQueueEvaluation && onStartQueueEvaluation(queue)}
      >
        <BarChartIcon className="queues-table__predictive-badge-chart" />
        On
      </Tag>
    );

    // Show tooltip only if there are multiple subqueues with at least one having predictive routing on
    if (subqueuesOn.length > 0) {
      return (
        <PredictiveTooltip
          heading="Predictive routing"
          items={subqueuesOn.map(sq => `${sq.name} \u2013 On`)}
        >
          {badge}
        </PredictiveTooltip>
      );
    }

    return badge;
  }

  if (hasResults) {
    return (
      <Tag
        hue="blue"
        size="medium"
        style={{ cursor: 'pointer' }}
        onClick={() => onStartQueueEvaluation && onStartQueueEvaluation(queue)}
      >
        Results ready
        <BarChartIcon className="queues-table__predictive-badge-icon" />
      </Tag>
    );
  }

  if (isEvaluating) {
    return (
      <Tag
        hue="yellow"
        size="medium"
        style={{ cursor: 'pointer' }}
        onClick={() => onStartQueueEvaluation && onStartQueueEvaluation(queue)}
      >
        Evaluation in progress
      </Tag>
    );
  }

  return (
    <Tag
      hue="grey"
      size="medium"
      style={{ cursor: 'pointer' }}
      onClick={() => onStartQueueEvaluation && onStartQueueEvaluation(queue)}
    >
      Off
    </Tag>
  );
}

export default function QueuesTable({
  queues = [],
  onReorder,
  onQueueSelect,
  onStartQueueEvaluation,
  queuesInEvaluation = new Set(),
  queuesWithResults = new Set(),
  onDeleteQueue,
  onCloneQueue
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [openMenuQueueId, setOpenMenuQueueId] = useState(null);
  const menuRef = useRef(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    // Add a slight delay to allow the drag image to be captured
    setTimeout(() => {
      e.target.closest('.queues-table__row')?.classList.add('queues-table__row--dragging');
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.closest('.queues-table__row')?.classList.remove('queues-table__row--dragging');
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex !== null && index !== draggedIndex) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e) => {
    // Only clear if leaving the row entirely
    const relatedTarget = e.relatedTarget;
    if (!e.currentTarget.contains(relatedTarget)) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = draggedIndex;
    
    if (dragIndex === null || dragIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    // Call the reorder callback
    if (onReorder) {
      onReorder(dragIndex, dropIndex);
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuQueueId(null);
      }
    }

    if (openMenuQueueId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openMenuQueueId]);

  const toggleMenu = (e, queueId) => {
    e.stopPropagation();
    setOpenMenuQueueId(openMenuQueueId === queueId ? null : queueId);
  };

  const handleEdit = (queue) => {
    if (onQueueSelect) {
      onQueueSelect(queue);
    }
    setOpenMenuQueueId(null);
  };

  const handleClone = (queue) => {
    if (onCloneQueue) {
      onCloneQueue(queue);
    }
    setOpenMenuQueueId(null);
  };

  const handleEvaluate = (queue) => {
    if (onStartQueueEvaluation) {
      onStartQueueEvaluation(queue);
    }
    setOpenMenuQueueId(null);
  };

  const handleDelete = (queue) => {
    if (window.confirm(`Delete ${queue.name}? This can't be undone.`)) {
      if (onDeleteQueue) {
        onDeleteQueue(queue.id);
      }
    }
    setOpenMenuQueueId(null);
  };

  const getEvaluateLabel = (queue) => {
    if (queue.assignmentMethod === 'Predictive routing') {
      return 'View performance';
    } else if (queuesWithResults.has(queue.id)) {
      return 'View results';
    } else if (queuesInEvaluation.has(queue.id)) {
      return 'View evaluation';
    }
    return 'Evaluate queue';
  };

  const getRowClassName = (index, queueId) => {
    let className = 'queues-table__row';
    if (queuesWithResults.has(queueId)) {
      className += ' queues-table__row--results-ready';
    } else if (queuesInEvaluation.has(queueId)) {
      className += ' queues-table__row--evaluating';
    }
    if (draggedIndex === index) {
      className += ' queues-table__row--dragging';
    }
    if (dragOverIndex === index) {
      className += draggedIndex !== null && draggedIndex < index
        ? ' queues-table__row--drag-over-below'
        : ' queues-table__row--drag-over-above';
    }
    return className;
  };

  return (
    <div className="queues-table">
      {/* Header Row */}
      <div className="queues-table__header">
        <div className="queues-table__header-cell queues-table__header-cell--order">
          <span>Order</span>
          <InfoIcon className="queues-table__info-icon" />
        </div>
        <div className="queues-table__header-cell queues-table__header-cell--name">
          <span>Name</span>
        </div>
        <div className="queues-table__header-cell queues-table__header-cell--predictive">
          <span>Predictive routing</span>
        </div>
        <div className="queues-table__header-cell queues-table__header-cell--subqueue">
          <span>Subqueue</span>
        </div>
        <div className="queues-table__header-cell queues-table__header-cell--priority">
          <span>Priority</span>
        </div>
        <div className="queues-table__header-cell queues-table__header-cell--primary">
          <span>Primary groups</span>
        </div>
        <div className="queues-table__header-cell queues-table__header-cell--secondary">
          <span>Secondary groups</span>
        </div>
        <div className="queues-table__header-cell queues-table__header-cell--actions" />
      </div>
      
      {/* Body Rows */}
      <div className="queues-table__body">
        {queues.map((queue, index) => (
          <div
            key={queue.id}
            className={getRowClassName(index, queue.id)}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
          >
            <div className="queues-table__cell queues-table__cell--order">
              <div className="queues-table__drag-handle" title="Drag to reorder">
                <GripIcon className="queues-table__grip-icon" />
              </div>
            </div>
            <div className="queues-table__cell queues-table__cell--name">
              <button 
                type="button"
                className="queues-table__name-link"
                onClick={() => onQueueSelect && onQueueSelect(queue)}
              >
                {queue.name}
              </button>
            </div>
            <div className="queues-table__cell queues-table__cell--predictive">
              <PredictiveRoutingCell 
                queue={queue} 
                onStartQueueEvaluation={onStartQueueEvaluation}
                isEvaluating={queuesInEvaluation.has(queue.id)}
                hasResults={queuesWithResults.has(queue.id)}
              />
            </div>
            <div className="queues-table__cell queues-table__cell--subqueue">
              <SubqueueCell queue={queue} />
            </div>
            <div className="queues-table__cell queues-table__cell--priority">
              <PriorityCell queue={queue} />
            </div>
            <div className="queues-table__cell queues-table__cell--primary">
              <PrimaryGroupsCell queue={queue} />
            </div>
            <div className="queues-table__cell queues-table__cell--secondary">
              <SecondaryGroupsCell queue={queue} />
            </div>
            <div className="queues-table__cell queues-table__cell--actions">
              <div className="queues-table__actions-container" ref={openMenuQueueId === queue.id ? menuRef : null}>
                <button
                  className="queues-table__overflow-btn"
                  title="More actions"
                  onClick={(e) => toggleMenu(e, queue.id)}
                >
                  <OverflowIcon className="queues-table__overflow-icon" />
                </button>

                {openMenuQueueId === queue.id && (
                  <div className="queues-table__actions-menu">
                    <button
                      type="button"
                      className="queues-table__menu-item"
                      onClick={() => handleEdit(queue)}
                    >
                      <EditIcon className="queues-table__menu-icon" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="queues-table__menu-item"
                      onClick={() => handleClone(queue)}
                    >
                      <CloneIcon className="queues-table__menu-icon" />
                      <span>Create copy</span>
                    </button>
                    <button
                      type="button"
                      className="queues-table__menu-item"
                      onClick={() => handleEvaluate(queue)}
                    >
                      <BarChartActionIcon className="queues-table__menu-icon" />
                      <span>{getEvaluateLabel(queue)}</span>
                    </button>
                    <div className="queues-table__menu-divider" />
                    <button
                      type="button"
                      className="queues-table__menu-item queues-table__menu-item--danger"
                      onClick={() => handleDelete(queue)}
                    >
                      <DeleteIcon className="queues-table__menu-icon" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
