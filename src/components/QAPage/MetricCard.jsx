import { TrendUpIcon, TrendDownIcon, InfoIcon } from '../Icons';
import './MetricCard.css';

export default function MetricCard({ 
  title, 
  value, 
  trend, 
  trendValue,
  info 
}) {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  
  return (
    <div className="metric-card">
      <div className="metric-card__header">
        <span className="metric-card__title">
          {title}
          {info && (
            <button className="metric-card__info" title={info}>
              <InfoIcon className="metric-card__info-icon" />
            </button>
          )}
        </span>
      </div>
      
      <div className="metric-card__trend-row">
        {trendValue && (
          <span className={`metric-card__trend ${isPositive ? 'metric-card__trend--up' : ''} ${isNegative ? 'metric-card__trend--down' : ''}`}>
            {isPositive ? '+' : ''}{trendValue}
            {isPositive && <TrendUpIcon className="metric-card__trend-icon" />}
            {isNegative && <TrendDownIcon className="metric-card__trend-icon" />}
          </span>
        )}
      </div>
      
      <div className="metric-card__value">
        {value}
      </div>
    </div>
  );
}

