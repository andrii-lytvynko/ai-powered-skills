import { useState, useRef, useEffect } from 'react';
import { Button, IconButton } from '@zendeskgarden/react-buttons';
import { PlusIcon, BellIcon, AppsIcon, HelpIcon, SunIcon, MoonIcon, ChatIcon, PhoneIcon } from '../Icons';
import { useTheme } from '../../contexts';
import './Header.css';

function SearchIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Header() {
  const { theme, toggleTheme, isDarkModeAllowed } = useTheme();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      {/* Left section */}
      <div className="header__left">
        <IconButton aria-label="Search" className="header__icon-btn" isBasic>
          <SearchIcon className="header__icon" />
        </IconButton>
      </div>

      {/* Right section - Actions */}
      <div className="header__right">
        {/* Conversations button */}
        <button className="header__conversations-btn">
          <ChatIcon className="header__icon header__conversations-icon" />
          <span>Conversations</span>
          <span className="header__conversations-badge">0</span>
        </button>

        {/* Agent chat status with online indicator */}
        <div className="header__chat-status">
          <IconButton aria-label="Agent status" className="header__icon-btn" isBasic>
            <ChatIcon className="header__icon" />
          </IconButton>
          <span className="header__chat-status-dot" />
        </div>

        {/* Active call timer */}
        <div className="header__call-timer">
          <span className="header__call-timer-dot" />
          <span className="header__call-timer-text">00:03</span>
          <div className="header__call-timer-phone">
            <PhoneIcon className="header__call-timer-icon" />
          </div>
        </div>

        <div className="header__divider" />

        <span className="header__icon-btn-wrapper" title="Notifications">
          <IconButton aria-label="Notifications" className="header__icon-btn" isBasic>
            <BellIcon className="header__icon" />
          </IconButton>
          <span className="header__notification-badge">1</span>
        </span>

        <div className="header__divider" />

        {/* Avatar with dropdown */}
        <div className="header__profile" ref={profileMenuRef}>
          <button 
            className={`header__avatar ${isProfileMenuOpen ? 'header__avatar--active' : ''}`}
            title="Profile"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <div className="header__avatar-img">
              <span>JD</span>
            </div>
          </button>

          {isProfileMenuOpen && (
            <div className="header__profile-menu">
              <div className="header__profile-info">
                <div className="header__profile-avatar">
                  <span>JD</span>
                </div>
                <div className="header__profile-details">
                  <span className="header__profile-name">John Doe</span>
                  <span className="header__profile-email">john.doe@company.com</span>
                </div>
              </div>
              
              <div className="header__profile-divider" />

              {isDarkModeAllowed && (
                <>
                  <div className="header__profile-theme">
                    <span className="header__profile-theme-label">Theme</span>
                    <button
                      className="header__theme-toggle"
                      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                      onClick={toggleTheme}
                    >
                      <div className="header__theme-toggle-track">
                        <SunIcon className="header__theme-icon header__theme-icon--sun" />
                        <MoonIcon className="header__theme-icon header__theme-icon--moon" />
                        <div className={`header__theme-toggle-thumb ${theme === 'dark' ? 'header__theme-toggle-thumb--dark' : ''}`} />
                      </div>
                    </button>
                  </div>

                  <div className="header__profile-divider" />
                </>
              )}
              
              <button className="header__profile-menu-item">
                Settings
              </button>
              <button className="header__profile-menu-item header__profile-menu-item--danger" type="button">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
