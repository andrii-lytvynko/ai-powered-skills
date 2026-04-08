import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import { SM } from '@zendeskgarden/react-typography';
import './VoiceCallWidget.css';

const COUNTDOWN_SECONDS = 30;

const PHONE_ICON_COLOR = '#037f52';

function PhoneInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10.5 1.5H14.5M14.5 1.5V5.5M14.5 1.5L9.5 6.5"
        stroke={PHONE_ICON_COLOR}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.354 10.146a.5.5 0 0 0-.708 0l-1.171 1.172a8.112 8.112 0 0 1-2.707-1.793 8.112 8.112 0 0 1-1.793-2.707L6.146 5.647a.5.5 0 0 0 0-.707L4.354 3.147a.5.5 0 0 0-.707 0L2.293 4.5c-.392.39-.507.974-.3 1.47a14.18 14.18 0 0 0 8.037 8.037c.496.207 1.08.093 1.47-.3l1.354-1.353a.5.5 0 0 0 0-.708l-1.5-1.5z"
        fill={PHONE_ICON_COLOR}
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 7.5L6 4L9.5 7.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * VoiceCallWidget — incoming call floating card.
 *
 * Props:
 *   onAccept   () => void
 *   onDecline  () => void
 */
export function VoiceCallWidget({ onAccept, onDecline }) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [inQueueSecs, setInQueueSecs] = useState(5);
  const [showDetails, setShowDetails] = useState(false);
  const [exiting, setExiting] = useState(false);
  const handledRef = useRef(false);
  const onDeclineRef = useRef(onDecline);
  const onAcceptRef = useRef(onAccept);

  useEffect(() => { onDeclineRef.current = onDecline; }, [onDecline]);
  useEffect(() => { onAcceptRef.current = onAccept; }, [onAccept]);

  const triggerExit = useCallback((callbackRef) => {
    if (handledRef.current) return;
    handledRef.current = true;
    setExiting(true);
    setTimeout(() => callbackRef.current?.(), 190);
  }, []);

  const handleAccept = useCallback(() => triggerExit(onAcceptRef), [triggerExit]);
  const handleDecline = useCallback(() => triggerExit(onDeclineRef), [triggerExit]);

  // Main countdown — auto-decline at 0
  useEffect(() => {
    if (secondsLeft <= 0) {
      triggerExit(onDeclineRef);
      return;
    }
    const t = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, triggerExit]);

  // "In queue X sec" counter
  useEffect(() => {
    const t = setInterval(() => setInQueueSecs(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const progressPercent = (secondsLeft / COUNTDOWN_SECONDS) * 100;

  return (
    <div
      className={`voice-call-widget${exiting ? ' voice-call-widget--exiting' : ''}`}
      role="dialog"
      aria-label="Incoming voice call"
      aria-modal="false"
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="voice-call-widget__header">
        <div className="voice-call-widget__caller-icon">
          <PhoneInIcon />
        </div>

        <div className="voice-call-widget__header-content">
          <div className="voice-call-widget__header-top">
            <span className="voice-call-widget__caller-name">Rachel Adams</span>
            <span className="voice-call-widget__queue-time">
              In queue {inQueueSecs} sec
            </span>
          </div>
          <p className="voice-call-widget__subtitle">
            Incoming call{' '}
            <span className="voice-call-widget__ticket-link">#1237</span>
          </p>
        </div>
      </div>

      {/* ── Previous ticket summary ──────────────────────────── */}
      <div className="voice-call-widget__summary">
        <p className="voice-call-widget__summary-label">Previous ticket summary</p>
        <p className="voice-call-widget__summary-text">
          The customer contacted support to find out the current status and exact
          location of their order.
        </p>
        <div className="voice-call-widget__ticket-meta">
          <span className="voice-call-widget__status-dot" aria-hidden="true" />
          <span className="voice-call-widget__meta-text">
            Open • 1 Jan 19:29 •{' '}
            <span className="voice-call-widget__ticket-link">#54264</span>
          </span>
        </div>
      </div>

      {/* ── Show details accordion ───────────────────────────── */}
      <div className="voice-call-widget__accordion">
        <button
          type="button"
          className="voice-call-widget__details-toggle"
          onClick={() => setShowDetails(s => !s)}
          aria-expanded={showDetails}
        >
          <span>Show details</span>
          {showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>

        {showDetails && (
          <div className="voice-call-widget__details-body">
            <SM style={{ color: 'var(--color-text-secondary)' }}>
              Contact: rachel.adams@example.com
            </SM>
            <SM style={{ color: 'var(--color-text-secondary)' }}>
              Phone: +1 415 555 0182
            </SM>
            <SM style={{ color: 'var(--color-text-secondary)' }}>
              Language: English
            </SM>
          </div>
        )}
      </div>

      {/* ── Actions ─────────────────────────────────────────── */}
      <div className="voice-call-widget__actions">
        <Button
          isDanger
          isBasic={false}
          size="small"
          onClick={handleDecline}
          style={{ flex: 1 }}
        >
          Decline
        </Button>
        <Button
          isPrimary
          size="small"
          onClick={handleAccept}
          style={{ flex: 1 }}
        >
          Accept
        </Button>
      </div>

      {/* ── Progress bar (countdown) ─────────────────────────── */}
      <div className="voice-call-widget__progress-track" aria-hidden="true">
        <div
          className="voice-call-widget__progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export default VoiceCallWidget;
