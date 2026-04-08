import { useEffect, useRef, useState } from 'react';
import './QueueNotifications.css';

function AlertWarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5L14.5 13H1.5L8 1.5Z"
        fill="#d67305"
        stroke="#d67305"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <rect x="7.25" y="6" width="1.5" height="3.5" rx="0.75" fill="white" />
      <rect x="7.25" y="10.5" width="1.5" height="1.5" rx="0.75" fill="white" />
    </svg>
  );
}

function AlertSuccessIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="#038153" />
      <path
        d="M5 8.25L7 10.25L11 6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M1 1L11 11M11 1L1 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * QueueNotification — a single toast card.
 *
 * Props:
 *   type        'warning' | 'success'
 *   title       string
 *   body        string
 *   onDismiss   () => void  — called after exit animation finishes
 *   onExited    () => void  — called after exit animation finishes (secondary hook)
 *   autoDismissMs  number  — ms before auto-dismiss (0 = no auto-dismiss)
 */
export function QueueNotification({ type, title, body, onDismiss, onExited, autoDismissMs = 0 }) {
  const [exiting, setExiting] = useState(false);
  const dismissedRef = useRef(false);

  const handleDismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setExiting(true);
  };

  // After exit animation, fire callbacks
  const handleTransitionEnd = (e) => {
    if (exiting && e.propertyName === 'opacity') {
      onDismiss?.();
      onExited?.();
    }
  };

  useEffect(() => {
    if (!autoDismissMs) return;
    const t = setTimeout(handleDismiss, autoDismissMs);
    return () => clearTimeout(t);
  }, [autoDismissMs]);

  const Icon = type === 'success' ? AlertSuccessIcon : AlertWarningIcon;

  return (
    <div
      className={`queue-notification queue-notification--${type}${exiting ? ' queue-notification--exiting' : ''}`}
      role="status"
      aria-live="polite"
      onTransitionEnd={handleTransitionEnd}
    >
      <span className="queue-notification__icon">
        <Icon />
      </span>

      <div className="queue-notification__content">
        <p className="queue-notification__title">{title}</p>
        <p className="queue-notification__body">{body}</p>
      </div>

      <button
        className="queue-notification__dismiss"
        aria-label="Dismiss notification"
        onClick={handleDismiss}
        type="button"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

/**
 * QueueNotificationsContainer — wraps all active notifications in a fixed overlay.
 */
export function QueueNotificationsContainer({ children }) {
  return (
    <div className="queue-notifications-container" aria-label="Notifications">
      {children}
    </div>
  );
}
