import { useState, useRef, useEffect } from 'react';
import { ChatIcon, CloseIcon, SparkleIcon, ChevronDownSmallIcon, PhoneIcon, EmailIcon } from '../Icons';
import './ConversationPanel.css';

// Icons for conversation panel
function FilterLinesIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.5H17M5 8H15M7 11.5H13M9 15H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function HistoryIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 5V10L13 12M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DotsVerticalIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function ChevronUpIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7.5L6 4.5L9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SendIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 11.5L17 3M8.62 12.003L10.62 16.593C10.783 16.975 10.864 17.166 10.981 17.22C11.083 17.267 11.2 17.267 11.302 17.218C11.418 17.163 11.498 16.971 11.658 16.588L17.45 3.45C17.59 3.12 17.66 2.955 17.62 2.85C17.585 2.759 17.512 2.687 17.42 2.653C17.316 2.615 17.151 2.687 16.822 2.832L3.45 8.463C3.044 8.636 2.841 8.723 2.785 8.843C2.736 8.948 2.736 9.068 2.786 9.172C2.843 9.291 3.047 9.376 3.455 9.546L8.15 11.535C8.234 11.57 8.277 11.588 8.312 11.615C8.343 11.639 8.37 11.667 8.393 11.699C8.419 11.735 8.437 11.778 8.47 11.863L8.62 12.003Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function NoteIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.33 1.33H4C3.26 1.33 2.67 1.93 2.67 2.67V13.33C2.67 14.07 3.26 14.67 4 14.67H12C12.74 14.67 13.33 14.07 13.33 13.33V5.33L9.33 1.33Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.33 1.33V5.33H13.33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AISparkleIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1V3M8 13V15M15 8H13M3 8H1M12.95 3.05L11.54 4.46M4.46 11.54L3.05 12.95M12.95 12.95L11.54 11.54M4.46 4.46L3.05 3.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="2" fill="currentColor"/>
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

function MacroIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 3L3 7L7 11M13 9L17 13L13 17M11 3L9 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.67 17.5V16.17C16.67 14.33 15.17 12.83 13.33 12.83H6.67C4.83 12.83 3.33 14.33 3.33 16.17V17.5M10 10C11.84 10 13.33 8.51 13.33 6.67C13.33 4.83 11.84 3.33 10 3.33C8.16 3.33 6.67 4.83 6.67 6.67C6.67 8.51 8.16 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DatabaseIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="10" cy="5" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 5V15C3 16.38 6.13 17.5 10 17.5C13.87 17.5 17 16.38 17 15V5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 10C3 11.38 6.13 12.5 10 12.5C13.87 12.5 17 11.38 17 10" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function BookIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 16.67V4.17C2.5 2.97 3.47 2 4.67 2H15.83C16.29 2 16.67 2.38 16.67 2.83V14.17M2.5 16.67C2.5 15.47 3.47 14.17 4.67 14.17H16.67V17.5H4.67C3.47 17.5 2.5 16.83 2.5 16.67Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DevicesIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M15 10V15.5C15 16.05 15.45 16.5 16 16.5H17.5C18.05 16.5 18.5 16.05 18.5 15.5V8.5C18.5 7.95 18.05 7.5 17.5 7.5H15" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 12V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function PlusIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// Conversation data mapped by ticket title for unique conversations per ticket
const conversationsData = {
  "Call with Caller +1 (123) 456-7890": {
    category: 'Phone Support',
    sentiment: 'Neutral',
    messages: [
      { id: 1, sender: 'system', name: 'System', text: 'Call connected with +1 (123) 456-7890', time: '4:25 PM' },
      { id: 2, sender: 'agent', name: 'You', text: 'Hello! Thank you for calling support. How can I assist you today?', time: '4:25 PM' },
      { id: 3, sender: 'customer', name: 'Caller', text: 'Hi, I need help setting up my new subscription.', time: '4:26 PM' },
    ],
  },
  "I can't access my account": {
    category: 'Account Access',
    sentiment: 'Frustrated',
    messages: [
      { id: 1, sender: 'customer', name: 'Rebecca Wells', text: 'Hi, I need help with my account.', time: '4:10 PM' },
      { id: 2, sender: 'agent', name: 'You', text: 'Hello Rebecca! I\'d be happy to help you with your account. What seems to be the issue?', time: '4:11 PM' },
      { id: 3, sender: 'customer', name: 'Rebecca Wells', text: 'I just started my day and I can\'t access my account. It keeps saying my password is wrong but I\'m sure it\'s correct.', time: '4:12 PM' },
      { id: 4, sender: 'agent', name: 'You', text: 'I understand how frustrating that can be. Let me check your account status.', time: '4:12 PM' },
      { id: 5, sender: 'customer', name: 'Rebecca Wells', text: 'Can you help?', time: '4:13 PM' },
    ],
  },
  "Can't find discount code for beef": {
    category: 'Product Inquiry',
    sentiment: 'Curious',
    messages: [
      { id: 1, sender: 'customer', name: 'Dwight Torff', text: 'Hey there! I\'m looking for a discount code for beef products.', time: '4:05 PM' },
      { id: 2, sender: 'agent', name: 'You', text: 'Hi Dwight! Welcome to our support. I\'d be glad to help you find that discount code.', time: '4:06 PM' },
      { id: 3, sender: 'customer', name: 'Dwight Torff', text: 'I saw an ad for 20% off premium beef cuts but can\'t find where to apply it.', time: '4:07 PM' },
      { id: 4, sender: 'agent', name: 'You', text: 'The code should be BEEF20. You can apply it at checkout under "Promo Code".', time: '4:08 PM' },
      { id: 5, sender: 'customer', name: 'Dwight Torff', text: 'Typing...', time: '4:10 PM' },
    ],
  },
  "Discount code disactivated": {
    category: 'Billing Issue',
    sentiment: 'Frustrated',
    messages: [
      { id: 1, sender: 'customer', name: 'Kevin Smith', text: 'My discount code stopped working!', time: '3:30 PM' },
      { id: 2, sender: 'agent', name: 'You', text: 'I\'m sorry to hear that, Kevin. Let me look into this for you right away.', time: '3:32 PM' },
      { id: 3, sender: 'customer', name: 'Kevin Smith', text: 'I\'ve been using SAVE15 for months and now it says it\'s deactivated.', time: '3:33 PM' },
      { id: 4, sender: 'agent', name: 'You', text: 'I see. Let me check the status of that promotional code in our system.', time: '3:35 PM' },
      { id: 5, sender: 'customer', name: 'Kevin Smith', text: 'Hi there, Can you assist me with this.', time: '3:40 PM' },
    ],
  },
  "Discount code": {
    category: 'Product Inquiry',
    sentiment: 'Neutral',
    messages: [
      { id: 1, sender: 'customer', name: 'Angela Martin', text: 'Hello, I have a question about discount codes.', time: '4:08 PM' },
      { id: 2, sender: 'agent', name: 'You', text: 'Hi Angela! How can I help you with discount codes today?', time: '4:09 PM' },
      { id: 3, sender: 'customer', name: 'Angela Martin', text: 'Hi I\'m looking for the discount code for paper', time: '4:13 PM' },
    ],
  },
  "Need help with emails": {
    category: 'Technical Support',
    sentiment: 'Neutral',
    messages: [
      { id: 1, sender: 'customer', name: 'Mike Vaccaro', text: 'Hey, I\'m having trouble with my email notifications.', time: '3:15 PM' },
      { id: 2, sender: 'agent', name: 'You', text: 'Hi Mike! I\'d be happy to help with your email settings. What\'s happening?', time: '3:17 PM' },
      { id: 3, sender: 'customer', name: 'Mike Vaccaro', text: 'I\'m not receiving any order confirmations to my inbox.', time: '3:20 PM' },
      { id: 4, sender: 'agent', name: 'You', text: 'Let me check your notification preferences. Have you checked your spam folder?', time: '3:22 PM' },
      { id: 5, sender: 'customer', name: 'Mike Vaccaro', text: 'Badabing badaboom', time: '3:30 PM' },
    ],
  },
  "Need help with hamster tubes": {
    category: 'Product Support',
    sentiment: 'Positive',
    messages: [
      { id: 1, sender: 'customer', name: 'Mike Vaccaro', text: 'Hi! I need assistance with hamster tube accessories.', time: '3:20 PM' },
      { id: 2, sender: 'agent', name: 'You', text: 'Hello Mike! Fun purchase! How can I help with the hamster tubes?', time: '3:21 PM' },
      { id: 3, sender: 'customer', name: 'Mike Vaccaro', text: 'I bought the starter kit but my hamster habitat is bigger. I need more tubes to expand it.', time: '3:24 PM' },
      { id: 4, sender: 'agent', name: 'You', text: 'We have extension packs available! The "Mega Tube Pack" has 12 additional tubes in various colors.', time: '3:26 PM' },
      { id: 5, sender: 'customer', name: 'Mike Vaccaro', text: 'I need more tubes', time: '3:28 PM' },
    ],
  },
};

// Get conversation data for a specific ticket
const getConversationForTicket = (ticket) => {
  if (!ticket) return null;
  
  const conversationData = conversationsData[ticket.title] || {
    category: 'General Support',
    sentiment: 'Neutral',
    messages: [
      { id: 1, sender: 'customer', name: ticket.lastMessage?.name || 'Customer', text: ticket.lastMessage?.text || 'Hello, I need assistance.', time: ticket.time },
      { id: 2, sender: 'agent', name: 'You', text: 'Hello! How can I help you today?', time: ticket.time },
    ],
  };
  
  return {
    id: ticket.id,
    subject: ticket.title,
    category: conversationData.category,
    sentiment: conversationData.sentiment,
    totalMessages: conversationData.messages.length,
    messages: conversationData.messages.map(msg => ({
      ...msg,
      name: msg.sender === 'customer' ? (ticket.lastMessage?.name || msg.name) : msg.name,
      avatar: null,
    })),
  };
};

