/**
 * Local dev bridge for @zendesk-ui/react-components when the private
 * Artifactory package is unavailable. Re-exports Garden v9 components
 * with the v10 member-property API used by migrated pages.
 */
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming';
import { Anchor, Button as GardenButton, IconButton } from '@zendeskgarden/react-buttons';
import {
  Field,
  Input,
  Select,
  Toggle,
  Checkbox,
  MediaInput,
} from '@zendeskgarden/react-forms';
import {
  Modal as GardenModal,
  Header as ModalHeader,
  Body as ModalBody,
  Footer as ModalFooter,
  FooterItem as ModalFooterItem,
  Close as ModalClose,
} from '@zendeskgarden/react-modals';
import {
  Table as GardenTable,
  Head as TableHead,
  HeaderRow as TableHeaderRow,
  HeaderCell as TableHeaderCell,
  Body as TableBody,
  Row as TableRow,
  Cell as TableCell,
} from '@zendeskgarden/react-tables';
import {
  Notification as GardenNotification,
  Title as NotificationTitle,
  Close as NotificationClose,
} from '@zendeskgarden/react-notifications';
import { Tag } from '@zendeskgarden/react-tags';
import { Avatar } from '@zendeskgarden/react-avatars';
import { LG, MD, SM, Span, XL, XXL } from '@zendeskgarden/react-typography';
import {
  Tabs as GardenTabs,
  TabList,
  Tab,
  TabPanel,
} from '@zendeskgarden/react-tabs';

function StartIcon({ children }) {
  return children;
}

export const Button = Object.assign(GardenButton, { StartIcon });

export const Modal = Object.assign(GardenModal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  FooterItem: ModalFooterItem,
  Close: ModalClose,
});

export const Table = Object.assign(GardenTable, {
  Head: TableHead,
  HeaderRow: TableHeaderRow,
  HeaderCell: TableHeaderCell,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
});

export const Tabs = Object.assign(GardenTabs, {
  TabList,
  Tab,
  TabPanel,
});

export const Notification = Object.assign(GardenNotification, {
  Title: NotificationTitle,
  Close: NotificationClose,
});

export function getTheme(theme = DEFAULT_THEME) {
  return theme;
}

export {
  Anchor,
  Avatar,
  Checkbox,
  DEFAULT_THEME,
  Field,
  IconButton,
  Input,
  LG,
  MD,
  MediaInput,
  Select,
  SM,
  Span,
  Tag,
  ThemeProvider,
  Toggle,
  XL,
  XXL,
};
