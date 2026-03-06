# ZenBox Project Instructions for Claude Code

This file provides project-specific instructions for AI assistants working on the ZenBox Zendesk prototype. These instructions are compatible with Claude Code and consolidate the rules from `.cursor/rules/` for cross-IDE compatibility.

---

## Project Overview

ZenBox is a high-fidelity React prototype of the Zendesk Support suite, built with the Zendesk Garden design system. It simulates multiple product areas including Support, Admin Center, Workforce Management, and Queues.

**Tech Stack:**
- React 19 with Vite 7
- Zendesk Garden components (`@zendeskgarden/*` v9.15)
- CSS modules + Tailwind CSS + styled-components
- Playwright for testing

---

## Core Design System: Zendesk Garden

**CRITICAL:** All UI must be built with Zendesk Garden components. Reference: https://garden.zendesk.com/components

### ThemeProvider Configuration

`GardenThemeProvider` is already configured in `src/main.jsx` and wraps the entire app. **DO NOT add it again** per page or component.

### Component Mapping

Always use the Garden equivalent instead of raw HTML or custom components:

| UI Need | Garden Component | Package |
|---------|-----------------|---------|
| Buttons, icon buttons | `Button`, `IconButton` | `@zendeskgarden/react-buttons` |
| Text body / headings | `Paragraph`, `Span`, `LG`, `MD`, `SM`, `XXL`, `XL` | `@zendeskgarden/react-typography` |
| Text input, textarea | `Field`, `Input`, `Textarea`, `Label`, `Hint`, `Message` | `@zendeskgarden/react-forms` |
| Select / combobox | `Field`, `Select` or `Combobox` | `@zendeskgarden/react-forms` |
| Checkbox, radio, toggle | `Checkbox`, `Radio`, `Toggle` | `@zendeskgarden/react-forms` |
| Data tables | `Table`, `Head`, `HeaderRow`, `HeaderCell`, `Body`, `Row`, `Cell` | `@zendeskgarden/react-tables` |
| Inline alerts | `Alert` | `@zendeskgarden/react-notifications` |
| Toast notifications | `Notification` | `@zendeskgarden/react-notifications` |
| Info well / callout | `Well` | `@zendeskgarden/react-notifications` |
| Dialog / modal | `Modal`, `Header`, `Body`, `Footer`, `Close` | `@zendeskgarden/react-modals` |
| Status tags / labels | `Tag` | `@zendeskgarden/react-tags` |
| Loading spinner | `Spinner` | `@zendeskgarden/react-loaders` |
| Skeleton loader | `Skeleton` | `@zendeskgarden/react-loaders` |
| Progress bar | `Progress` | `@zendeskgarden/react-loaders` |
| Tab navigation | `Tabs`, `TabList`, `Tab`, `TabPanel` | `@zendeskgarden/react-tabs` |
| Dropdown menu | `Menu`, `Item`, `Separator` | `@zendeskgarden/react-dropdowns` |
| Tooltip | `Tooltip` | `@zendeskgarden/react-tooltips` |
| User avatar | `Avatar` | `@zendeskgarden/react-avatars` |
| Pagination | `Pagination` | `@zendeskgarden/react-pagination` |

### Import Pattern

```jsx
import { Button, IconButton } from '@zendeskgarden/react-buttons';
import { Paragraph, Span, LG, MD, SM } from '@zendeskgarden/react-typography';
import { Field, Input, Label, Hint, Message, Textarea, Select, Checkbox, Radio, Toggle } from '@zendeskgarden/react-forms';
import { Table, Head, HeaderRow, HeaderCell, Body, Row, Cell } from '@zendeskgarden/react-tables';
import { Alert, Notification, Well } from '@zendeskgarden/react-notifications';
import { Modal, Header, Body, Footer, Close } from '@zendeskgarden/react-modals';
import { Tag } from '@zendeskgarden/react-tags';
import { Spinner, Skeleton, Progress } from '@zendeskgarden/react-loaders';
import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';
import { Menu, Item, Separator } from '@zendeskgarden/react-dropdowns';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { Avatar } from '@zendeskgarden/react-avatars';
import { Pagination } from '@zendeskgarden/react-pagination';
```

### Design Tokens & Styling

Use CSS variables from `src/index.css` for class-based styling. These map to Garden's token system:

```css
/* Spacing */
var(--spacing-xxs) var(--spacing-xs) var(--spacing-sm) var(--spacing-md) var(--spacing-lg) var(--spacing-xl)

/* Colors */
var(--color-primary-600)   /* interactive blue */
var(--color-text-primary) var(--color-text-secondary) var(--color-text-muted)
var(--color-bg-primary) var(--color-bg-white) var(--color-bg-subtle)
var(--color-success) var(--color-warning) var(--color-danger) var(--color-info)

/* Typography */
var(--font-body) var(--font-size-sm) var(--font-size-md) var(--font-weight-semibold)

/* Shape */
var(--radius-sm) var(--radius-md) var(--shadow-md)
```

