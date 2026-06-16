import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts';
import { CheckIcon, Icon } from '../Icons';
import { assetUrl } from '../../utils/assetUrl';
import './ProfileMenu.css';

const STATUSES = [
  { value: 'available', label: 'Online' },
  { value: 'away', label: 'Away' },
  { value: 'transfers-only', label: 'Transfers only' },
  { value: 'offline', label: 'Offline' },
];

const STATUS_RING_COLOR = {
  available: '#00a656',
  away: '#f79a3e',
  'transfers-only': '#3091ec',
  offline: '#87929d',
};

const STATUS_ICON = {
  available:       assetUrl('/online.svg'),
  away:            assetUrl('/away.svg'),
  'transfers-only': assetUrl('/transfers.svg'),
  offline:         assetUrl('/offline.svg'),
};

function StatusDot({ value }) {
  const src = STATUS_ICON[value];
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="pm-status-dot"
      width={14}
      height={14}
    />
  );
}

export default function ProfileMenu({ className = '' }) {
  const { currentProduct, agentStatus, setAgentStatus } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const isSupport = currentProduct === 'support';

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentStatus = STATUSES.find(s => s.value === agentStatus) ?? STATUSES[0];
  const ringColor = STATUS_RING_COLOR[agentStatus] ?? STATUS_RING_COLOR.available;

  return (
    <div className={`profile-menu ${className}`} ref={menuRef}>
      <button
        className={`profile-menu__trigger ${isOpen ? 'profile-menu__trigger--active' : ''}`}
        aria-label="Profile menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div
          className="profile-menu__trigger-ring"
          style={isSupport ? { '--pm-ring-color': ringColor } : {}}
        >
          <div className="profile-menu__trigger-inner">
            <img src={assetUrl('/assets/Avatar.png')} alt="Profile avatar" className="profile-menu__trigger-img" />
          </div>
          {isSupport && (
            <div className="profile-menu__trigger-badge">
              <StatusDot value={agentStatus} />
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="profile-menu__dropdown" role="menu">

          {/* Profile header */}
          <div className="profile-menu__header" role="presentation">
            <div
              className="profile-menu__header-ring"
              style={isSupport ? { '--pm-ring-color': ringColor } : { '--pm-ring-color': 'transparent' }}
            >
              <div className="profile-menu__header-inner">
                <img src={assetUrl('/assets/Avatar.png')} alt="Profile avatar" />
              </div>
              {isSupport && (
                <div className="profile-menu__header-badge">
                  <StatusDot value={agentStatus} />
                </div>
              )}
            </div>
            <div className="profile-menu__header-info">
              <span className="profile-menu__header-name">John Doe</span>
              <span className="profile-menu__header-status">{currentStatus.label}</span>
            </div>
          </div>

          {/* Status list — support page only */}
          {isSupport && (
            <>
              <div className="profile-menu__sep" role="separator" />
              {STATUSES.map(({ value, label }) => {
                const isActive = agentStatus === value;
                return (
                  <button
                    key={value}
                    className={`profile-menu__status-item${isActive ? ' profile-menu__status-item--active' : ''}`}
                    role="menuitemradio"
                    aria-checked={isActive}
                    onClick={() => { setAgentStatus(value); setIsOpen(false); }}
                  >
                    <span className="profile-menu__status-check" aria-hidden="true">
                      {isActive && <CheckIcon />}
                    </span>
                    <StatusDot value={value} />
                    <span className="profile-menu__status-label">{label}</span>
                  </button>
                );
              })}
              <div className="profile-menu__sep" role="separator" />
            </>
          )}

          {/* General menu items */}
          <button className="profile-menu__item profile-menu__item--indented" role="menuitem">
            Manage profile
          </button>

          <button className="profile-menu__item profile-menu__item--indented" role="menuitem">
            Keyboard shortcuts
          </button>

          <button className="profile-menu__item profile-menu__item--with-icon" role="menuitem">
            <span className="profile-menu__item-indicator" aria-hidden="true" />
            <span className="profile-menu__item-label">Help</span>
            <span className="profile-menu__item-chevron" aria-hidden="true">
              <Icon name="chevron_right" className="profile-menu__chevron-icon" />
            </span>
          </button>

          <div className="profile-menu__sep" role="separator" />

          <button className="profile-menu__item profile-menu__item--indented profile-menu__item--danger" role="menuitem">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