// ========================================
// Knowledge Base AI Copilot Data
// ========================================

// Knowledge base articles with keywords for matching
const knowledgeArticles = [
  {
    id: 1,
    title: 'How to Reset Your Password',
    category: 'Account Access',
    keywords: ['password', 'reset', 'access', 'login', 'account', 'locked', 'forgot'],
    content: 'Guide customers through the password reset process via email or SMS verification.',
  },
  {
    id: 2,
    title: 'Account Recovery Options',
    category: 'Account Access',
    keywords: ['account', 'recovery', 'access', 'locked', 'verify', 'identity'],
    content: 'Steps to recover accounts when standard login fails.',
  },
  {
    id: 3,
    title: 'Current Promotional Codes',
    category: 'Discounts & Promotions',
    keywords: ['discount', 'code', 'promo', 'coupon', 'save', 'offer', 'deal'],
    content: 'List of active promotional codes and their terms.',
  },
  {
    id: 4,
    title: 'How to Apply Discount Codes',
    category: 'Discounts & Promotions',
    keywords: ['discount', 'code', 'apply', 'checkout', 'promo', 'coupon'],
    content: 'Step-by-step guide for applying discount codes at checkout.',
  },
  {
    id: 5,
    title: 'Why Was My Discount Code Rejected?',
    category: 'Discounts & Promotions',
    keywords: ['discount', 'code', 'rejected', 'expired', 'invalid', 'deactivated', 'not working'],
    content: 'Common reasons for discount code failures and solutions.',
  },
  {
    id: 6,
    title: 'Email Notification Settings',
    category: 'Technical Support',
    keywords: ['email', 'notification', 'settings', 'inbox', 'spam', 'receiving'],
    content: 'How to configure email preferences and troubleshoot delivery issues.',
  },
  {
    id: 7,
    title: 'Order Confirmation Emails',
    category: 'Technical Support',
    keywords: ['email', 'order', 'confirmation', 'receipt', 'not received'],
    content: 'Information about order confirmation emails and what to do if not received.',
  },
  {
    id: 8,
    title: 'Product Return Policy',
    category: 'Refunds & Returns',
    keywords: ['return', 'refund', 'exchange', 'policy', 'cancel'],
    content: 'Our return and refund policies for different product categories.',
  },
  {
    id: 9,
    title: 'How to Track Your Order',
    category: 'Order Management',
    keywords: ['track', 'order', 'shipping', 'delivery', 'status', 'where'],
    content: 'Guide to tracking orders and understanding delivery statuses.',
  },
  {
    id: 10,
    title: 'Subscription Setup Guide',
    category: 'Subscriptions',
    keywords: ['subscription', 'setup', 'plan', 'recurring', 'billing'],
    content: 'How to set up and manage subscription plans.',
  },
  {
    id: 11,
    title: 'Product Accessories & Extensions',
    category: 'Products',
    keywords: ['accessories', 'extension', 'add-on', 'tubes', 'parts', 'kit'],
    content: 'Information about product accessories and expansion options.',
  },
  {
    id: 12,
    title: 'Payment Methods Accepted',
    category: 'Payment & Billing',
    keywords: ['payment', 'card', 'billing', 'method', 'accepted'],
    content: 'List of accepted payment methods and billing information.',
  },
];

// AI response suggestions by category
const responseSuggestions = {
  'Account Access': {
    response: "I understand you're having trouble accessing your account. I've checked your account status and can help you regain access. Would you like me to send a password reset link to your registered email, or would you prefer to verify your identity through our security questions?",
    tone: 'empathetic',
  },
  'Discounts & Promotions': {
    response: "I'd be happy to help you with the discount code! I can see the code you're looking for. Let me provide you with the current active promotional codes and guide you through applying them at checkout.",
    tone: 'helpful',
  },
  'Technical Support': {
    response: "I see you're experiencing technical difficulties. Let me help troubleshoot this issue. First, could you confirm which email address is associated with your account? I'll check your notification settings and ensure everything is configured correctly.",
    tone: 'professional',
  },
  'Products': {
    response: "Great choice! I can help you find the right accessories for your purchase. We have several options available that would work perfectly with what you already have. Let me share the details with you.",
    tone: 'enthusiastic',
  },
  'General Support': {
    response: "Thank you for reaching out! I'm here to help you with your inquiry. Could you please provide a bit more detail about what you need assistance with so I can better serve you?",
    tone: 'friendly',
  },
};

