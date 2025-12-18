import { useState } from 'react';
import { 
  AIAgentsDashboardIcon,
  AIAgentsContentIcon,
  AIAgentsConversationsIcon,
  AIAgentsSettingsIcon,
  AIAgentsToolsIcon,
  AIAgentsUsersIcon,
  AIAgentsDatabaseIcon,
  AIAgentsIntegrationsIcon,
  AIAgentsPlugIcon,
  SidebarIcon
} from '../Icons';
import './AIAgentsNav.css';

const primaryNavItems = [
  { id: 'dashboard', icon: AIAgentsDashboardIcon, label: 'Analytics', active: true },
  { id: 'content', icon: AIAgentsContentIcon, label: 'Content' },
  { id: 'conversations', icon: AIAgentsConversationsIcon, label: 'Conversation logs' },
  { id: 'settings', icon: AIAgentsSettingsIcon, label: 'Settings' },
];

const secondaryNavItems = [
  { id: 'tools', icon: AIAgentsToolsIcon, label: 'AI agent management' },
  { id: 'users', icon: AIAgentsUsersIcon, label: 'User management' },
  { id: 'database', icon: AIAgentsDatabaseIcon, label: 'Integrations (Legacy)' },
  { id: 'integrations', icon: AIAgentsIntegrationsIcon, label: 'API Integrations' },
  { id: 'plug', icon: AIAgentsPlugIcon, label: 'Custom CRMs' },
];

const subNavItems = [
  { id: 'ugpt-performance', label: 'UGPT Performance', active: true },
  { id: 'performance-summary', label: 'Performance summary' },
  { id: 'conversation-journey', label: 'Conversation journey', badge: 'Beta' },
];

export default function AIAgentsNav({ isCollapsed, onToggleCollapse }) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [activeSecondaryItem, setActiveSecondaryItem] = useState(null);
  const [activeSubNavItem, setActiveSubNavItem] = useState('ugpt-performance');

  return (
    <nav className={`ai-agents-nav ${isCollapsed ? 'ai-agents-nav--collapsed' : ''}`}>
      <div className="ai-agents-nav__primary">
        <div className="ai-agents-nav__items">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                className={`ai-agents-nav__item ${isActive ? 'ai-agents-nav__item--active' : ''}`}
                onClick={() => {
                  setActiveItem(item.id);
                  setActiveSecondaryItem(null);
                }}
                title={item.label}
              >
                <Icon className="ai-agents-nav__item-icon" active={isActive} />
              </button>
            );
          })}
          
          <div className="ai-agents-nav__divider" />
          
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSecondaryItem === item.id;
            return (
              <button
                key={item.id}
                className={`ai-agents-nav__item ${isActive ? 'ai-agents-nav__item--active' : ''}`}
                onClick={() => {
                  setActiveSecondaryItem(item.id);
                  setActiveItem(null);
                }}
                title={item.label}
              >
                <Icon className="ai-agents-nav__item-icon" />
              </button>
            );
          })}
        </div>
        
        <div className="ai-agents-nav__footer">
          <button 
            className="ai-agents-nav__collapse-btn"
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <SidebarIcon className="ai-agents-nav__item-icon" />
          </button>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="ai-agents-nav__secondary">
          <div className="ai-agents-nav__secondary-header">
            <h2 className="ai-agents-nav__secondary-title">Analytics</h2>
          </div>
          
          <div className="ai-agents-nav__subnav">
            {subNavItems.map((item) => {
              const isActive = activeSubNavItem === item.id;
              return (
                <button
                  key={item.id}
                  className={`ai-agents-nav__subnav-item ${isActive ? 'ai-agents-nav__subnav-item--active' : ''}`}
                  onClick={() => setActiveSubNavItem(item.id)}
                >
                  <span className="ai-agents-nav__subnav-label">{item.label}</span>
                  {item.badge && (
                    <span className="ai-agents-nav__subnav-badge">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