For JS/inline styles, use `useTheme()` from `@zendeskgarden/react-theming`.

### Typography Rules

- Use `<LG>`, `<MD>`, `<SM>` (from `react-typography`) for all body text — never raw `<p>` or `<span>`
- Page headings can use semantic `<h1>`–`<h3>` wrapped in a typography component or with `font: var(--font-display)`
- Never apply font-size directly in CSS; use `--font-size-*` tokens

### Never Use

- Raw `<button>` — use `Button` or `IconButton`
- Raw `<input>`, `<select>`, `<textarea>` — use Garden `Field` + form components
- Raw `<table>`, `<tr>`, `<td>` — use Garden `Table` components
- Raw `<p>`, `<span>` for content text — use Garden typography components
- Custom spinner/loading divs — use `Spinner` or `Skeleton`
- Hardcoded hex colors or pixel sizes — use design token CSS variables
- Custom `.btn-*`, `.input-*`, `.modal-*` CSS classes for components covered by Garden

---

## Zendesk Content Design Guidelines

All UI copy must follow Zendesk Content Design guidelines. Apply these rules to all user-visible strings: headings, body text, buttons, labels, tooltips, placeholders, empty states, error messages, success messages, menu items, breadcrumbs, and tab labels.

### Voice and Tone

Zendesk has four voice attributes. Dial the right one up depending on context:

- **Distilled** (low-impact, informational) — labels, tooltips, auto-dismiss alerts. Be spare, precise, focused.
- **Humblident** (high-impact, informational) — warnings, unsaved-changes modals. Be even, calm, knowledgeable. Never ask "Are you sure?"
- **Real** (high-impact, instructional) — errors, security issues, destructive actions. Be direct, candid, respectful. No jokes or sugar-coating.
- **Charming** (low-impact, instructional) — onboarding, empty states. Be refreshing, warm, well-timed. Don't overdo it.

### Grammar and Style

- **Sentence case** for all UI text. Never title case.
- **Present tense + active voice** by default. Past tense for completed actions only. Never use present perfect ("has been sent") or future perfect.
- **One tense per component** — don't mix.
- **Address the user as "you"**. Never "me", "my", "mine", "us".
- **Avoid "we"** unless a specific Zendesk team is the speaker (security/feedback situations only).
- **Gender-neutral**: they/them/their. Never he/his or she/her.
- **Contractions**: use common ones (isn't, can't, you're, doesn't) in casual flows. Avoid in billing, security, admin, account recovery. Never use ain't, it'll, that'll, would've.
- **No emoji** in UI copy.
- **Bold** for UI element references. Never quotation marks or italics.
- **Acronyms**: spell out on first use with acronym in parentheses. All-caps for acronyms, lowercase for file extensions.
- **Skip articles** (a, an, the) in headings and buttons: "Create trigger" not "Create a trigger".

### Punctuation

- No ampersands — write "and"
- No exclamation points
- No semi-colons
- Always use the Oxford comma
- Periods after complete sentences in descriptions/hints/validation. No periods in headings, buttons, menu labels, breadcrumbs
- Ellipsis only for loading/saving states ("Loading...")
- Parentheses: sparingly, never for crucial info. Use for acronym introduction only
- Bold for group:value pairs, not colons
- Quotation marks only for quoting text or examples, never for UI references

### CTA Verbs

Use these specific verbs — never the alternatives:

| Action | Use | Not |
|--------|-----|-----|
| Pick from options | Select | Choose |
| Auto-operate | Activate / Deactivate | Enable / Disable |
| Feature availability | Turn on / Turn off | Enable / Disable |
| Brand-new item | Create | — |
| Layer onto existing | Add | — |
| Modify item | Edit | — |
| Control large area | Manage | — |
| Billing/app changes | Update | — |
| Permanent removal | Delete | Remove |
| Reversible removal | Remove | Delete |
| Commit changes | Save | — |
| Duplicate item | Create copy | Duplicate / Clone |
| Navigate to info | View {noun} | See |
| Reveal hidden | Show | See / Unhide |
| Multi-step back/next | Back / Next | Proceed / Continue |
| Table pagination | Previous / Next | Back |
| Discard edits | Cancel | Discard changes |
| Help article link | Learn about {noun} | Learn more |
| In-product navigation | Go to {destination} | Go to the {destination} page |

One action per button only.

### Numbers and Formatting

