import { useState, useRef, useEffect } from 'react';
import { ChatIcon, CloseIcon, SparkleIcon, ChevronDownSmallIcon, PhoneIcon, EmailIcon } from '../Icons';
import './ConversationPanel.css';

// Icons for conversation panel
function FilterLinesIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.5H17M5 8H15M7 11.5H13M9 15H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function HistoryIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 5V10L13 12M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DotsVerticalIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function ChevronUpIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7.5L6 4.5L9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SendIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 11.5L17 3M8.62 12.003L10.62 16.593C10.783 16.975 10.864 17.166 10.981 17.22C11.083 17.267 11.2 17.267 11.302 17.218C11.418 17.163 11.498 16.971 11.658 16.588L17.45 3.45C17.59 3.12 17.66 2.955 17.62 2.85C17.585 2.759 17.512 2.687 17.42 2.653C17.316 2.615 17.151 2.687 16.822 2.832L3.45 8.463C3.044 8.636 2.841 8.723 2.785 8.843C2.736 8.948 2.736 9.068 2.786 9.172C2.843 9.291 3.047 9.376 3.455 9.546L8.15 11.535C8.234 11.57 8.277 11.588 8.312 11.615C8.343 11.639 8.37 11.667 8.393 11.699C8.419 11.735 8.437 11.778 8.47 11.863L8.62 12.003Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function NoteIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.33 1.33H4C3.26 1.33 2.67 1.93 2.67 2.67V13.33C2.67 14.07 3.26 14.67 4 14.67H12C12.74 14.67 13.33 14.07 13.33 13.33V5.33L9.33 1.33Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.33 1.33V5.33H13.33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AISparkleIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1V3M8 13V15M15 8H13M3 8H1M12.95 3.05L11.54 4.46M4.46 11.54L3.05 12.95M12.95 12.95L11.54 11.54M4.46 4.46L3.05 3.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="2" fill="currentColor"/>
    </svg>
  );
}

function AttachmentIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 7.33L8.47 12.87C7.02 14.31 4.68 14.31 3.23 12.87C1.79 11.42 1.79 9.08 3.23 7.63L8.77 2.1C9.7 1.17 11.18 1.17 12.1 2.1C13.03 3.02 13.03 4.5 12.1 5.43L6.57 10.97C6.11 11.43 5.36 11.43 4.9 10.97C4.44 10.51 4.44 9.76 4.9 9.3L9.83 4.37" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MacroIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 3L3 7L7 11M13 9L17 13L13 17M11 3L9 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.67 17.5V16.17C16.67 14.33 15.17 12.83 13.33 12.83H6.67C4.83 12.83 3.33 14.33 3.33 16.17V17.5M10 10C11.84 10 13.33 8.51 13.33 6.67C13.33 4.83 11.84 3.33 10 3.33C8.16 3.33 6.67 4.83 6.67 6.67C6.67 8.51 8.16 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DatabaseIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="10" cy="5" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 5V15C3 16.38 6.13 17.5 10 17.5C13.87 17.5 17 16.38 17 15V5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 10C3 11.38 6.13 12.5 10 12.5C13.87 12.5 17 11.38 17 10" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function BookIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 16.67V4.17C2.5 2.97 3.47 2 4.67 2H15.83C16.29 2 16.67 2.38 16.67 2.83V14.17M2.5 16.67C2.5 15.47 3.47 14.17 4.67 14.17H16.67V17.5H4.67C3.47 17.5 2.5 16.83 2.5 16.67Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DevicesIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M15 10V15.5C15 16.05 15.45 16.5 16 16.5H17.5C18.05 16.5 18.5 16.05 18.5 15.5V8.5C18.5 7.95 18.05 7.5 17.5 7.5H15" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function PlusIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// Dummy conversation data
const getConversationForTicket = (ticket) => {
  if (!ticket) return null;
  
  return {
    id: ticket.id,
    subject: ticket.title,
    category: 'Lost account access',
    sentiment: 'Neutral',
    totalMessages: 8,
    messages: [
      {
        id: 1,
        sender: 'customer',
        name: ticket.lastMessage?.name || 'Customer',
        text: 'Can you help?',
        time: '4:13 PM',
        avatar: null,
      },
      {
        id: 2,
        sender: 'agent',
        name: 'You',
        text: 'Hello! How can I help you?',
        time: '4:13 PM',
        avatar: null,
      },
      {
        id: 3,
        sender: 'customer',
        name: ticket.lastMessage?.name || 'Customer',
        text: "I just started my day and I can't access my account.",
        time: '4:14 PM',
        avatar: null,
      },
    ],
  };
};

