import { useState, useEffect } from 'react';
import { Button, IconButton } from '@zendeskgarden/react-buttons';
import { Field, Label, Select, Input } from '@zendeskgarden/react-forms';
import { Tag } from '@zendeskgarden/react-tags';
import { Avatar } from '@zendeskgarden/react-avatars';
import { Menu, Item, Separator, ItemGroup } from '@zendeskgarden/react-dropdowns';
import { ChatIcon, SparkleIcon, PhoneIcon, EmailIcon, Icon } from '../Icons';
import Composer from '../Composer';
import { assetUrl } from '../../utils/assetUrl';
import './ConversationPanel.css';

// ========================================
// Icons
// ========================================

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
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.738 1.95435C15.7195 1.79066 15.5811 1.66691 15.4163 1.66675C15.2516 1.66658 15.1129 1.79003 15.0941 1.95369C15.0062 2.71559 14.7799 3.23828 14.4254 3.59281C14.0708 3.94733 13.5482 4.1736 12.7863 4.26147C12.6226 4.28035 12.4992 4.41901 12.4993 4.58375C12.4995 4.74849 12.6233 4.88689 12.7869 4.90543C13.5359 4.99027 14.0706 5.21649 14.4341 5.57345C14.7957 5.92847 15.0262 6.45042 15.0932 7.20468C15.1081 7.37203 15.2483 7.50027 15.4163 7.50008C15.5843 7.49989 15.7244 7.37134 15.7388 7.20396C15.8031 6.46244 16.0334 5.92873 16.3973 5.56478C16.7613 5.20084 17.295 4.97047 18.0365 4.90628C18.2039 4.89179 18.3325 4.75179 18.3327 4.58378C18.3328 4.41577 18.2046 4.27548 18.0373 4.26061C17.283 4.19361 16.7611 3.96306 16.406 3.6015C16.0491 3.23796 15.8228 2.70336 15.738 1.95435Z" fill="currentColor"/>
      <path d="M9.99402 4.07296C9.94635 3.65203 9.59052 3.33385 9.16685 3.33342C8.74327 3.33298 8.38668 3.65043 8.33818 4.07126C8.1122 6.03045 7.53038 7.37449 6.61874 8.28614C5.7071 9.19775 4.36305 9.77958 2.40387 10.0056C1.98303 10.0541 1.66558 10.4107 1.66602 10.8342C1.66645 11.2579 1.98463 11.6137 2.40556 11.6614C4.33161 11.8796 5.70627 12.4613 6.64108 13.3792C7.57082 14.2922 8.16367 15.6342 8.33593 17.5738C8.37418 18.0042 8.73493 18.3339 9.16693 18.3334C9.59902 18.3329 9.95902 18.0023 9.99627 17.5719C10.1613 15.6652 10.7537 14.2928 11.6895 13.3569C12.6254 12.4211 13.9978 11.8287 15.9045 11.6637C16.3349 11.6264 16.6655 11.2664 16.666 10.8343C16.6665 10.4023 16.3368 10.0416 15.9064 10.0033C13.9668 9.83108 12.6248 9.23825 11.7119 8.30848C10.7939 7.37367 10.2122 5.99901 9.99402 4.07296Z" fill="currentColor"/>
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
    <img
      className={className}
      src={assetUrl('/assets/Input/Start icon.svg')}
      alt=""
      aria-hidden="true"
    />
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
      <path fillRule="evenodd" clipRule="evenodd" d="M16.6667 4.58329C16.6667 3.95522 16.308 3.46951 15.9126 3.13565C15.5134 2.79853 14.985 2.53248 14.4051 2.32537C13.238 1.90856 11.6805 1.66663 10 1.66663C8.31955 1.66663 6.76204 1.90856 5.59497 2.32537C5.01507 2.53248 4.48675 2.79853 4.08749 3.13565C3.69211 3.46951 3.33337 3.95522 3.33337 4.58329V8.33329C3.33337 8.96138 3.69211 9.44704 4.08749 9.78096C4.48675 10.118 5.01507 10.3841 5.59497 10.5912C6.76204 11.008 8.31955 11.25 10 11.25C11.6805 11.25 13.238 11.008 14.4051 10.5912C14.985 10.3841 15.5134 10.118 15.9126 9.78096C16.308 9.44704 16.6667 8.96138 16.6667 8.33329V4.58329ZM5.16275 4.40908C5.05872 4.49691 5.01938 4.55563 5.00532 4.58329C5.01938 4.61095 5.05872 4.66968 5.16275 4.75751C5.35386 4.91888 5.67982 5.10175 6.15553 5.27165C7.09971 5.60885 8.45887 5.83329 10 5.83329C11.5412 5.83329 12.9004 5.60885 13.8445 5.27165C14.3203 5.10175 14.6462 4.91888 14.8374 4.75751C14.9414 4.66968 14.9807 4.61095 14.9948 4.58329C14.9807 4.55563 14.9414 4.49691 14.8374 4.40908C14.6462 4.24771 14.3203 4.06483 13.8445 3.89493C12.9004 3.55773 11.5412 3.33329 10 3.33329C8.45887 3.33329 7.09971 3.55773 6.15553 3.89493C5.67982 4.06483 5.35386 4.24771 5.16275 4.40908Z" fill="currentColor"/>
      <path d="M14.9657 12.1608C15.533 11.9581 16.1323 11.6834 16.6667 11.3031V15.4166C16.6667 16.0447 16.308 16.5304 15.9126 16.8643C15.5134 17.2014 14.985 17.4675 14.4051 17.6745C13.238 18.0914 11.6805 18.3333 10 18.3333C8.31955 18.3333 6.76204 18.0914 5.59497 17.6745C5.01507 17.4675 4.48675 17.2014 4.08749 16.8643C3.69211 16.5304 3.33337 16.0447 3.33337 15.4166V11.3031C3.86779 11.6834 4.46704 11.9581 5.03441 12.1608C6.42439 12.6572 8.18024 12.9166 10 12.9166C11.8199 12.9166 13.5757 12.6572 14.9657 12.1608Z" fill="currentColor"/>
    </svg>
  );
}

function BookIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.83334 1.66669C4.45264 1.66669 3.33334 2.78598 3.33334 4.16669V15.8334C3.33334 17.2141 4.45264 18.3334 5.83334 18.3334H14.1667C15.5474 18.3334 16.6667 17.2141 16.6667 15.8334V4.16669C16.6667 2.78598 15.5474 1.66669 14.1667 1.66669H5.83334ZM5.00001 15.8334C5.00001 16.2936 5.37311 16.6667 5.83334 16.6667H14.1667C14.6269 16.6667 15 16.2936 15 15.8334V14.8578C14.7393 14.9499 14.4588 15 14.1667 15H5.83334C5.37311 15 5.00001 15.3731 5.00001 15.8334ZM7.50001 5.00002C7.03978 5.00002 6.66668 5.37312 6.66668 5.83335C6.66668 6.29359 7.03978 6.66669 7.50001 6.66669H12.5C12.9603 6.66669 13.3333 6.29359 13.3333 5.83335C13.3333 5.37312 12.9603 5.00002 12.5 5.00002H7.50001ZM6.66668 9.16669C6.66668 8.70644 7.03978 8.33335 7.50001 8.33335H10C10.4603 8.33335 10.8333 8.70644 10.8333 9.16669C10.8333 9.62694 10.4603 10 10 10H7.50001C7.03978 10 6.66668 9.62694 6.66668 9.16669Z" fill="currentColor"/>
    </svg>
  );
}

function DevicesIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.50208 4.99963C2.50208 3.62007 3.62043 2.50171 4.99999 2.50171H6.66666C8.04623 2.50171 9.16458 3.62007 9.16458 4.99963V6.66629C9.16458 8.04586 8.04623 9.16425 6.66666 9.16425H4.99999C3.62043 9.16425 2.50208 8.04586 2.50208 6.66629V4.99963Z" fill="currentColor"/>
      <path d="M2.50208 13.333C2.50208 11.9534 3.62043 10.8351 4.99999 10.8351H6.66666C8.04623 10.8351 9.16458 11.9534 9.16458 13.333V14.9997C9.16458 16.3792 8.04623 17.4976 6.66666 17.4976H4.99999C3.62043 17.4976 2.50208 16.3792 2.50208 14.9997V13.333Z" fill="currentColor"/>
      <path d="M10.8354 4.99963C10.8354 3.62007 11.9537 2.50171 13.3333 2.50171H15C16.3796 2.50171 17.4979 3.62007 17.4979 4.99963V6.66629C17.4979 8.04586 16.3796 9.16425 15 9.16425H13.3333C11.9537 9.16425 10.8354 8.04586 10.8354 6.66629V4.99963Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.1667 10.8351C12.3268 10.8351 10.8354 12.3265 10.8354 14.1663C10.8354 16.0061 12.3268 17.4976 14.1667 17.4976C16.0065 17.4976 17.4979 16.0061 17.4979 14.1663C17.4979 12.3265 16.0065 10.8351 14.1667 10.8351ZM12.4979 14.1663C12.4979 13.2447 13.2451 12.4976 14.1667 12.4976C15.0883 12.4976 15.8354 13.2447 15.8354 14.1663C15.8354 15.0879 15.0883 15.8351 14.1667 15.8351C13.2451 15.8351 12.4979 15.0879 12.4979 14.1663Z" fill="currentColor"/>
    </svg>
  );
}

function PlusIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.16638 16.6663V10.8333H3.33337C2.87325 10.8333 2.50054 10.4603 2.50037 10.0002C2.50037 9.54001 2.87314 9.16626 3.33337 9.16626H9.16638V3.33325C9.16638 2.87301 9.54013 2.50024 10.0004 2.50024C10.4605 2.50042 10.8334 2.87312 10.8334 3.33325V9.16626H16.6664C17.1266 9.16626 17.5004 9.54001 17.5004 10.0002C17.5002 10.4603 17.1265 10.8333 16.6664 10.8333H10.8334V16.6663C10.8334 17.1264 10.4605 17.5001 10.0004 17.5002C9.54013 17.5002 9.16638 17.1265 9.16638 16.6663Z" fill="currentColor"/>
    </svg>
  );
}


function MapPinIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.5C5.79 1.5 4 3.29 4 5.5C4 8.5 8 14.5 8 14.5C8 14.5 12 8.5 12 5.5C12 3.29 10.21 1.5 8 1.5ZM8 7C7.17 7 6.5 6.33 6.5 5.5C6.5 4.67 7.17 4 8 4C8.83 4 9.5 4.67 9.5 5.5C9.5 6.33 8.83 7 8 7Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function MicOffIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L15 15M6 6V8C6 9.105 6.895 10 8 10C8.37 10 8.72 9.9 9.01 9.73M10 6V5C10 3.895 9.105 3 8 3C7.39 3 6.845 3.28 6.47 3.71" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M4 8C4 9.06 4.37 10.03 5 10.8M12 8C12 9.06 11.63 10.03 11 10.8M8 13.5V11.9M6 13.5H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function PauseCircleIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6.5 5.5V10.5M9.5 5.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PhoneOffIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9.5 3C9.5 3 11.5 3 12.5 4C13.5 5 13 6.5 12.5 7L11 8.5M4.5 7L3 8.5C2.5 9 1 9.5 2 10.5C3 11.5 5 13.5 5 13.5C6 14.5 7.5 14 8 13.5L9.5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ThumbsDownIcon({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 1H11C11.83 1 12.5 1.67 12.5 2.5V7C12.5 7.83 11.83 8.5 11 8.5H9.5M9.5 8.5L6 13C5.5 13 4.5 12.5 4.5 11.5V9.5H2.5C1.95 9.5 1.5 9.05 1.5 8.5L2.5 3.5C2.65 2.9 3.1 2.5 3.7 2.5H9.5V8.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
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

function TagSmallIcon({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2H6.5L12 7.5L7.5 12L2 6.5V2Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4.5" cy="4.5" r="0.75" fill="currentColor"/>
    </svg>
  );
}

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
// Conversation Data
// ========================================

