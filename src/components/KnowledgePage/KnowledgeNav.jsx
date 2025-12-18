import { useState } from 'react';
import './KnowledgeNav.css';

// Icon components for the sidebar
function ArticlesIcon({ className, active }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3C3 2.44772 3.44772 2 4 2H16C16.5523 2 17 2.44772 17 3V17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17V3Z" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 6H14M6 9H14M6 12H10" stroke={active ? "var(--color-lime-dark)" : "currentColor"} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ModerateIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrangeIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4H17M3 8H13M3 12H17M3 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CustomizeIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function PermissionsIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 16C2 13.2386 4.23858 11 7 11H9C11.7614 11 14 13.2386 14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 8L17 10L15 12M13 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SettingsIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 2V4M10 16V18M2 10H4M16 10H18M4.93 4.93L6.34 6.34M13.66 13.66L15.07 15.07M15.07 4.93L13.66 6.34M6.34 13.66L4.93 15.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function SidebarCollapseIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="2.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="7.5" y1="2.5" x2="7.5" y2="17.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const primaryNavItems = [
  { id: 'articles', icon: ArticlesIcon, label: 'Manage articles', active: true },
  { id: 'moderate', icon: ModerateIcon, label: 'Moderate content' },
  { id: 'arrange', icon: ArrangeIcon, label: 'Arrange content' },
  { id: 'customize', icon: CustomizeIcon, label: 'Customize design' },
  { id: 'permissions', icon: PermissionsIcon, label: 'User permissions' },
  { id: 'settings', icon: SettingsIcon, label: 'Settings' },
];

const navSections = {
  lists: {
    title: 'Lists',
    items: [
      { id: 'all', label: 'All articles', count: 156, active: true },
      { id: 'published', label: 'Published', count: 120 },
      { id: 'drafts', label: 'Drafts', count: 114 },
    ]
  },
  reviewStatus: {
    title: 'Review status',
    items: [
      { id: 'in-progress', label: 'In progress', count: 124 },
      { id: 'awaiting-review', label: 'Awaiting review', count: 4 },
      { id: 'ready-to-publish', label: 'Ready to publish', count: 4 },
    ]
  },
  contentObjects: {
    title: 'Content objects',
    items: [
      { id: 'procedures', label: 'Procedures', count: 5 },
      { id: 'content-blocks', label: 'Content blocks', count: 4 },
      { id: 'components', label: 'Components', count: 4 },
      { id: 'rules', label: 'Rules', count: 16 },
      { id: 'styles', label: 'Styles', count: 24 },
      { id: 'templates', label: 'Templates', count: 125 },
      { id: 'flows', label: 'Flows', count: 44 },
    ]
  },
  tasks: {
    title: 'Tasks',
    items: [
      { id: 'assigned-to-me', label: 'Assigned to me', count: 65 },
      { id: 'scheduled', label: 'Scheduled', count: 24 },
    ]
  }
};

function NavSection({ title, items, selectedView, onSelectView, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="knowledge-nav__section">
      <button 
        className="knowledge-nav__section-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="knowledge-nav__section-title">{title}</span>
        <div className="knowledge-nav__section-line" />
        <ChevronDownIcon className={`knowledge-nav__section-chevron ${isOpen ? '' : 'collapsed'}`} />
      </button>
      
      {isOpen && (
        <div className="knowledge-nav__section-items">
          {items.map((item) => (
            <button
              key={item.id}
              className={`knowledge-nav__item ${selectedView === item.id ? 'active' : ''}`}
              onClick={() => onSelectView(item.id)}
            >
              <span className="knowledge-nav__item-label">{item.label}</span>
              <span className={`knowledge-nav__item-count ${selectedView === item.id ? 'active' : ''}`}>
                {item.count}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function KnowledgeNav({ selectedView, onSelectView, isCollapsed, onToggleCollapse }) {
  const [activePrimary, setActivePrimary] = useState('articles');

  return (
    <div className={`knowledge-nav ${isCollapsed ? 'knowledge-nav--collapsed' : ''}`}>
      <div className="knowledge-nav__primary">
        <div className="knowledge-nav__primary-items">
          {primaryNavItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activePrimary === item.id;
            return (
              <button
                key={item.id}
                className={`knowledge-nav__primary-item ${isActive ? 'active' : ''}`}
                onClick={() => setActivePrimary(item.id)}
                title={item.label}
              >
                <div className={`knowledge-nav__primary-icon-wrapper ${isActive ? 'active' : ''}`}>
                  <Icon className="knowledge-nav__primary-icon" active={isActive} />
                </div>
              </button>
            );
          })}
        </div>
        
        <button 
          className="knowledge-nav__collapse-btn" 
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggleCollapse}
        >
          <SidebarCollapseIcon className={`knowledge-nav__collapse-icon ${isCollapsed ? 'rotated' : ''}`} />
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="knowledge-nav__secondary">
          <div className="knowledge-nav__secondary-header">
            <h2 className="knowledge-nav__title">Manage articles</h2>
          </div>
          
          <div className="knowledge-nav__secondary-content">
            <NavSection 
              title={navSections.lists.title}
              items={navSections.lists.items}
              selectedView={selectedView}
              onSelectView={onSelectView}
            />
            
            <NavSection 
              title={navSections.reviewStatus.title}
              items={navSections.reviewStatus.items}
              selectedView={selectedView}
              onSelectView={onSelectView}
            />
            
            <NavSection 
              title={navSections.contentObjects.title}
              items={navSections.contentObjects.items}
              selectedView={selectedView}
              onSelectView={onSelectView}
            />
            
            <NavSection 
              title={navSections.tasks.title}
              items={navSections.tasks.items}
              selectedView={selectedView}
              onSelectView={onSelectView}
            />
          </div>
        </div>
      )}
    </div>
  );
}