function ConversationHeader({ conversation, currentIndex, totalTickets, onPrevTicket, onNextTicket, onClose }) {
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalTickets - 1;
  
  return (
    <div className="conversation-header">
      <div className="conversation-header__info">
        <h2 className="conversation-header__title">{conversation.subject}</h2>
        <div className="conversation-header__meta">
          <span className="conversation-header__category-icon">
            <ChatIcon className="conversation-header__chat-icon" />
          </span>
          <span className="conversation-header__category">{conversation.category}</span>
          <span className="conversation-header__separator">·</span>
          <span className="conversation-header__sentiment">{conversation.sentiment}</span>
        </div>
      </div>
      
      <div className="conversation-header__actions">
        <button className="conversation-header__action-btn" title="Filter">
          <FilterLinesIcon className="conversation-header__action-icon" />
        </button>
        <button className="conversation-header__action-btn" title="History">
          <HistoryIcon className="conversation-header__action-icon" />
        </button>
        <button className="conversation-header__action-btn" title="More options">
          <DotsVerticalIcon className="conversation-header__action-icon" />
        </button>
      </div>
      
      <div className="conversation-header__pagination">
        <button 
          className={`conversation-header__page-btn ${!canGoPrev ? 'conversation-header__page-btn--disabled' : ''}`}
          onClick={canGoPrev ? onPrevTicket : undefined}
          disabled={!canGoPrev}
          title="Previous ticket"
        >
          <ChevronDownIcon className="conversation-header__chevron" />
        </button>
        <span className="conversation-header__page-current">{currentIndex + 1}</span>
        <span className="conversation-header__page-total">/ {totalTickets}</span>
        <button 
          className={`conversation-header__page-btn ${!canGoNext ? 'conversation-header__page-btn--disabled' : ''}`}
          onClick={canGoNext ? onNextTicket : undefined}
          disabled={!canGoNext}
          title="Next ticket"
        >
          <ChevronUpIcon className="conversation-header__chevron" />
        </button>
      </div>
    </div>
  );
}

function Message({ message, isAgent }) {
  return (
    <div className={`message ${isAgent ? 'message--agent' : 'message--customer'}`}>
      {!isAgent && (
        <div className="message__avatar">
          <div className="message__avatar-placeholder" />
        </div>
      )}
      
      <div className="message__content-wrapper">
        <div className="message__bubble">
          <p className="message__text">{message.text}</p>
          <div className="message__footer">
            <ChatIcon className="message__channel-icon" />
            <span className="message__time">{message.time}</span>
          </div>
        </div>
      </div>
      
      {isAgent && (
        <div className="message__avatar">
          <div className="message__avatar-placeholder message__avatar-placeholder--agent" />
        </div>
      )}
    </div>
  );
}

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message 
          key={message.id} 
          message={message} 
          isAgent={message.sender === 'agent'} 
        />
      ))}
    </div>
  );
}

function ChannelSwitcher() {
  return (
    <div className="channel-switcher">
      <button className="channel-switcher__select">
        <ChatIcon className="channel-switcher__icon" />
        <span className="channel-switcher__label">Messaging</span>
        <ChevronDownIcon className="channel-switcher__chevron" />
      </button>
      
      <button className="channel-switcher__end-session">
        End session
      </button>
    </div>
  );
}

function ComposerToolbar() {
  return (
    <div className="composer-toolbar">
      <button className="composer-toolbar__btn" title="Add internal note">
        <NoteIcon className="composer-toolbar__icon" />
      </button>
      <button className="composer-toolbar__btn" title="AI assist">
        <AISparkleIcon className="composer-toolbar__icon" />
      </button>
      <button className="composer-toolbar__btn" title="Add attachment">
        <AttachmentIcon className="composer-toolbar__icon" />
      </button>
    </div>
  );
}

function MessageComposer({ onSend }) {
  const [message, setMessage] = useState("I got you covered! I'd be happy to help. Have you tried restarting the device?");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-composer">
      <div className="message-composer__input-wrapper">
        <div className="message-composer__input-container">
          <textarea
            ref={textareaRef}
            className="message-composer__input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
          />
          <ComposerToolbar />
        </div>
      </div>
      
      <button 
        className="message-composer__send-btn"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <SendIcon className="message-composer__send-icon" />
      </button>
    </div>
  );
}