// Quick actions based on ticket context
const quickActionsConfig = {
  'Account Access': [
    { id: 'reset-password', label: 'Send password reset', type: 'primary' },
    { id: 'verify-identity', label: 'Verify identity', type: 'secondary' },
    { id: 'escalate-security', label: 'Escalate to security', type: 'warning' },
  ],
  'Discounts & Promotions': [
    { id: 'apply-discount', label: 'Apply discount manually', type: 'primary' },
    { id: 'extend-code', label: 'Extend code validity', type: 'secondary' },
    { id: 'create-exception', label: 'Create exception', type: 'secondary' },
  ],
  'Technical Support': [
    { id: 'resend-email', label: 'Resend confirmation', type: 'primary' },
    { id: 'check-spam', label: 'Guide: Check spam folder', type: 'secondary' },
    { id: 'update-email', label: 'Update email address', type: 'secondary' },
  ],
  'Products': [
    { id: 'recommend-product', label: 'Recommend products', type: 'primary' },
    { id: 'check-inventory', label: 'Check inventory', type: 'secondary' },
    { id: 'add-to-cart', label: 'Add to customer cart', type: 'secondary' },
  ],
  'General Support': [
    { id: 'request-info', label: 'Request more info', type: 'primary' },
    { id: 'transfer-agent', label: 'Transfer to specialist', type: 'secondary' },
    { id: 'create-ticket', label: 'Create follow-up ticket', type: 'secondary' },
  ],
};

// Get knowledge recommendations for a ticket based on keyword matching
const getKnowledgeForTicket = (ticket) => {
  if (!ticket) return null;
  
  // Extract text to search from ticket
  const searchText = `${ticket.title} ${ticket.lastMessage?.text || ''}`.toLowerCase();
  
  // Determine conversation category
  const conversationData = conversationsData[ticket.title];
  const category = conversationData?.category || 'General Support';
  
  // Score and rank articles by keyword matches
  const scoredArticles = knowledgeArticles.map(article => {
    let score = 0;
    
    // Check keyword matches
    article.keywords.forEach(keyword => {
      if (searchText.includes(keyword.toLowerCase())) {
        score += 2;
      }
    });
    
    // Boost articles in the same category
    if (article.category === category) {
      score += 3;
    }
    
    // Check title match
    const titleWords = article.title.toLowerCase().split(' ');
    titleWords.forEach(word => {
      if (word.length > 3 && searchText.includes(word)) {
        score += 1;
      }
    });
    
    return { ...article, relevance: score };
  });
  
  // Sort by relevance and take top 4
  const topArticles = scoredArticles
    .filter(a => a.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 4);
  
  // If no matches, provide default articles based on category
  if (topArticles.length === 0) {
    const categoryArticles = knowledgeArticles
      .filter(a => a.category === category || a.category === 'General Support')
      .slice(0, 3)
      .map(a => ({ ...a, relevance: 1 }));
    topArticles.push(...categoryArticles);
  }
  
  // Get response suggestion
  const suggestion = responseSuggestions[category] || responseSuggestions['General Support'];
  
  // Get quick actions
  const actions = quickActionsConfig[category] || quickActionsConfig['General Support'];
  
  return {
    articles: topArticles,
    suggestedResponse: suggestion.response,
    responseTone: suggestion.tone,
    quickActions: actions,
    category,
  };
};

function ConversationHeader({ conversation, currentIndex, totalTickets, onPrevTicket, onNextTicket, onClose }) {
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalTickets - 1;
  
  return (
    <div className="conversation-header">
      <div className="conversation-header__info">
        <h2 className="conversation-header__title">{conversation.subject}</h2>
        <div className="conversation-header__meta">
          <span className="conversation-header__category-icon">
            <ChatIcon className="conversation-header__chat-icon" />
          </span>
          <span className="conversation-header__category">{conversation.category}</span>
          <span className="conversation-header__separator">·</span>
          <span className="conversation-header__sentiment">{conversation.sentiment}</span>
        </div>
      </div>
      
      <div className="conversation-header__actions">
        <button className="conversation-header__action-btn" title="Filter">
          <FilterLinesIcon className="conversation-header__action-icon" />
        </button>
        <button className="conversation-header__action-btn" title="History">
          <HistoryIcon className="conversation-header__action-icon" />
        </button>
        <button className="conversation-header__action-btn" title="More options">
          <DotsVerticalIcon className="conversation-header__action-icon" />
        </button>
      </div>
      
      <div className="conversation-header__pagination">
        <button 
          className={`conversation-header__page-btn ${!canGoPrev ? 'conversation-header__page-btn--disabled' : ''}`}
          onClick={canGoPrev ? onPrevTicket : undefined}
          disabled={!canGoPrev}
          title="Previous ticket"
        >
          <ChevronDownIcon className="conversation-header__chevron" />
        </button>
        <span className="conversation-header__page-current">{currentIndex + 1}</span>
        <span className="conversation-header__page-total">/ {totalTickets}</span>
        <button 
          className={`conversation-header__page-btn ${!canGoNext ? 'conversation-header__page-btn--disabled' : ''}`}
          onClick={canGoNext ? onNextTicket : undefined}
          disabled={!canGoNext}
          title="Next ticket"
        >
          <ChevronUpIcon className="conversation-header__chevron" />
        </button>
      </div>
    </div>
  );
}