const conversationsData = {
  "Riley Green | I can't access my account": {
    category: 'Account access',
    sentiment: 'Frustrated',
    language: 'Korean',
    messages: [
      { id: 1, sender: 'customer', name: 'Riley Green', text: '안녕하세요, 오늘 아침 보안 프롬프트에서 비밀번호를 재설정하라고 해서 했는데 계정에 접근이 안 돼요.', time: '4:05 PM' },
      { id: 2, sender: 'agent', name: 'You', text: '문의해 주셔서 감사합니다, Riley. 도와드릴게요. 잘못된 이메일 또는 비밀번호 오류가 나오나요, 아니면 인증 오류인가요?', time: '4:06 PM' },
      { id: 3, sender: 'customer', name: 'Riley Green', text: "두 번 재설정했는데도 '이메일 또는 비밀번호가 올바르지 않습니다'라고 나와요.", time: '4:07 PM' },
      { id: 4, sender: 'agent', name: 'You', text: '알겠습니다. Google로 로그인하시나요, 아니면 이메일과 비밀번호로 로그인하시나요?', time: '4:08 PM' },
      { id: 5, sender: 'customer', name: 'Riley Green', text: '이메일과 비밀번호요. 모바일에서는 로그인하자마자 바로 로그아웃돼요.', time: '4:09 PM' },
      { id: 6, sender: 'agent', name: 'You', text: '감사합니다. 계정을 확인했는데 정지 표시는 없네요. 이 링크를 한 번 시도해 보시고, 프라이빗 브라우저 탭에서 열어보세요: https://app.example.com/login?fresh=true', time: '4:10 PM' },
      { id: 7, sender: 'customer', name: 'Riley Green', text: '프라이빗 모드에서는 됐어요. 일반 Chrome에서는 여전히 안 돼요.', time: '4:11 PM' },
      { id: 8, sender: 'agent', name: 'You', text: '좋아요, 캐시된 토큰 문제로 좁혀졌네요. app.example.com의 사이트 데이터를 지우고 다시 로그인하시면 해결될 거예요.', time: '4:13 PM' },
    ],
    translatedMessages: [
      { id: 1, sender: 'customer', name: 'Riley Green', text: "Hi, I can't access my account after your security prompt asked me to reset my password this morning.", time: '4:05 PM' },
      { id: 2, sender: 'agent', name: 'You', text: "Thanks for reaching out, Riley. I can help. Are you seeing an incorrect password error or a verification error?", time: '4:06 PM' },
      { id: 3, sender: 'customer', name: 'Riley Green', text: "It says 'incorrect email or password' even after I reset it twice.", time: '4:07 PM' },
      { id: 4, sender: 'agent', name: 'You', text: 'Understood. Are you signing in with Google, or with email and password?', time: '4:08 PM' },
      { id: 5, sender: 'customer', name: 'Riley Green', text: 'Email and password. I also get logged out instantly on mobile.', time: '4:09 PM' },
      { id: 6, sender: 'agent', name: 'You', text: 'Thanks. I can see your account and no suspension flags. Please try this link once, then open it in a private browser tab: https://app.example.com/login?fresh=true', time: '4:10 PM' },
      { id: 7, sender: 'customer', name: 'Riley Green', text: 'That worked in private mode. Regular Chrome still fails.', time: '4:11 PM' },
      { id: 8, sender: 'agent', name: 'You', text: 'Great, that narrows it down to a cached token. Clear site data for app.example.com, sign in again, and this should be resolved.', time: '4:13 PM' },
    ],
  },
  "Dwight Torff | Can't find discount code for beef": {
    category: 'Promotion question',
    sentiment: 'Neutral',
    messages: [
      { id: 1, sender: 'customer', name: 'Dwight Torff', text: "Hi support, I saw a banner for 20% off premium beef cuts, but I can't find the promo code anywhere in checkout.", time: '4:02 PM' },
      { id: 2, sender: 'agent', name: 'You', text: "I can help with that. Are you buying from the web store, and are the items sold by Acme Foods directly?", time: '4:04 PM' },
      { id: 3, sender: 'customer', name: 'Dwight Torff', text: 'Yes, web store. Ribeye and brisket are in my cart, both sold by Acme Foods.', time: '4:06 PM' },
      { id: 4, sender: 'agent', name: 'You', text: 'Perfect. Use code BEEF20 in the promo field before payment. It applies only when the cart subtotal is at least $75.', time: '4:07 PM' },
      { id: 5, sender: 'customer', name: 'Dwight Torff', text: "That explains it. My cart was $69. I'll add one more item.", time: '4:08 PM' },
      { id: 6, sender: 'agent', name: 'You', text: 'Sounds good. If the code still fails after your subtotal is above $75, share a screenshot and I will check it right away.', time: '4:10 PM' },
    ],
  },
  "Kevin Smith": {
    category: 'Billing issue',
    sentiment: 'Frustrated',
    messages: [
      { id: 1, sender: 'customer', name: 'Kevin Smith', text: "Hi team, I need help with a billing issue. I renewed my annual plan today, and at checkout your page accepted promo code SAVE15 with a success confirmation. My card was then charged the full amount, and the invoice in Billing history also shows no discount line. I already tried a second browser, logged out and back in, and verified the same account email ending in @northbridge.io. Please review the order and either apply the discount retroactively or issue a partial refund for the difference.", time: '3:40 PM' },
    ],
  },
  "Angela Martin | Discount code": {
    category: 'Promotion question',
    sentiment: 'Neutral',
    messages: [
      { id: 1, sender: 'customer', name: 'Angela Martin', text: "Hello, I'm placing a bulk order for copy paper and wanted to confirm the current discount code for business customers.", time: '4:08 PM' },
      { id: 2, sender: 'agent', name: 'You', text: 'Thanks, Angela. I can help. Are you checking out from a business account or a personal account?', time: '4:09 PM' },
      { id: 3, sender: 'customer', name: 'Angela Martin', text: 'Business account. We usually order 20 to 30 boxes every 2 weeks.', time: '4:10 PM' },
      { id: 4, sender: 'agent', name: 'You', text: 'Great. Your account is eligible for PAPER10. Enter it in the promo field at checkout.', time: '4:11 PM' },
      { id: 5, sender: 'customer', name: 'Angela Martin', text: 'Does it stack with the auto-ship discount?', time: '4:12 PM' },
      { id: 6, sender: 'agent', name: 'You', text: "It doesn't stack. The system applies whichever discount is higher for that order.", time: '4:12 PM' },
      { id: 7, sender: 'customer', name: 'Angela Martin', text: 'Perfect, thank you. That answers it.', time: '4:13 PM' },
    ],
  },
  "Mike Vaccaro | Need help with emails": {
    category: 'Email delivery issue',
    sentiment: 'Concerned',
    messages: [
      { id: 1, sender: 'customer', name: 'Mike Vaccaro', text: "Hi support, I'm not receiving any order confirmation emails for the last 3 days, and this is causing fulfillment delays for my team. We checked spam, quarantine, and domain allowlists on our side. Other vendors can still email us, so this appears specific to your system. Could you verify whether notifications are being sent to m.vaccaro@blueoakretail.com, and if possible resend the confirmations for orders 44102, 44109, and 44111?", time: '3:30 PM' },
    ],
  },
  "Mike Vaccaro | Need help with hamster tubes": {
    category: 'Product support',
    sentiment: 'Neutral',
    messages: [
      { id: 1, sender: 'customer', name: 'Mike Vaccaro', text: 'Hi, I bought the starter hamster habitat kit, and I need extra clear tubes to connect a second cage.', time: '2:45 PM' },
      { id: 2, sender: 'agent', name: 'You', text: 'I can help with that. Which starter kit version do you have, 18mm or 25mm connectors?', time: '2:46 PM' },
      { id: 3, sender: 'customer', name: 'Mike Vaccaro', text: '25mm connectors, purchased last month.', time: '2:47 PM' },
      { id: 4, sender: 'agent', name: 'You', text: 'Great. You need the Tube Expansion Pack 25mm. It includes 8 straight tubes, 4 elbows, and 2 locking couplers.', time: '2:48 PM' },
      { id: 5, sender: 'customer', name: 'Mike Vaccaro', text: 'Nice, that is exactly what I needed.', time: '2:50 PM' },
    ],
  },
  "Oscar Rosser | Switch to Spanish language": {
    category: 'Localization request',
    sentiment: 'Neutral',
    language: 'Spanish',
    messages: [
      { id: 1, sender: 'customer', name: 'Oscar Rosser', text: "Hola, necesito cambiar el idioma de la aplicación a español para mi equipo en México. Revisé Configuración y Perfil, pero solo aparece inglés. Estamos en el plan Pro con 14 puestos. Si el español está limitado por el plan, por favor confirme qué actualización se necesita. Si ya debería estar disponible, comparta los pasos exactos porque lo necesitamos antes de la sesión de incorporación del lunes.", time: '2:30 PM' },
    ],
    translatedMessages: [
      { id: 1, sender: 'customer', name: 'Oscar Rosser', text: "Hello, I need to switch the app interface to Spanish for my team in Mexico. I checked Settings and Profile, but only English appears. We are on the Pro plan with 14 seats. If Spanish is plan-limited, please confirm what upgrade is required. If it should already be available, please share exact steps because we need this before Monday's onboarding session.", time: '2:30 PM' },
    ],
  },
  "지수 Kim | 주문이 도착하지 않았어요": {
    category: 'Order issue',
    sentiment: 'Frustrated',
    language: 'Korean',
    messages: [
      { id: 1, sender: 'customer', name: '지수 Kim', text: '안녕하세요, 5일 전에 주문한 상품이 아직도 도착하지 않았어요. 주문 번호는 KR-88421입니다.', time: '1:55 PM' },
      { id: 2, sender: 'agent', name: 'You', text: '안녕하세요, 지수님. 불편을 드려서 죄송합니다. 주문 번호를 확인해 드릴게요.', time: '1:57 PM' },
      { id: 3, sender: 'customer', name: '지수 Kim', text: '배송 추적을 확인했는데 3일째 업데이트가 없어요. 도대체 어디 있는 건가요?', time: '1:58 PM' },
      { id: 4, sender: 'agent', name: 'You', text: '확인해 보니 배송 중에 지연이 발생했습니다. 물류 파트너에게 확인 요청을 넣었습니다. 24시간 이내에 업데이트 드리겠습니다.', time: '2:01 PM' },
      { id: 5, sender: 'customer', name: '지수 Kim', text: '알겠어요. 빨리 해결됐으면 좋겠네요. 선물로 주문한 건데 일정이 있거든요.', time: '2:02 PM' },
    ],
    translatedMessages: [
      { id: 1, sender: 'customer', name: '지수 Kim', text: "Hello, I ordered a product 5 days ago and it still hasn't arrived. My order number is KR-88421.", time: '1:55 PM' },
      { id: 2, sender: 'agent', name: 'You', text: "Hello, Jisoo. I'm sorry for the inconvenience. Let me look up your order number.", time: '1:57 PM' },
      { id: 3, sender: 'customer', name: '지수 Kim', text: "I checked the delivery tracking and there's been no update for 3 days. Where is it?", time: '1:58 PM' },
      { id: 4, sender: 'agent', name: 'You', text: "I've checked and there's been a delay during shipping. I've submitted a confirmation request to our logistics partner. I'll update you within 24 hours.", time: '2:01 PM' },
      { id: 5, sender: 'customer', name: '지수 Kim', text: "I see. I hope this gets resolved quickly. I ordered it as a gift and I have a deadline.", time: '2:02 PM' },
    ],
  },
  "민준 Park | 환불 요청드립니다": {
    category: 'Refund request',
    sentiment: 'Frustrated',
    language: 'Korean',
    messages: [
      { id: 1, sender: 'customer', name: '민준 Park', text: '안녕하세요, 지난주에 구매한 블루투스 스피커에 결함이 있어서 환불을 요청드립니다. 충전이 전혀 안 돼요. 주문 번호는 KR-77305입니다.', time: '1:20 PM' },
      { id: 2, sender: 'agent', name: 'You', text: '안녕하세요, 민준님. 불편을 드려 정말 죄송합니다. 주문 내역을 확인했습니다. 환불 처리를 도와드릴게요.', time: '1:23 PM' },
      { id: 3, sender: 'customer', name: '민준 Park', text: '감사합니다. 언제쯤 환불이 되나요?', time: '1:24 PM' },
      { id: 4, sender: 'agent', name: 'You', text: '제품 반송 후 3-5 영업일 이내에 결제 수단으로 환불됩니다. 반송 레이블은 이메일로 보내 드릴게요.', time: '1:26 PM' },
    ],
    translatedMessages: [
      { id: 1, sender: 'customer', name: '민준 Park', text: "Hello, I'd like to request a refund for the Bluetooth speaker I purchased last week. It has a defect — it won't charge at all. My order number is KR-77305.", time: '1:20 PM' },
      { id: 2, sender: 'agent', name: 'You', text: "Hello, Minjun. I'm really sorry for the trouble. I've confirmed your order. I'll help you process the refund.", time: '1:23 PM' },
      { id: 3, sender: 'customer', name: '민준 Park', text: 'Thank you. How long will the refund take?', time: '1:24 PM' },
      { id: 4, sender: 'agent', name: 'You', text: "The refund will be returned to your original payment method within 3-5 business days after we receive the returned product. I'll send you a return label by email.", time: '1:26 PM' },
    ],
  },
  "서연 Choi | 비밀번호를 잊어버렸어요": {
    category: 'Account access',
    sentiment: 'Neutral',
    language: 'Korean',
    messages: [
      { id: 1, sender: 'customer', name: '서연 Choi', text: '안녕하세요, 비밀번호를 잊어버려서 로그인을 못하고 있어요. 비밀번호 재설정 이메일을 받지 못했어요.', time: '12:48 PM' },
      { id: 2, sender: 'agent', name: 'You', text: '안녕하세요, 서연님. 도와드릴게요. 가입하신 이메일 주소를 확인해 드릴까요?', time: '12:50 PM' },
      { id: 3, sender: 'customer', name: '서연 Choi', text: 'seoyeon.choi@example.kr 이메일로 가입했어요.', time: '12:51 PM' },
      { id: 4, sender: 'agent', name: 'You', text: '확인했습니다. 스팸 폴더도 확인해 보셨나요? 지금 재설정 이메일을 다시 발송해 드릴게요.', time: '12:53 PM' },
      { id: 5, sender: 'customer', name: '서연 Choi', text: '스팸 폴더에도 없었어요. 다시 보내주시면 감사하겠어요.', time: '12:54 PM' },
      { id: 6, sender: 'agent', name: 'You', text: '방금 발송했습니다. 5분 이내에 도착하지 않으면 다시 알려주세요.', time: '12:55 PM' },
    ],
    translatedMessages: [
      { id: 1, sender: 'customer', name: '서연 Choi', text: "Hello, I forgot my password and can't log in. I haven't received a password reset email.", time: '12:48 PM' },
      { id: 2, sender: 'agent', name: 'You', text: "Hello, Seoyeon. I'll help you out. Can you confirm the email address you registered with?", time: '12:50 PM' },
      { id: 3, sender: 'customer', name: '서연 Choi', text: 'I registered with seoyeon.choi@example.kr.', time: '12:51 PM' },
      { id: 4, sender: 'agent', name: 'You', text: "I've confirmed it. Did you check your spam folder? I'll resend the reset email now.", time: '12:53 PM' },
      { id: 5, sender: 'customer', name: '서연 Choi', text: "It wasn't in spam either. I'd appreciate it if you could send it again.", time: '12:54 PM' },
      { id: 6, sender: 'agent', name: 'You', text: "I've just sent it. If it doesn't arrive within 5 minutes, please let me know.", time: '12:55 PM' },
    ],
  },
};

