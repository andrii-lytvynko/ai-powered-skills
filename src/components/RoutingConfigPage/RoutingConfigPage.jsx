import { useState, useRef, useCallback } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Anchor, Button, IconButton } from '@zendeskgarden/react-buttons';
import { Field, Input, Select, Label, Toggle } from '@zendeskgarden/react-forms';
import { Tag } from '@zendeskgarden/react-tags';
import { Table, Head, HeaderRow, HeaderCell, Body, Row, Cell } from '@zendeskgarden/react-tables';
import TopBar from '../TopBar/TopBar';
import PageSidebarNav from '../PageSidebarNav';
import CopilotSidebar from '../CopilotSidebar/CopilotSidebar';
import { ChevronDownIcon, InfoIcon } from '../Icons';
import {
  RecommendationsBanner,
  RecommendationsDrawer,
  ROUTING_PAGE_RECOMMENDATIONS,
} from '../RoutingRecommendations';
import './RoutingConfigPage.css';

// ─── Local icon components (Admin Center specific) ──────────────────────────

function HomeIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M11.4163 2.87911C10.5632 2.29258 9.43683 2.29258 8.58367 2.87911L3.58367 6.31661C2.90529 6.78299 2.5 7.55347 2.5 8.37671V15C2.5 16.3807 3.61929 17.5 5 17.5H7.08333C7.54357 17.5 7.91667 17.1269 7.91667 16.6666V13.75C7.91667 12.5994 8.84942 11.6666 10 11.6666C11.1506 11.6666 12.0833 12.5994 12.0833 13.75V16.6666C12.0833 17.1269 12.4564 17.5 12.9167 17.5H15C16.3808 17.5 17.5 16.3807 17.5 15V8.37671C17.5 7.55347 17.0947 6.78299 16.4163 6.31661L11.4163 2.87911Z" fill="currentColor"/>
    </svg>
  );
}

function AccountIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.666 15.8333V5C16.666 3.61929 15.5468 2.5 14.166 2.5H5.83268C4.45197 2.5 3.33268 3.61929 3.33268 5V15.8333H2.49935C2.03912 15.8333 1.66602 16.2064 1.66602 16.6667C1.66602 17.1269 2.03912 17.5 2.49935 17.5H17.4993C17.9596 17.5 18.3327 17.1269 18.3327 16.6667C18.3327 16.2064 17.9596 15.8333 17.4993 15.8333H16.666ZM7.49935 5.83333C7.03912 5.83333 6.66602 6.20643 6.66602 6.66667C6.66602 7.1269 7.03912 7.5 7.49935 7.5H8.33268C8.79293 7.5 9.16602 7.1269 9.16602 6.66667C9.16602 6.20643 8.79293 5.83333 8.33268 5.83333H7.49935ZM11.666 5.83333C11.2058 5.83333 10.8327 6.20643 10.8327 6.66667C10.8327 7.1269 11.2058 7.5 11.666 7.5H12.4993C12.9596 7.5 13.3327 7.1269 13.3327 6.66667C13.3327 6.20643 12.9596 5.83333 12.4993 5.83333H11.666ZM7.49935 9.16667C7.03912 9.16667 6.66602 9.53975 6.66602 10C6.66602 10.4602 7.03912 10.8333 7.49935 10.8333H8.33268C8.79293 10.8333 9.16602 10.4602 9.16602 10C9.16602 9.53975 8.79293 9.16667 8.33268 9.16667H7.49935ZM11.666 9.16667C11.2058 9.16667 10.8327 9.53975 10.8327 10C10.8327 10.4602 11.2058 10.8333 11.666 10.8333H12.4993C12.9596 10.8333 13.3327 10.4602 13.3327 10C13.3327 9.53975 12.9596 9.16667 12.4993 9.16667H11.666ZM7.49935 12.5C7.03912 12.5 6.66602 12.8731 6.66602 13.3333C6.66602 13.7936 7.03912 14.1667 7.49935 14.1667H8.33268C8.79293 14.1667 9.16602 13.7936 9.16602 13.3333C9.16602 12.8731 8.79293 12.5 8.33268 12.5H7.49935ZM11.666 12.5C11.2058 12.5 10.8327 12.8731 10.8327 13.3333C10.8327 13.7936 11.2058 14.1667 11.666 14.1667H12.4993C12.9596 14.1667 13.3327 13.7936 13.3327 13.3333C13.3327 12.8731 12.9596 12.5 12.4993 12.5H11.666Z" fill="currentColor"/>
    </svg>
  );
}

function PeopleIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.9165 5.83333C2.9165 3.99238 4.40888 2.5 6.24983 2.5C8.09078 2.5 9.58315 3.99238 9.58315 5.83333C9.58315 7.67428 8.09078 9.16667 6.24983 9.16667C4.40888 9.16667 2.9165 7.67428 2.9165 5.83333Z" fill="currentColor"/>
      <path d="M10.4165 5.83333C10.4165 3.99238 11.9089 2.5 13.7498 2.5C15.5908 2.5 17.0832 3.99238 17.0832 5.83333C17.0832 7.67428 15.5908 9.16667 13.7498 9.16667C11.9089 9.16667 10.4165 7.67428 10.4165 5.83333Z" fill="currentColor"/>
      <path d="M6.24962 10C8.6419 10 10.9112 11.6506 11.7558 14.6779C12.1974 16.2609 10.8473 17.5 9.46132 17.5H3.03791C1.65194 17.5 0.301851 16.2609 0.743465 14.6779C1.58805 11.6506 3.8573 10 6.24962 10Z" fill="currentColor"/>
      <path d="M13.3618 14.2301C12.9553 12.773 12.2564 11.5405 11.3581 10.5851C12.1043 10.1988 12.9199 10 13.7502 10C16.1426 10 18.4118 11.6506 19.2564 14.6779C19.698 16.2609 18.3479 17.5 16.9619 17.5H12.7754C13.4155 16.6291 13.7077 15.4701 13.3618 14.2301Z" fill="currentColor"/>
    </svg>
  );
}

function AIIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M15.738 1.95435C15.7195 1.79066 15.5811 1.66691 15.4163 1.66675C15.2516 1.66658 15.1129 1.79003 15.0941 1.95369C15.0062 2.71559 14.7799 3.23828 14.4254 3.59281C14.0708 3.94733 13.5482 4.1736 12.7863 4.26147C12.6226 4.28035 12.4992 4.41901 12.4993 4.58375C12.4995 4.74849 12.6233 4.88689 12.7869 4.90543C13.5359 4.99027 14.0706 5.21649 14.4341 5.57345C14.7957 5.92847 15.0262 6.45042 15.0932 7.20468C15.1081 7.37203 15.2483 7.50027 15.4163 7.50008C15.5843 7.49989 15.7244 7.37134 15.7388 7.20396C15.8031 6.46244 16.0334 5.92873 16.3973 5.56478C16.7613 5.20084 17.295 4.97047 18.0365 4.90628C18.2039 4.89179 18.3325 4.75179 18.3327 4.58378C18.3328 4.41577 18.2046 4.27548 18.0373 4.26061C17.283 4.19361 16.7611 3.96306 16.406 3.6015C16.0491 3.23796 15.8228 2.70336 15.738 1.95435Z" fill="currentColor"/>
      <path d="M9.99402 4.07296C9.94635 3.65203 9.59052 3.33385 9.16685 3.33342C8.74327 3.33298 8.38668 3.65043 8.33818 4.07126C8.1122 6.03045 7.53038 7.37449 6.61874 8.28614C5.7071 9.19775 4.36305 9.77958 2.40387 10.0056C1.98303 10.0541 1.66558 10.4107 1.66602 10.8342C1.66645 11.2579 1.98463 11.6137 2.40556 11.6614C4.33161 11.8796 5.70627 12.4613 6.64108 13.3792C7.57082 14.2922 8.16367 15.6342 8.33593 17.5738C8.37418 18.0042 8.73493 18.3339 9.16693 18.3334C9.59902 18.3329 9.95902 18.0023 9.99627 17.5719C10.1613 15.6652 10.7537 14.2928 11.6895 13.3569C12.6254 12.4211 13.9978 11.8287 15.9045 11.6637C16.3349 11.6264 16.6655 11.2664 16.666 10.8343C16.6665 10.4023 16.3368 10.0416 15.9064 10.0033C13.9668 9.83108 12.6248 9.23825 11.7119 8.30848C10.7939 7.37367 10.2122 5.99901 9.99402 4.07296Z" fill="currentColor"/>
    </svg>
  );
}

function FlowIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10.0002 1.25C8.47324 1.25 7.22039 2.42328 7.09396 3.91747C5.10461 4.75431 3.55308 6.42324 2.87382 8.48983C2.73011 8.92708 2.96805 9.398 3.40529 9.54175C3.84251 9.68542 4.31345 9.4475 4.45715 9.01025C4.95174 7.50553 6.04335 6.27005 7.45089 5.58491C7.94924 6.47877 8.90407 7.08333 10.0002 7.08333C11.611 7.08333 12.9168 5.7775 12.9168 4.16667C12.9168 2.55583 11.611 1.25 10.0002 1.25Z" fill="currentColor"/>
      <path d="M15.6565 5.90823C15.3542 5.56125 14.8278 5.52507 14.4808 5.82744C14.1338 6.1298 14.0976 6.65619 14.4 7.00317C15.2934 8.02841 15.8335 9.3668 15.8335 10.8335C15.8335 10.9737 15.8286 11.1127 15.8189 11.2503C14.7944 11.2335 13.7915 11.7582 13.2428 12.7085C12.4374 14.1034 12.9154 15.887 14.3103 16.6923C15.7051 17.4976 17.4887 17.0197 18.294 15.6249C19.0565 14.3042 18.6686 12.635 17.4413 11.7777C17.4802 11.4681 17.5002 11.153 17.5002 10.8335C17.5002 8.94913 16.8043 7.22535 15.6565 5.90823Z" fill="currentColor"/>
      <path d="M6.75101 12.7084C5.94568 11.3136 4.16209 10.8357 2.76724 11.641C1.37238 12.4463 0.894476 14.2299 1.69979 15.6248C2.46351 16.9475 4.10703 17.4457 5.46446 16.8068C6.72381 17.7643 8.29636 18.3333 10.0002 18.3333C10.4798 18.3333 10.9496 18.2882 11.4054 18.2018C11.8576 18.1159 12.1547 17.6798 12.0688 17.2277C11.9831 16.7755 11.547 16.4785 11.0948 16.5643C10.7409 16.6314 10.3751 16.6667 10.0002 16.6667C8.78708 16.6667 7.66172 16.2971 6.7287 15.6638C7.25286 14.7855 7.2987 13.6571 6.75101 12.7084Z" fill="currentColor"/>
    </svg>
  );
}

function PaperPlaneIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.33546 4.64336C1.86867 3.243 3.31833 1.97185 4.64571 2.6176L16.7403 8.50146C17.9904 9.10962 17.9904 10.8908 16.7403 11.499L4.64571 17.3828C3.31833 18.0285 1.86868 16.7574 2.33546 15.357L3.84335 10.8334H7.4995C7.95974 10.8334 8.33284 10.4603 8.33284 10C8.33284 9.53979 7.95974 9.16671 7.4995 9.16671H3.84324L2.33546 4.64336Z" fill="currentColor"/>
    </svg>
  );
}

function MonitorIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M1.66602 5C1.66602 3.61929 2.78531 2.5 4.16602 2.5H15.8327C17.2134 2.5 18.3327 3.61929 18.3327 5V11.6667C18.3327 13.0474 17.2134 14.1667 15.8327 14.1667H4.16602C2.78531 14.1667 1.66602 13.0474 1.66602 11.6667V5Z" fill="currentColor"/>
      <path d="M5.27063 17.4547C6.75651 16.9436 8.3461 16.6667 9.9996 16.6667C11.6531 16.6667 13.2427 16.9436 14.7285 17.4547C15.1638 17.6044 15.6379 17.3729 15.7876 16.9377C15.9373 16.5025 15.7058 16.0283 15.2706 15.8787C13.6132 15.3085 11.8405 15 9.9996 15C8.15864 15 6.386 15.3085 4.72852 15.8787C4.29331 16.0283 4.06186 16.5025 4.21156 16.9377C4.36126 17.3729 4.83542 17.6044 5.27063 17.4547Z" fill="currentColor"/>
    </svg>
  );
}

function GridIcon({ className }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.50195 4.9995C2.50195 3.61995 3.62031 2.50159 4.99987 2.50159H6.66654C8.0461 2.50159 9.16445 3.61995 9.16445 4.9995V6.66617C9.16445 8.04574 8.0461 9.16413 6.66654 9.16413H4.99987C3.62031 9.16413 2.50195 8.04574 2.50195 6.66617V4.9995Z" fill="currentColor"/>
      <path d="M2.50195 13.3329C2.50195 11.9533 3.62031 10.835 4.99987 10.835H6.66654C8.0461 10.835 9.16445 11.9533 9.16445 13.3329V14.9995C9.16445 16.379 8.0461 17.4975 6.66654 17.4975H4.99987C3.62031 17.4975 2.50195 16.379 2.50195 14.9995V13.3329Z" fill="currentColor"/>
      <path d="M10.8353 4.9995C10.8353 3.61995 11.9536 2.50159 13.3332 2.50159H14.9999C16.3795 2.50159 17.4978 3.61995 17.4978 4.9995V6.66617C17.4978 8.04574 16.3795 9.16413 14.9999 9.16413H13.3332C11.9536 9.16413 10.8353 8.04574 10.8353 6.66617V4.9995Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.1665 10.835C12.3267 10.835 10.8353 12.3264 10.8353 14.1662C10.8353 16.006 12.3267 17.4975 14.1665 17.4975C16.0064 17.4975 17.4978 16.006 17.4978 14.1662C17.4978 12.3264 16.0064 10.835 14.1665 10.835ZM12.4978 14.1662C12.4978 13.2445 13.245 12.4975 14.1665 12.4975C15.0882 12.4975 15.8353 13.2445 15.8353 14.1662C15.8353 15.0878 15.0882 15.835 14.1665 15.835C13.245 15.835 12.4978 15.0878 12.4978 14.1662Z" fill="currentColor"/>
    </svg>
  );
}

function GripIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="3" r="1" fill="currentColor"/>
      <circle cx="8" cy="3" r="1" fill="currentColor"/>
      <circle cx="4" cy="6" r="1" fill="currentColor"/>
      <circle cx="8" cy="6" r="1" fill="currentColor"/>
      <circle cx="4" cy="9" r="1" fill="currentColor"/>
      <circle cx="8" cy="9" r="1" fill="currentColor"/>
    </svg>
  );
}

function BookOpenIcon({ className }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.667 7.00483L7.53471 5.41987C5.03666 4.86475 2.66699 6.76563 2.66699 9.32463V22.5278C2.66699 24.4026 3.96913 26.026 5.79927 26.4326L14.667 28.4032V7.00483Z" fill="#5C6970"/>
      <path d="M17.3337 28.4032L26.2014 26.4326C28.0315 26.026 29.3337 24.4026 29.3337 22.5278V9.32463C29.3337 6.76563 26.9639 4.86475 24.4659 5.41987L17.3337 7.00483V28.4032Z" fill="#5C6970"/>
    </svg>
  );
}

function ChartBarIcon({ className }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.30825 2.5C8.61792 2.5 8.05827 3.05964 8.05827 3.75V16.2508C8.05827 16.9412 8.61792 17.5008 9.30825 17.5008H10.6999C11.3903 17.5008 11.9499 16.9412 11.9499 16.2508V3.75C11.9499 3.05964 11.3903 2.5 10.6999 2.5H9.30825Z" fill="#5C6970"/>
      <path d="M3.75 10.8342C3.05964 10.8342 2.5 11.3938 2.5 12.0842V16.2508C2.5 16.9412 3.05964 17.5008 3.75 17.5008H5.14167C5.83203 17.5008 6.39167 16.9412 6.39167 16.2508V12.0842C6.39167 11.3938 5.83203 10.8342 5.14167 10.8342H3.75Z" fill="#5C6970"/>
      <path d="M13.6165 7.91667C13.6165 7.22631 14.1762 6.66667 14.8665 6.66667H16.2582C16.9486 6.66667 17.5082 7.22631 17.5082 7.91667V16.2508C17.5082 16.9412 16.9486 17.5008 16.2582 17.5008H14.8665C14.1762 17.5008 13.6165 16.9412 13.6165 16.2508V7.91667Z" fill="#5C6970"/>
    </svg>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 2H2C1.44772 2 1 2.44772 1 3V10C1 10.5523 1.44772 11 2 11H9C9.55228 11 10 10.5523 10 10V7M7 1H11M11 1V5M11 1L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}


// ─── Navigation data ─────────────────────────────────────────────────────────

const primaryNavItems = [
  { id: 'home', icon: HomeIcon, label: 'Home' },
  { id: 'account', icon: AccountIcon, label: 'Account' },
  { id: 'people', icon: PeopleIcon, label: 'People' },
  { id: 'channels', icon: PaperPlaneIcon, label: 'Channels' },
  { id: 'ai', icon: AIIcon, label: 'AI' },
  { id: 'workspaces', icon: MonitorIcon, label: 'Workspaces' },
  { id: 'objects', icon: FlowIcon, label: 'Objects and rules', active: true },
  { id: 'apps', icon: GridIcon, label: 'Apps and integrations' },
];

const secondaryNavSections = [
  {
    title: 'Custom objects',
    items: [
      { id: 'objects', label: 'Objects' },
      { id: 'relationships', label: 'Relationships' },
    ],
  },
  {
    title: 'Omnichannel routing',
    items: [
      { id: 'routing-config', label: 'Routing configurations' },
      { id: 'queues', label: 'Queues' },
      { id: 'capacity-rules', label: 'Capacity rules' },
      { id: 'agent-statuses', label: 'Agent statuses' },
      { id: 'status-timeout', label: 'Status timeout' },
    ],
  },
  {
    title: 'Business rules',
    items: [
      { id: 'triggers', label: 'Triggers' },
      { id: 'skills', label: 'Skills' },
      { id: 'automations', label: 'Automations' },
      { id: 'sla', label: 'Service level agreement' },
      { id: 'schedules', label: 'Schedules' },
    ],
  },
];

const INITIAL_PRIORITIES = [
  'Agent execution time',
  'CSAT',
  'SLA compliance',
  'Assignment accuracy',
  'First contact resolution',
];

