import { useState } from 'react';
import { 
  ChartIcon,
  SidebarIcon,
  Icon
} from '../Icons';
import './WFMNav.css';

// WFM-specific icons
function WFMLogoIcon({ className }) {
  return <Icon name="grid_view" className={className} size="lg" />;
}

function WFMReportingIcon({ className, active }) {
  return <Icon name="monitoring" className={className} outlined={!active} />;
}

function WFMSchedulingIcon({ className, active }) {
  return <Icon name="calendar_month" className={className} outlined={!active} />;
}

function WFMForecastingIcon({ className, active }) {
  return <Icon name="timeline" className={className} outlined={!active} />;
}

function WFMSettingsIcon({ className, active }) {
  return <Icon name="settings" className={className} outlined={!active} />;
}

const navItems = [
  { id: 'reporting', icon: WFMReportingIcon, label: 'Reporting', active: true },
  { id: 'scheduling', icon: WFMSchedulingIcon, label: 'Scheduling' },
  { id: 'forecasting', icon: WFMForecastingIcon, label: 'Forecasting' },
  { id: 'settings', icon: WFMSettingsIcon, label: 'Settings' },
];

const subNavItems = {
  reporting: [
    { id: 'agent-activity', label: 'Agent activity', active: true },
    { id: 'agent-attendance', label: 'Agent attendance' },
    { id: 'agent-status', label: 'Agent status' },
    { id: 'performance-boards', label: 'Performance boards' },
  ],
  scheduling: [
    { id: 'schedules', label: 'Schedules' },
    { id: 'time-off', label: 'Time off' },
    { id: 'shift-trades', label: 'Shift trades' },
  ],
  forecasting: [
    { id: 'volume', label: 'Volume forecasting' },
    { id: 'staffing', label: 'Staffing needs' },
  ],
  settings: [
    { id: 'general', label: 'General' },
    { id: 'workstreams', label: 'Workstreams' },
    { id: 'teams', label: 'Teams' },
  ],
};

export default function WFMNav({ isCollapsed, onToggleCollapse }) {
  const [activeItem, setActiveItem] = useState('reporting');
  const [activeSubItem, setActiveSubItem] = useState('agent-activity');

  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
    const subItems = subNavItems[itemId];
    if (subItems && subItems.length > 0) {
      setActiveSubItem(subItems[0].id);
    }
  };

  const currentSubNav = subNavItems[activeItem] || [];
  const currentNavItem = navItems.find(item => item.id === activeItem);

  return (
    <nav className={`wfm-nav ${isCollapsed ? 'wfm-nav--collapsed' : ''}`}>
      <div className="wfm-nav__primary">
        <div className="wfm-nav__logo">
          <WFMLogoIcon className="wfm-nav__logo-icon" />
        </div>
        
        <div className="wfm-nav__items">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                className={`wfm-nav__item ${isActive ? 'wfm-nav__item--active' : ''}`}
                onClick={() => handleNavItemClick(item.id)}
                title={item.label}
              >
                <Icon className="wfm-nav__item-icon" active={isActive} />
              </button>
            );
          })}
        </div>
        
        <div className="wfm-nav__footer">
          <button 
            className="wfm-nav__collapse-btn" 
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggleCollapse}
          >
            <SidebarIcon className={`wfm-nav__collapse-icon ${isCollapsed ? 'rotated' : ''}`} />
          </button>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="wfm-nav__secondary">
          <div className="wfm-nav__secondary-header">
            <h2 className="wfm-nav__secondary-title">{currentNavItem?.label || 'Reporting'}</h2>
          </div>
          
          <div className="wfm-nav__subnav">
            {currentSubNav.map((item) => {
              const isActive = activeSubItem === item.id;
              return (
                <button
                  key={item.id}
                  className={`wfm-nav__subnav-item ${isActive ? 'wfm-nav__subnav-item--active' : ''}`}
                  onClick={() => setActiveSubItem(item.id)}
                >
                  <span className="wfm-nav__subnav-label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}





