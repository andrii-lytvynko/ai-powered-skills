import { useState, useRef, useEffect } from 'react';
import { PlusIcon, SearchIcon, BellIcon, AppsIcon, HelpIcon, SunIcon, MoonIcon } from '../Icons';
import { useTheme } from '../../contexts';
import './Header.css';

export default function Header({ onToggleWidgets, isWidgetsVisible, onOpenCommandPalette }) {
  const { theme, toggleTheme } = useTheme();
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
      {/* Left section - Add button */}
      <div className="header__left">
        <button className="header__add-btn">
          <PlusIcon className="header__add-icon" />
          <span>Add</span>
        </button>
      </div>

      {/* Center section - Search bar */}
      <button 
        className="header__search-bar"
        onClick={onOpenCommandPalette}
        type="button"
      >
        <SearchIcon className="header__search-bar-icon" />
        <span className="header__search-bar-text">Search for apps and commands or ask AI...</span>
        <span className="header__search-bar-shortcut">⌘ + K</span>
      </button>

      {/* Right section - Actions */}
      <div className="header__right">
        <button className="header__icon-btn" title="Notifications">
          <BellIcon className="header__icon" />
          <span className="header__notification-badge">5</span>
        </button>

        <button 
          className={`header__icon-btn ${isWidgetsVisible ? 'header__icon-btn--active' : ''}`} 
          title="Apps"
          onClick={onToggleWidgets}
        >
          <AppsIcon className="header__icon" />
        </button>

        <div className="header__divider" />

        <button className="header__icon-btn" title="Help">
          <HelpIcon className="header__icon" />
        </button>

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
              
              <button className="header__profile-menu-item">
                Settings
              </button>
              <button className="header__profile-menu-item header__profile-menu-item--danger">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
