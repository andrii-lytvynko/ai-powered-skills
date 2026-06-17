import { useState, useRef, useEffect } from 'react';
import { IconButton } from '@zendeskgarden/react-buttons';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { ChevronDownIcon, Icon } from '../Icons';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { assetUrl } from '../../utils/assetUrl';
import './TopBar.css';

const ticketIconSrc = {
  call: assetUrl('/assets/Phone in.svg'),
  chat: assetUrl('/assets/Bubble.svg'),
  email: assetUrl('/assets/Email.svg'),
};

function parseTicketTitle(title = '') {
  const separatorIndex = title.indexOf(' | ');
  if (separatorIndex !== -1) {
    return {
      requester: title.slice(0, separatorIndex),
      subject: title.slice(separatorIndex + 3),
    };
  }
  return { requester: '', subject: title };
}

function getTicketKey(ticket) {
  return `${ticket.id}__${ticket.title}`;
}

function TicketTab({ ticket, isActive, onTabClick, onTabClose }) {
  const { requester, subject } = parseTicketTitle(ticket.title);
  const iconSrc = ticketIconSrc[ticket.type] || ticketIconSrc.email;
  const primaryText = subject || requester;
  const secondaryText = subject ? requester : '';

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onTabClose(ticket);
  };

  return (
    <button
      className={`topbar__ticket-tab ${isActive ? 'topbar__ticket-tab--active' : 'topbar__ticket-tab--inactive'}`}
      onClick={() => onTabClick(ticket)}
      title={ticket.title}
    >
      <div className="topbar__ticket-tab__icon-area">
        <img
          src={iconSrc}
          alt=""
          aria-hidden="true"
          className="topbar__ticket-tab__channel-icon"
          width={16}
          height={16}
        />
        {ticket.hasOnlineIndicator && (
          <span className="topbar__ticket-tab__status-dot" aria-hidden="true" />
        )}
      </div>

      <div className="topbar__ticket-tab__content">
        <span className="topbar__ticket-tab__primary">{primaryText}</span>
        {secondaryText && (
          <span className="topbar__ticket-tab__secondary">{secondaryText}</span>
        )}
      </div>

      <div
        className="topbar__ticket-tab__close"
        role="button"
        tabIndex={0}
        aria-label={`Close ticket ${ticket.title}`}
        onClick={handleCloseClick}
        onKeyDown={(e) => e.key === 'Enter' && handleCloseClick(e)}
      >
        <img src={assetUrl('/assets/X small.svg')} alt="" aria-hidden="true" width={12} height={12} />
      </div>
    </button>
  );
}

export default function TopBar({
  pageTitle,
  selectedProduct,
  products = [],
  onProductChange,
  isNavCollapsed = false,
  openTicketTabs = [],
  selectedTicket = null,
  onTicketTabClick,
  onTicketTabClose,
  onToggleCopilot,
  isCopilotOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleProductSelect = (product) => {
    if (onProductChange) onProductChange(product);
    setIsOpen(false);
  };

  const handleReset = () => {
    Object.keys(localStorage)
      .filter(k => k.startsWith('zenbox:'))
      .forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  return (
    <div className="topbar">
      {/* Left section */}
      <div className="topbar__left">
        <div className="topbar__logo">
          <img src={assetUrl('/assets/Logo zendesk.svg')} alt="Zendesk" className="topbar__logo-icon" />
        </div>

        <div className="topbar__product-wrapper" ref={dropdownRef}>
          <button
            className={`topbar__product-selector ${isOpen ? 'topbar__product-selector--active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="topbar__product-name">
              {selectedProduct?.name || 'Admin center'}
            </span>
            <ChevronDownIcon className={`topbar__chevron ${isOpen ? 'topbar__chevron--rotated' : ''}`} />
          </button>

          {isOpen && products.length > 0 && (
            <div className="topbar__dropdown">
              <div className="topbar__dropdown-list">
                {products.map((product) => {
                  const Icon = product.icon;
                  const isSelected = selectedProduct?.id === product.id;
                  return (
                    <button
                      key={product.id}
                      className={`topbar__dropdown-item ${isSelected ? 'topbar__dropdown-item--selected' : ''}`}
                      onClick={() => handleProductSelect(product)}
                    >
                      <Icon className="topbar__dropdown-icon" />
                      <span className="topbar__dropdown-name">{product.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {pageTitle && (
          <>
            <div className="topbar__divider" />
            <button className="topbar__page-title-btn">
              <span className="topbar__page-title">{pageTitle}</span>
            </button>
          </>
        )}
      </div>

      {/* Center section — ticket tabs */}
      {openTicketTabs.length > 0 && (
        <div className="topbar__center">
          {openTicketTabs.map((ticket) => {
            const isActive = selectedTicket && getTicketKey(selectedTicket) === getTicketKey(ticket);
            return (
              <TicketTab
                key={getTicketKey(ticket)}
                ticket={ticket}
                isActive={isActive}
                onTabClick={onTicketTabClick}
                onTabClose={onTicketTabClose}
              />
            );
          })}
        </div>
      )}

      {/* Right section */}
      <div className="topbar__right">
        <Tooltip content="Reset prototype">
          <IconButton aria-label="Reset prototype" isBasic onClick={handleReset}>
            <Icon name="restart_alt" />
          </IconButton>
        </Tooltip>

        <button
          className="topbar__icon-btn"
          title="AI Copilot"
          aria-pressed={isCopilotOpen}
          onClick={onToggleCopilot}
        >
          <img
            src={assetUrl(isCopilotOpen ? '/Copilot trigger-active.svg' : '/Copilot trigger.svg')}
            alt=""
            className="topbar__icon topbar__icon--copilot"
            aria-hidden="true"
          />
        </button>

        <button className="topbar__icon-btn" title="Help">
          <img src={assetUrl('/assets/help.svg')} alt="" className="topbar__icon" aria-hidden="true" />
        </button>

        <ProfileMenu />
      </div>
    </div>
  );
}
