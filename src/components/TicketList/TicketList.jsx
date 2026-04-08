import { useState, useRef, useEffect, useMemo } from 'react';
import { FilterIcon, SparkleIcon, CheckIcon, TagIcon, CircleDotIcon, ClockAlertIcon, SortIcon } from '../Icons';
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
    id: '54988',
    type: 'chat',
    title: "Riley Green | I can't access my account",
    status: 'open',
    timestamp: 'Today at 4:13 PM',
    sla: { value: '5m', type: 'warning' },
    preview: 'Can you help?',
    hasOnlineIndicator: true,
  },
  {
    id: '54264',
    type: 'chat',
    title: "Dwight Torff | Can't find discount code for beef",
    status: 'open',
    timestamp: 'Today at 4:10 PM',
    sla: { value: '18m', type: 'success' },
    preview: 'Typing...',
    hasOnlineIndicator: true,
  },
  {
    id: '25245',
    type: 'email',
    title: 'Kevin Smith',
    status: 'open',
    timestamp: 'Today at 3:40 PM',
    sla: { value: '-3m', type: 'danger' },
    preview: 'Hi there, Can you assist me with this.',
  },
  {
    id: '54988',
    type: 'email',
    title: 'Angela Martin | Discount code',
    status: 'pending',
    timestamp: 'Today at 4:13 PM',
    sla: { value: '1h', type: 'success' },
    preview: "Hi I'm looking for the discount code for paper",
  },
  {
    id: '54988',
    type: 'chat',
    title: 'Mike Vaccaro | Need help with emails',
    status: 'on-hold',
    timestamp: 'Today at 3:30 PM',
    sla: null,
    preview: 'Badabing badaboom',
    hasNotificationIndicator: true,
  },
  {
    id: '54988',
    type: 'chat',
    title: 'Mike Vaccaro | Need help with hamster tubes',
    status: 'on-hold',
    timestamp: 'Today at 2:50 PM',
    sla: null,
    preview: 'I need more tubes',
    hasNotificationIndicator: true,
  },
  {
    id: '87251',
    type: 'email',
    title: 'Oscar Rosser | Switch to Spanish language',
    status: 'pending',
    timestamp: 'Today at 2:30 PM',
    sla: null,
    preview: 'How do I switch your app to Spanish?',
  },
  {
    id: '61042',
    type: 'chat',
    title: '지수 Kim | 주문이 도착하지 않았어요',
    status: 'open',
    timestamp: 'Today at 1:55 PM',
    sla: { value: '12m', type: 'warning' },
    preview: '주문한 상품이 아직 도착하지 않았어요.',
    hasOnlineIndicator: true,
  },
  {
    id: '61198',
    type: 'email',
    title: '민준 Park | 환불 요청드립니다',
    status: 'pending',
    timestamp: 'Today at 1:20 PM',
    sla: null,
    preview: '구매한 상품에 문제가 있어 환불을 요청합니다.',
  },
  {
    id: '61303',
    type: 'chat',
    title: '서연 Choi | 비밀번호를 잊어버렸어요',
    status: 'open',
    timestamp: 'Today at 12:48 PM',
    sla: { value: '25m', type: 'success' },
    preview: '비밀번호를 잊어버려서 로그인이 안 돼요.',
    hasOnlineIndicator: true,
  },
];

const ticketIconSrc = {
  call: '/assets/Phone in.svg',
  chat: '/assets/Bubble.svg',
  email: '/assets/Email.svg',
};

function TicketIcon({ type }) {
  const src = ticketIconSrc[type] || ticketIconSrc.chat;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="ticket-item__channel-icon"
      width={16}
      height={16}
    />
  );
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

const channelFilterOptions = [
  { id: 'all', label: 'All channels' },
  { id: 'email', label: 'Email' },
  { id: 'message', label: 'Message' },
  { id: 'voice', label: 'Voice' },
];

const statusFilterOptions = [
  { id: 'all', label: 'All statuses' },
  { id: 'open', label: 'Open' },
  { id: 'on-hold', label: 'On-hold' },
  { id: 'pending', label: 'Pending' },
  { id: 'solved', label: 'Solved' },
];

const channelTypeMap = {
  email: 'email',
  message: 'chat',
  voice: 'call',
};

