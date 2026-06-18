import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, SM, MD, Span } from '@zendesk-ui/react-components';

const SIZE = 320;
const CENTER = SIZE / 2;
const MAX_RADIUS = 118;
const RING_COUNT = 5;
const TRIANGLE_AXIS_COUNT = 3;
const HANDLE_RADIUS = 8;
const LABEL_OFFSET = 28;

function getAngle(index, total) {
  if (!total || total < 1) return 0;
  return (Math.PI * 2 * index) / total - Math.PI / 2;
}

function getVertexPoint(axisIndex, layoutAxisCount, score) {
  const angle = getAngle(axisIndex, layoutAxisCount);
  const radius = (score / RING_COUNT) * MAX_RADIUS;
  return {
    x: CENTER + Math.cos(angle) * radius,
    y: CENTER + Math.sin(angle) * radius,
    angle,
  };
}

function getLabelPoint(angle) {
  const labelRadius = MAX_RADIUS + LABEL_OFFSET;
  return {
    x: CENTER + Math.cos(angle) * labelRadius,
    y: CENTER + Math.sin(angle) * labelRadius,
    anchor: Math.abs(Math.cos(angle)) < 0.2
      ? 'middle'
      : Math.cos(angle) > 0
        ? 'start'
        : 'end',
  };
}

function scoreFromPoint(x, y, angle) {
  const dx = x - CENTER;
  const dy = y - CENTER;
  const projection = dx * Math.cos(angle) + dy * Math.sin(angle);
  const raw = (projection / MAX_RADIUS) * RING_COUNT;
  return Math.max(1, Math.min(RING_COUNT, Math.round(raw)));
}

function useRadarDrag(skills, onScoreChange, layoutAxisCount) {
  const svgRef = useRef(null);
  const [dragIndex, setDragIndex] = useState(null);
  const axisCount = layoutAxisCount ?? skills.length;

  const handlePointerMove = useCallback(
    (clientX, clientY) => {
      if (dragIndex === null || !svgRef.current || skills.length === 0) return;
      if (dragIndex < 0 || dragIndex >= skills.length) return;
      const rect = svgRef.current.getBoundingClientRect();
      if (!rect.width) return;
      const scale = SIZE / rect.width;
      const x = (clientX - rect.left) * scale;
      const y = (clientY - rect.top) * scale;
      const { angle } = getVertexPoint(dragIndex, axisCount, 1);
      const nextScore = scoreFromPoint(x, y, angle);
      const skill = skills[dragIndex];
      if (skill && skill.score !== nextScore) {
        onScoreChange(skill.id, nextScore);
      }
    },
    [axisCount, dragIndex, onScoreChange, skills],
  );

  useEffect(() => {
    if (dragIndex === null) return undefined;

    const handleMouseMove = (event) => {
      handlePointerMove(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) {
        event.preventDefault();
        handlePointerMove(touch.clientX, touch.clientY);
      }
    };

    const handleEnd = () => setDragIndex(null);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
    document.body.style.userSelect = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
      document.body.style.userSelect = '';
    };
  }, [dragIndex, handlePointerMove]);

  const handleKeyDown = (event, skill) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      event.preventDefault();
      if (skill.score < 5) onScoreChange(skill.id, skill.score + 1);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      event.preventDefault();
      if (skill.score > 1) onScoreChange(skill.id, skill.score - 1);
    }
  };

  return { svgRef, setDragIndex, handleKeyDown };
}

