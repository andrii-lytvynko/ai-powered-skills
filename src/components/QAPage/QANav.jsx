import { useState } from 'react';
import { 
  QADashboardIcon, 
  QAConversationsIcon, 
  QAAssignmentsIcon, 
  QADisputesIcon, 
  QACalibrationIcon,
  QALogoIcon,
  SidebarIcon
} from '../Icons';
import './QANav.css';

const navItems = [
  { id: 'dashboard', icon: QADashboardIcon, label: 'Dashboard', active: true },
  { id: 'conversations', icon: QAConversationsIcon, label: 'Conversations' },
  { id: 'assignments', icon: QAAssignmentsIcon, label: 'Assignments' },
  { id: 'disputes', icon: QADisputesIcon, label: 'Disputes' },
  { id: 'calibration', icon: QACalibrationIcon, label: 'Calibration' },
];

const subNavItems = {
  dashboard: [
    { id: 'autoqa', label: 'AutoQA', active: true },
    { id: 'manual-reviews', label: 'Manual reviews' },
    { id: 'scorecard', label: 'Scorecard' },
    { id: 'coaching', label: 'Coaching' },
  ],
  conversations: [
    { id: 'all', label: 'All conversations' },
    { id: 'pending', label: 'Pending review' },
    { id: 'reviewed', label: 'Reviewed' },
  ],
  assignments: [
    { id: 'my-assignments', label: 'My assignments' },
    { id: 'team-assignments', label: 'Team assignments' },
  ],
  disputes: [
    { id: 'open', label: 'Open disputes' },
    { id: 'resolved', label: 'Resolved' },
  ],
  calibration: [
    { id: 'sessions', label: 'Calibration sessions' },
    { id: 'results', label: 'Results' },
  ],
};

export default function QANav({ isCollapsed, onToggleCollapse }) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [activeSubItem, setActiveSubItem] = useState('autoqa');

  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
    // Set default sub-item when switching nav items
    const subItems = subNavItems[itemId];
    if (subItems && subItems.length > 0) {
      setActiveSubItem(subItems[0].id);
    }
  };

  const currentSubNav = subNavItems[activeItem] || [];
  const currentNavItem = navItems.find(item => item.id === activeItem);

  return (
    <nav className={`qa-nav ${isCollapsed ? 'qa-nav--collapsed' : ''}`}>
      <div className="qa-nav__primary">
        <div className="qa-nav__logo">
          <QALogoIcon className="qa-nav__logo-icon" />
        </div>
        
        <div className="qa-nav__items">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                className={`qa-nav__item ${isActive ? 'qa-nav__item--active' : ''}`}
                onClick={() => handleNavItemClick(item.id)}
                title={item.label}
              >
                <Icon className="qa-nav__item-icon" active={isActive} />
              </button>
            );
          })}
        </div>
        
        <div className="qa-nav__footer">
          <button 
            className="qa-nav__collapse-btn" 
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggleCollapse}
          >
            <SidebarIcon className={`qa-nav__collapse-icon ${isCollapsed ? 'rotated' : ''}`} />
          </button>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="qa-nav__secondary">
          <div className="qa-nav__secondary-header">
            <h2 className="qa-nav__secondary-title">{currentNavItem?.label || 'Dashboard'}</h2>
          </div>
          
          <div className="qa-nav__subnav">
            {currentSubNav.map((item) => {
              const isActive = activeSubItem === item.id;
              return (
                <button
                  key={item.id}
                  className={`qa-nav__subnav-item ${isActive ? 'qa-nav__subnav-item--active' : ''}`}
                  onClick={() => setActiveSubItem(item.id)}
                >
                  <span className="qa-nav__subnav-label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

