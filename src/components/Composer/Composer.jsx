import { useState } from 'react';
import { Button, IconButton } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';
import { Avatar } from '@zendeskgarden/react-avatars';
import { Menu, Item } from '@zendeskgarden/react-dropdowns';
import {
  ChatIcon,
  EmailIcon,
  EditNoteIcon,
  FormatTextIcon,
  EmojiIcon,
  LinkIcon,
  SparkleIcon,
  ChevronDownSmallIcon,
  Icon,
} from '../Icons';
import './Composer.css';

// ─── Local icons ────────────────────────────────────────────────────────────

function NoteIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.33 1.33H4C3.26 1.33 2.67 1.93 2.67 2.67V13.33C2.67 14.07 3.26 14.67 4 14.67H12C12.74 14.67 13.33 14.07 13.33 13.33V5.33L9.33 1.33Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.33 1.33V5.33H13.33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AttachmentIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 7.33L8.47 12.87C7.02 14.31 4.68 14.31 3.23 12.87C1.79 11.42 1.79 9.08 3.23 7.63L8.77 2.1C9.7 1.17 11.18 1.17 12.1 2.1C13.03 3.02 13.03 4.5 12.1 5.43L6.57 10.97C6.11 11.43 5.36 11.43 4.9 10.97C4.44 10.51 4.44 9.76 4.9 9.3L9.83 4.37" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Channel map ─────────────────────────────────────────────────────────────

const CHANNELS = {
  messaging: { label: 'Messaging', Icon: ChatIcon },
  email: { label: 'Email', Icon: EmailIcon },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function RequesterTag({ requesterName }) {
  return (
    <div className="composer__recipients">
      <span className="composer__to-label">To</span>
      <Tag isPill size="small" className="composer__requester-tag">
        <Avatar size="extrasmall" className="composer__avatar">
          <span aria-label={requesterName}>
            {requesterName
              ? requesterName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
              : 'CX'}
          </span>
        </Avatar>
        <span className="composer__requester-name">{requesterName || 'Customer'}</span>
        <Icon name="edit" size="sm" className="composer__edit-icon" />
      </Tag>
    </div>
  );
}

function ChannelHeader({ ticketType, requesterName }) {
  const [selectedChannel, setSelectedChannel] = useState('messaging');

  if (ticketType === 'call') {
    return (
      <div className="composer__channel-header">
        <button className="composer__channel-select">
          <NoteIcon className="composer__channel-icon" />
          <span className="composer__channel-label">Internal note</span>
          <ChevronDownSmallIcon className="composer__channel-chevron" />
        </button>
      </div>
    );
  }

  if (ticketType === 'email') {
    return (
      <div className="composer__channel-header">
        <div className="composer__channel-left">
          <span className="composer__channel-select composer__channel-select--static">
            <EmailIcon className="composer__channel-icon" />
            <span className="composer__channel-label">Email</span>
          </span>
          <div className="composer__channel-divider" />
          <RequesterTag requesterName={requesterName} />
        </div>
        <Button isBasic size="small" className="composer__cc-btn">CC</Button>
      </div>
    );
  }

  // chat / messaging — interactive channel switcher
  const { label, Icon: ChannelIcon } = CHANNELS[selectedChannel] ?? CHANNELS.messaging;

  const channelTrigger = (
    <button type="button" className="composer__channel-select">
      <ChannelIcon className="composer__channel-icon" />
      <span className="composer__channel-label">{label}</span>
      <ChevronDownSmallIcon className="composer__channel-chevron" />
    </button>
  );

  return (
    <div className="composer__channel-header">
      <div className="composer__channel-left">
        <Menu
          button={channelTrigger}
          onChange={({ value }) => value && setSelectedChannel(value)}
          placement="bottom-start"
        >
          <Item value="messaging">
            <ChatIcon className="composer__channel-menu-icon" />
            Messaging
          </Item>
          <Item value="email">
            <EmailIcon className="composer__channel-menu-icon" />
            Email
          </Item>
        </Menu>
        <>
          <div className="composer__channel-divider" />
          <RequesterTag requesterName={requesterName} />
        </>
      </div>
      <Button isBasic size="small" className="composer__cc-btn">CC</Button>
    </div>
  );
}

function ComposerToolbar() {
  return (
    <div className="composer__toolbar">
      <IconButton size="small" isBasic title="Notes" className="composer__toolbar-btn">
        <EditNoteIcon />
      </IconButton>
      <IconButton size="small" isBasic title="Format text" className="composer__toolbar-btn">
        <FormatTextIcon />
      </IconButton>
      <IconButton size="small" isBasic title="Add emoji" className="composer__toolbar-btn">
        <EmojiIcon />
      </IconButton>
      <IconButton size="small" isBasic title="Add attachment" className="composer__toolbar-btn">
        <AttachmentIcon className="composer__toolbar-icon" />
      </IconButton>
      <IconButton size="small" isBasic title="Insert link" className="composer__toolbar-btn">
        <LinkIcon />
      </IconButton>
      <IconButton size="small" isBasic title="AI assist" className="composer__toolbar-btn">
        <SparkleIcon />
      </IconButton>
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

/**
 * Reusable message composer.
 *
 * Props:
 *   ticketType    – "email" | "messaging" | "call"
 *   requesterName – full display name shown in the To: tag
 *   value         – controlled textarea value
 *   onChange      – called with new string on every keystroke
 */
export default function Composer({ ticketType, requesterName, value, onChange }) {
  const [localMessage, setLocalMessage] = useState('');

  const message = value !== undefined ? value : localMessage;
  const setMessage = onChange || setLocalMessage;

  return (
    <div className="composer">
      <ChannelHeader ticketType={ticketType} requesterName={requesterName} />
      <textarea
        className="composer__input"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <div className="composer__footer">
        <ComposerToolbar />
      </div>
    </div>
  );
}
