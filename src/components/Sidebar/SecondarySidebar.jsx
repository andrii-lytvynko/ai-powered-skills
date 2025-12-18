import { TicketIcon, SidebarIcon } from '../Icons';
import './SecondarySidebar.css';

export default function SecondarySidebar({ onToggle }) {
  return (
    <aside className="secondary-sidebar">
      <div className="secondary-sidebar__content">
        {/* Main heading */}
        <h2 className="secondary-sidebar__heading">Agent's Home</h2>

        {/* Your work section */}
        <section className="sidebar-section">
          <div className="sidebar-section__header">
            <span className="sidebar-section__title">Your work</span>
            <span className="sidebar-section__line" />
          </div>
          <nav className="sidebar-nav">
            <button className="sidebar-nav__item sidebar-nav__item--active">
              <TicketIcon className="sidebar-nav__icon" />
              <span className="sidebar-nav__label">Tickets</span>
              <span className="sidebar-nav__badge-tag">240</span>
            </button>
          </nav>
        </section>

        {/* Shared work section */}
        <section className="sidebar-section">
          <div className="sidebar-section__header">
            <span className="sidebar-section__title">Shared work</span>
            <span className="sidebar-section__line" />
          </div>
          <nav className="sidebar-nav">
            <button className="sidebar-nav__item">
              <span className="sidebar-nav__label">CC'd</span>
            </button>
            <button className="sidebar-nav__item">
              <span className="sidebar-nav__label">Following</span>
            </button>
          </nav>
        </section>

        {/* Completed work section */}
        <section className="sidebar-section">
          <div className="sidebar-section__header">
            <span className="sidebar-section__title">Completed work</span>
            <span className="sidebar-section__line" />
          </div>
          <nav className="sidebar-nav">
            <button className="sidebar-nav__item">
              <span className="sidebar-nav__label">Last 30 days</span>
            </button>
          </nav>
        </section>
      </div>

      {/* Collapse button */}
      <button className="sidebar-collapse-btn" title="Collapse" onClick={onToggle}>
        <SidebarIcon className="sidebar-collapse-btn__icon" />
      </button>
    </aside>
  );
}
