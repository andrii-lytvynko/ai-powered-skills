import { useState } from 'react';
import PageSidebarNav from '../PageSidebarNav';
import './WFMNav.css';

const navItems = [
  { id: 'reporting', iconSrc: '/assets/Bar chart square.svg', label: 'Reporting' },
  { id: 'scheduling', iconSrc: '/assets/Calendar.svg', label: 'Scheduling' },
  { id: 'forecasting', iconSrc: '/assets/Line graph square.svg', label: 'Forecasting' },
  { id: 'settings', iconSrc: '/assets/Gear.svg', label: 'Settings' },
];

const subNavItems = {
  reporting: [
    { id: 'agent-activity', label: 'Agent activity' },
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

  const primaryItemsWithActive = navItems.map(item => ({
    ...item,
    active: item.id === activeItem,
  }));

  const secondarySections = [{ items: currentSubNav }];

  return (
    <PageSidebarNav
      primaryItems={primaryItemsWithActive}
      secondaryHeading={currentNavItem?.label || 'Reporting'}
      secondarySections={secondarySections}
      activeItem={activeSubItem}
      onItemSelect={setActiveSubItem}
      onPrimaryItemSelect={handleNavItemClick}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
    />
  );
}
