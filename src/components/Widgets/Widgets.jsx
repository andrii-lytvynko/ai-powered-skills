import './Widgets.css';

function StatColumns({ columns }) {
  return (
    <div className="stat-columns">
      {columns.map((col, i) => (
        <div key={i} className="stat-columns__group">
          {i > 0 && <div className="stat-columns__divider" />}
          <div className="stat-columns__item">
            <span className="stat-columns__value">{col.value}</span>
            <span className="stat-columns__label">{col.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function WidgetCard({ title, subtitle, children }) {
  return (
    <div className="widget-card">
      <div className="widget-card__header">
        <span className="widget-card__title">{title}</span>
        {subtitle && <span className="widget-card__subtitle">{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

function UpdateItem({ text, time }) {
  return (
    <div className="update-item">
      <p className="update-item__text">{text}</p>
      <span className="update-item__time">{time}</span>
    </div>
  );
}

export default function Widgets() {
  return (
    <aside className="widgets">
      {/* Ticket Statistics */}
      <WidgetCard title="Ticket statistics" subtitle="This week">
        <StatColumns columns={[
          { value: '74', label: 'Good' },
          { value: '3', label: 'Bad' },
          { value: '26', label: 'Solved' },
        ]} />
      </WidgetCard>

      {/* Satisfaction Statistics */}
      <WidgetCard title="Satisfaction statistics" subtitle="60 days">
        <StatColumns columns={[
          { value: '100%', label: 'You' },
          { value: '97%', label: 'Help desk' },
        ]} />
      </WidgetCard>

      {/* Open Tickets */}
      <WidgetCard title="Open tickets">
        <StatColumns columns={[
          { value: '49', label: 'Your group' },
        ]} />
      </WidgetCard>

      {/* Updates */}
      <WidgetCard title="Updates">
        <div className="updates-list">
          <UpdateItem
            text='Ned Coffer assigned you "How to disconnect and reconnect JIRA integration"'
            time="Yesterday at 4:13 PM"
          />
          <div className="updates-list__divider" />
          <UpdateItem
            text='Madison Lukas assigned you "Need help with my account"'
            time="Yesterday at 3:42 PM"
          />
        </div>
      </WidgetCard>
    </aside>
  );
}
