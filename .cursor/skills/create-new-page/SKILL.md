---
name: create-new-page
description: Scaffolds a new product page in the ZenBox Zendesk prototype app. Use when the user says "create a new page", "add a new page", "add a product page", "scaffold a page", or wants to add a new item to the TopBar product dropdown. Copies AdminCenterPage structure, creates component files, and registers the page in App.jsx routing and the TopBar dropdown navigation.
---

# Create New Page

Adds a new product page to the ZenBox app by copying the AdminCenterPage template and wiring it into the navigation.

## Step 0: Gather requirements

Ask the user for:

1. **Display name** – shown in the TopBar dropdown (e.g. `"Reporting"`)
2. **Page ID** – kebab-case, used as `selectedProduct.id` (e.g. `reporting`)
3. **Icon** – which icon from `src/components/Icons/Icons.jsx` to use (e.g. `BarChartIcon`), or ask them to describe one to create
4. **Nav sections** – what primary nav items (icon strip) and secondary nav sections/items to show. If the user has no preference, default to the AdminCenterPage structure ("Objects and rules" with Custom objects, Omnichannel routing, Business rules sections).

Derive from those:
- `{Name}` = PascalCase of the display name (e.g. `Reporting`)
- `{id}` = the kebab-case ID (e.g. `reporting`)
- `{ClassName}` = `{id}-page` CSS prefix (e.g. `reporting-page`)
- `{NavPrefix}` = `{id}` used for nav class names (e.g. `reporting-primary-nav`, `reporting-secondary-nav`)

---

## Garden Design System

All new pages must use Zendesk Garden components. The full reference is in `.cursor/rules/garden-design-system.mdc`.

**ThemeProvider is already set up** — `GardenThemeProvider` in `src/main.jsx` wraps the entire app, so every new page inherits the Garden theme automatically. Do NOT add it again.

**Component requirements for new page body content:**

| UI element | Use |
|------------|-----|
| Body text | `<LG>`, `<MD>`, `<SM>` from `@zendeskgarden/react-typography` |
| Buttons | `<Button>`, `<IconButton>` from `@zendeskgarden/react-buttons` |
| Form inputs | `<Field>` + `<Input>`, `<Select>`, etc. from `@zendeskgarden/react-forms` |
| Tables | `<Table>`, `<Row>`, `<Cell>` from `@zendeskgarden/react-tables` |
| Modals | `<Modal>` from `@zendeskgarden/react-modals` |
| Alerts | `<Alert>` from `@zendeskgarden/react-notifications` |
| Tags/badges | `<Tag>` from `@zendeskgarden/react-tags` |
| Loading states | `<Spinner>`, `<Skeleton>` from `@zendeskgarden/react-loaders` |
| Tabs | `<Tabs>`, `<Tab>`, `<TabPanel>` from `@zendeskgarden/react-tabs` |
| Dropdowns | `<Menu>`, `<Item>` from `@zendeskgarden/react-dropdowns` |

Use CSS variables from `src/index.css` (`--spacing-*`, `--color-*`, `--font-size-*`, `--radius-*`) for all custom CSS in the new page's `.css` file.

---

## Step 1: Create page component files

Create the folder `src/components/{Name}Page/` with three files.

### `src/components/{Name}Page/index.js`

```js
export { default } from './{Name}Page';
```

### `src/components/{Name}Page/{Name}Page.jsx`

Use `src/components/AdminCenterPage/AdminCenterPage.jsx` as a structural reference only. **Do NOT copy inline nav components** — use the shared `PageSidebarNav` component instead.

#### General rules

- Rename the default export from `AdminCenterPage` → `{Name}Page`
- Replace every CSS class prefix `admin-page` → `{ClassName}` (e.g. `admin-page__body` → `reporting-page__body`)
- Replace `admin-breadcrumbs` → `{ClassName}__breadcrumbs`
- Keep the same 4 props: `onProductChange`, `selectedProduct`, `products`, `onOpenCommandPalette`
- Remove the `QueuesPage` import and `activeSubPage === 'queues'` branch — new pages start clean
- Do NOT import or define `AdminPrimaryNav`, `AdminSecondaryNav`, or any inline nav components

#### Navigation data arrays

Define these at module level. Customise the items to match the user's requirements from Step 0:

```jsx
const primaryNavItems = [
  { id: 'home', icon: HomeIcon, label: 'Home' },
  { id: 'account', icon: BuildingIcon, label: 'Account' },
  { id: 'people', icon: ContactsIcon, label: 'People' },
  { id: 'channels', icon: PaperPlaneIcon, label: 'Channels' },
  { id: 'ai', icon: SparkleIcon, label: 'AI' },
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
    ]
  },
  {
    title: 'Omnichannel routing',
    items: [
      { id: 'routing-config', label: 'Routing configurations' },
      { id: 'queues', label: 'Queues' },
      { id: 'capacity-rules', label: 'Capacity rules' },
      { id: 'agent-statuses', label: 'Agent statuses' },
      { id: 'status-timeout', label: 'Status timeout' },
    ]
  },
  {
    title: 'Business rules',
    items: [
      { id: 'triggers', label: 'Triggers' },
      { id: 'skills', label: 'Skills' },
      { id: 'automations', label: 'Automations' },
      { id: 'sla', label: 'Service level agreement' },
      { id: 'schedules', label: 'Schedules' },
    ]
  }
];
```

#### Using the shared `PageSidebarNav` component

Import `PageSidebarNav` from `../PageSidebarNav`. This single component renders the entire 56px primary icon strip + 240px secondary panel, with collapse/expand built-in.

**`PageSidebarNav` API:**

```jsx
import PageSidebarNav from '../PageSidebarNav';

<PageSidebarNav
  primaryItems={primaryNavItems}          // array of { id, icon: SvgComponent, label, active? }
  secondaryHeading="{Section Heading}"    // h2 above the secondary nav sections
  secondarySections={secondaryNavSections} // array of { title?, items: [{ id, label }] }
  activeItem={activeSubPage}              // currently selected secondary nav item id
  onItemSelect={handleSubPageSelect}      // called with item.id when secondary item clicked
  isCollapsed={isNavCollapsed}            // controlled by parent page state
  onToggleCollapse={handleToggleNav}      // toggle handler in parent
/>
```

#### Page layout composition

```
DOM structure:
.{ClassName}
  TopBar
  .{ClassName}__body          ← flex row, flex: 1
    PageSidebarNav             ← 56px collapsed / 296px expanded, self-contained
    .{ClassName}__content-column  ← flex: 1
      main.{ClassName}__main
        .{ClassName}__content
```

The main page component JSX:

```jsx
export default function {Name}Page({ onProductChange, selectedProduct, products, onOpenCommandPalette }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeSubPage, setActiveSubPage] = useState(null);

  const handleToggleNav = () => setIsNavCollapsed(!isNavCollapsed);
  const handleSubPageSelect = (itemId) => setActiveSubPage(itemId);

  return (
    <div className="{ClassName}">
      <TopBar
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        onOpenCommandPalette={onOpenCommandPalette}
        isNavCollapsed={isNavCollapsed}
      />
      <div className="{ClassName}__body">
        <PageSidebarNav
          primaryItems={primaryNavItems}
          secondaryHeading="{Section Heading}"
          secondarySections={secondaryNavSections}
          activeItem={activeSubPage}
          onItemSelect={handleSubPageSelect}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={handleToggleNav}
        />

        {/* Content Column */}
        <div className="{ClassName}__content-column">
          <main className="{ClassName}__main">
            <div className="{ClassName}__content">
              <h1>{Display Name}</h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
```

### `src/components/{Name}Page/{Name}Page.css`

**Do NOT copy nav-specific CSS** — all primary and secondary nav styles are in `PageSidebarNav.css`. Only define page-level layout CSS.

#### Required CSS blocks

**Page layout (flex column, full viewport):**
```css
.{ClassName}           { display: flex; flex-direction: column; height: 100vh; width: 100%; overflow: hidden; }
.{ClassName}__body     { display: flex; flex: 1; overflow: hidden; }
```

**Content column:**
```css
.{ClassName}__content-column { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
.{ClassName}__main           { flex: 1; overflow: hidden; background: var(--color-bg-white); border-radius: var(--radius-lg) 0 0 0; border-left: 1px solid var(--color-grey-300); border-top: 1px solid var(--color-grey-300); }
.{ClassName}__content        { flex: 1; overflow-y: auto; padding: var(--spacing-xl); }
```

Add breadcrumbs, page header, form, section, and dark theme CSS from `AdminCenterPage.css` as needed, renaming `admin-` → `{ClassName}__` / `{ClassName}-` throughout.

