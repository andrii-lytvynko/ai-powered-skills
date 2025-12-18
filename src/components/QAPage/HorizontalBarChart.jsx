import { useState } from 'react';
import { DrillDownIcon } from '../Icons';
import './HorizontalBarChart.css';

const defaultData = [
  { name: 'Closing', value: 100, percentage: 100 },
  { name: 'Empathy', value: 50, percentage: 50 },
  { name: 'Greeting', value: 32, percentage: 32 },
  { name: 'Spelling & Grammar', value: 28, percentage: 28 },
  { name: 'Tone', value: 24, percentage: 24 },
];

export default function HorizontalBarChart({ 
  title = 'Acceptance rate per category',
  data = defaultData,
  showMore = true,
  moreCount = 1
}) {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const visibleData = expanded ? data : data.slice(0, 5);
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bar-chart">
      <div className="bar-chart__header">
        <h3 className="bar-chart__title">
          {title}
          <DrillDownIcon className="bar-chart__drilldown" />
        </h3>
      </div>

      <div className="bar-chart__content">
        {visibleData.map((item, index) => (
          <div 
            key={item.name}
            className="bar-chart__row"
            onMouseEnter={() => setHoveredBar(index)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <div className="bar-chart__label">{item.name}</div>
            <div className="bar-chart__value">{item.value}%</div>
            <div className="bar-chart__bar-container">
              <div 
                className={`bar-chart__bar ${hoveredBar === index ? 'bar-chart__bar--hover' : ''}`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
              {hoveredBar === index && (
                <div className="bar-chart__tooltip">
                  <strong>{item.name}: {item.value}%</strong>
                  <span>120 of 240 conversations</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showMore && data.length > 5 && (
        <button 
          className="bar-chart__show-more"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : `Show ${moreCount} more`}
        </button>
      )}
    </div>
  );
}

