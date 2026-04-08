import './DataWidget.css';

function InfoIcon() {
  return (
    <svg
      className="data-widget__info-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 7.5V11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="8" cy="5.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function TrendChevron({ direction }) {
  const isUp = direction === 'up';
  return (
    <svg
      className={`data-widget__chevron data-widget__chevron--${direction}`}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ transform: isUp ? 'rotate(180deg)' : undefined }}
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * DataWidget — reusable metric card for displaying a single KPI with optional trend
 * and comparison context.
 *
 * @param {string}   label          - Metric label displayed in the header (e.g. "Agent handle time")
 * @param {string}   value          - Primary value (e.g. "22%", "~42 hrs/wk")
 * @param {'up'|'down'|null} trendDirection - Chevron direction; null = no chevron
 * @param {'success'|'warning'|'danger'|'default'} valueVariant - Color applied to value and chevron
 * @param {string}   [annotation]   - Short text shown inline after the value (e.g. "11.1 min predicted")
 * @param {string}   [footnote]     - Muted comparison text on a second row (e.g. "vs. 14.2 min (30-day avg)")
 * @param {string}   [className]    - Optional extra CSS class on the root element
 */
export default function DataWidget({
  label,
  value,
  trendDirection = null,
  valueVariant = 'default',
  annotation,
  footnote,
  className = '',
}) {
  return (
    <div className={`data-widget ${className}`.trim()}>
      {/* Header row: info icon + label */}
      <div className="data-widget__header">
        <InfoIcon />
        <span className="data-widget__label">{label}</span>
      </div>

      {/* Value row: optional chevron + value + optional annotation */}
      <div className="data-widget__value-row">
        {trendDirection && <TrendChevron direction={trendDirection} />}
        <span className={`data-widget__value data-widget__value--${valueVariant}`}>
          {value}
        </span>
        {annotation && (
          <span className="data-widget__annotation">{annotation}</span>
        )}
      </div>

      {/* Footnote row: optional muted comparison text */}
      {footnote && (
        <div className="data-widget__footnote">{footnote}</div>
      )}
    </div>
  );
}