---

## Step 2: Patch `src/App.jsx`

Four targeted edits — do them in order.

### 2a. Add import (after existing page imports, around line 14)

```js
import {Name}Page from './components/{Name}Page';
```

Existing import block for reference:
```js
import QAPage from './components/QAPage';
import AdminCenterPage from './components/AdminCenterPage';
import KnowledgePage from './components/KnowledgePage';
import AIAgentsPage from './components/AIAgentsPage';
import WFMPage from './components/WFMPage';
// ← add new import here
```

### 2b. Add icon import (same line as other icons, around line 16)

If the icon is new, add it to the existing Icons import:
```js
import { ..., {IconComponent} } from './components/Icons';
```

### 2c. Add product entry to the `products` array (lines 20–26)

```js
const products = [
  { id: 'quality', name: 'Quality assurance', icon: QALogoIcon },
  { id: 'workforce', name: 'Workforce management', icon: WFMLogoIcon },
  { id: 'support', name: 'Support', icon: InboxIcon, current: true },
  { id: 'admin', name: 'Admin center', icon: GearIcon },
  { id: 'ai-agents', name: 'AI agents', icon: AIAgentsLogoIcon },
  { id: 'knowledge', name: 'Knowledge', icon: ShapesIcon },
  { id: '{id}', name: '{Display Name}', icon: {IconComponent} }, // ← add here
];
```

This is the **only change needed** for the TopBar dropdown — it renders directly from `products`:

```jsx
// src/components/TopBar/TopBar.jsx
{products.map((product) => {
  const Icon = product.icon;
  const isSelected = selectedProduct?.id === product.id;
  return (
    <button key={product.id} className={`topbar__dropdown-item ...`}
      onClick={() => handleProductSelect(product)}>
      <Icon className="topbar__dropdown-icon" />
      <span className="topbar__dropdown-name">{product.name}</span>
      {isSelected && <CheckIcon className="topbar__dropdown-check" />}
    </button>
  );
})}
```

### 2d. Add page flag + render branch in `renderPageContent()` (around line 217)

Add the flag alongside the existing ones:
```js
const isQAPage = selectedProduct?.id === 'quality';
const isAdminPage = selectedProduct?.id === 'admin';
// ...existing flags...
const is{Name}Page = selectedProduct?.id === '{id}'; // ← add here
```

Add the render branch inside `renderPageContent()`, before the default `return`:
```js
if (is{Name}Page) {
  return (
    <{Name}Page
      onProductChange={handleProductChange}
      selectedProduct={selectedProduct}
      products={products}
      onOpenCommandPalette={openCommandPalette}
    />
  );
}
```

---

## Key file references

| File | Purpose |
|------|---------|
| `src/App.jsx` | Products array (lines 20–26), routing logic (`renderPageContent`, lines ~224–300) |
| `src/components/PageSidebarNav/PageSidebarNav.jsx` | Shared nav component — **use this, do not create inline nav components** |
| `src/components/AdminCenterPage/AdminCenterPage.jsx` | Reference for page layout and content structure |
| `src/components/AdminCenterPage/AdminCenterPage.css` | Reference for breadcrumbs, page header, form, section CSS |
| `src/components/TopBar/TopBar.jsx` | Dropdown renders from `products` prop — no direct edits needed |
| `src/components/Icons/Icons.jsx` | Available icon components to choose from |

---

## Checklist

```
- [ ] src/components/{Name}Page/index.js created
- [ ] src/components/{Name}Page/{Name}Page.jsx created
- [ ] src/components/{Name}Page/{Name}Page.css created (page-level layout only, no nav CSS)
- [ ] PageSidebarNav imported from '../PageSidebarNav' in {Name}Page.jsx
- [ ] primaryNavItems data array configured with correct icons and labels
- [ ] secondaryNavSections data array configured with correct sections and items
- [ ] <PageSidebarNav> used in page body with all 7 props wired
- [ ] isNavCollapsed state + handleToggleNav handler defined in page component
- [ ] activeSubPage state + handleSubPageSelect handler defined in page component
- [ ] src/App.jsx – import added
- [ ] src/App.jsx – icon imported (if new)
- [ ] src/App.jsx – products array entry added
- [ ] src/App.jsx – is{Name}Page flag added
- [ ] src/App.jsx – renderPageContent branch added
```