- Numerals, not words: "3 items" not "three items"
- Decimals, not fractions. Leading zero if < 1: 0.75
- No space before %: 37%
- Dates (US): Jan 14, 2020 or January 14, 2020. Never pad day with zero
- Time (12h): 11:37 PM — space before uppercase AM/PM, no periods
- Time (24h): 09:44 — leading zero, no AM/PM
- Phone: E.164 format (+14159671337)
- Timezones: UTC offset (11:37 UTC -02:30), no letter codes
- Avoid vague time words: "soon", "later", "in a while"

---

## Button Usage (Garden Buttons)

When using buttons from `@zendeskgarden/react-buttons`:

- Use `<Button>` for primary, secondary, tertiary, and danger actions
- Use `<IconButton>` for icon-only actions with `aria-label`
- Set `isBasic` prop for ghost/tertiary style buttons
- Set `isPrimary` prop for primary CTA buttons
- Set `isDanger` prop for destructive actions

Example:
```jsx
import { Button, IconButton } from '@zendeskgarden/react-buttons';
import { PlusIcon } from './Icons';

// Primary CTA
<Button isPrimary>Create trigger</Button>

// Ghost button
<Button isBasic>Cancel</Button>

// Icon button
<IconButton aria-label="Add item" isBasic>
  <PlusIcon />
</IconButton>

// Danger button
<Button isDanger>Delete account</Button>
```

---

## Project Architecture

### Product-Based Navigation

The app uses **product-based navigation** (not URL routing). State variable `selectedProduct` determines which page renders. Products are defined in `src/App.jsx`:

```js
const products = [
  { id: 'quality', name: 'Quality assurance', icon: QALogoIcon },
  { id: 'workforce', name: 'Workforce management', icon: WFMLogoIcon },
  { id: 'support', name: 'Support', icon: InboxIcon, current: true },
  { id: 'admin', name: 'Admin center', icon: GearIcon },
  { id: 'ai-agents', name: 'AI agents', icon: AIAgentsLogoIcon },
  { id: 'knowledge', name: 'Knowledge', icon: ShapesIcon },
];
```

### Theme System

The app uses a **per-product theme system** via React context (`ThemeContext.jsx`). The theme context provides:

- `theme`: 'light' or 'dark'
- `toggleTheme()`: Toggle between light/dark
- `currentProduct`: Current product ID
- `setCurrentProduct(id)`: Update current product
- `isDarkModeAllowed`: Boolean indicating if dark theme is available for current product

**IMPORTANT:** Dark theme is ONLY available on the Support page (`product.id === 'support'`). All other pages are locked to light theme.

### Page Structure

Each product page follows this structure:

```
src/components/{Name}Page/
├── index.js              # Re-export
├── {Name}Page.jsx        # Main component
└── {Name}Page.css        # Page styles
```

### Shared Components

- `TopBar` — Product switcher and top navigation
- `PageSidebarNav` — Shared primary/secondary navigation component
- `ResizableLayout` — Drag-to-resize 3-column layout
- `PageTransition` — Animated page-level transitions

---

## Creating a New Page

When the user asks to "create a new page", "add a new page", "add a product page", or "scaffold a page", follow the detailed instructions in `.cursor/skills/create-new-page/SKILL.md`.

**Quick summary:**

1. Gather requirements: display name, page ID, icon, nav sections
2. Create `src/components/{Name}Page/` with 3 files (index.js, {Name}Page.jsx, {Name}Page.css)
3. Use `PageSidebarNav` component for navigation (do NOT create inline nav components)
4. Update `src/App.jsx`:
   - Add import
   - Add icon import (if new)
   - Add product entry to `products` array
   - Add page flag + render branch in `renderPageContent()`

---

## File Patterns to Apply Rules

These rules apply to the following file patterns:

- `src/**/*.{jsx,tsx,js,ts,css}` — All source files
- Components, contexts, styles, and utilities

---

## Testing

The project uses Playwright for end-to-end testing. Test files are located at the project root with `.spec.mjs` extension:

- `queue-edit-predictive-routing.spec.mjs`
- `queue-validation.spec.mjs`

Run tests with:
```bash
npm test
```

---

## Deployment

The project deploys to GitHub Pages. Build and deploy with:
```bash
npm run build
npm run deploy
```

---

## Cross-IDE Compatibility

This project supports both **Cursor IDE** and **Claude Code**:

- **Cursor users**: Rules and skills are in `.cursor/rules/` and `.cursor/skills/`
- **Claude Code users**: This `CLAUDE.md` file consolidates all rules for compatibility

For detailed skill instructions (like creating a new page or content review), see:
- `.cursor/skills/create-new-page/SKILL.md`
- `.cursor/skills/content-review/SKILL.md`

Both IDEs can work on this project without conflicts. The `.cursor/` directory is tracked in git to ensure all contributors have access to the same guidelines.
