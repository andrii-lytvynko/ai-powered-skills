import { useState } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import { 
  PhoneIcon, 
  ChatIcon, 
  EmailIcon, 
  CloseIcon, 
  SparkleIcon,
  ChevronDownSmallIcon 
} from '../Icons';
import './ActionPanel.css';

// Icons for action buttons
function ReplyIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L2 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 8H10C12.2091 8 14 9.79086 14 12V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ForwardIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 4L14 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 8H6C3.79086 8 2 9.79086 2 12V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MergeIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 3V8C4 10.2091 5.79086 12 8 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 3V8C12 10.2091 10.2091 12 8 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function EscalateIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 6L8 2L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function NoteIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M14 9L9 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 14V10C9 9.44772 9.44772 9 10 9H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 8H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 14C2 11.2386 4.23858 9 7 9H9C11.7614 9 14 11.2386 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function TagSmallIcon({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2H6.5L12 7.5L7.5 12L2 6.5V2Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4.5" cy="4.5" r="0.75" fill="currentColor"/>
    </svg>
  );
}

function TicketTypeIcon({ type, className }) {
  const iconMap = {
    call: PhoneIcon,
    chat: ChatIcon,
    email: EmailIcon,
  };
  const Icon = iconMap[type] || ChatIcon;
  return <Icon className={className} />;
}

function ActionButton({ icon: Icon, label, onClick, variant = 'default' }) {
  return (
    <button 
      className={`action-panel__btn action-panel__btn--${variant}`}
      onClick={onClick}
    >
      <Icon className="action-panel__btn-icon" />
      <span>{label}</span>
    </button>
  );
}

function QuickActionButton({ icon: Icon, label, onClick }) {
  return (
    <button className="action-panel__quick-btn" onClick={onClick} title={label}>
      <Icon className="action-panel__quick-btn-icon" />
    </button>
  );
}

function FieldRow({ label, value, valueClassName = '' }) {
  return (
    <div className="action-panel__field">
      <span className="action-panel__field-label">{label}</span>
      <span className={`action-panel__field-value ${valueClassName}`}>{value}</span>
    </div>
  );
}

