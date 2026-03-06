import './PrimarySidebar.css';

const navItems = [
  { id: 'home',     src: '/assets/home.svg',              label: 'Home',           active: true },
  { id: 'inbox',    src: '/assets/Inbox.svg',             label: 'Views' },
  { id: 'contacts', src: '/assets/people.svg',            label: 'Customer lists' },
  { id: 'orgs',     src: '/assets/account.svg',           label: 'Organizations' },
  { id: 'objects',  src: '/assets/objects.svg',           label: 'Custom objects' },
  { id: 'reports',  src: '/assets/Bar chart square.svg',  label: 'Reporting' },
  { id: 'settings', src: '/assets/Gear.svg',              label: 'Admin' },
];

export default function PrimarySidebar({ isNavCollapsed, onToggleNav, onNavigateHome }) {
  const handleItemClick = (item) => {
    if (item.id === 'home' && onNavigateHome) {
      onNavigateHome();
    }
  };

  return (
    <nav className="primary-sidebar">
      <div className="primary-sidebar__nav">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            className={`primary-sidebar__item ${item.active ? 'active' : ''}`}
            title={item.label}
            style={{ animationDelay: `${index * 30}ms` }}
            onClick={() => handleItemClick(item)}
          >
            <div className={`primary-sidebar__icon-wrapper ${item.active ? 'active' : ''}`}>
              <img
                src={item.src}
                alt={item.label}
                className="primary-sidebar__icon"
                aria-hidden="true"
              />
            </div>
          </button>
        ))}
      </div>
      <div className="primary-sidebar__spacer" />
      {isNavCollapsed && (
        <button
          className="primary-sidebar__expand-btn"
          title="Expand sidebar"
          onClick={onToggleNav}
        >
          <img
            src="/assets/Primary Nav Item/Sidebar.svg"
            alt=""
            aria-hidden="true"
            className="primary-sidebar__expand-icon"
          />
        </button>
      )}
    </nav>
  );
}


