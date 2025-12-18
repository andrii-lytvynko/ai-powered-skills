import './Widgets.css';

function ScheduleHeader() {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const dayNumber = now.getDate();

  return (
    <div className="schedule-header">
      <div className="schedule-header__date">
        <span className="schedule-header__day">{dayName}</span>
        <span className="schedule-header__number">{dayNumber}</span>
      </div>
    </div>
  );
}

function ScheduleItem({ status, title, time }) {
  return (
    <div className="schedule-item">
      <span className={`schedule-item__dot schedule-item__dot--${status}`} />
      <div className="schedule-item__content">
        <span className="schedule-item__title">{title}</span>
        <span className="schedule-item__time">{time}</span>
      </div>
    </div>
  );
}

function ScheduleSection() {
  const scheduleItems = [
    { status: 'online', title: 'Online', time: '9:00 AM – 12:30 PM' },
    { status: 'lunch', title: 'Lunch', time: '12:30 PM – 1:00 PM' },
    { status: 'online', title: 'Voice calls', time: '1:00 PM – 3:00 PM' },
  ];

  return (
    <section className="schedule-section">
      <ScheduleHeader />
      <div className="schedule-list">
        {scheduleItems.map((item, index) => (
          <ScheduleItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}

function WidgetSection({ title, subtitle, children }) {
  return (
    <section className="widget-section">
      <div className="widget-section__header">
        <h3 className="widget-section__title">{title}</h3>
        {subtitle && <span className="widget-section__subtitle">{subtitle}</span>}
      </div>
      {children}
    </section>
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
      {/* Agent Schedule */}
      <ScheduleSection />

      <div className="widgets__divider" />

      {/* Ticket Statistics */}
      <WidgetSection title="Ticket statistics" subtitle="This week">
        <div className="stat-cards">
          <StatCard value="74" label="Good" />
          <StatCard value="3" label="Bad" />
          <StatCard value="26" label="Solved" />
        </div>
      </WidgetSection>

      <div className="widgets__divider" />

      {/* Satisfaction Statistics */}
      <WidgetSection title="Satisfaction statistics" subtitle="60 days">
        <div className="stat-cards stat-cards--two">
          <StatCard value="100%" label="You" />
          <StatCard value="97%" label="Help desk" />
        </div>
      </WidgetSection>

      <div className="widgets__divider" />

      {/* Open Tickets */}
      <WidgetSection title="Open tickets">
        <div className="stat-card stat-card--full">
          <div className="stat-card__value">49</div>
          <div className="stat-card__label">Your group</div>
        </div>
      </WidgetSection>

      <div className="widgets__divider" />

      {/* Updates */}
      <WidgetSection title="Updates">
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
      </WidgetSection>
    </aside>
  );
}