function RadarLegend({ skills, onRemove }) {
  return (
    <div className="skill-radar__legend">
      {skills.map((skill) => (
        <div key={skill.id} className="skill-radar__legend-row">
          <SM className="skill-radar__legend-name">
            {skill.name}
            <Span className="skill-radar__legend-score"> ({skill.score})</Span>
          </SM>
          <Button size="small" isBasic onClick={() => onRemove(skill.id)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

function RadarAxisLabel({ skill, labelX, labelY, anchor }) {
  return (
    <text
      className="skill-radar__label"
      x={labelX}
      y={labelY}
      textAnchor={anchor}
      dominantBaseline="middle"
    >
      {skill.name}
      <tspan className="skill-radar__label-score"> ({skill.score})</tspan>
    </text>
  );
}

function RadarHandle({
  skill,
  axisIndex,
  layoutAxisCount,
  setDragIndex,
  handleKeyDown,
  onRemove,
}) {
  const { x, y } = getVertexPoint(axisIndex, layoutAxisCount, skill.score);
  const labelAngle = getAngle(axisIndex, layoutAxisCount);
  const { x: labelX, y: labelY, anchor } = getLabelPoint(labelAngle);

  return (
    <g>
      <RadarAxisLabel skill={skill} labelX={labelX} labelY={labelY} anchor={anchor} />
      <circle
        className="skill-radar__handle"
        cx={x}
        cy={y}
        r={HANDLE_RADIUS}
        tabIndex={0}
        role="slider"
        aria-label={`${skill.name} proficiency`}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-valuenow={skill.score}
        onMouseDown={(event) => {
          event.preventDefault();
          setDragIndex(axisIndex);
        }}
        onTouchStart={(event) => {
          event.preventDefault();
          setDragIndex(axisIndex);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault();
            onRemove(skill.id);
            return;
          }
          handleKeyDown(event, skill);
        }}
      />
    </g>
  );
}

function RadarCircleRings() {
  return Array.from({ length: RING_COUNT }, (_, ringIndex) => {
    const ringRadius = ((ringIndex + 1) / RING_COUNT) * MAX_RADIUS;
    return (
      <circle
        key={ringIndex}
        className="skill-radar__ring"
        cx={CENTER}
        cy={CENTER}
        r={ringRadius}
        fill="none"
      />
    );
  });
}

function RadarPolygonRings({ axisCount }) {
  return Array.from({ length: RING_COUNT }, (_, ringIndex) => {
    const ringRadius = ((ringIndex + 1) / RING_COUNT) * MAX_RADIUS;
    const points = Array.from({ length: axisCount }, (_, index) => {
      const angle = getAngle(index, axisCount);
      const x = CENTER + Math.cos(angle) * ringRadius;
      const y = CENTER + Math.sin(angle) * ringRadius;
      return `${x},${y}`;
    }).join(' ');
    return (
      <polygon
        key={ringIndex}
        className="skill-radar__ring"
        points={points}
        fill="none"
      />
    );
  });
}

function SkillSingleAxisChart({ skill, onScoreChange, onRemove }) {
  const skills = useMemo(() => [skill], [skill]);
  const { svgRef, setDragIndex, handleKeyDown } = useRadarDrag(
    skills,
    onScoreChange,
    TRIANGLE_AXIS_COUNT,
  );
  const { x, y } = getVertexPoint(0, TRIANGLE_AXIS_COUNT, skill.score);

  return (
    <div className="skill-radar">
      <svg
        ref={svgRef}
        className="skill-radar__svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Skill proficiency chart"
      >
        <RadarCircleRings />
        <line
          className="skill-radar__axis"
          x1={CENTER}
          y1={CENTER}
          x2={x}
          y2={y}
        />
        <RadarHandle
          skill={skill}
          axisIndex={0}
          layoutAxisCount={TRIANGLE_AXIS_COUNT}
          setDragIndex={setDragIndex}
          handleKeyDown={handleKeyDown}
          onRemove={onRemove}
        />
      </svg>
      <RadarLegend skills={skills} onRemove={onRemove} />
    </div>
  );
}

function SkillDualAxisChart({ skills, onScoreChange, onRemove }) {
  const { svgRef, setDragIndex, handleKeyDown } = useRadarDrag(
    skills,
    onScoreChange,
    TRIANGLE_AXIS_COUNT,
  );
  const p0 = getVertexPoint(0, TRIANGLE_AXIS_COUNT, skills[0].score);
  const p1 = getVertexPoint(1, TRIANGLE_AXIS_COUNT, skills[1].score);
  const fillPoints = `${p0.x},${p0.y} ${CENTER},${CENTER} ${p1.x},${p1.y}`;

  return (
    <div className="skill-radar">
      <svg
        ref={svgRef}
        className="skill-radar__svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Skill proficiency chart"
      >
        <RadarCircleRings />

        {skills.map((skill, index) => {
          const angle = getAngle(index, TRIANGLE_AXIS_COUNT);
          const outerX = CENTER + Math.cos(angle) * MAX_RADIUS;
          const outerY = CENTER + Math.sin(angle) * MAX_RADIUS;
          return (
            <line
              key={`axis-${skill.id}`}
              className="skill-radar__axis"
              x1={CENTER}
              y1={CENTER}
              x2={outerX}
              y2={outerY}
            />
          );
        })}

        <polygon className="skill-radar__fill skill-radar__fill--compact" points={fillPoints} />

        {skills.map((skill, index) => (
          <RadarHandle
            key={skill.id}
            skill={skill}
            axisIndex={index}
            layoutAxisCount={TRIANGLE_AXIS_COUNT}
            setDragIndex={setDragIndex}
            handleKeyDown={handleKeyDown}
            onRemove={onRemove}
          />
        ))}
      </svg>
      <RadarLegend skills={skills} onRemove={onRemove} />
    </div>
  );
}

function SkillFullRadarChart({ skills, onScoreChange, onRemove }) {
  const { svgRef, setDragIndex, handleKeyDown } = useRadarDrag(skills, onScoreChange);

  const polygonPoints = useMemo(
    () => skills
      .map((skill, index) => {
        const { x, y } = getVertexPoint(index, skills.length, skill.score);
        return `${x},${y}`;
      })
      .join(' '),
    [skills],
  );

  return (
    <div className="skill-radar">
      <svg
        ref={svgRef}
        className="skill-radar__svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Skill proficiency chart"
      >
        <RadarPolygonRings axisCount={skills.length} />

        {skills.map((skill, index) => {
          const angle = getAngle(index, skills.length);
          const outerX = CENTER + Math.cos(angle) * MAX_RADIUS;
          const outerY = CENTER + Math.sin(angle) * MAX_RADIUS;
          return (
            <line
              key={`axis-${skill.id}`}
              className="skill-radar__axis"
              x1={CENTER}
              y1={CENTER}
              x2={outerX}
              y2={outerY}
            />
          );
        })}

        <polygon className="skill-radar__fill" points={polygonPoints} />

        {skills.map((skill, index) => (
          <RadarHandle
            key={skill.id}
            skill={skill}
            axisIndex={index}
            layoutAxisCount={skills.length}
            setDragIndex={setDragIndex}
            handleKeyDown={handleKeyDown}
            onRemove={onRemove}
          />
        ))}
      </svg>

      <RadarLegend skills={skills} onRemove={onRemove} />
    </div>
  );
}

export default function SkillRadarChart({ skills, onScoreChange, onRemove }) {
  if (skills.length === 0) {
    return (
      <div className="skill-radar__empty">
        <MD tag="span">No skills assigned yet. Add a skill to get started.</MD>
      </div>
    );
  }

  if (skills.length === 1) {
    return (
      <SkillSingleAxisChart
        skill={skills[0]}
        onScoreChange={onScoreChange}
        onRemove={onRemove}
      />
    );
  }

  if (skills.length < TRIANGLE_AXIS_COUNT) {
    return (
      <SkillDualAxisChart
        skills={skills}
        onScoreChange={onScoreChange}
        onRemove={onRemove}
      />
    );
  }

  return (
    <SkillFullRadarChart
      skills={skills}
      onScoreChange={onScoreChange}
      onRemove={onRemove}
    />
  );
}

export function getSkillGraphDescription(skillCount) {
  if (skillCount === 0) {
    return 'Add a skill to start building this agent\'s skill graph.';
  }
  return 'Drag chart points to update proficiency scores for assigned skills.';
}
