import { useState, useRef, useCallback } from 'react';
import { ChevronDownIcon, SearchIcon, Icon } from '../Icons';
import './AgentTimeline.css';

// Sample agent data grouped by teams
const teamsData = [
  {
    id: 'team-a',
    name: 'Team A',
    agents: [
      { id: 1, name: 'Shelly Baldwin', avatar: 'SB' },
      { id: 2, name: 'Anne Hicks', avatar: 'AH' },
      { id: 3, name: 'Emma Hunter', avatar: 'EH' },
      { id: 4, name: 'Mike Long', avatar: 'ML' },
      { id: 5, name: 'Marlene Little', avatar: 'MR' },
    ],
  },
  {
    id: 'team-b',
    name: 'Team B',
    agents: [
      { id: 6, name: 'Jorge Meyer', avatar: 'JM' },
      { id: 7, name: 'Brian Steele', avatar: 'BS' },
      { id: 8, name: 'Danny Perkins', avatar: 'DP' },
      { id: 9, name: 'Fernando Price', avatar: 'FP' },
      { id: 10, name: 'Christine Page', avatar: 'CP' },
    ],
  },
];

// Generate timeline segments for an agent
const generateTimelineData = (agentId) => {
  const colors = ['#C8E972', '#A855F7', '#EF4444', '#FCD34D', '#3B82F6', '#10B981'];
  const segments = [];
  const seed = agentId * 7;
  
  for (let i = 0; i < 6 + (seed % 4); i++) {
    const start = (seed + i * 13) % 80;
    const width = 3 + ((seed + i * 17) % 12);
    segments.push({
      start,
      width,
      color: colors[(seed + i) % colors.length],
    });
  }
  return segments;
};

// Sub-row labels for expanded agents
const subRowLabels = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'agent-status', label: 'Agent status' },
  { id: 'talk-activity', label: 'Talk activity' },
  { id: 'adherence', label: 'Adherence', value: '55%' },
  { id: 'availability', label: 'Availability' },
  { id: 'productivity', label: 'Productivity' },
];

// Time slots for the timeline header
const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