const getConversationForTicket = (ticket) => {
  if (!ticket) return null;

  const conversationData = conversationsData[ticket.title] || {
    category: 'General Support',
    sentiment: 'Neutral',
    messages: [
      { id: 1, sender: 'customer', name: ticket.lastMessage?.name || ticket.title.split(' | ')[0] || 'Customer', text: ticket.lastMessage?.text || ticket.preview || 'Hello, I need assistance.', time: ticket.timestamp || ticket.time },
      { id: 2, sender: 'agent', name: 'You', text: 'Hello! How can I help you today?', time: ticket.timestamp || ticket.time },
    ],
  };

  return {
    id: ticket.id,
    subject: ticket.title,
    category: conversationData.category,
    sentiment: conversationData.sentiment,
    channel: conversationData.channel || null,
    intent: conversationData.intent || null,
    phoneNumber: conversationData.phoneNumber || ticket.phoneNumber || null,
    location: conversationData.location || null,
    language: conversationData.language || null,
    totalMessages: conversationData.messages.length,
    messages: conversationData.messages.map(msg => ({
      ...msg,
      name: msg.sender === 'customer' && !msg.type ? (ticket.lastMessage?.name || ticket.title.split(' | ')[0] || msg.name) : msg.name,
      avatar: null,
    })),
    translatedMessages: conversationData.translatedMessages
      ? conversationData.translatedMessages.map(msg => ({
          ...msg,
          name: msg.sender === 'customer' && !msg.type ? (ticket.lastMessage?.name || ticket.title.split(' | ')[0] || msg.name) : msg.name,
          avatar: null,
        }))
      : null,
  };
};

