import { useState } from 'react';
import { ChevronDownIcon, Icon } from '../Icons';
import './WFMSummary.css';

// Status colors
const statusColors = {
  workstreamA: '#C8E972',
  combinedWS: '#A855F7',
  productiveGT: '#EF4444',
  multiple: '#1F2937',
  online: '#10B981',
  custom1: '#3B82F6',
  transfersOnly: '#60A5FA',
  away: '#FCD34D',
  offline: '#9CA3AF',
  custom2: '#EC4899',
  custom3: '#8B5CF6',
  busy: '#10B981',
  busyWarning: '#F59E0B',
  idle: '#3B82F6',
};

function SummaryHeader({ title, onClose }) {
  return (
    <div className="wfm-summary__header">
      <h2 className="wfm-summary__title">{title}</h2>
      <button className="wfm-summary__close" onClick={onClose} title="Close">
        <Icon name="close" className="wfm-summary__close-icon" size="sm" />
      </button>
    </div>
  );
}

function AgentInfo({ agent }) {
  return (
    <div className="wfm-summary__agent">
      <div className="wfm-summary__agent-header">
        <span className="wfm-summary__agent-name">{agent?.name || 'Anne Hicks'}</span>
        <button className="wfm-summary__agent-menu" title="More options">
          <Icon name="more_horiz" className="wfm-summary__menu-icon" size="sm" />
        </button>
      </div>
      <div className="wfm-summary__schedule">
        <div className="wfm-summary__schedule-row">
          <span className="wfm-summary__schedule-label">Scheduled</span>
          <span className="wfm-summary__schedule-value">8:00 AM - 5:00 PM (8h) | 8...</span>
        </div>
        <div className="wfm-summary__schedule-row">
          <span className="wfm-summary__schedule-label">Actual</span>
          <span className="wfm-summary__schedule-value">8:05 AM - 10:00 AM | 8:05...</span>
        </div>
      </div>
    </div>
  );
}

function BreakdownSection({ title, items, defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="wfm-summary__section">
      <button 
        className="wfm-summary__section-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="wfm-summary__section-title">{title}</h3>
        <ChevronDownIcon className={`wfm-summary__section-chevron ${isExpanded ? '' : 'collapsed'}`} />
      </button>
      
      {isExpanded && (
        <div className="wfm-summary__section-content">
          {items.map((item, idx) => (
            <div key={idx} className="wfm-summary__item">
              <div className="wfm-summary__item-left">
                <span 
                  className="wfm-summary__item-dot"
                  style={{ backgroundColor: item.color }}
                />
                <span className="wfm-summary__item-label">{item.label}</span>
                {item.warning && (
                  <Icon name="warning" className="wfm-summary__warning-icon" size="sm" />
                )}
              </div>
              <span className="wfm-summary__item-value">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductivitySection({ items, defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="wfm-summary__section">
      <button 
        className="wfm-summary__section-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="wfm-summary__section-title">Productivity</h3>
        <ChevronDownIcon className={`wfm-summary__section-chevron ${isExpanded ? '' : 'collapsed'}`} />
      </button>
      
      {isExpanded && (
        <div className="wfm-summary__section-content">
          {items.map((item, idx) => (
            <div key={idx} className="wfm-summary__item wfm-summary__item--productivity">
              <span className="wfm-summary__item-label">{item.label}</span>
              {item.hidden ? (
                <Icon name="visibility_off" className="wfm-summary__hidden-icon" size="sm" />
              ) : (
                <span className="wfm-summary__item-value">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WFMSummary({ agent, onClose }) {
  const workstreamsData = [
    { label: 'Workstream A', value: '4h', color: statusColors.workstreamA },
    { label: 'Combined WS', value: '2h 15m', color: statusColors.combinedWS },
    { label: 'Productive GT', value: '30m', color: statusColors.productiveGT },
    { label: 'Multiple workstreams', value: '5m', color: statusColors.multiple },
  ];

  const agentStatusData = [
    { label: 'Online', value: '4h', color: statusColors.online },
    { label: 'Custom status 1', value: '2h 15m', color: statusColors.custom1 },
    { label: 'Transfers only', value: '30m', color: statusColors.transfersOnly },
    { label: 'Away', value: '15m', color: statusColors.away },
    { label: 'Offline', value: '1h', color: statusColors.offline },
    { label: 'Custom status 2', value: '30m', color: statusColors.custom2 },
    { label: 'Custom status 3', value: '15m', color: statusColors.custom3 },
  ];

  const talkActivityData = [
    { label: 'Online', value: '4h', color: statusColors.online },
    { label: 'Transfers only', value: '2h 15m', color: statusColors.transfersOnly },
    { label: 'On call', value: '30m', color: statusColors.custom1 },
    { label: 'Wrap-up', value: '30m', color: statusColors.combinedWS },
    { label: 'Away', value: '30m', color: statusColors.away },
    { label: 'Offline', value: '30m', color: statusColors.offline },
  ];

  const availabilityData = [
    { label: 'Busy', value: '8h 12m', color: statusColors.busy },
    { label: 'Busy', value: '35m', color: statusColors.busyWarning, warning: true },
    { label: 'Idle', value: '1h 15m', color: statusColors.idle },
    { label: 'Offline', value: '2h 42m', color: statusColors.offline },
  ];

  const productivityData = [
    { label: 'Attended points', value: '3' },
    { label: 'Assigned points', hidden: true },
    { label: 'Handled points', value: '6' },
    { label: 'Escalated points', value: '2' },
    { label: 'Reopened points', value: '6' },
    { label: 'Solved points', value: '8' },
  ];

  return (
    <aside className="wfm-summary">
      <SummaryHeader title="Summary" onClose={onClose} />
      
      <div className="wfm-summary__content">
        <AgentInfo agent={agent} />
        
        <div className="wfm-summary__sections">
          <BreakdownSection 
            title="Workstreams breakdown" 
            items={workstreamsData} 
          />
          
          <BreakdownSection 
            title="Agent status breakdown" 
            items={agentStatusData} 
          />
          
          <BreakdownSection 
            title="Talk activity breakdown" 
            items={talkActivityData}
            defaultExpanded={false}
          />
          
          <BreakdownSection 
            title="Availability" 
            items={availabilityData}
            defaultExpanded={false}
          />
          
          <ProductivitySection 
            items={productivityData}
            defaultExpanded={false}
          />
        </div>
      </div>
    </aside>
  );
}





