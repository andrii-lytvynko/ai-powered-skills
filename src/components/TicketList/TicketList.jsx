import { useState, useRef, useEffect, useMemo } from 'react';
import { FilterIcon, PhoneIcon, ChatIcon, EmailIcon, SparkleIcon, ChevronDownSmallIcon, CheckIcon, TagIcon, CircleDotIcon, ClockAlertIcon } from '../Icons';
import './TicketList.css';

// Parse SLA value to minutes for sorting (negative values = breached)
function parseSLAToMinutes(sla) {
  if (!sla) return Infinity; // No SLA = lowest priority
  const value = sla.value;
  const isNegative = value.startsWith('-');
  const cleanValue = value.replace('-', '');
  
  let minutes = 0;
  if (cleanValue.includes('h')) {
    minutes = parseInt(cleanValue) * 60;
  } else if (cleanValue.includes('m')) {
    minutes = parseInt(cleanValue);
  }
  
  return isNegative ? -minutes : minutes;
}

// Sort functions for each option
const sortFunctions = {
  recommended: (a, b, originalIndex) => originalIndex.get(a) - originalIndex.get(b),
  type: (a, b) => {
    const typeOrder = { call: 0, chat: 1, email: 2 };
    return typeOrder[a.type] - typeOrder[b.type];
  },
  status: (a, b) => {
    const statusOrder = { open: 0, pending: 1, 'on-hold': 2, solved: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  },
  sla: (a, b) => {
    const slaA = parseSLAToMinutes(a.sla);
    const slaB = parseSLAToMinutes(b.sla);
    return slaA - slaB; // Smallest (most urgent) first
  },
};

const tickets = [
  {
    id: '25245',
    type: 'call',
    title: 'Call with Caller +1 (123) 456-7890',
    status: 'open',
    time: '< 1 min ago',
    sla: null,
    hasOnlineIndicator: true,
  },
  {
    id: '54988',
    type: 'chat',
    title: "I can't access my account",
    status: 'open',
    time: '4:13 PM',
    sla: { value: '5m', type: 'warning' },
    lastMessage: { name: 'Rebecca Wells', text: 'Can you help?' },
    hasOnlineIndicator: true,
  },
  {
    id: '54264',
    type: 'chat',
    title: "Can't find discount code for beef",
    status: 'open',
    time: '4:10 PM',
    sla: { value: '18m', type: 'success' },
    lastMessage: { name: 'Dwight Torff', text: 'Typing...' },
    hasOnlineIndicator: true,
  },
  {
    id: '25245',
    type: 'email',
    title: 'Discount code disactivated',
    status: 'open',
    time: '3:40 PM',
    sla: { value: '-3m', type: 'danger' },
    lastMessage: { name: 'Kevin Smith', text: 'Hi there, Can you assist me with this.' },
  },
  {
    id: '25245',
    type: 'email',
    title: 'Discount code',
    status: 'pending',
    time: '4:13 PM',
    sla: { value: '1h', type: 'success' },
    lastMessage: { name: 'Angela Martin', text: "Hi I'm looking for the discount code for paper" },
  },
  {
    id: '54988',
    type: 'chat',
    title: 'Need help with emails',
    status: 'on-hold',
    time: '3:30 PM',
    sla: { value: '45m', type: 'success' },
    lastMessage: { name: 'Mike Vaccaro', text: 'Badabing badaboom' },
    hasNotificationIndicator: true,
  },
  {
    id: '54988',
    type: 'chat',
    title: 'Need help with hamster tubes',
    status: 'on-hold',
    time: '3:28 PM',
    sla: { value: '52m', type: 'success' },
    lastMessage: { name: 'Mike Vaccaro', text: 'I need more tubes' },
    hasNotificationIndicator: true,
  },
  {
    id: '25245',
    type: 'email',
    title: 'Discount code',
    status: 'pending',
    time: '4:13 PM',
    sla: { value: '1h', type: 'success' },
    lastMessage: { name: 'Angela Martin', text: "Hi I'm looking for the discount code for paper" },
  },
];

function TicketIcon({ type }) {
  const iconMap = {
    call: PhoneIcon,
    chat: ChatIcon,
    email: EmailIcon,
  };
  const Icon = iconMap[type] || ChatIcon;
  return <Icon className="ticket-item__channel-icon" />;
}

function StatusBadge({ status }) {
  const labels = {
    'open': 'Open',
    'pending': 'Pending',
    'on-hold': 'On-hold',
    'solved': 'Solved',
  };
  
  return (
    <span className={`status-badge status-badge--${status}`}>
      <span className="status-badge__dot" />
      <span className="status-badge__label">{labels[status]}</span>
    </span>
  );
}

function SLATag({ sla }) {
  if (!sla) return null;
  return (
    <span className={`sla-tag sla-tag--${sla.type}`}>
      {sla.value}
    </span>
  );
}

const sortOptions = [
  { id: 'recommended', label: 'Recommended', icon: SparkleIcon },
  { id: 'type', label: 'Ticket type', icon: TagIcon },
  { id: 'status', label: 'Ticket status', icon: CircleDotIcon },
  { id: 'sla', label: 'Closest to SLA breach', icon: ClockAlertIcon },
];

function SortDropdown({ selectedSort, onSelectSort }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = sortOptions.find(opt => opt.id === selectedSort) || sortOptions[0];
  const SelectedIcon = selectedOption.icon;

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button 
        className={`ticket-list__action-btn ticket-list__action-btn--sort ${isOpen ? 'ticket-list__action-btn--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption.label}</span>
        <SelectedIcon className="ticket-list__action-icon ticket-list__sparkle-icon" />
      </button>
      
      {isOpen && (
        <div className="sort-dropdown__menu">
          <div className="sort-dropdown__header">Sort by</div>
          {sortOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = option.id === selectedSort;
            return (
              <button
                key={option.id}
                className={`sort-dropdown__item ${isSelected ? 'sort-dropdown__item--selected' : ''}`}
                onClick={() => {
                  onSelectSort(option.id);
                  setIsOpen(false);
                }}
              >
                <Icon className="sort-dropdown__item-icon" />
                <span className="sort-dropdown__item-label">{option.label}</span>
                {isSelected && <CheckIcon className="sort-dropdown__check-icon" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TicketItem({ ticket, index, isSelected, onSelect }) {
  return (
    <div 
      className={`ticket-item ${isSelected ? 'ticket-item--selected' : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
      onClick={() => onSelect?.(ticket)}
    >
      <div className="ticket-item__icon-container">
        <div className="ticket-item__icon-wrapper">
          <TicketIcon type={ticket.type} />
        </div>
        {ticket.hasOnlineIndicator && (
          <span className="ticket-item__online-indicator" />
        )}
        {ticket.hasNotificationIndicator && (
          <span className="ticket-item__notification-indicator" />
        )}
      </div>
      
      <div className="ticket-item__content">
        <div className="ticket-item__header">
          <div className="ticket-item__title-row">
            <h4 className="ticket-item__title">{ticket.title}</h4>
            {ticket.sla && <SLATag sla={ticket.sla} />}
          </div>
          <span className="ticket-item__time">{ticket.time}</span>
        </div>
        
        <div className="ticket-item__meta">
          <StatusBadge status={ticket.status} />
          <span className="ticket-item__id">#{ticket.id}</span>
        </div>
        
        {ticket.lastMessage && (
          <div className="ticket-item__message">
            <div className="ticket-item__avatar">
              <div className="avatar-placeholder" />
            </div>
            <span className="ticket-item__message-text">
              <span className="ticket-item__sender-name">{ticket.lastMessage.name}:</span> {ticket.lastMessage.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export { tickets };

export default function TicketList({ selectedTicket, onSelectTicket }) {
  const [selectedSort, setSelectedSort] = useState('recommended');

  // Create a map to preserve original order for "recommended" sort
  const originalIndexMap = useMemo(() => {
    const map = new Map();
    tickets.forEach((ticket, index) => map.set(ticket, index));
    return map;
  }, []);

  // Sort tickets based on selected option
  const sortedTickets = useMemo(() => {
    const sorted = [...tickets];
    const sortFn = sortFunctions[selectedSort];
    
    if (selectedSort === 'recommended') {
      sorted.sort((a, b) => sortFn(a, b, originalIndexMap));
    } else {
      sorted.sort(sortFn);
    }
    
    return sorted;
  }, [selectedSort, originalIndexMap]);

  // Generate unique key for each ticket
  const getTicketKey = (ticket, index) => `${ticket.id}-${ticket.title}-${index}`;

  return (
    <div className="ticket-list">
      {/* Header */}
      <div className="ticket-list__header">
        <span className="ticket-list__count">{tickets.length} tickets</span>
        <div className="ticket-list__actions">
          <button className="ticket-list__action-btn">
            <span>Filter</span>
            <ChevronDownSmallIcon className="ticket-list__action-icon" />
          </button>
          <SortDropdown 
            selectedSort={selectedSort} 
            onSelectSort={setSelectedSort} 
          />
        </div>
      </div>
      
      <div className="ticket-list__divider" />
      
      {/* Ticket items */}
      <div className="ticket-list__items" key={selectedSort}>
        {sortedTickets.map((ticket, index) => (
          <TicketItem 
            key={getTicketKey(ticket, index)} 
            ticket={ticket} 
            index={index}
            isSelected={selectedTicket && getTicketKey(selectedTicket, tickets.indexOf(selectedTicket)) === getTicketKey(ticket, index)}
            onSelect={onSelectTicket}
          />
        ))}
      </div>
    </div>
  );
}