const SKILL_MATRIX_ROWS = [
  { name: 'Billing Disputes',        agents: 8, confidence: 89 },
  { name: 'Product Configuration',   agents: 8, confidence: 90 },
  { name: 'Refund Processing',        agents: 7, confidence: 90 },
  { name: 'Account Migration',        agents: 5, confidence: 89 },
  { name: 'Subscription Management',  agents: 9, confidence: 88 },
  { name: 'Compliance and Security',  agents: 4, confidence: 88 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function RoutingConfigPage({ onProductChange, selectedProduct, products, onSubPageChange, initialCopilotFlow, appliedRecommendationIds, onRecommendationApplied }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeSubPage, setActiveSubPage] = useState('routing-config');
  const [priorities, setPriorities] = useLocalStorage('zenbox:routing:priorities', INITIAL_PRIORITIES);
  const [dragIndex, setDragIndex] = useState(null);
  const [wfmEnabled, setWfmEnabled] = useLocalStorage('zenbox:routing:wfmEnabled', false);
  const [qaEnabled, setQaEnabled] = useLocalStorage('zenbox:routing:qaEnabled', false);
  const [aiSkillEnabled, setAiSkillEnabled] = useLocalStorage('zenbox:routing:aiSkillEnabled', false);
  const [showSkillMatrix, setShowSkillMatrix] = useLocalStorage('zenbox:routing:showSkillMatrix', false);
  const [assignmentMethod, setAssignmentMethod] = useLocalStorage('zenbox:routing:assignmentMethod', 'highest-spare');
  const [isCopilotOpen, setIsCopilotOpen] = useState(!!initialCopilotFlow);
  const [activeCopilotFlow, setActiveCopilotFlow] = useState(initialCopilotFlow || null);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [recommendations, setRecommendations] = useState(() =>
    appliedRecommendationIds
      ? ROUTING_PAGE_RECOMMENDATIONS.filter(r => !appliedRecommendationIds.has(r.id))
      : ROUTING_PAGE_RECOMMENDATIONS
  );

  const wfmCardRef = useRef(null);
  const skillCardRef = useRef(null);

  const handleToggleNav = () => setIsNavCollapsed(!isNavCollapsed);
  const handleSubPageSelect = (itemId) => {
    setActiveSubPage(itemId);
    if (onSubPageChange) onSubPageChange(itemId);
  };

  const handleWfmActivated = useCallback(() => {
    setWfmEnabled(true);
    requestAnimationFrame(() => {
      wfmCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, []);

  const handleSkillsActivated = useCallback(() => {
    setAiSkillEnabled(true);
    setShowSkillMatrix(true);
    requestAnimationFrame(() => {
      skillCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, []);

  const handleOpenRecommendations = useCallback(() => {
    setIsCopilotOpen(false);
    setIsRecommendationsOpen(true);
  }, []);

  const handleApplyRecommendation = useCallback(() => {
    if (!selectedRecommendation) return;

    if (selectedRecommendation.id === 'skills-based') {
      setRecommendations(prev => prev.filter(r => r.id !== selectedRecommendation.id));
      onRecommendationApplied?.('skills-based');
      setIsRecommendationsOpen(false);
      setSelectedRecommendation(null);
      setActiveCopilotFlow('skills-activation');
      setIsCopilotOpen(true);
      return;
    } else if (selectedRecommendation.id === 'wfm-data') {
      setRecommendations(prev => prev.filter(r => r.id !== selectedRecommendation.id));
      onRecommendationApplied?.('wfm-data');
      setIsRecommendationsOpen(false);
      setSelectedRecommendation(null);
      setActiveCopilotFlow('wfm-activation');
      setIsCopilotOpen(true);
      return;
    }

    setRecommendations(prev => prev.filter(r => r.id !== selectedRecommendation.id));
    onRecommendationApplied?.(selectedRecommendation.id);
    setIsRecommendationsOpen(false);
    setSelectedRecommendation(null);
  }, [selectedRecommendation, onRecommendationApplied]);

  // ── Drag-to-reorder handlers ────────────────────────────────────────────────
  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragIndex === null || dragIndex === index) return;
    const next = [...priorities];
    const [dragged] = next.splice(dragIndex, 1);
    next.splice(index, 0, dragged);
    setPriorities(next);
    setDragIndex(index);
  };

  const handleDragEnd = () => setDragIndex(null);

  return (
    <div className="routing-config-page">
      <TopBar
        pageTitle="Omnichannel routing"
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
        isCopilotOpen={isCopilotOpen}
        onToggleCopilot={() => setIsCopilotOpen(v => !v)}
      />

      <div className="routing-config-page__body">
        <PageSidebarNav
          primaryItems={primaryNavItems}
          secondaryHeading="Objects and rules"
          secondarySections={secondaryNavSections}
          activeItem={activeSubPage}
          onItemSelect={handleSubPageSelect}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={handleToggleNav}
        />

        <div className="routing-config-page__content-column">
          <main className="routing-config-page__main">
            <div className="routing-config-page__content">

              {/* ── Breadcrumbs ─────────────────────────────────────── */}
              <nav className="rc-breadcrumbs" aria-label="Breadcrumb">
                <Anchor href="#" className="rc-breadcrumbs__link">Objects and rules</Anchor>
                <ChevronDownIcon className="rc-breadcrumbs__sep" />
                <Anchor href="#" className="rc-breadcrumbs__link">Omnichannel routing</Anchor>
                <ChevronDownIcon className="rc-breadcrumbs__sep" />
                <Anchor href="#" className="rc-breadcrumbs__link">Routing configurations</Anchor>
                <ChevronDownIcon className="rc-breadcrumbs__sep" />
                <span className="rc-breadcrumbs__current">Predictive routing configuration</span>
              </nav>

              {/* ── Page header ──────────────────────────────────────── */}
              <div className="rc-page-header rc-section rc-section--header">
                <div className="rc-page-header__text">
                  <h1 className="rc-page-header__title">Predictive routing configuration</h1>
                  <p className="rc-page-header__description">
                    Configure the AI-powered routing engine that determines how tickets are distributed
                    to team members. Prioritize the metrics that matter most, connect data sources,
                    and enable skill-based matching. All other settings will be used from{' '}
                    <Anchor href="#" className="rc-inline-link">
                      General routing configuration
                      <ExternalLinkIcon className="rc-inline-link__icon" />
                    </Anchor>
                  </p>
                </div>
              </div>

              {/* ── Recommendation banner ────────────────────────────── */}
              <RecommendationsBanner
                count={recommendations.length}
                onViewRecommendations={handleOpenRecommendations}
              />

              {/* ── Section 1: Routing engine model ─────────────────── */}
              <section className="rc-section" aria-labelledby="rc-routing-engine-title">
                <div className="rc-section__head">
                  <h2 id="rc-routing-engine-title" className="rc-section__title">Routing engine model</h2>
                  <p className="rc-section__description">
                    Define the core behavior of the predictive routing engine — how it evaluates
                    tickets and selects agents.
                  </p>
                </div>

                <div className="rc-form-group">
                  {/* Predictive routing policy */}
                  <div className="rc-form-field">
                    <div className="rc-form-field__label-row">
                      <span className="rc-form-field__label">Predictive routing policy</span>
                    </div>
                    <p className="rc-form-field__hint">
                      Defines how routing engine evaluates and selects agents.{' '}
                      <Anchor href="#" className="rc-inline-link">
                        Learn about predictive routing policies
                        <ExternalLinkIcon className="rc-inline-link__icon" />
                      </Anchor>
                    </p>
                    <Field className="rc-form-field__input-wrap">
                      <Label hidden>Predictive routing policy</Label>
                      <Input placeholder="Workpile policy" className="rc-input" />
                    </Field>
                  </div>

                  {/* Assignment method */}
                  <div className="rc-form-field">
                    <div className="rc-form-field__label-row">
                      <span className="rc-form-field__label">Assignment method</span>
                    </div>
                    <p className="rc-form-field__hint">
                      Determines which agent receives the ticket when multiple agents qualify.
                    </p>
                    <Field className="rc-form-field__input-wrap">
                      <Label hidden>Assignment method</Label>
                      <Select
                        value={assignmentMethod}
                        onChange={(e) => setAssignmentMethod(e.target.value)}
                        className="rc-select"
                      >
                        <option value="highest-spare">Highest percentage spare capacity</option>
                        <option value="least-busy">Least busy agent</option>
                        <option value="round-robin">Round robin</option>
                      </Select>
                    </Field>
                  </div>
                </div>
              </section>

              {/* ── Section 2: Optimization priorities ──────────────── */}
              <section className="rc-section" aria-labelledby="rc-priorities-title">
                <div className="rc-section__head">
                  <h2 id="rc-priorities-title" className="rc-section__title">Optimization priorities</h2>
                  <p className="rc-section__description">
                    The routing engine uses these metrics to score and rank agents for each ticket.
                    Drag to reorder — metrics higher in the list carry more weight in routing decisions.
                  </p>
                </div>

                <ul className="rc-priority-list" aria-label="Optimization priorities">
                  {priorities.map((item, index) => (
                    <li
                      key={item}
                      className={`rc-draggable-item${dragIndex === index ? ' rc-draggable-item--dragging' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <GripIcon className="rc-draggable-item__grip" aria-hidden="true" />
                      <span className="rc-draggable-item__label">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* ── Section 3: Data Sources ──────────────────────────── */}
              <section className="rc-section" aria-labelledby="rc-data-sources-title">
                <div className="rc-section__head">
                  <h2 id="rc-data-sources-title" className="rc-section__title">Data sources</h2>
                  <p className="rc-section__description">
                    Connect external data to enrich routing decisions. The routing engine uses these
                    inputs alongside built-in performance data to make smarter assignments.{' '}
                    <Anchor href="#" className="rc-inline-link">
                      Learn about data sources integration
                      <ExternalLinkIcon className="rc-inline-link__icon" />
                    </Anchor>
                  </p>
                </div>

                <div className="rc-integration-cards">
                  <div
                    className="rc-integration-card"
                    ref={wfmCardRef}
                    data-activated={wfmEnabled ? 'true' : 'false'}
                  >
                    <div className="rc-integration-card__body">
                      <div className="rc-integration-card__info">
                        <div className="rc-integration-card__title-row">
                          <span className="rc-integration-card__title">
                            Workforce management integration
                          </span>
                          <Tag {...(wfmEnabled ? { hue: 'green' } : {})} className={wfmEnabled ? '' : 'rc-tag-inactive'}>
                            {wfmEnabled ? 'Active' : 'Inactive'}
                          </Tag>
                        </div>
                        <p className="rc-integration-card__description">
                          Sync agent schedules from your WFM tool to automate queue assignments and
                          status changes. The routing engine will use schedule data to determine agent
                          availability in real time.
                        </p>
                      </div>
                      <Field className="rc-integration-card__toggle-field">
                        <Toggle
                          checked={wfmEnabled}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRecommendations(prev => prev.filter(r => r.id !== 'wfm-data'));
                              onRecommendationApplied?.('wfm-data');
                              setActiveCopilotFlow('wfm-activation');
                              setIsCopilotOpen(true);
                            } else {
                              setWfmEnabled(false);
                            }
                          }}
                        >
                          <Label hidden>Workforce management integration</Label>
                        </Toggle>
                      </Field>
                    </div>
                  </div>

                  <div className="rc-integration-card">
                    <div className="rc-integration-card__body">
                      <div className="rc-integration-card__info">
                        <div className="rc-integration-card__title-row">
                          <span className="rc-integration-card__title">
                            Quality assurance integration
                          </span>
                          <Tag className="rc-tag-inactive">Inactive</Tag>
                        </div>
                        <p className="rc-integration-card__description">
                          Connect QA review scores and AutoQA data to the routing engine. Agents with
                          higher quality scores on relevant ticket types will be prioritized in
                          routing decisions.
                        </p>
                      </div>
                      <Field className="rc-integration-card__toggle-field">
                        <Toggle
                          checked={qaEnabled}
                          onChange={(e) => setQaEnabled(e.target.checked)}
                        >
                          <Label hidden>Quality assurance integration</Label>
                        </Toggle>
                      </Field>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Section 4: Skill-based routing ───────────────────── */}
              <section className="rc-section" aria-labelledby="rc-skill-routing-title">
                <div className="rc-section__head">
                  <h2 id="rc-skill-routing-title" className="rc-section__title">Skill-based routing</h2>
                  <p className="rc-section__description">
                    Automatically match tickets to agents with the right expertise. Skills are created
                    and managed by AI based on historical performance data and ticket intent detection.{' '}
                    <Anchor href="#" className="rc-inline-link">
                      Powered by Intelligent triage
                      <ExternalLinkIcon className="rc-inline-link__icon" />
                    </Anchor>
                  </p>
                </div>

                <div className="rc-integration-cards">
                  <div
                    className="rc-integration-card"
                    ref={skillCardRef}
                    data-activated={aiSkillEnabled ? 'true' : 'false'}
                  >
                    <div className="rc-integration-card__body">
                      <div className="rc-integration-card__info">
                        <div className="rc-integration-card__title-row">
                          <span className="rc-integration-card__title">AI skill matching</span>
                          <Tag {...(aiSkillEnabled ? { hue: 'green' } : {})} className={aiSkillEnabled ? '' : 'rc-tag-inactive'}>
                            {aiSkillEnabled ? 'Active' : 'Inactive'}
                          </Tag>
                        </div>
                        <p className="rc-integration-card__description">
                          Automatically match tickets to agents with the right expertise using AI
                          intent detection. Skills are generated and managed from historical
                          performance data — no triggers or manual tagging required.
                        </p>
                      </div>
                      <Field className="rc-integration-card__toggle-field">
                        <Toggle
                          checked={aiSkillEnabled}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRecommendations(prev => prev.filter(r => r.id !== 'skills-based'));
                              onRecommendationApplied?.('skills-based');
                              setActiveCopilotFlow('skills-activation');
                              setIsCopilotOpen(true);
                            } else {
                              setAiSkillEnabled(false);
                              setShowSkillMatrix(false);
                            }
                          }}
                        >
                          <Label hidden>AI skill matching</Label>
                        </Toggle>
                      </Field>
                    </div>
                  </div>
                </div>

                {showSkillMatrix && (
                  <div className="rc-skill-matrix">
                    <div className="rc-skill-matrix__header">
                      <div className="rc-skill-matrix__title-row">
                        <span className="rc-skill-matrix__title">Skills matrix</span>
                        <InfoIcon className="rc-skill-matrix__info-icon" />
                      </div>
                      <Anchor href="#" className="rc-inline-link">Manage agent skills</Anchor>
                    </div>
                    <Table className="rc-skill-matrix__table">
                      <Head>
                        <HeaderRow>
                          <HeaderCell className="rc-skill-matrix__col-name">Skill name</HeaderCell>
                          <HeaderCell className="rc-skill-matrix__col-agents">Agents assigned</HeaderCell>
                          <HeaderCell className="rc-skill-matrix__col-conf">Avg confidence</HeaderCell>
                          <HeaderCell className="rc-skill-matrix__col-actions" />
                        </HeaderRow>
                      </Head>
                      <Body>
                        {SKILL_MATRIX_ROWS.map((row, i) => (
                          <Row key={row.name} style={{ '--row-index': i }}>
                            <Cell className="rc-skill-matrix__cell-name">{row.name}</Cell>
                            <Cell className="rc-skill-matrix__cell-agents">{row.agents}</Cell>
                            <Cell className="rc-skill-matrix__cell-conf">{row.confidence}%</Cell>
                            <Cell className="rc-skill-matrix__cell-actions">
                              <IconButton
                                aria-label={`More options for ${row.name}`}
                                isBasic
                                size="small"
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                  <circle cx="8" cy="3" r="1.25" fill="currentColor"/>
                                  <circle cx="8" cy="8" r="1.25" fill="currentColor"/>
                                  <circle cx="8" cy="13" r="1.25" fill="currentColor"/>
                                </svg>
                              </IconButton>
                            </Cell>
                          </Row>
                        ))}
                      </Body>
                    </Table>
                  </div>
                )}
              </section>

              {/* ── Section 5: Predictive routing resources ──────────── */}
              <section className="rc-section rc-section--resources" aria-labelledby="rc-resources-title">
                <div className="rc-section__head">
                  <h2 id="rc-resources-title" className="rc-section__title">Predictive routing resources</h2>
                </div>

                <div className="rc-resource-tiles">
                  <div className="rc-resource-tile">
                    <BookOpenIcon className="rc-resource-tile__icon" aria-hidden="true" />
                    <div className="rc-resource-tile__body">
                      <span className="rc-resource-tile__title">
                        How to enable predictive routing to a queue?
                      </span>
                      <Anchor href="#" className="rc-inline-link rc-resource-tile__link">
                        Open article
                        <ExternalLinkIcon className="rc-inline-link__icon" />
                      </Anchor>
                    </div>
                  </div>

                  <div className="rc-resource-tile">
                    <FlowIcon className="rc-resource-tile__icon rc-resource-tile__icon--lg" aria-hidden="true" />
                    <div className="rc-resource-tile__body">
                      <span className="rc-resource-tile__title">Configure routing queue</span>
                      <Anchor href="#" className="rc-inline-link rc-resource-tile__link">
                        Create queue
                        <ExternalLinkIcon className="rc-inline-link__icon" />
                      </Anchor>
                    </div>
                  </div>

                  <div className="rc-resource-tile">
                    <ChartBarIcon className="rc-resource-tile__icon" aria-hidden="true" />
                    <div className="rc-resource-tile__body">
                      <span className="rc-resource-tile__title">Predictive routing dashboard</span>
                      <Anchor href="#" className="rc-inline-link rc-resource-tile__link">
                        Open dashboard
                        <ExternalLinkIcon className="rc-inline-link__icon" />
                      </Anchor>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </main>
        </div>

        <CopilotSidebar
          isOpen={isCopilotOpen}
          onClose={() => { setIsCopilotOpen(false); setActiveCopilotFlow(null); }}
          initialFlow={activeCopilotFlow}
          onWfmActivated={handleWfmActivated}
          onSkillsActivated={handleSkillsActivated}
        />

        <RecommendationsDrawer
          isOpen={isRecommendationsOpen}
          onClose={() => { setIsRecommendationsOpen(false); setSelectedRecommendation(null); }}
          selectedRecommendation={selectedRecommendation}
          onSelectRecommendation={setSelectedRecommendation}
          onApplyRecommendation={handleApplyRecommendation}
          recommendations={recommendations}
        />
      </div>
    </div>
  );
}