function TicketFooter({ status = 'Open' }) {
  return (
    <div className="ticket-footer">
      <button className="ticket-footer__macro-btn">
        <MacroIcon className="ticket-footer__macro-icon" />
        <span>Apply macro</span>
        <ChevronDownIcon className="ticket-footer__chevron" />
      </button>
      
      <div className="ticket-footer__actions">
        <button className="ticket-footer__submit-btn">
          Submit as {status}
        </button>
        <button className="ticket-footer__dropdown-btn">
          <ChevronDownIcon className="ticket-footer__dropdown-icon" />
        </button>
      </div>
    </div>
  );
}

// Action Panel Icons
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

// Context Panel Content (replaces ActionPanel)
function ContextPanelContent({ ticket, activeTab, onStatusChange }) {
  if (!ticket) return null;

  const typeLabels = {
    call: 'Phone call',
    chat: 'Live chat',
    email: 'Email',
  };

  const customer = {
    name: ticket.lastMessage?.name || 'Unknown Customer',
    email: 'customer@example.com',
    previousTickets: 12,
    satisfaction: '98%',
  };

  const statuses = [
    { id: 'open', label: 'Open', color: 'var(--color-status-open)' },
    { id: 'pending', label: 'Pending', color: 'var(--color-status-pending)' },
    { id: 'on-hold', label: 'On-hold', color: 'var(--color-status-onhold)' },
    { id: 'solved', label: 'Solved', color: 'var(--color-status-solved)' },
  ];

  const currentStatus = statuses.find(s => s.id === ticket.status) || statuses[0];

  if (activeTab === 'user') {
    return (
      <div className="context-panel__content">
        <div className="context-panel__header">
          <div className="context-panel__type-badge">
            <TicketTypeIcon type={ticket.type} className="context-panel__type-icon" />
            <span>{typeLabels[ticket.type]}</span>
          </div>
          <span className="context-panel__ticket-id">#{ticket.id}</span>
        </div>

        <div className="context-panel__title-section">
          <h3 className="context-panel__title">{ticket.title}</h3>
          {ticket.sla && (
            <span className={`context-panel__sla sla-tag sla-tag--${ticket.sla.type}`}>
              SLA: {ticket.sla.value}
            </span>
          )}
        </div>

        <div className="context-panel__quick-actions">
          <button className="context-panel__quick-btn" title="Reply">
            <ReplyIcon className="context-panel__quick-icon" />
          </button>
          <button className="context-panel__quick-btn" title="Forward">
            <ForwardIcon className="context-panel__quick-icon" />
          </button>
          <button className="context-panel__quick-btn" title="Add note">
            <NoteIcon className="context-panel__quick-icon" />
          </button>
          <button className="context-panel__quick-btn" title="Merge">
            <MergeIcon className="context-panel__quick-icon" />
          </button>
          <button className="context-panel__quick-btn" title="Escalate">
            <EscalateIcon className="context-panel__quick-icon" />
          </button>
        </div>

        <div className="context-panel__divider" />

        <div className="context-panel__ai-section">
          <div className="context-panel__ai-header">
            <SparkleIcon className="context-panel__ai-icon" />
            <span className="context-panel__ai-label">AI Suggestion</span>
          </div>
          <p className="context-panel__ai-text">
            This ticket appears to be about account access. Consider checking the customer's recent login attempts and password reset history.
          </p>
          <button className="context-panel__ai-apply">
            Apply suggestion
          </button>
        </div>

        <div className="context-panel__divider" />

        <div className="context-panel__section">
          <h4 className="context-panel__section-title">Properties</h4>
          <div className="context-panel__fields">
            <div className="context-panel__field">
              <span className="context-panel__field-label">Status</span>
              <button className="context-panel__status-btn">
                <span className="context-panel__status-dot" style={{ background: currentStatus.color }} />
                <span>{currentStatus.label}</span>
                <ChevronDownSmallIcon className="context-panel__status-chevron" />
              </button>
            </div>
            <div className="context-panel__field">
              <span className="context-panel__field-label">Priority</span>
              <span className="context-panel__field-value">Normal</span>
            </div>
            <div className="context-panel__field">
              <span className="context-panel__field-label">Type</span>
              <span className="context-panel__field-value">{typeLabels[ticket.type]}</span>
            </div>
            <div className="context-panel__field">
              <span className="context-panel__field-label">Created</span>
              <span className="context-panel__field-value">{ticket.time}</span>
            </div>
            <div className="context-panel__field">
              <span className="context-panel__field-label">Assignee</span>
              <span className="context-panel__field-value context-panel__field-value--highlight">You</span>
            </div>
          </div>
        </div>

        <div className="context-panel__divider" />

        <div className="context-panel__section">
          <h4 className="context-panel__section-title">
            <UserIcon className="context-panel__section-icon" />
            Customer
          </h4>
          <div className="context-panel__customer-card">
            <div className="context-panel__customer-avatar">
              <span>{customer.name.charAt(0)}</span>
            </div>
            <div className="context-panel__customer-info">
              <span className="context-panel__customer-name">{customer.name}</span>
              <span className="context-panel__customer-email">{customer.email}</span>
            </div>
          </div>
          <div className="context-panel__customer-stats">
            <div className="context-panel__customer-stat">
              <span className="context-panel__stat-value">{customer.previousTickets}</span>
              <span className="context-panel__stat-label">Previous tickets</span>
            </div>
            <div className="context-panel__customer-stat">
              <span className="context-panel__stat-value">{customer.satisfaction}</span>
              <span className="context-panel__stat-label">Satisfaction</span>
            </div>
          </div>
        </div>

        <div className="context-panel__divider" />

        <div className="context-panel__section">
          <h4 className="context-panel__section-title">Tags</h4>
          <div className="context-panel__tags">
            <span className="context-panel__tag">
              <TagSmallIcon className="context-panel__tag-icon" />
              account-access
            </span>
            <span className="context-panel__tag">
              <TagSmallIcon className="context-panel__tag-icon" />
              urgent
            </span>
            <button className="context-panel__add-tag">+ Add tag</button>
          </div>
        </div>
      </div>
    );
  }

  // Default placeholder for other tabs
  return (
    <div className="context-panel__content context-panel__content--empty">
      <p>Coming soon...</p>
    </div>
  );
}

