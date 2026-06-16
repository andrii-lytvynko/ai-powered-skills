import { SM } from '@zendeskgarden/react-typography';
import './ProficiencyDots.css';

export default function ProficiencyDots({ level, editable = false, onChange, agentName }) {
  const label = agentName
    ? `Proficiency ${level} of 5 for ${agentName}`
    : `Proficiency ${level} of 5`;

  if (!editable) {
    return (
      <div className="proficiency-dots" role="img" aria-label={label}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            className={`proficiency-dots__dot${dot <= level ? ' proficiency-dots__dot--filled' : ''}`}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="proficiency-dots proficiency-dots--editable" role="group" aria-label={label}>
      {[1, 2, 3, 4, 5].map((dot) => (
        <button
          key={dot}
          type="button"
          className={`proficiency-dots__dot-btn${dot <= level ? ' proficiency-dots__dot-btn--filled' : ''}`}
          aria-label={`Set proficiency to ${dot} of 5`}
          aria-pressed={dot === level}
          onClick={() => onChange?.(dot)}
        >
          <span className="proficiency-dots__dot" aria-hidden="true" />
        </button>
      ))}
      <SM className="proficiency-dots__level">{level} of 5</SM>
    </div>
  );
}
