import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { SearchIcon, SparkleIcon } from '../Icons';
import './CommandPalette.css';

// AI Assistant Icon (the friendly robot from design)
function AIAssistantIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="14" height="12" rx="3" fill="currentColor"/>
      <circle cx="7" cy="10" r="1.5" fill="var(--color-bg-white)"/>
      <circle cx="13" cy="10" r="1.5" fill="var(--color-bg-white)"/>
      <rect x="8" y="3" width="4" height="3" rx="1" fill="currentColor"/>
      <path d="M6 14h8" stroke="var(--color-bg-white)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// Product icons for different contexts
function AnalyticsIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="14" height="14" rx="2" fill="currentColor"/>
      <path d="M6 13V10M10 13V7M14 13V9" stroke="var(--color-bg-white)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function WorkforceIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="14" height="10" rx="2" fill="currentColor"/>
      <path d="M3 8h14M7 5v10M13 5v10" stroke="var(--color-bg-white)" strokeWidth="1.5"/>
    </svg>
  );
}

function TicketIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="16" height="12" rx="2" fill="currentColor"/>
      <path d="M6 8h8M6 11h5" stroke="var(--color-bg-white)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function DocumentIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3h8l4 4v10a2 2 0 01-2 2H4a2 2 0 01-2 2V5a2 2 0 012-2z" fill="currentColor"/>
      <path d="M6 9h8M6 12h8M6 15h4" stroke="var(--color-bg-white)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function GearIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="3" fill="var(--color-bg-white)"/>
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M15.07 4.93l-1.41 1.41M6.34 13.66l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function ChecklistIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="14" height="14" rx="2" fill="currentColor"/>
      <path d="M6 7l2 2 4-4M6 13h6" stroke="var(--color-bg-white)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="7" r="3" fill="currentColor"/>
      <path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6" fill="currentColor"/>
    </svg>
  );
}

function FlowIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/>
      <rect x="13" y="13" width="5" height="5" rx="1" fill="currentColor"/>
      <path d="M4.5 7v3a2 2 0 002 2h7a2 2 0 012-2V7" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function SearchDocIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="2"/>
      <path d="M13 13l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 7h4M7 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// Page-specific recommendations
const pageRecommendations = {
  // Support page (default/inbox)
  support: {
    title: 'Support actions',
    favorites: [
      { id: 'create-ticket', label: 'Create new ticket', icon: TicketIcon },
      { id: 'merge-tickets', label: 'Merge selected tickets', icon: TicketIcon },
      { id: 'assign-agent', label: 'Assign to agent', icon: UserIcon },
      { id: 'add-tags', label: 'Add tags to ticket', icon: TicketIcon },
    ],
    suggestions: [
      { id: 'summarize-ticket', label: 'Summarize this ticket conversation', query: true },
      { id: 'draft-response', label: 'Draft a response for this ticket', query: true },
      { id: 'find-similar', label: 'Find similar resolved tickets', query: true },
    ]
  },
  
  // Admin Center page
  admin: {
    title: 'Admin actions',
    favorites: [
      { id: 'create-trigger', label: 'Create new trigger', icon: FlowIcon },
      { id: 'manage-users', label: 'Manage user permissions', icon: UserIcon },
      { id: 'configure-sla', label: 'Configure SLA policies', icon: GearIcon },
      { id: 'view-audit', label: 'View audit log', icon: DocumentIcon },
    ],
    suggestions: [
      { id: 'optimize-triggers', label: 'Suggest trigger optimizations', query: true },
      { id: 'review-permissions', label: 'Review user permissions for compliance', query: true },
      { id: 'analyze-rules', label: 'Analyze business rule conflicts', query: true },
    ]
  },
  
  // Workforce Management
  workforce: {
    title: 'Workforce actions',
    favorites: [
      { id: 'generate-schedule', label: 'Generate schedule', icon: WorkforceIcon },
      { id: 'view-forecast', label: 'View demand forecast', icon: AnalyticsIcon },
      { id: 'manage-shifts', label: 'Manage shift patterns', icon: WorkforceIcon },
      { id: 'approve-pto', label: 'Approve time-off requests', icon: ChecklistIcon },
    ],
    suggestions: [
      { id: 'optimize-staffing', label: 'Optimize staffing for peak hours', query: true },
      { id: 'analyze-adherence', label: 'Analyze schedule adherence issues', query: true },
      { id: 'forecast-volume', label: 'Forecast next week ticket volume', query: true },
    ]
  },
  
  // Analytics page
  analytics: {
    title: 'Analytics actions',
    favorites: [
      { id: 'generate-report', label: 'Generate historical report', icon: AnalyticsIcon },
      { id: 'create-dashboard', label: 'Create custom dashboard', icon: AnalyticsIcon },
      { id: 'export-data', label: 'Export data to CSV', icon: DocumentIcon },
      { id: 'schedule-report', label: 'Schedule recurring report', icon: WorkforceIcon },
    ],
    suggestions: [
      { id: 'analyze-trends', label: 'Analyze ticket volume trends', query: true },
      { id: 'csat-insights', label: 'Get CSAT score insights', query: true },
      { id: 'agent-performance', label: 'Compare agent performance metrics', query: true },
    ]
  },
};

