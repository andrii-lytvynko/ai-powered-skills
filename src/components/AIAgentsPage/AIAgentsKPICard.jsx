import { InfoIcon } from '../Icons';
import './AIAgentsKPICard.css';

export default function AIAgentsKPICard({ 
  title, 
  description, 
  value, 
  trend,
  trendValue,
  bars = []
}) {
  const isPositiveTrend = trend === 'up';
  
  return (
    <div className="ai-kpi-card">
      <div className="ai-kpi-card__header">
        <h3 className="ai-kpi-card__title">{title}</h3>
        <p className="ai-kpi-card__description">{description}</p>
      </div>
      
      <div className="ai-kpi-card__stats">
        <span className="ai-kpi-card__value">{value}</span>
        <span className={`ai-kpi-card__trend ${isPositiveTrend ? 'ai-kpi-card__trend--up' : 'ai-kpi-card__trend--down'}`}>
          {isPositiveTrend ? '+' : '-'} {trendValue} from last week
        </span>
      </div>
      
      <div className="ai-kpi-card__bars">
        {bars.map((bar, index) => (
          <div key={index} className="ai-kpi-card__bar-item">
            <div className="ai-kpi-card__bar-header">
              <div className="ai-kpi-card__bar-label">
                <span className="ai-kpi-card__bar-name">{bar.name}</span>
                <InfoIcon className="ai-kpi-card__bar-info" />
              </div>
              <div className="ai-kpi-card__bar-values">
                <span className="ai-kpi-card__bar-percentage">{bar.percentage}%</span>
                <span className="ai-kpi-card__bar-count">({bar.count})</span>
              </div>
            </div>
            <div className="ai-kpi-card__bar-track">
              <div 
                className={`ai-kpi-card__bar-fill ai-kpi-card__bar-fill--${bar.color || 'blue'}`}
                style={{ width: `${bar.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

