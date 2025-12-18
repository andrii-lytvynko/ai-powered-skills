import { useState, useRef, useEffect } from 'react';
import './LineChart.css';

const defaultDatasets = [
  {
    id: 'autoIQS',
    name: 'AutoQA Score',
    color: '#3b82f6',
    data: [85, 87, 82, 88, 86, 90, 85, 83, 87, 89, 91, 88],
    checked: true,
  },
  {
    id: 'empathy',
    name: 'Agent Empathy',
    color: '#8b5cf6',
    data: [78, 80, 75, 82, 79, 84, 80, 77, 81, 83, 85, 82],
    checked: true,
  },
  {
    id: 'tone',
    name: 'Tone',
    color: '#ec4899',
    data: [72, 74, 70, 76, 73, 78, 74, 71, 75, 77, 79, 76],
    checked: true,
  },
  {
    id: 'solution',
    name: 'Solution',
    color: '#10b981',
    data: [88, 90, 85, 92, 89, 94, 90, 87, 91, 93, 95, 92],
    checked: true,
  },
  {
    id: 'greeting',
    name: 'Greeting Quality',
    color: '#f59e0b',
    data: [82, 84, 79, 86, 83, 88, 84, 81, 85, 87, 89, 86],
    checked: true,
  },
  {
    id: 'closing',
    name: 'Closing',
    color: '#06b6d4',
    data: [90, 92, 87, 94, 91, 96, 92, 89, 93, 95, 97, 94],
    checked: true,
  },
  {
    id: 'overall',
    name: 'Overall',
    color: '#6366f1',
    data: [83, 85, 80, 87, 84, 89, 85, 82, 86, 88, 90, 87],
    checked: true,
  },
];

const timeRanges = ['Day', 'Week', 'Month'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function LineChart({ 
  title = 'Quality score over time',
  datasets = defaultDatasets,
}) {
  const [activeTimeRange, setActiveTimeRange] = useState('Month');
  const [checkedDatasets, setCheckedDatasets] = useState(
    datasets.reduce((acc, d) => ({ ...acc, [d.id]: d.checked }), {})
  );
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 200 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const { width } = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width: width - 48, height: 180 });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const toggleDataset = (id) => {
    setCheckedDatasets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const { width, height } = dimensions;
  const padding = { top: 10, right: 10, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const allValues = datasets.flatMap(d => d.data);
  const minValue = Math.min(...allValues) - 5;
  const maxValue = Math.max(...allValues) + 5;

  const xScale = (i) => padding.left + (i / (datasets[0].data.length - 1)) * chartWidth;
  const yScale = (v) => padding.top + chartHeight - ((v - minValue) / (maxValue - minValue)) * chartHeight;

  const createPath = (data) => {
    return data
      .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(v)}`)
      .join(' ');
  };

  const gridLines = [100, 85, 70];

  return (
    <div className="line-chart">
      <div className="line-chart__header">
        <h3 className="line-chart__title">{title}</h3>
        <div className="line-chart__time-range">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={`line-chart__time-btn ${activeTimeRange === range ? 'line-chart__time-btn--active' : ''}`}
              onClick={() => setActiveTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="line-chart__graph">
        <svg ref={svgRef} width="100%" height={height} viewBox={`0 0 ${width || 600} ${height}`}>
          {/* Grid lines */}
          {gridLines.map((value) => (
            <g key={value}>
              <line
                x1={padding.left}
                y1={yScale(value)}
                x2={width - padding.right}
                y2={yScale(value)}
                stroke="var(--color-grey-300)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 8}
                y={yScale(value)}
                textAnchor="end"
                alignmentBaseline="middle"
                fontSize="12"
                fill="var(--color-text-secondary)"
              >
                {value}%
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {months.slice(0, datasets[0].data.length).map((month, i) => (
            <text
              key={month}
              x={xScale(i)}
              y={height - 8}
              textAnchor="middle"
              fontSize="12"
              fill="var(--color-text-secondary)"
            >
              {month}
            </text>
          ))}

          {/* Data lines */}
          {datasets.map((dataset) => (
            checkedDatasets[dataset.id] && (
              <path
                key={dataset.id}
                d={createPath(dataset.data)}
                fill="none"
                stroke={dataset.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )
          ))}
        </svg>
      </div>

      <div className="line-chart__legend">
        {datasets.map((dataset) => (
          <label key={dataset.id} className="line-chart__legend-item">
            <input
              type="checkbox"
              checked={checkedDatasets[dataset.id]}
              onChange={() => toggleDataset(dataset.id)}
              className="line-chart__legend-checkbox"
            />
            <span 
              className="line-chart__legend-indicator" 
              style={{ backgroundColor: dataset.color }}
            />
            <span className="line-chart__legend-label">{dataset.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