function FilterDropdown({ options, selectedValue, onSelectValue, buttonLabel }) {
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

  const selectedOption = options.find((option) => option.id === selectedValue) || options[0];
  const isDefaultSelection = selectedOption.id === 'all';

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className={`ticket-list__filter-btn ${isOpen ? 'ticket-list__filter-btn--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="ticket-list__filter-label">
          {isDefaultSelection ? buttonLabel : selectedOption.label}
        </span>
        <FilterIcon className="ticket-list__filter-icon" />
      </button>

      {isOpen && (
        <div className="filter-dropdown__menu">
          <div className="filter-dropdown__header">{buttonLabel}</div>
          {options.map((option) => {
            const isSelected = option.id === selectedValue;
            return (
              <button
                key={option.id}
                className={`filter-dropdown__item ${isSelected ? 'filter-dropdown__item--selected' : ''}`}
                onClick={() => {
                  onSelectValue(option.id);
                  setIsOpen(false);
                }}
                type="button"
              >
                <span className="filter-dropdown__item-label">{option.label}</span>
                {isSelected && <CheckIcon className="filter-dropdown__check-icon" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

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

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button
        className={`ticket-list__filter-btn ${isOpen ? 'ticket-list__filter-btn--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="ticket-list__filter-label">{selectedOption.label}</span>
        <SortIcon className="ticket-list__filter-icon" />
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

function TicketItem({ ticket, isSelected, onSelect }) {
  return (
    <div 
      className={`ticket-item ${isSelected ? 'ticket-item--selected' : ''}`}
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
        <div className="ticket-item__title-row">
          <h4 className="ticket-item__title">{ticket.title}</h4>
          {ticket.sla && <SLATag sla={ticket.sla} />}
        </div>
        
        <div className="ticket-item__subheader">
          <StatusBadge status={ticket.status} />
          {ticket.preview && (
            <span className="ticket-item__preview">{ticket.preview}</span>
          )}
        </div>
        
        <span className="ticket-item__timestamp">
          {ticket.timestamp} | #{ticket.id}
        </span>
      </div>
    </div>
  );
}

export { tickets };

export default function TicketList({ selectedTicket, onSelectTicket }) {
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Create a map to preserve original order for "recommended" sort
  const originalIndexMap = useMemo(() => {
    const map = new Map();
    tickets.forEach((ticket, index) => map.set(ticket, index));
    return map;
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const channelMatches =
        selectedChannel === 'all' || ticket.type === channelTypeMap[selectedChannel];
      const statusMatches = selectedStatus === 'all' || ticket.status === selectedStatus;

      return channelMatches && statusMatches;
    });
  }, [selectedChannel, selectedStatus]);

  // Sort tickets based on selected option
  const sortedTickets = useMemo(() => {
    const sorted = [...filteredTickets];
    const sortFn = sortFunctions[selectedSort];
    
    if (selectedSort === 'recommended') {
      sorted.sort((a, b) => sortFn(a, b, originalIndexMap));
    } else {
      sorted.sort(sortFn);
    }
    
    return sorted;
  }, [selectedSort, filteredTickets, originalIndexMap]);

  // Generate unique key for each ticket
  const getTicketKey = (ticket, index) => `${ticket.id}-${ticket.title}-${index}`;

  return (
    <div className="ticket-list">
      {/* Header */}
      <div className="ticket-list__header">
        <span className="ticket-list__count">{sortedTickets.length} tickets</span>
        <div className="ticket-list__actions">
          <FilterDropdown
            options={channelFilterOptions}
            selectedValue={selectedChannel}
            onSelectValue={setSelectedChannel}
            buttonLabel="Channel"
          />
          <FilterDropdown
            options={statusFilterOptions}
            selectedValue={selectedStatus}
            onSelectValue={setSelectedStatus}
            buttonLabel="Status"
          />
          <SortDropdown 
            selectedSort={selectedSort} 
            onSelectSort={setSelectedSort} 
          />
        </div>
      </div>
      
      {/* Ticket items */}
      <div className="ticket-list__items" key={selectedSort}>
        {sortedTickets.map((ticket, index) => (
          <TicketItem 
            key={getTicketKey(ticket, index)} 
            ticket={ticket} 
            isSelected={selectedTicket && getTicketKey(selectedTicket, tickets.indexOf(selectedTicket)) === getTicketKey(ticket, index)}
            onSelect={onSelectTicket}
          />
        ))}
      </div>
    </div>
  );
}
