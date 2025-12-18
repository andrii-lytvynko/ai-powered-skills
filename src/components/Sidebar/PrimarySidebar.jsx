import { HomeIcon, InboxIcon, ContactsIcon, BuildingIcon, ShapesIcon, ChartIcon, GearIcon, SidebarIcon } from '../Icons';
import './PrimarySidebar.css';

const navItems = [
  { id: 'home', icon: HomeIcon, label: 'Home', active: true },
  { id: 'inbox', icon: InboxIcon, label: 'Views' },
  { id: 'contacts', icon: ContactsIcon, label: 'Customer lists' },
  { id: 'orgs', icon: BuildingIcon, label: 'Organizations' },
  { id: 'objects', icon: ShapesIcon, label: 'Custom objects' },
  { id: 'reports', icon: ChartIcon, label: 'Reporting' },
  { id: 'settings', icon: GearIcon, label: 'Admin' },
];

export default function PrimarySidebar({ isNavCollapsed, onToggleNav }) {
  return (
    <nav className="primary-sidebar">
      <div className="primary-sidebar__nav">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`primary-sidebar__item ${item.active ? 'active' : ''}`}
              title={item.label}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className={`primary-sidebar__icon-wrapper ${item.active ? 'active' : ''}`}>
                <Icon className="primary-sidebar__icon" active={item.active} />
              </div>
            </button>
          );
        })}
      </div>
      <div className="primary-sidebar__spacer" />
      {isNavCollapsed && (
        <button 
          className="primary-sidebar__expand-btn" 
          title="Expand sidebar"
          onClick={onToggleNav}
        >
          <SidebarIcon className="primary-sidebar__expand-icon" />
        </button>
      )}
    </nav>
  );
}


