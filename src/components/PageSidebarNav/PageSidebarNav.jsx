import { SidebarIcon } from '../Icons';
import './PageSidebarNav.css';

export default function PageSidebarNav({
  primaryItems = [],
  secondaryHeading,
  secondarySections = [],
  activeItem,
  onItemSelect,
  onPrimaryItemSelect,
  isCollapsed,
  onToggleCollapse,
}) {
  return (
    <div className={`page-sidebar-nav ${isCollapsed ? 'page-sidebar-nav--collapsed' : ''}`}>
      <div className="page-sidebar-nav__content">
        <nav className="page-sidebar-nav__primary">
          <div className="page-sidebar-nav__primary-items">
            {primaryItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`page-sidebar-nav__primary-item ${item.active ? 'active' : ''}`}
                  title={item.label}
                  onClick={onPrimaryItemSelect ? () => onPrimaryItemSelect(item.id) : undefined}
                >
                  <div className={`page-sidebar-nav__primary-icon-wrapper ${item.active ? 'active' : ''}`}>
                    {item.iconSrc ? (
                      <img
                        src={item.iconSrc}
                        alt={item.label}
                        className="page-sidebar-nav__primary-icon"
                      />
                    ) : (
                      <Icon className="page-sidebar-nav__primary-icon" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="page-sidebar-nav__primary-spacer" />
          <button
            className="page-sidebar-nav__collapse-btn"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={onToggleCollapse}
          >
            <SidebarIcon className={`page-sidebar-nav__collapse-icon ${isCollapsed ? 'rotated' : ''}`} />
          </button>
        </nav>

        {!isCollapsed && (
          <aside className="page-sidebar-nav__secondary">
            <div className="page-sidebar-nav__secondary-content">
              {secondaryHeading && (
                <h2 className="page-sidebar-nav__secondary-heading">{secondaryHeading}</h2>
              )}

              {secondarySections.map((section) => (
                <div key={section.title ?? section.items[0]?.id} className="page-sidebar-nav__secondary-section">
                  {section.title && (
                    <div className="page-sidebar-nav__secondary-section-header">
                      <span className="page-sidebar-nav__secondary-section-title">{section.title}</span>
                      <span className="page-sidebar-nav__secondary-section-line" />
                    </div>
                  )}
                  <div className="page-sidebar-nav__secondary-items">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        className={`page-sidebar-nav__secondary-item ${activeItem === item.id ? 'active' : ''}`}
                        onClick={() => onItemSelect && onItemSelect(item.id)}
                      >
                        <span className="page-sidebar-nav__secondary-item-label">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
