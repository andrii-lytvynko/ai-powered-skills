import { assetUrl } from '../../utils/assetUrl';
import './SecondarySidebar.css';

const sections = [
  {
    title: 'Your work',
    items: [
      { label: 'Tickets', src: assetUrl('/assets/Inbox.svg'), active: true },
      { label: 'Auto assist', src: assetUrl('/assets/Headset sparkle.svg') },
    ],
  },
  {
    title: 'Shared work',
    items: [
      { label: "CC'd", src: assetUrl('/assets/people.svg') },
      { label: 'Following', src: assetUrl('/assets/Star.svg') },
    ],
  },
  {
    title: 'Completed work',
    items: [
      { label: 'Last 30 days', src: assetUrl('/assets/Calendar.svg') },
    ],
  },
];

export default function SecondarySidebar({ onToggle }) {
  return (
    <aside className="secondary-sidebar">
      <div className="secondary-sidebar__content">
        {sections.map((section) => (
          <section key={section.title} className="sidebar-section">
            <div className="sidebar-section__header">
              <span className="sidebar-section__title">{section.title}</span>
              <span className="sidebar-section__line" aria-hidden="true" />
            </div>
            <nav className="sidebar-nav">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  className={`sidebar-nav__item${item.active ? ' sidebar-nav__item--active' : ''}`}
                >
                  <img
                    src={item.src}
                    alt=""
                    aria-hidden="true"
                    className="sidebar-nav__icon"
                  />
                  <span className="sidebar-nav__label">{item.label}</span>
                </button>
              ))}
            </nav>
          </section>
        ))}
      </div>

      <button className="sidebar-collapse-btn" title="Collapse" onClick={onToggle}>
        <img
          src={assetUrl('/assets/Primary Nav Item/Sidebar.svg')}
          alt=""
          className="sidebar-collapse-btn__icon"
          aria-hidden="true"
        />
      </button>
    </aside>
  );
}