// ========================================
// Copilot summary data
// ========================================

const getCopilotSummaryForTicket = (ticket, conversation) => {
  if (ticket?.type === 'call' || conversation?.channel === 'incoming phone call') {
    const customerName = ticket?.lastMessage?.name || 'the customer';
    return {
      intro: `Here's a summary of ${customerName}'s interactions:`,
      fields: [
        { label: 'Name', value: customerName },
        { label: 'Location', value: 'Clontarf, Dublin' },
        { label: 'Issue', value: 'Urgent internet outage reported' },
        { label: 'Urgency', value: 'High' },
      ],
      previousTickets: [
        { id: '1054', text: 'Intermittent connectivity resolved last month' },
      ],
      insights: [
        'Customer currently has no connectivity',
        'Remote work is impacted',
        'Frustrated with AI agents responses',
      ],
      nextSteps: [
        "Verify if there are any known outages or maintenance work in the customer's area.",
        'Perform remote diagnostics',
        'Verify network status with the service provider',
        'Escalate to Tier 3 group or schedule a technician visit depending on troubleshooting',
      ],
    };
  }

  const customerName = ticket?.lastMessage?.name || 'the customer';
  return {
    intro: `Here's a summary of ${customerName}'s interactions:`,
    fields: [
      { label: 'Name', value: customerName },
      { label: 'Issue', value: ticket?.title || 'General inquiry' },
      { label: 'Status', value: ticket?.status === 'open' ? 'Open' : (ticket?.status || 'Unknown') },
      { label: 'Urgency', value: ticket?.sla ? 'High' : 'Normal' },
    ],
    previousTickets: [],
    insights: ['Customer is seeking assistance with their query'],
    nextSteps: ['Review the conversation details', 'Provide a helpful and timely response'],
  };
};

// ========================================
// Secondary Navigation Bar (breadcrumb)
// ========================================

function SecondaryNavBar({ ticket, onNextTicket, currentIndex, totalTickets }) {
  const canGoNext = currentIndex < totalTickets - 1;
  const requesterName = ticket?.lastMessage?.name || 'Customer';
  const statusLabel =
    ticket?.status === 'pending' ? 'Pending' :
    ticket?.status === 'on-hold' ? 'On-hold' :
    ticket?.status === 'solved' ? 'Solved' : 'Open';

  return (
    <div className="secondary-nav">
      <div className="secondary-nav__segment-control">
        <button className="secondary-nav__segment">Acme</button>
        <div className="secondary-nav__divider" />
        <button className="secondary-nav__segment">{requesterName}</button>
        <div className="secondary-nav__divider" />
        <button className="secondary-nav__segment secondary-nav__segment--ticket">
          <span className={`secondary-nav__status-tag secondary-nav__status-tag--${ticket?.status || 'open'}`}>
            {statusLabel}
          </span>
          <span className="secondary-nav__ticket-id">Ticket #{ticket?.id || '1234'}</span>
        </button>
      </div>
      <button
        className="secondary-nav__next-btn"
        onClick={canGoNext ? onNextTicket : undefined}
        disabled={!canGoNext}
      >
        Next →
      </button>
    </div>
  );
}

// ========================================
// Translation Banner
// ========================================

const LANGUAGE_OPTIONS = [
  'Arabic', 'Chinese', 'Dutch', 'English', 'French', 'German',
  'Italian', 'Japanese', 'Korean', 'Polish', 'Portuguese',
  'Russian', 'Spanish', 'Turkish',
];

function TranslationIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="8.5" width="7" height="6" rx="1" fill="#1F73B7" opacity="0.15"/>
      <path d="M2 5H8M5 2V5M3.5 5C3.5 6.5 4.5 8 6 8.5" stroke="#1F73B7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 10.5H13.5M11.25 8.5L13.5 13.5" stroke="#49545C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 13.5L11.25 8.5" stroke="#49545C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDownTinyIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TranslationBanner({
  detectedLanguage,
  sourceLanguage,
  targetLanguage,
  onSourceChange,
  onTargetChange,
  onTranslate,
  onDismiss,
  isTranslating,
}) {
  const [sourceOpen, setSourceOpen] = useState(false);
  const [targetOpen, setTargetOpen] = useState(false);

  return (
    <div className="translation-banner">
      <div className="translation-banner__left">
        <TranslationIcon className="translation-banner__icon" />

        <div className="translation-banner__select-wrapper">
          <button
            className="translation-banner__lang-btn"
            onClick={() => { setSourceOpen(o => !o); setTargetOpen(false); }}
            aria-haspopup="listbox"
            aria-expanded={sourceOpen}
          >
            <span>{sourceLanguage || detectedLanguage}</span>
            <ChevronDownTinyIcon className="translation-banner__chevron" />
          </button>
          {sourceOpen && (
            <ul className="translation-banner__dropdown" role="listbox">
              {LANGUAGE_OPTIONS.map(lang => (
                <li
                  key={lang}
                  role="option"
                  aria-selected={lang === (sourceLanguage || detectedLanguage)}
                  className={`translation-banner__dropdown-item ${lang === (sourceLanguage || detectedLanguage) ? 'translation-banner__dropdown-item--selected' : ''}`}
                  onClick={() => { onSourceChange(lang); setSourceOpen(false); }}
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>

        <span className="translation-banner__arrow" aria-hidden="true">→</span>

        <div className="translation-banner__select-wrapper">
          <button
            className="translation-banner__lang-btn"
            onClick={() => { setTargetOpen(o => !o); setSourceOpen(false); }}
            aria-haspopup="listbox"
            aria-expanded={targetOpen}
          >
            <span>{targetLanguage}</span>
            <ChevronDownTinyIcon className="translation-banner__chevron" />
          </button>
          {targetOpen && (
            <ul className="translation-banner__dropdown" role="listbox">
              {LANGUAGE_OPTIONS.map(lang => (
                <li
                  key={lang}
                  role="option"
                  aria-selected={lang === targetLanguage}
                  className={`translation-banner__dropdown-item ${lang === targetLanguage ? 'translation-banner__dropdown-item--selected' : ''}`}
                  onClick={() => { onTargetChange(lang); setTargetOpen(false); }}
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button isBasic size="small" className="translation-banner__translate-btn" onClick={onTranslate}>
          {isTranslating ? 'Show original' : 'Translate'}
        </Button>
      </div>

      <IconButton isBasic size="small" aria-label="Dismiss translation banner" className="translation-banner__dismiss" onClick={onDismiss}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </IconButton>
    </div>
  );
}

// ========================================
// Conversation Header (2 rows)
// ========================================

function ConversationHeader({ conversation, ticket }) {
  const channelLabel = conversation?.channel
    ? `Via ${conversation.channel}`
    : ticket?.type === 'email' ? 'Via email'
    : ticket?.type === 'chat' ? 'Via messaging'
    : ticket?.type === 'call' ? 'Via incoming phone call'
    : 'Via messaging';

  const isPhoneCall = ticket?.type === 'call' || conversation?.channel === 'incoming phone call';
  const phoneNumber = conversation?.phoneNumber || '+1 (415) 123-4567';
  const location = conversation?.location || 'United States';
  const intent = conversation?.intent;

  return (
    <div className="conversation-header">
      {/* Row 1: title + meta + actions */}
      <div className="conversation-header__row1">
        <div className="conversation-header__info">
          <h2 className="conversation-header__title">{conversation?.subject}</h2>
          <div className="conversation-header__meta">
            <span className="conversation-header__via">{channelLabel}</span>
            <span className="conversation-header__meta-divider" />
            <span className="conversation-header__status-active">
              <span className="conversation-header__status-dot" />
              Active
            </span>
            {intent && (
              <>
                <span className="conversation-header__meta-divider" />
                <span className="conversation-header__intent-label">Intent</span>
                <button className="conversation-header__intent-tag">{intent}</button>
              </>
            )}
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
      </div>

      {/* Row 2: phone-specific sub-header */}
      {isPhoneCall && (
        <div className="conversation-header__row2">
          <div className="conversation-header__call-info">
            <button className="conversation-header__call-info-btn">
              <PhoneIcon className="conversation-header__call-info-icon" />
              <span className="conversation-header__call-info-text">{phoneNumber}</span>
            </button>
            <span className="conversation-header__call-divider" />
            <button className="conversation-header__call-info-btn">
              <MapPinIcon className="conversation-header__call-info-icon" />
              <span className="conversation-header__call-info-text">{location}</span>
            </button>
          </div>

          <div className="conversation-header__call-controls">
            <button className="conversation-header__call-btn" title="Mute">
              <MicOffIcon className="conversation-header__call-btn-icon" />
            </button>
            <button className="conversation-header__call-btn" title="Hold">
              <PauseCircleIcon className="conversation-header__call-btn-icon" />
            </button>
            <button className="conversation-header__call-btn" title="Transfer">
              <ArrowRightIcon className="conversation-header__call-btn-icon" />
            </button>
            <button className="conversation-header__call-btn conversation-header__call-btn--end" title="End call">
              <PhoneOffIcon className="conversation-header__call-btn-icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================================
// Message component
// ========================================

function CallDetailsMessage({ message }) {
  return (
    <div className="message message--left">
      <div className="message__avatar">
        <div className="message__avatar-placeholder" />
      </div>
      <div className="message__body">
        <div className="message__header-row">
          <span className="message__author">{message.name}</span>
          {message.tag && (
            <span className={`message__tag message__tag--${message.tag?.toLowerCase()}`}>{message.tag}</span>
          )}
          <span className="message__time">{message.time}</span>
        </div>
        <div className="message__call-details-bubble">
          <p className="message__call-line">Call from: {message.callFrom}</p>
          <p className="message__call-line">Call to: {message.callTo}</p>
          <p className="message__call-line">Time of call: {message.callTime}</p>
        </div>
      </div>
    </div>
  );
}

function CallSummaryMessage({ message }) {
  return (
    <div className="message message--left">
      <div className="message__avatar">
        <div className="message__avatar-placeholder message__avatar-placeholder--system" />
      </div>
      <div className="message__body">
        <div className="message__header-row">
          <span className="message__author">{message.name}</span>
          {message.tag && (
            <span className={`message__tag message__tag--${message.tag?.toLowerCase()}`}>{message.tag}</span>
          )}
          <span className="message__time">{message.time}</span>
        </div>
        <div className="message__summary-bubble">
          <p className="message__summary-title">{message.summaryTitle}</p>
          <p className="message__summary-text">{message.text}</p>
          {message.redactionNote && (
            <p className="message__summary-redaction">{message.redactionNote}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Message({ message, isAgent }) {
  if (message.type === 'call-details') return <CallDetailsMessage message={message} />;
  if (message.type === 'call-summary') return <CallSummaryMessage message={message} />;

  const isSystem = message.sender === 'system';

  return (
    <div className={`message message--left ${isAgent ? 'message--agent' : ''}`}>
      <div className="message__avatar">
        <div className={`message__avatar-placeholder ${isAgent ? 'message__avatar-placeholder--agent' : isSystem ? 'message__avatar-placeholder--system' : ''}`} />
      </div>
      <div className="message__body">
        <div className="message__header-row">
          <span className="message__author">{message.name}</span>
          {message.tag && (
            <span className={`message__tag message__tag--${message.tag?.toLowerCase()}`}>{message.tag}</span>
          )}
          <span className="message__time">{message.time}</span>
        </div>
        <div className={`message__bubble ${isAgent ? 'message__bubble--agent' : ''}`}>
          <p className="message__text">{message.text}</p>
        </div>
      </div>
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

// ========================================
// Composer Area
// ========================================


const MACROS = [
  {
    group: 'Common',
    items: [
      { value: 'close-and-solve', label: 'Close and solve' },
      { value: 'follow-up', label: 'Follow up with customer' },
      { value: 'escalate-tier2', label: 'Escalate to Tier 2' },
    ],
  },
  {
    group: 'Billing',
    items: [
      { value: 'issue-refund', label: 'Issue refund' },
      { value: 'update-payment', label: 'Update payment method' },
    ],
  },
  {
    group: 'Technical',
    items: [
      { value: 'restart-troubleshooting', label: 'Restart troubleshooting' },
      { value: 'schedule-callback', label: 'Schedule callback' },
    ],
  },
];

function TicketFooter({ status = 'Open', onSubmit }) {
  const [selectedMacro, setSelectedMacro] = useState(null);

  const handleMacroSelect = (value) => {
    const allItems = MACROS.flatMap(g => g.items);
    const found = allItems.find(item => item.value === value);
    setSelectedMacro(found || null);
  };

  const macroTrigger = (
    <button className="ticket-footer__macro-trigger">
      <MacroIcon className="ticket-footer__macro-icon" />
      <span className={`ticket-footer__macro-label${selectedMacro ? ' ticket-footer__macro-label--selected' : ''}`}>
        {selectedMacro ? selectedMacro.label : 'Apply macro'}
      </span>
    </button>
  );

  return (
    <div className="ticket-footer">
      <div className="ticket-footer__macro-field">
        <Menu
          button={macroTrigger}
          onChange={({ value }) => handleMacroSelect(value)}
          placement="top-start"
        >
          {MACROS.map((group) => (
            <ItemGroup key={group.group} aria-label={group.group} legend={group.group}>
              {group.items.map(item => (
                <Item key={item.value} value={item.value}>
                  {item.label}
                </Item>
              ))}
            </ItemGroup>
          ))}
        </Menu>
      </div>

      <div className="ticket-footer__right">
        <Button size="small" className="ticket-footer__close-tab-btn">
          Close tab
          <ChevronDownIcon className="ticket-footer__close-chevron" />
        </Button>
        <div className="ticket-footer__submit-group">
          <Button className="ticket-footer__submit-btn" onClick={onSubmit}>
            Submit as <strong>{status}</strong>
          </Button>
          <IconButton className="ticket-footer__dropdown-btn" aria-label="More submit options">
            <ChevronDownIcon className="ticket-footer__dropdown-icon" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Copilot Panel (redesigned)
// ========================================

function CopilotPanel({ ticket, conversation }) {
  const [promptValue, setPromptValue] = useState('');
  const summary = getCopilotSummaryForTicket(ticket, conversation);

  return (
    <div className="copilot-panel">
      {/* Header */}
      <div className="copilot-panel__header">
        <div className="copilot-panel__header-left">
          <div className="copilot-panel__header-icon">
            <SparkleIcon className="copilot-panel__sparkle" />
          </div>
          <div className="copilot-panel__header-text">
            <h3 className="copilot-panel__title">Copilot</h3>
            <span className="copilot-panel__status">
              <span className="copilot-panel__status-dot" />
              Analyzing conversation
            </span>
          </div>
        </div>
        <button className="copilot-panel__add-btn" title="Add">
          <PlusIcon className="copilot-panel__add-icon" />
        </button>
      </div>

      {/* Content */}
      <div className="copilot-panel__content">
        {/* Intro row */}
        <div className="copilot-panel__intro-row">
          <div className="copilot-panel__ai-avatar">
            <SparkleIcon className="copilot-panel__ai-avatar-icon" />
          </div>
          <p className="copilot-panel__intro-text">{summary.intro}</p>
        </div>

        {/* Separator */}
        <div className="copilot-panel__separator" />

        {/* Summary fields */}
        <div className="copilot-panel__summary">
          {summary.fields.map((field) => (
            <p key={field.label} className="copilot-panel__summary-line">
              <strong>{field.label}</strong>{' '}{field.value}
            </p>
          ))}

          {summary.previousTickets.length > 0 && (
            <p className="copilot-panel__summary-line">
              <strong>Previous Tickets:</strong>{' '}
              {summary.previousTickets.map((pt, i) => (
                <span key={i}>
                  <a href="#" className="copilot-panel__link">Ticket #{pt.id}</a>: {pt.text}
                  {i < summary.previousTickets.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}

          {summary.insights.length > 0 && (
            <>
              <p className="copilot-panel__summary-line copilot-panel__summary-line--heading">
                <strong>Insights:</strong>
              </p>
              <ul className="copilot-panel__summary-list">
                {summary.insights.map((item, i) => (
                  <li key={i} className="copilot-panel__summary-list-item">{item}</li>
                ))}
              </ul>
            </>
          )}

          {summary.nextSteps.length > 0 && (
            <>
              <p className="copilot-panel__summary-line copilot-panel__summary-line--heading">
                <strong>Next Steps:</strong>
              </p>
              <ol className="copilot-panel__summary-list">
                {summary.nextSteps.map((step, i) => (
                  <li key={i} className="copilot-panel__summary-list-item">{step}</li>
                ))}
              </ol>
            </>
          )}
        </div>

        {/* Feedback buttons */}
        <div className="copilot-panel__feedback">
          <button className="copilot-panel__feedback-btn" title="Not helpful">
            <ThumbsDownIcon className="copilot-panel__feedback-icon" />
          </button>
          <button className="copilot-panel__feedback-btn" title="Regenerate">
            <RefreshIcon className="copilot-panel__feedback-icon" />
          </button>
          <button className="copilot-panel__feedback-btn" title="Copy">
            <CopyIcon className="copilot-panel__feedback-icon" />
          </button>
        </div>
      </div>

      {/* Prompt input */}
      <div className="copilot-panel__prompt">
        <input
          className="copilot-panel__prompt-input"
          type="text"
          placeholder="I'm here to help with any question..."
          value={promptValue}
          onChange={(e) => setPromptValue(e.target.value)}
        />
        <button className="copilot-panel__prompt-btn" title="Ask Copilot">
          <span className="copilot-panel__prompt-sparkle">✦</span>
        </button>
      </div>
    </div>
  );
}

// ========================================
// Ticket Properties Panel (permanent left panel)
// ========================================

function DropdownField({ label, value, extra }) {
  const displayValue = value || '—';
  return (
    <div className="ticket-props__field">
      <div className="ticket-props__label-row">
        <Label className="ticket-props__label">{label}</Label>
        {extra}
      </div>
      <Field>
        <Select isCompact value={displayValue} onChange={() => {}}>
          <option value={displayValue}>{displayValue}</option>
        </Select>
      </Field>
    </div>
  );
}

function TicketPropertiesPanel({ ticket }) {
  if (!ticket) return null;

  const customerName = ticket.lastMessage?.name || ticket.title.split(' | ')[0] || 'Unknown Customer';

  return (
    <div className="ticket-props">
      {/* Section 1: Brand, Requester, Assignee, Followers */}
      <div className="ticket-props__section">
        {/* Brand */}
        <DropdownField label="Brand" value="Brand 1" />

        {/* Requester */}
        <div className="ticket-props__field">
          <Label className="ticket-props__label">Requester</Label>
          <Field>
            <Input
              isCompact
              readOnly
              value={customerName}
              start={
                <Avatar size="extrasmall" backgroundColor="#68737d">
                  <span>{customerName.charAt(0)}</span>
                </Avatar>
              }
            />
          </Field>
        </div>

        {/* Assignee */}
        <div className="ticket-props__field">
          <div className="ticket-props__label-row">
            <Label className="ticket-props__label">Assignee</Label>
            <button className="ticket-props__take-it">take it</button>
          </div>
          <Field>
            <Select isCompact value="Support/Alex Smith" onChange={() => {}}>
              <option value="Support/Alex Smith">Support/Alex Smith</option>
            </Select>
          </Field>
        </div>

        {/* Followers */}
        <div className="ticket-props__field">
          <div className="ticket-props__label-row">
            <Label className="ticket-props__label">Followers</Label>
            <button className="ticket-props__take-it">follow</button>
          </div>
          <div className="ticket-props__followers">
            <Tag isPill size="small">
              <Avatar size="extrasmall" backgroundColor="#8b5cf6">
                <span>K</span>
              </Avatar>
              <span>Kim Schmitt</span>
              <Tag.Close aria-label="Remove Kim Schmitt" />
            </Tag>
            <Tag isPill size="small">
              <Avatar size="extrasmall" backgroundColor="#10b981">
                <span>I</span>
              </Avatar>
              <span>Ike Rose</span>
              <Tag.Close aria-label="Remove Ike Rose" />
            </Tag>
          </div>
        </div>
      </div>

      <div className="ticket-props__divider" />

      {/* Section 2: Form, Tags */}
      <div className="ticket-props__section">
        {/* Form */}
        <DropdownField label="Form" value="Form 1" />

        {/* Tags */}
        <div className="ticket-props__field">
          <Label className="ticket-props__label">Tags</Label>
          <div className="ticket-props__followers ticket-props__followers--tags">
            <Tag size="small">
              <span>vip</span>
              <Tag.Close aria-label="Remove vip" />
            </Tag>
            <Tag size="small">
              <span>order</span>
              <Tag.Close aria-label="Remove order" />
            </Tag>
            <Tag size="small">
              <span>delivery</span>
              <Tag.Close aria-label="Remove delivery" />
            </Tag>
          </div>
        </div>
      </div>

      <div className="ticket-props__divider" />

      {/* Section 3: Business impact, Field 1, Product area */}
      <div className="ticket-props__section">
        {/* Business impact */}
        <DropdownField label="Business impact" value="Problem" />

        {/* Field 1 */}
        <DropdownField label="Field 1" value="—" />

        {/* Product area */}
        <DropdownField label="Product area" value="" />
      </div>
    </div>
  );
}

// ========================================
// Context Panel Content (right panel — non-user tabs)
// ========================================

function ContextPanelContent({ ticket, activeTab, onInsertResponse, conversation }) {
  if (!ticket) return null;

  if (activeTab === 'knowledge') {
    return <CopilotPanel ticket={ticket} conversation={conversation} />;
  }

  return (
    <div className="context-panel__content context-panel__content--empty">
      <p>Coming soon...</p>
    </div>
  );
}

// ========================================
// Context Sidebar
// ========================================

function ContextSidebar({ activeTab, onTabChange, isPanelOpen }) {
  const tabs = [
    { id: 'data', icon: DatabaseIcon, label: 'Data' },
    { id: 'knowledge', icon: BookIcon, label: 'Knowledge' },
    { id: 'devices', icon: DevicesIcon, label: 'Devices' },
    { id: 'ai', icon: AISparkleIcon, label: 'AI' },
  ];

  const appIcons = [
    { id: 'app1', color: '#1f73b7', label: 'Zendesk' },
    { id: 'app2', color: '#8b5cf6', label: 'App 2' },
    { id: 'app3', color: '#10b981', label: 'App 3' },
    { id: 'app4', color: '#f59e0b', label: 'App 4' },
  ];

  return (
    <div className="context-sidebar">
      {/* Standard tabs */}
      <div className="context-sidebar__tabs">
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

      {/* Separator */}
      <div className="context-sidebar__separator" />

      {/* App icon buttons */}
      <div className="context-sidebar__apps">
        {appIcons.map(app => (
          <button
            key={app.id}
            className="context-sidebar__app-btn"
            title={app.label}
            style={{ '--app-color': app.color }}
          >
            <span className="context-sidebar__app-dot" />
          </button>
        ))}
      </div>

      {/* Add app button */}
      <button className="context-sidebar__btn context-sidebar__btn--add" title="Add app">
        <PlusIcon className="context-sidebar__icon" />
      </button>
    </div>
  );
}

// ========================================
// Main ConversationPanel
// ========================================

export default function ConversationPanel({ ticket, onClose, onStatusChange, currentIndex, totalTickets, onPrevTicket, onNextTicket }) {
  const [activeTab, setActiveTab] = useState('knowledge');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversationMeta, setConversationMeta] = useState(null);
  const [composerMessage, setComposerMessage] = useState('');
  const [translationDismissed, setTranslationDismissed] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('English');

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
          channel: conversation.channel,
          intent: conversation.intent,
          phoneNumber: conversation.phoneNumber,
          location: conversation.location,
          language: conversation.language,
          translatedMessages: conversation.translatedMessages,
          totalMessages: conversation.totalMessages,
        });
        setSourceLanguage(conversation.language || '');
      }
      setComposerMessage('');
      setTranslationDismissed(false);
      setIsTranslating(false);
    }
  }, [ticket]);

  if (!ticket || !conversationMeta) {
    return null;
  }

  const conversation = {
    ...conversationMeta,
    messages,
  };

  const showTranslationBanner =
    !translationDismissed &&
    conversation.language &&
    conversation.language !== targetLanguage;

  const fullRequesterNameFromConversation = conversation.messages.find(
    (msg) => msg.sender === 'customer' && msg.name && msg.name.trim().length > 2
  )?.name;

  const requesterName =
    fullRequesterNameFromConversation ||
    ticket.lastMessage?.name ||
    ticket.title?.split(' | ')[0] ||
    'Customer';

  const handleSendMessage = (messageText) => {
    if (!messageText?.trim()) return;

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
      {/* Secondary navigation breadcrumb — spans full width */}
      <SecondaryNavBar
        ticket={ticket}
        onNextTicket={onNextTicket}
        currentIndex={currentIndex}
        totalTickets={totalTickets}
      />

      <div className="conversation-panel__body">
        {/* Ticket properties — permanent left panel */}
        <div className="ticket-props-panel">
          <TicketPropertiesPanel ticket={ticket} />
        </div>

        <div className="conversation-panel__main">
          {/* Translation banner — shown when ticket language differs from agent's language */}
          {showTranslationBanner && (
            <TranslationBanner
              detectedLanguage={conversation.language}
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onSourceChange={setSourceLanguage}
              onTargetChange={setTargetLanguage}
              onTranslate={() => setIsTranslating(v => !v)}
              onDismiss={() => setTranslationDismissed(true)}
              isTranslating={isTranslating}
            />
          )}

          {/* Conversation header (2 rows) */}
          <ConversationHeader
            conversation={conversation}
            ticket={ticket}
          />

          {/* Message list */}
          <MessageList
            messages={
              isTranslating && conversation.translatedMessages
                ? conversation.translatedMessages
                : conversation.messages
            }
          />

          {/* Composer area */}
          <Composer
            ticketType={ticket.type}
            requesterName={requesterName}
            value={composerMessage}
            onChange={setComposerMessage}
            isTranslating={isTranslating}
            customerLanguage={sourceLanguage}
          />
        </div>

        {isPanelOpen && (
          <div className="context-panel">
            <ContextPanelContent
              ticket={ticket}
              activeTab={activeTab}
              onInsertResponse={handleInsertResponse}
              conversation={conversation}
            />
          </div>
        )}

        <ContextSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isPanelOpen={isPanelOpen}
        />
      </div>

      {/* Ticket footer — full width, below the body */}
      <TicketFooter
        status={ticket.status === 'open' ? 'Open' : ticket.status}
        onSubmit={() => handleSendMessage(composerMessage)}
      />
    </div>
  );
}