function Message({ message, isAgent }) {
  return (
    <div className={`message ${isAgent ? 'message--agent' : 'message--customer'}`}>
      {!isAgent && (
        <div className="message__avatar">
          <div className="message__avatar-placeholder" />
        </div>
      )}
      
      <div className="message__content-wrapper">
        <div className="message__bubble">
          <p className="message__text">{message.text}</p>
          <div className="message__footer">
            <ChatIcon className="message__channel-icon" />
            <span className="message__time">{message.time}</span>
          </div>
        </div>
      </div>
      
      {isAgent && (
        <div className="message__avatar">
          <div className="message__avatar-placeholder message__avatar-placeholder--agent" />
        </div>
      )}
    </div>
  );
}

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message 
          key={message.id} 
          message={message} 
          isAgent={message.sender === 'agent'} 
        />
      ))}
    </div>
  );
}

function ChannelSwitcher() {
  return (
    <div className="channel-switcher">
      <button className="channel-switcher__select">
        <ChatIcon className="channel-switcher__icon" />
        <span className="channel-switcher__label">Messaging</span>
        <ChevronDownIcon className="channel-switcher__chevron" />
      </button>
      
      <button className="channel-switcher__end-session">
        End session
      </button>
    </div>
  );
}

function ComposerToolbar() {
  return (
    <div className="composer-toolbar">
      <button className="composer-toolbar__btn" title="Add internal note">
        <NoteIcon className="composer-toolbar__icon" />
      </button>
      <button className="composer-toolbar__btn" title="AI assist">
        <AISparkleIcon className="composer-toolbar__icon" />
      </button>
      <button className="composer-toolbar__btn" title="Add attachment">
        <AttachmentIcon className="composer-toolbar__icon" />
      </button>
    </div>
  );
}

function MessageComposer({ onSend, value, onChange }) {
  const [localMessage, setLocalMessage] = useState('');
  const textareaRef = useRef(null);
  
  // Use controlled value if provided, otherwise use local state
  const message = value !== undefined ? value : localMessage;
  const setMessage = onChange || setLocalMessage;

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Focus textarea when value is programmatically set
  useEffect(() => {
    if (value && textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
    }
  }, [value]);

  return (
    <div className="message-composer">
      <div className="message-composer__input-wrapper">
        <div className="message-composer__input-container">
          <textarea
            ref={textareaRef}
            className="message-composer__input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
          />
          <ComposerToolbar />
        </div>
      </div>
      
      <button 
        className="message-composer__send-btn"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <SendIcon className="message-composer__send-icon" />
      </button>
    </div>
  );
}

function TicketFooter({ status = 'Open' }) {
  return (
    <div className="ticket-footer">
      <button className="ticket-footer__macro-btn">
        <MacroIcon className="ticket-footer__macro-icon" />
        <span>Apply macro</span>
        <ChevronDownIcon className="ticket-footer__chevron" />
      </button>
      
      <div className="ticket-footer__actions">
        <button className="ticket-footer__submit-btn">
          Submit as {status}
        </button>
        <button className="ticket-footer__dropdown-btn">
          <ChevronDownIcon className="ticket-footer__dropdown-icon" />
        </button>
      </div>
    </div>
  );
}

// Action Panel Icons
function ReplyIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L2 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 8H10C12.2091 8 14 9.79086 14 12V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ForwardIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 4L14 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 8H6C3.79086 8 2 9.79086 2 12V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MergeIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 3V8C4 10.2091 5.79086 12 8 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 3V8C12 10.2091 10.2091 12 8 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function EscalateIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 6L8 2L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function TagSmallIcon({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2H6.5L12 7.5L7.5 12L2 6.5V2Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4.5" cy="4.5" r="0.75" fill="currentColor"/>
    </svg>
  );
}

function TicketTypeIcon({ type, className }) {
  const iconMap = {
    call: PhoneIcon,
    chat: ChatIcon,
    email: EmailIcon,
  };
  const Icon = iconMap[type] || ChatIcon;
  return <Icon className={className} />;
}

// ========================================
// Knowledge Copilot Panel Icons
// ========================================

function ArticleIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1H4C3.44772 1 3 1.44772 3 2V14C3 14.5523 3.44772 15 4 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 1V5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 8H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 11H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CopyIcon({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M10 2H3.5C2.67157 2 2 2.67157 2 3.5V10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}

function InsertIcon({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 2V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 9L7 12L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 2H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6.5V9.5C9 10.0523 8.55228 10.5 8 10.5H2.5C1.94772 10.5 1.5 10.0523 1.5 9.5V4C1.5 3.44772 1.94772 3 2.5 3H5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 1.5H10.5V4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 7L10.5 1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LightbulbIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12V13C6 13.5523 6.44772 14 7 14H9C9.55228 14 10 13.5523 10 13V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 2C5.23858 2 3 4.23858 3 7C3 8.65685 3.8 10.1569 5.05 11.0569C5.65 11.5 6 12 6 12H10C10 12 10.35 11.5 10.95 11.0569C12.2 10.1569 13 8.65685 13 7C13 4.23858 10.7614 2 8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ZapIcon({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 1L2 8H7L6.5 13L12 6H7L7.5 1Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RefreshIcon({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7C1 3.68629 3.68629 1 7 1C9.22082 1 11.1458 2.24609 12.125 4.0625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <path d="M13 7C13 10.3137 10.3137 13 7 13C4.77918 13 2.85422 11.7539 1.875 9.9375" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <path d="M12.125 1V4.0625H9.0625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.875 13V9.9375H4.9375" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ========================================
// Knowledge Copilot Panel Component
// ========================================

function KnowledgeCopilotPanel({ ticket, onInsertResponse }) {
  const [copiedId, setCopiedId] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    articles: true,
    response: true,
    actions: true,
  });
  
  const knowledge = getKnowledgeForTicket(ticket);
  
  if (!knowledge) return null;
  
  const { articles, suggestedResponse, responseTone, quickActions, category } = knowledge;
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  const handleCopyResponse = () => {
    navigator.clipboard.writeText(suggestedResponse);
    setCopiedId('response');
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const handleInsertResponse = () => {
    onInsertResponse?.(suggestedResponse);
  };
  
  const handleUseArticle = (article) => {
    // In a real app, this would insert article content or open article details
    console.log('Using article:', article.title);
  };
  
  const handleQuickAction = (action) => {
    // In a real app, this would trigger the specific action
    console.log('Quick action:', action.label);
  };
  
  const getRelevanceBadge = (relevance) => {
    if (relevance >= 5) return { label: 'Best match', className: 'copilot-article__relevance--high' };
    if (relevance >= 3) return { label: 'Good match', className: 'copilot-article__relevance--medium' };
    return { label: 'Related', className: 'copilot-article__relevance--low' };
  };
  
  return (
    <div className="copilot-panel">
      {/* Header */}
      <div className="copilot-panel__header">
        <div className="copilot-panel__header-icon">
          <SparkleIcon className="copilot-panel__sparkle" />
        </div>
        <div className="copilot-panel__header-text">
          <h3 className="copilot-panel__title">AI Copilot</h3>
          <span className="copilot-panel__subtitle">Knowledge-powered assistance</span>
        </div>
      </div>
      
      {/* Category Badge */}
      <div className="copilot-panel__category">
        <LightbulbIcon className="copilot-panel__category-icon" />
        <span>Detected: {category}</span>
      </div>
      
      {/* Suggested Articles Section */}
      <div className="copilot-section">
        <button 
          className="copilot-section__header"
          onClick={() => toggleSection('articles')}
        >
          <div className="copilot-section__header-left">
            <ArticleIcon className="copilot-section__icon" />
            <span className="copilot-section__title">Suggested Articles</span>
            <span className="copilot-section__count">{articles.length}</span>
          </div>
          <ChevronDownIcon className={`copilot-section__chevron ${expandedSections.articles ? '' : 'copilot-section__chevron--collapsed'}`} />
        </button>
        
        {expandedSections.articles && (
          <div className="copilot-section__content">
            {articles.map((article, index) => {
              const relevanceBadge = getRelevanceBadge(article.relevance);
              return (
                <div key={article.id} className="copilot-article" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="copilot-article__header">
                    <span className={`copilot-article__relevance ${relevanceBadge.className}`}>
                      {relevanceBadge.label}
                    </span>
                    <button 
                      className="copilot-article__view-btn"
                      title="Open article"
                    >
                      <ExternalLinkIcon className="copilot-article__view-icon" />
                    </button>
                  </div>
                  <h4 className="copilot-article__title">{article.title}</h4>
                  <span className="copilot-article__category">{article.category}</span>
                  <button 
                    className="copilot-article__use-btn"
                    onClick={() => handleUseArticle(article)}
                  >
                    Use this article
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* AI Response Section */}
      <div className="copilot-section">
        <button 
          className="copilot-section__header"
          onClick={() => toggleSection('response')}
        >
          <div className="copilot-section__header-left">
            <AISparkleIcon className="copilot-section__icon copilot-section__icon--sparkle" />
            <span className="copilot-section__title">Suggested Response</span>
          </div>
          <ChevronDownIcon className={`copilot-section__chevron ${expandedSections.response ? '' : 'copilot-section__chevron--collapsed'}`} />
        </button>
        
        {expandedSections.response && (
          <div className="copilot-section__content">
            <div className="copilot-response">
              <div className="copilot-response__tone">
                <span className="copilot-response__tone-label">Tone:</span>
                <span className="copilot-response__tone-value">{responseTone}</span>
              </div>
              <p className="copilot-response__text">{suggestedResponse}</p>
              <div className="copilot-response__actions">
                <button 
                  className="copilot-response__btn copilot-response__btn--primary"
                  onClick={handleInsertResponse}
                >
                  <InsertIcon className="copilot-response__btn-icon" />
                  <span>Insert</span>
                </button>
                <button 
                  className="copilot-response__btn"
                  onClick={handleCopyResponse}
                >
                  <CopyIcon className="copilot-response__btn-icon" />
                  <span>{copiedId === 'response' ? 'Copied!' : 'Copy'}</span>
                </button>
                <button 
                  className="copilot-response__btn copilot-response__btn--icon-only"
                  title="Regenerate response"
                >
                  <RefreshIcon className="copilot-response__btn-icon" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick Actions Section */}
      <div className="copilot-section">
        <button 
          className="copilot-section__header"
          onClick={() => toggleSection('actions')}
        >
          <div className="copilot-section__header-left">
            <ZapIcon className="copilot-section__icon" />
            <span className="copilot-section__title">Quick Actions</span>
          </div>
          <ChevronDownIcon className={`copilot-section__chevron ${expandedSections.actions ? '' : 'copilot-section__chevron--collapsed'}`} />
        </button>
        
        {expandedSections.actions && (
          <div className="copilot-section__content">
            <div className="copilot-actions">
              {quickActions.map((action, index) => (
                <button 
                  key={action.id}
                  className={`copilot-action copilot-action--${action.type}`}
                  onClick={() => handleQuickAction(action)}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Context Panel Content (replaces ActionPanel)
function ContextPanelContent({ ticket, activeTab, onStatusChange, onInsertResponse }) {
  if (!ticket) return null;

  const typeLabels = {
    call: 'Phone call',
    chat: 'Live chat',
    email: 'Email',
  };

  const customer = {
    name: ticket.lastMessage?.name || 'Unknown Customer',
    email: 'customer@example.com',
    previousTickets: 12,
    satisfaction: '98%',
  };

  const statuses = [
    { id: 'open', label: 'Open', color: 'var(--color-status-open)' },
    { id: 'pending', label: 'Pending', color: 'var(--color-status-pending)' },
    { id: 'on-hold', label: 'On-hold', color: 'var(--color-status-onhold)' },
    { id: 'solved', label: 'Solved', color: 'var(--color-status-solved)' },
  ];

  const currentStatus = statuses.find(s => s.id === ticket.status) || statuses[0];

  if (activeTab === 'user') {
    return (
      <div className="context-panel__content">
        <div className="context-panel__header">
          <div className="context-panel__type-badge">
            <TicketTypeIcon type={ticket.type} className="context-panel__type-icon" />
            <span>{typeLabels[ticket.type]}</span>
          </div>
          <span className="context-panel__ticket-id">#{ticket.id}</span>
        </div>

        <div className="context-panel__title-section">
          <h3 className="context-panel__title">{ticket.title}</h3>
          {ticket.sla && (
            <span className={`context-panel__sla sla-tag sla-tag--${ticket.sla.type}`}>
              SLA: {ticket.sla.value}
            </span>
          )}
        </div>

        <div className="context-panel__quick-actions">
          <button className="context-panel__quick-btn" title="Reply">
            <ReplyIcon className="context-panel__quick-icon" />
          </button>
          <button className="context-panel__quick-btn" title="Forward">
            <ForwardIcon className="context-panel__quick-icon" />
          </button>
          <button className="context-panel__quick-btn" title="Add note">
            <NoteIcon className="context-panel__quick-icon" />
          </button>
          <button className="context-panel__quick-btn" title="Merge">
            <MergeIcon className="context-panel__quick-icon" />
          </button>
          <button className="context-panel__quick-btn" title="Escalate">
            <EscalateIcon className="context-panel__quick-icon" />
          </button>
        </div>

        <div className="context-panel__divider" />

        <div className="context-panel__ai-section">
          <div className="context-panel__ai-header">
            <SparkleIcon className="context-panel__ai-icon" />
            <span className="context-panel__ai-label">AI Suggestion</span>
          </div>
          <p className="context-panel__ai-text">
            This ticket appears to be about account access. Consider checking the customer's recent login attempts and password reset history.
          </p>
          <button className="context-panel__ai-apply">
            Apply suggestion
          </button>
        </div>

        <div className="context-panel__divider" />

        <div className="context-panel__section">
          <h4 className="context-panel__section-title">Properties</h4>
          <div className="context-panel__fields">
            <div className="context-panel__field">
              <span className="context-panel__field-label">Status</span>
              <button className="context-panel__status-btn">
                <span className="context-panel__status-dot" style={{ background: currentStatus.color }} />
                <span>{currentStatus.label}</span>
                <ChevronDownSmallIcon className="context-panel__status-chevron" />
              </button>
            </div>
            <div className="context-panel__field">
              <span className="context-panel__field-label">Priority</span>
              <span className="context-panel__field-value">Normal</span>
            </div>
            <div className="context-panel__field">
              <span className="context-panel__field-label">Type</span>
              <span className="context-panel__field-value">{typeLabels[ticket.type]}</span>
            </div>
            <div className="context-panel__field">
              <span className="context-panel__field-label">Created</span>
              <span className="context-panel__field-value">{ticket.time}</span>
            </div>
            <div className="context-panel__field">
              <span className="context-panel__field-label">Assignee</span>
              <span className="context-panel__field-value context-panel__field-value--highlight">You</span>
            </div>
          </div>
        </div>

        <div className="context-panel__divider" />

        <div className="context-panel__section">
          <h4 className="context-panel__section-title">
            <UserIcon className="context-panel__section-icon" />
            Customer
          </h4>
          <div className="context-panel__customer-card">
            <div className="context-panel__customer-avatar">
              <span>{customer.name.charAt(0)}</span>
            </div>
            <div className="context-panel__customer-info">
              <span className="context-panel__customer-name">{customer.name}</span>
              <span className="context-panel__customer-email">{customer.email}</span>
            </div>
          </div>
          <div className="context-panel__customer-stats">
            <div className="context-panel__customer-stat">
              <span className="context-panel__stat-value">{customer.previousTickets}</span>
              <span className="context-panel__stat-label">Previous tickets</span>
            </div>
            <div className="context-panel__customer-stat">
              <span className="context-panel__stat-value">{customer.satisfaction}</span>
              <span className="context-panel__stat-label">Satisfaction</span>
            </div>
          </div>
        </div>

        <div className="context-panel__divider" />

        <div className="context-panel__section">
          <h4 className="context-panel__section-title">Tags</h4>
          <div className="context-panel__tags">
            <span className="context-panel__tag">
              <TagSmallIcon className="context-panel__tag-icon" />
              account-access
            </span>
            <span className="context-panel__tag">
              <TagSmallIcon className="context-panel__tag-icon" />
              urgent
            </span>
            <button className="context-panel__add-tag">+ Add tag</button>
          </div>
        </div>
      </div>
    );
  }

  // Knowledge tab - AI Copilot
  if (activeTab === 'knowledge') {
    return <KnowledgeCopilotPanel ticket={ticket} onInsertResponse={onInsertResponse} />;
  }

  // Default placeholder for other tabs
  return (
    <div className="context-panel__content context-panel__content--empty">
      <p>Coming soon...</p>
    </div>
  );
}

function ContextSidebar({ activeTab, onTabChange, isPanelOpen }) {
  const tabs = [
    { id: 'user', icon: UserIcon, label: 'User' },
    { id: 'data', icon: DatabaseIcon, label: 'Data' },
    { id: 'knowledge', icon: BookIcon, label: 'Knowledge' },
    { id: 'devices', icon: DevicesIcon, label: 'Devices' },
    { id: 'apps', icon: PlusIcon, label: 'Apps' },
  ];

  return (
    <div className="context-sidebar">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = isPanelOpen && activeTab === tab.id;
        return (
          <button 
            key={tab.id}
            className={`context-sidebar__btn ${isActive ? 'context-sidebar__btn--active' : ''}`} 
            title={tab.label}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon className="context-sidebar__icon" />
          </button>
        );
      })}
    </div>
  );
}

export default function ConversationPanel({ ticket, onClose, onStatusChange, currentIndex, totalTickets, onPrevTicket, onNextTicket }) {
  const [activeTab, setActiveTab] = useState('user');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [conversationMeta, setConversationMeta] = useState(null);
  const [composerMessage, setComposerMessage] = useState('');
  
  // Sync messages when ticket changes
  useEffect(() => {
    if (ticket) {
      const conversation = getConversationForTicket(ticket);
      if (conversation) {
        setMessages(conversation.messages);
        setConversationMeta({
          id: conversation.id,
          subject: conversation.subject,
          category: conversation.category,
          sentiment: conversation.sentiment,
          totalMessages: conversation.totalMessages,
        });
      }
      // Clear composer when switching tickets
      setComposerMessage('');
    }
  }, [ticket]);
  
  if (!ticket || !conversationMeta) {
    return null;
  }

  // Create conversation object for header
  const conversation = {
    ...conversationMeta,
    messages,
  };

  const handleSendMessage = (messageText) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    const newMessage = {
      id: Date.now(),
      sender: 'agent',
      name: 'You',
      text: messageText,
      time: timeString,
      avatar: null,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setComposerMessage('');
  };
  
  const handleInsertResponse = (text) => {
    setComposerMessage(text);
  };

  const handleTabChange = (tabId) => {
    if (activeTab === tabId && isPanelOpen) {
      setIsPanelOpen(false);
    } else {
      setActiveTab(tabId);
      setIsPanelOpen(true);
    }
  };

  return (
    <div className={`conversation-panel ${isPanelOpen ? 'conversation-panel--with-context' : ''}`}>
      <div className="conversation-panel__main">
        <ConversationHeader 
          conversation={conversation} 
          currentIndex={currentIndex}
          totalTickets={totalTickets}
          onPrevTicket={onPrevTicket}
          onNextTicket={onNextTicket}
          onClose={onClose}
        />
        
        <MessageList messages={conversation.messages} />
        
        <div className="conversation-panel__composer-area">
          <ChannelSwitcher />
          <MessageComposer 
            onSend={handleSendMessage} 
            value={composerMessage}
            onChange={setComposerMessage}
          />
          <TicketFooter status={ticket.status === 'open' ? 'Open' : ticket.status} />
        </div>
      </div>
      
      {isPanelOpen && (
        <div className="context-panel">
          <ContextPanelContent 
            ticket={ticket} 
            activeTab={activeTab}
            onStatusChange={onStatusChange}
            onInsertResponse={handleInsertResponse}
          />
        </div>
      )}
      
      <ContextSidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isPanelOpen={isPanelOpen}
      />
    </div>
  );
}