// Global commands available on all pages
const globalCommands = [
  { id: 'go-support', label: 'Go to Support', icon: TicketIcon, action: 'navigate', target: 'support' },
  { id: 'go-admin', label: 'Go to Admin Center', icon: GearIcon, action: 'navigate', target: 'admin' },
  { id: 'go-workforce', label: 'Go to Workforce management', icon: WorkforceIcon, action: 'navigate', target: 'workforce' },
];

// Recent history (would typically come from localStorage or API)
const defaultHistory = [
  { id: 'summarise-history', label: "Summarise customer's history", query: true },
  { id: 'analyze-feedback', label: 'Analyze customer feedback trends', query: true },
  { id: 'assess-satisfaction', label: 'Assess overall customer satisfaction levels', query: true },
];

export default function CommandPalette({ 
  isOpen, 
  onClose, 
  currentPage = 'support',
  history = defaultHistory,
  onCommandSelect,
  onAIQuery,
  onNavigate
}) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const overlayRef = useRef(null);

  // Get page-specific recommendations
  const pageContext = useMemo(() => {
    return pageRecommendations[currentPage] || pageRecommendations.support;
  }, [currentPage]);

  // Filter items based on search
  const filteredFavorites = useMemo(() => {
    if (!searchValue) return pageContext.favorites;
    return pageContext.favorites.filter(item => 
      item.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [pageContext.favorites, searchValue]);

  const filteredSuggestions = useMemo(() => {
    if (!searchValue) return pageContext.suggestions;
    return pageContext.suggestions.filter(item => 
      item.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [pageContext.suggestions, searchValue]);

  const filteredHistory = useMemo(() => {
    if (!searchValue) return history;
    return history.filter(item => 
      item.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [history, searchValue]);

  const filteredGlobalCommands = useMemo(() => {
    if (!searchValue) return [];
    return globalCommands.filter(item => 
      item.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  // All selectable items for keyboard navigation
  const allItems = useMemo(() => [
    ...filteredFavorites, 
    ...filteredSuggestions, 
    ...filteredGlobalCommands,
    ...filteredHistory
  ], [filteredFavorites, filteredSuggestions, filteredGlobalCommands, filteredHistory]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSearchValue('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < allItems.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : allItems.length - 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (searchValue.trim() && allItems.length === 0) {
          // AI query mode when no results match
          onAIQuery?.(searchValue);
          onClose();
        } else if (allItems[selectedIndex]) {
          handleItemSelect(allItems[selectedIndex]);
        }
        break;
      default:
        break;
    }
  }, [isOpen, allItems, selectedIndex, searchValue, onClose, onAIQuery]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleItemSelect = (item) => {
    if (item.query) {
      onAIQuery?.(item.label);
    } else if (item.action === 'navigate') {
      onNavigate?.(item.target);
    } else {
      onCommandSelect?.(item);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette-backdrop">
      <div className="command-palette" ref={overlayRef}>
        {/* Search Header */}
        <div className="command-palette__search">
          <div className="command-palette__search-left">
            <AIAssistantIcon className="command-palette__search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="command-palette__input"
              placeholder="Ask me anything..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setSelectedIndex(0);
              }}
            />
          </div>
          <div className="command-palette__shortcut">
            <span>⌘ + K</span>
          </div>
        </div>

        {/* Content */}
        <div className="command-palette__content">
          {/* Page Context Header */}
          {!searchValue && (
            <div className="command-palette__context-header">
              <span className="command-palette__context-badge">{pageContext.title}</span>
            </div>
          )}

          {/* Quick Actions Section */}
          {filteredFavorites.length > 0 && (
            <div className="command-palette__section">
              <div className="command-palette__section-header">
                <span className="command-palette__section-title">Quick actions</span>
              </div>
              <div className="command-palette__items">
                {filteredFavorites.map((item, index) => {
                  const Icon = item.icon;
                  const globalIndex = index;
                  return (
                    <button
                      key={item.id}
                      className={`command-palette__item ${selectedIndex === globalIndex ? 'selected' : ''}`}
                      onClick={() => handleItemSelect(item)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                    >
                      <Icon className="command-palette__item-icon" />
                      <span className="command-palette__item-label">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI Suggestions Section */}
          {filteredSuggestions.length > 0 && (
            <div className="command-palette__section">
              <div className="command-palette__section-header">
                <span className="command-palette__section-title">Ask AI</span>
              </div>
              <div className="command-palette__items">
                {filteredSuggestions.map((item, index) => {
                  const globalIndex = filteredFavorites.length + index;
                  return (
                    <button
                      key={item.id}
                      className={`command-palette__item ${selectedIndex === globalIndex ? 'selected' : ''}`}
                      onClick={() => handleItemSelect(item)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                    >
                      <AIAssistantIcon className="command-palette__item-icon command-palette__item-icon--ai" />
                      <span className="command-palette__item-label">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Section - Only shows when searching */}
          {filteredGlobalCommands.length > 0 && (
            <div className="command-palette__section">
              <div className="command-palette__section-header">
                <span className="command-palette__section-title">Navigate to</span>
              </div>
              <div className="command-palette__items">
                {filteredGlobalCommands.map((item, index) => {
                  const Icon = item.icon;
                  const globalIndex = filteredFavorites.length + filteredSuggestions.length + index;
                  return (
                    <button
                      key={item.id}
                      className={`command-palette__item ${selectedIndex === globalIndex ? 'selected' : ''}`}
                      onClick={() => handleItemSelect(item)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                    >
                      <Icon className="command-palette__item-icon" />
                      <span className="command-palette__item-label">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* History Section */}
          {filteredHistory.length > 0 && !searchValue && (
            <div className="command-palette__section">
              <div className="command-palette__section-header">
                <span className="command-palette__section-title">Recent</span>
              </div>
              <div className="command-palette__items">
                {filteredHistory.map((item, index) => {
                  const globalIndex = filteredFavorites.length + filteredSuggestions.length + filteredGlobalCommands.length + index;
                  return (
                    <button
                      key={item.id}
                      className={`command-palette__item ${selectedIndex === globalIndex ? 'selected' : ''}`}
                      onClick={() => handleItemSelect(item)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                    >
                      <AIAssistantIcon className="command-palette__item-icon command-palette__item-icon--ai" />
                      <span className="command-palette__item-label">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* No results state */}
          {allItems.length === 0 && searchValue && (
            <div className="command-palette__empty">
              <AIAssistantIcon className="command-palette__empty-icon" />
              <p className="command-palette__empty-text">
                Press <strong>Enter</strong> to ask AI: "{searchValue}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

