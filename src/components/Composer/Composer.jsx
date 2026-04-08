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

function TranslationToggleIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="8.5" width="7" height="6" rx="1" fill="#1F73B7" opacity="0.2"/>
      <path d="M2 5H8M5 2V5M3.5 5C3.5 6.5 4.5 8 6 8.5" stroke="#1F73B7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 10.5H13.5M11.25 8.5L13.5 13.5" stroke="#49545C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 13.5L11.25 8.5" stroke="#49545C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

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

// ─── Translation simulation ──────────────────────────────────────────────────

const TRANSLATION_PHRASES = {
  Korean: [
    [/\bhi\b|\bhello\b/gi, '안녕하세요'],
    [/thank you for (reaching out|contacting us)/gi, '문의해 주셔서 감사합니다'],
    [/thank you|thanks/gi, '감사합니다'],
    [/i('m| am) sorry for (the )?inconvenience/gi, '불편을 드려 죄송합니다'],
    [/i('m| am) sorry/gi, '죄송합니다'],
    [/i('ll| will) look into (this|it)/gi, '확인해 보겠습니다'],
    [/let me (check|look into|verify)/gi, '확인해 드리겠습니다'],
    [/i can help you (with that)?/gi, '도와드릴 수 있습니다'],
    [/i can see your account/gi, '계정을 확인했습니다'],
    [/could you (please )?/gi, '부탁드립니다, '],
    [/can you (please )?/gi, ''],
    [/please (try again|retry)/gi, '다시 시도해 주세요'],
    [/please (let me know|contact us) if/gi, '문제가 있으면 알려 주세요 if'],
    [/please/gi, '부탁드립니다'],
    [/great|perfect|wonderful/gi, '잘 됐습니다'],
    [/understood\b/gi, '알겠습니다'],
    [/i understand/gi, '이해합니다'],
    [/one moment/gi, '잠시만 기다려 주세요'],
    [/is there anything else/gi, '다른 도움이 필요하신가요'],
    [/have a (great|good) day/gi, '좋은 하루 되세요'],
  ],
  Spanish: [
    [/\bhi\b|\bhello\b/gi, 'Hola'],
    [/thank you for (reaching out|contacting us)/gi, 'Gracias por ponerse en contacto con nosotros'],
    [/thank you|thanks/gi, 'Gracias'],
    [/i('m| am) sorry for (the )?inconvenience/gi, 'Disculpe las molestias'],
    [/i('m| am) sorry/gi, 'Lo siento'],
    [/i('ll| will) look into (this|it)/gi, 'Lo investigaré'],
    [/let me (check|look into|verify)/gi, 'Permítame verificar'],
    [/i can help you (with that)?/gi, 'Puedo ayudarle con eso'],
    [/please/gi, 'por favor'],
    [/understood\b/gi, 'Entendido'],
    [/i understand/gi, 'Entiendo'],
    [/have a (great|good) day/gi, 'Que tenga un buen día'],
  ],
};

function simulateTranslation(text, targetLanguage) {
  if (!text.trim()) return '';
  const phrases = TRANSLATION_PHRASES[targetLanguage];
  if (!phrases) return text;

  let result = text;
  for (const [pattern, replacement] of phrases) {
    result = result.replace(pattern, replacement);
  }

  if (result === text) {
    const fallbacks = {
      Korean: `안녕하세요. 다음 내용을 전달드립니다: "${text}"`,
      Spanish: `Hola. Le comunico lo siguiente: "${text}"`,
    };
    return fallbacks[targetLanguage] ?? text;
  }
  return result;
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
    <div role="button" tabIndex={0} className="composer__channel-select">
      <ChannelIcon className="composer__channel-icon" />
      <span className="composer__channel-label">{label}</span>
      <ChevronDownSmallIcon className="composer__channel-chevron" />
    </div>
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

function ComposerToolbar({ isTranslating, composerLanguage, customerLanguage, onToggleComposerLanguage }) {
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
      {isTranslating && (
        <IconButton
          size="small"
          isBasic
          title={composerLanguage === 'agent' ? `Translate to ${customerLanguage || 'customer language'}` : 'Revert to your language'}
          className={`composer__toolbar-btn composer__translation-toggle ${composerLanguage === 'agent' ? 'composer__translation-toggle--active' : ''}`}
          onClick={onToggleComposerLanguage}
        >
          <TranslationToggleIcon />
        </IconButton>
      )}
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

/**
 * Reusable message composer.
 *
 * Props:
 *   ticketType      – "email" | "messaging" | "call"
 *   requesterName   – full display name shown in the To: tag
 *   value           – controlled textarea value
 *   onChange        – called with new string on every keystroke
 *   isTranslating   – when true, shows translation UI in the toolbar and send button
 *   customerLanguage – e.g. "Korean", shown in the send button label
 */
export default function Composer({ ticketType, requesterName, value, onChange, isTranslating, customerLanguage }) {
  const [localMessage, setLocalMessage] = useState('');
  const [composerLanguage, setComposerLanguage] = useState('agent');
  const [agentDraft, setAgentDraft] = useState('');

  const message = value !== undefined ? value : localMessage;
  const setMessage = onChange || setLocalMessage;

  const sendLabel = isTranslating && composerLanguage === 'agent' && customerLanguage
    ? `Send in ${customerLanguage}`
    : 'Send';

  const handleToggleComposerLanguage = () => {
    if (composerLanguage === 'agent') {
      setAgentDraft(message);
      setMessage(simulateTranslation(message, customerLanguage));
      setComposerLanguage('customer');
    } else {
      setMessage(agentDraft);
      setComposerLanguage('agent');
    }
  };

  return (
    <div className="composer">
      <ChannelHeader ticketType={ticketType} requesterName={requesterName} />
      <textarea
        className="composer__input"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder={
          isTranslating && composerLanguage === 'customer' && customerLanguage
            ? `Type in ${customerLanguage}...`
            : 'Type your message...'
        }
      />
      <div className="composer__footer">
        <ComposerToolbar
          isTranslating={isTranslating}
          composerLanguage={composerLanguage}
          customerLanguage={customerLanguage}
          onToggleComposerLanguage={handleToggleComposerLanguage}
        />
        <Button isBasic size="small" className="composer__send-btn">
          {sendLabel}
        </Button>
      </div>
    </div>
  );
}