function AgentAvatar({ initials }) {
  const colors = ['#C8E972', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6', '#EC4899'];
  const colorIndex = initials.charCodeAt(0) % colors.length;
  
  return (
    <div className="agent-avatar" style={{ backgroundColor: colors[colorIndex] }}>
      <span className="agent-avatar__initials">{initials}</span>
    </div>
  );
}

function TimelineRow({ segments }) {
  return (
    <div className="timeline-row">
      {segments.map((segment, idx) => (
        <div
          key={idx}
          className="timeline-segment"
          style={{
            left: `${segment.start}%`,
            width: `${segment.width}%`,
            backgroundColor: segment.color,
          }}
        />
      ))}
    </div>
  );
}

function TimelineSubRow({ segments }) {
  return (
    <div className="timeline-row timeline-row--sub">
      {segments.map((segment, idx) => (
        <div
          key={idx}
          className="timeline-segment timeline-segment--small"
          style={{
            left: `${segment.start}%`,
            width: `${segment.width}%`,
            backgroundColor: segment.color,
          }}
        />
      ))}
    </div>
  );
}

export default function AgentTimeline({ onSelectAgent, selectedAgent }) {
  const [expandedTeams, setExpandedTeams] = useState(['team-a', 'team-b']);
  const [expandedAgents, setExpandedAgents] = useState([2]); // Anne Hicks expanded
  const [searchQuery, setSearchQuery] = useState('');
  
  const sidebarRef = useRef(null);
  const timelineRef = useRef(null);
  const isScrolling = useRef(false);

  const handleSidebarScroll = useCallback(() => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    if (timelineRef.current && sidebarRef.current) {
      timelineRef.current.scrollTop = sidebarRef.current.scrollTop;
    }
    requestAnimationFrame(() => { isScrolling.current = false; });
  }, []);

  const handleTimelineScroll = useCallback(() => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    if (sidebarRef.current && timelineRef.current) {
      sidebarRef.current.scrollTop = timelineRef.current.scrollTop;
    }
    requestAnimationFrame(() => { isScrolling.current = false; });
  }, []);

  const toggleTeam = (teamId) => {
    setExpandedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const toggleAgent = (agentId) => {
    setExpandedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  // Build a flat list of rows for rendering
  const buildRows = () => {
    const rows = [];
    
    teamsData.forEach((team) => {
      // Team header row
      rows.push({
        type: 'team',
        id: team.id,
        name: team.name,
        isExpanded: expandedTeams.includes(team.id),
      });
      
      if (expandedTeams.includes(team.id)) {
        team.agents.forEach((agent) => {
          // Agent row
          rows.push({
            type: 'agent',
            ...agent,
            isExpanded: expandedAgents.includes(agent.id),
            isSelected: selectedAgent?.id === agent.id,
            segments: generateTimelineData(agent.id),
          });
          
          // Sub-rows for expanded agent
          if (expandedAgents.includes(agent.id)) {
            subRowLabels.forEach((subRow, idx) => {
              rows.push({
                type: 'sub-row',
                id: `${agent.id}-${subRow.id}`,
                label: subRow.label,
                value: subRow.value,
                agentId: agent.id,
                segments: generateTimelineData(agent.id * 10 + idx),
              });
            });
          }
        });
      }
    });
    
    return rows;
  };

  const rows = buildRows();

  return (
    <div className="agent-timeline">
      {/* Sidebar */}
      <div className="agent-timeline__sidebar">
        <div className="agent-timeline__controls">
          <button className="agent-timeline__sort-btn">
            <span>By group</span>
            <ChevronDownIcon className="agent-timeline__sort-icon" />
          </button>
          <button className="agent-timeline__filter-btn" title="Sort">
            <Icon name="swap_vert" className="agent-timeline__icon" size="sm" />
          </button>
        </div>
        
        <div 
          className="agent-timeline__list" 
          ref={sidebarRef}
          onScroll={handleSidebarScroll}
        >
          <div className="agent-timeline__search">
            <SearchIcon className="agent-timeline__search-icon" />
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="agent-timeline__search-input"
            />
          </div>
          {rows.map((row) => {
            if (row.type === 'team') {
              return (
                <div key={row.id} className="sidebar-team" onClick={() => toggleTeam(row.id)}>
                  <button className="sidebar-team__expand">
                    <ChevronDownIcon className={`sidebar-team__expand-icon ${row.isExpanded ? '' : 'collapsed'}`} />
                  </button>
                  <Icon name="folder_open" className="sidebar-team__folder-icon" size="sm" />
                  <span className="sidebar-team__name">{row.name}</span>
                </div>
              );
            }
            
            if (row.type === 'agent') {
              return (
                <div 
                  key={row.id} 
                  className={`sidebar-agent ${row.isSelected ? 'sidebar-agent--selected' : ''}`}
                  onClick={() => onSelectAgent(row)}
                >
                  <button 
                    className="sidebar-agent__expand"
                    onClick={(e) => { e.stopPropagation(); toggleAgent(row.id); }}
                  >
                    <ChevronDownIcon className={`sidebar-agent__expand-icon ${row.isExpanded ? '' : 'collapsed'}`} />
                  </button>
                  <AgentAvatar initials={row.avatar} />
                  <span className="sidebar-agent__name">{row.name}</span>
                </div>
              );
            }
            
            if (row.type === 'sub-row') {
              return (
                <div key={row.id} className="sidebar-sub-row">
                  <span className="sidebar-sub-row__label">{row.label}</span>
                  {row.value && <span className="sidebar-sub-row__value">{row.value}</span>}
                </div>
              );
            }
            
            return null;
          })}
        </div>
      </div>
      
      {/* Timeline Grid */}
      <div className="agent-timeline__grid">
        <div className="agent-timeline__header">
          {timeSlots.map((time, idx) => (
            <div key={idx} className="agent-timeline__time-slot">
              {time}
            </div>
          ))}
        </div>
        
        <div 
          className="agent-timeline__body"
          ref={timelineRef}
          onScroll={handleTimelineScroll}
        >
          {/* Vertical grid lines */}
          <div className="agent-timeline__grid-lines">
            {timeSlots.map((_, idx) => (
              <div key={idx} className="agent-timeline__grid-line" />
            ))}
          </div>
          
          {/* Timeline rows */}
          <div className="agent-timeline__rows">
            {/* Spacer to match sidebar search box */}
            <div className="timeline-row timeline-row--spacer" />
            {rows.map((row) => {
              if (row.type === 'team') {
                return <div key={row.id} className="timeline-row timeline-row--team" />;
              }
              
              if (row.type === 'agent') {
                return <TimelineRow key={row.id} segments={row.segments} />;
              }
              
              if (row.type === 'sub-row') {
                return <TimelineSubRow key={row.id} segments={row.segments} />;
              }
              
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