function StatusSelect({ status, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const statuses = [
    { id: 'open', label: 'Open', color: 'var(--color-status-open)' },
    { id: 'pending', label: 'Pending', color: 'var(--color-status-pending)' },
    { id: 'on-hold', label: 'On-hold', color: 'var(--color-status-onhold)' },
    { id: 'solved', label: 'Solved', color: 'var(--color-status-solved)' },
  ];

  const currentStatus = statuses.find(s => s.id === status) || statuses[0];

  return (
    <div className="action-panel__status-select">
      <button 
        className="action-panel__status-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span 
          className="action-panel__status-dot" 
          style={{ background: currentStatus.color }}
        />
        <span className="action-panel__status-label">{currentStatus.label}</span>
        <ChevronDownSmallIcon className={`action-panel__status-chevron ${isOpen ? 'rotated' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="action-panel__status-dropdown">
          {statuses.map(s => (
            <button
              key={s.id}
              className={`action-panel__status-option ${s.id === status ? 'selected' : ''}`}
              onClick={() => {
                onChange?.(s.id);
                setIsOpen(false);
              }}
            >
              <span className="action-panel__status-dot" style={{ background: s.color }} />
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Tag({ label }) {
  return (
    <span className="action-panel__tag">
      <TagSmallIcon className="action-panel__tag-icon" />
      {label}
    </span>
  );
}

export default function ActionPanel({ ticket, onClose, onStatusChange }) {
  if (!ticket) {
    return null;
  }

  const typeLabels = {
    call: 'Phone call',
    chat: 'Live chat',
    email: 'Email',
  };

  // Mock customer data
  const customer = {
    name: ticket.lastMessage?.name || 'Unknown Customer',
    email: 'customer@example.com',
    company: 'Acme Corp',
    previousTickets: 12,
    satisfaction: '98%',
  };

  return (
    <aside className="action-panel">
      {/* Header */}
      <div className="action-panel__header">
        <div className="action-panel__header-content">
          <div className="action-panel__type-badge">
            <TicketTypeIcon type={ticket.type} className="action-panel__type-icon" />
            <span>{typeLabels[ticket.type]}</span>
          </div>
          <span className="action-panel__ticket-id">#{ticket.id}</span>
        </div>
        <button className="action-panel__close-btn" onClick={onClose}>
          <CloseIcon className="action-panel__close-icon" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="action-panel__scroll-content">
        {/* Title */}
        <div className="action-panel__title-section">
          <h2 className="action-panel__title">{ticket.title}</h2>
          {ticket.sla && (
            <span className={`action-panel__sla sla-tag sla-tag--${ticket.sla.type}`}>
              SLA: {ticket.sla.value}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="action-panel__quick-actions">
          <QuickActionButton icon={ReplyIcon} label="Reply" />
          <QuickActionButton icon={ForwardIcon} label="Forward" />
          <QuickActionButton icon={NoteIcon} label="Add note" />
          <QuickActionButton icon={MergeIcon} label="Merge" />
          <QuickActionButton icon={EscalateIcon} label="Escalate" />
        </div>

        <div className="action-panel__divider" />

        {/* AI Suggestion */}
        <div className="action-panel__ai-section">
          <div className="action-panel__ai-header">
            <SparkleIcon className="action-panel__ai-icon" />
            <span className="action-panel__ai-label">AI Suggestion</span>
          </div>
          <p className="action-panel__ai-text">
            This ticket appears to be about account access. Consider checking the customer's recent login attempts and password reset history.
          </p>
          <Button size="small" className="action-panel__ai-apply">
            Apply suggestion
          </Button>
        </div>

        <div className="action-panel__divider" />

        {/* Ticket Properties */}
        <div className="action-panel__section">
          <h3 className="action-panel__section-title">Properties</h3>
          
          <div className="action-panel__fields">
            <div className="action-panel__field">
              <span className="action-panel__field-label">Status</span>
              <StatusSelect 
                status={ticket.status} 
                onChange={onStatusChange}
              />
            </div>
            
            <FieldRow label="Priority" value="Normal" />
            <FieldRow label="Type" value={typeLabels[ticket.type]} />
            <FieldRow label="Created" value={ticket.time} />
            <FieldRow label="Assignee" value="You" valueClassName="action-panel__field-value--highlight" />
          </div>
        </div>

        <div className="action-panel__divider" />

        {/* Customer Info */}
        <div className="action-panel__section">
          <h3 className="action-panel__section-title">
            <UserIcon className="action-panel__section-icon" />
            Customer
          </h3>
          
          <div className="action-panel__customer-card">
            <div className="action-panel__customer-avatar">
              <span className="action-panel__customer-initial">
                {customer.name.charAt(0)}
              </span>
            </div>
            <div className="action-panel__customer-info">
              <span className="action-panel__customer-name">{customer.name}</span>
              <span className="action-panel__customer-email">{customer.email}</span>
            </div>
          </div>

          <div className="action-panel__customer-stats">
            <div className="action-panel__customer-stat">
              <span className="action-panel__customer-stat-value">{customer.previousTickets}</span>
              <span className="action-panel__customer-stat-label">Previous tickets</span>
            </div>
            <div className="action-panel__customer-stat">
              <span className="action-panel__customer-stat-value">{customer.satisfaction}</span>
              <span className="action-panel__customer-stat-label">Satisfaction</span>
            </div>
          </div>
        </div>

        <div className="action-panel__divider" />

        {/* Tags */}
        <div className="action-panel__section">
          <h3 className="action-panel__section-title">Tags</h3>
          <div className="action-panel__tags">
            <Tag label="account-access" />
            <Tag label="urgent" />
            <button className="action-panel__add-tag">+ Add tag</button>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="action-panel__footer">
        <ActionButton 
          icon={ReplyIcon} 
          label="Reply" 
          variant="primary"
        />
      </div>
    </aside>
  );
}