function ContextSidebar({ activeTab, onTabChange, isPanelOpen }) {
  const tabs = [
    { id: 'user', icon: UserIcon, label: 'User' },
    { id: 'data', icon: DatabaseIcon, label: 'Data' },
    { id: 'knowledge', icon: BookIcon, label: 'Knowledge' },
    { id: 'devices', icon: DevicesIcon, label: 'Devices' },
    { id: 'apps', icon: PlusIcon, label: 'Apps' },
  ];

  return (
    <div className="context-sidebar">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = isPanelOpen && activeTab === tab.id;
        return (
          <button 
            key={tab.id}
            className={`context-sidebar__btn ${isActive ? 'context-sidebar__btn--active' : ''}`} 
            title={tab.label}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon className="context-sidebar__icon" />
          </button>
        );
      })}
    </div>
  );
}

export default function ConversationPanel({ ticket, onClose, onStatusChange, currentIndex, totalTickets, onPrevTicket, onNextTicket }) {
  const [activeTab, setActiveTab] = useState('user');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  
  const conversation = getConversationForTicket(ticket);
  
  if (!conversation) {
    return null;
  }

  const handleSendMessage = (message) => {
    console.log('Sending message:', message);
  };

  const handleTabChange = (tabId) => {
    if (activeTab === tabId && isPanelOpen) {
      setIsPanelOpen(false);
    } else {
      setActiveTab(tabId);
      setIsPanelOpen(true);
    }
  };

  return (
    <div className={`conversation-panel ${isPanelOpen ? 'conversation-panel--with-context' : ''}`}>
      <div className="conversation-panel__main">
        <ConversationHeader 
          conversation={conversation} 
          currentIndex={currentIndex}
          totalTickets={totalTickets}
          onPrevTicket={onPrevTicket}
          onNextTicket={onNextTicket}
          onClose={onClose}
        />
        
        <MessageList messages={conversation.messages} />
        
        <div className="conversation-panel__composer-area">
          <ChannelSwitcher />
          <MessageComposer onSend={handleSendMessage} />
          <TicketFooter status={ticket.status === 'open' ? 'Open' : ticket.status} />
        </div>
      </div>
      
      {isPanelOpen && (
        <div className="context-panel">
          <ContextPanelContent 
            ticket={ticket} 
            activeTab={activeTab}
            onStatusChange={onStatusChange}
          />
        </div>
      )}
      
      <ContextSidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isPanelOpen={isPanelOpen}
      />
    </div>
  );
}

