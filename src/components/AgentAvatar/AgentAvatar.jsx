import { useEffect, useState } from 'react';
import { Avatar } from '@zendeskgarden/react-avatars';
import { getAgentColor, getAgentPhotoUrl, getInitials } from '../../data/skillsData';
import './AgentAvatar.css';

const GARDEN_SIZE = {
  extrasmall: 'extrasmall',
  small: 'small',
  header: 'small',
};

const SIZE_CLASS = {
  extrasmall: 'agent-avatar--extrasmall',
  small: 'agent-avatar--small',
  header: 'agent-avatar--header',
};

export default function AgentAvatar({ agent, size = 'small', className = '' }) {
  const [imageError, setImageError] = useState(false);
  const photoUrl = agent.photoUrl?.trim() || getAgentPhotoUrl(agent.id);
  const initials = agent.initials || getInitials(agent.name);
  const backgroundColor = agent.color ?? getAgentColor(agent.id);
  const gardenSize = GARDEN_SIZE[size] ?? GARDEN_SIZE.small;
  const sizeClass = SIZE_CLASS[size] ?? SIZE_CLASS.small;

  useEffect(() => {
    setImageError(false);
  }, [photoUrl]);

  const rootClassName = ['agent-avatar', sizeClass, className].filter(Boolean).join(' ');

  if (photoUrl && !imageError) {
    return (
      <div className={rootClassName}>
        <img
          src={photoUrl}
          alt=""
          className="agent-avatar__image"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className={rootClassName}>
      <Avatar size={gardenSize} backgroundColor={backgroundColor}>
        <span>{initials}</span>
      </Avatar>
    </div>
  );
}
