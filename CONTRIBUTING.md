# Contributing to ZenBox

Thank you for your interest in contributing to ZenBox! This guide will help you set up your development environment and understand our conventions.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- An AI coding assistant (Cursor IDE or Claude Code recommended)

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ZenBox–project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## AI Assistant Setup

ZenBox is optimized for AI-assisted development with built-in rules and guidelines.

### Using Cursor IDE

Cursor will automatically load rules from `.cursor/rules/` and skills from `.cursor/skills/`.

**Available skills:**
- **Create new page** — Say "create a new page" to scaffold a product page
- **Content review** — Say "review content" to validate UI copy

**Rules apply automatically:**
- Garden design system enforcement
- Zendesk content design guidelines
- Button usage patterns

### Using Claude Code

Claude Code will automatically load instructions from `CLAUDE.md` at the project root.

**To invoke skills manually:**
- Read `.cursor/skills/{skill-name}/SKILL.md` for detailed instructions
- Follow the step-by-step guide in the skill file

**All rules apply automatically** based on `CLAUDE.md`.

### Using Other IDEs

If you're not using Cursor or Claude Code:
- Read `CLAUDE.md` for comprehensive project guidelines
- Review `.cursor/rules/*.mdc` files for design system requirements
- Follow `.cursor/skills/*/SKILL.md` for common workflows

## Design System Guidelines

### Zendesk Garden Components

**Always use Garden components** instead of raw HTML:

```jsx
// ✅ Good
import { Button } from '@zendeskgarden/react-buttons';
<Button isPrimary>Create trigger</Button>

// ❌ Bad
<button className="btn-primary">Create trigger</button>
```

See `CLAUDE.md` or `.cursor/rules/garden-design-system.mdc` for the full component mapping.

### Design Tokens

Use CSS variables from `src/index.css`:

```css
/* ✅ Good */
.my-component {
  padding: var(--spacing-md);
  color: var(--color-text-primary);
  border-radius: var(--radius-sm);
}

/* ❌ Bad */
.my-component {
  padding: 16px;
  color: #2f3941;
  border-radius: 4px;
}
```

### Content Design

Follow Zendesk Content Design guidelines for all UI copy:

- **Sentence case** for all text (not title case)
- **Present tense + active voice**
- **Address user as "you"**, never "me" or "my"
- **No emoji** in UI copy
- Use specific verbs: "Select" not "Choose", "Create" not "Add" for new items

See `.cursor/rules/zendesk-content-design.mdc` for the complete style guide.

## Code Style

### File Structure

Each component should have its own directory:

```
src/components/ComponentName/
├── index.js              # Re-export: export { default } from './ComponentName';
├── ComponentName.jsx     # Component logic
└── ComponentName.css     # Component styles
```

### Naming Conventions

- **Components:** PascalCase (`TicketList.jsx`, `AdminCenterPage.jsx`)
- **Files:** Match component name (`TicketList.css`)
- **CSS classes:** BEM-style with component prefix (`.ticket-list__header`, `.admin-page__content`)
- **Product IDs:** kebab-case (`'quality'`, `'workforce'`, `'admin'`)

### CSS Conventions

- Use CSS modules or component-scoped classes
- Prefix all classes with component name
- Use BEM methodology: `.block__element--modifier`
- Use CSS variables for colors, spacing, typography
- Dark theme: `[data-theme="dark"]` selector

Example:
```css
.ticket-list {
  display: flex;
  flex-direction: column;
}

.ticket-list__header {
  padding: var(--spacing-md);
  background: var(--color-bg-white);
}

.ticket-list__item--selected {
  background: var(--color-lime-light);
}

[data-theme="dark"] .ticket-list {
  background: var(--color-bg-dark);
}
```

## Common Workflows

### Adding a New Product Page

1. Use the "create new page" skill (Cursor) or follow `.cursor/skills/create-new-page/SKILL.md`
2. Gather requirements: display name, page ID, icon, nav structure
3. Create component directory with 3 files
4. Use `PageSidebarNav` component for navigation
5. Update `src/App.jsx` with routing

### Adding a New Component

1. Create directory: `src/components/{Name}/`
2. Add three files: `index.js`, `{Name}.jsx`, `{Name}.css`
3. Use Garden components, not raw HTML
4. Use CSS variables for styling
5. Follow Zendesk content design for any UI copy

### Running Tests

```bash
# Run Playwright tests
npm test

# Run specific test
npx playwright test queue-validation.spec.mjs
```

## Git Workflow

### Branches

- `main` — Production-ready code
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-description`

### Commits

- Use conventional commit messages
- Present tense: "Add feature" not "Added feature"
- Be specific: "Add Queue edit page validation" not "Update files"

Example:
```bash
git commit -m "Add predictive routing to Queue edit page"
git commit -m "Fix ticket list filter dropdown alignment"
```

### Pull Requests

1. Create a feature branch
2. Make your changes following the guidelines
3. Test thoroughly (manual + automated)
4. Submit PR with clear description
5. Reference any related issues

## File Organization

### What Goes Where

```
src/
├── components/          # All UI components (pages, widgets, shared)
├── contexts/           # React contexts (ThemeContext, etc.)
├── App.jsx             # Main app with routing logic
├── App.css             # App-level styles
├── index.css           # Global styles + CSS design tokens
└── main.jsx            # Entry point with providers

.cursor/                # Cursor IDE rules and skills (tracked in git)
├── rules/              # Auto-applied MDC rules
└── skills/             # Invokable workflows

CLAUDE.md               # Claude Code instructions (tracked in git)
```

### What to Track in Git

✅ **Do track:**
- `.cursor/rules/` — Design system rules
- `.cursor/skills/` — Workflow instructions
- `CLAUDE.md` — AI assistant guidelines
- All source code and tests

❌ **Don't track:**
- `node_modules/`
- `dist/` and `dist-ssr/`
- `.claude/settings.local.json` — Local AI assistant settings
- `.DS_Store` and other OS files

## Getting Help

- **Design system:** https://garden.zendesk.com/components
- **Content guidelines:** `.cursor/rules/zendesk-content-design.mdc`
- **Project guidelines:** `CLAUDE.md`
- **Skills/workflows:** `.cursor/skills/*/SKILL.md`

## Questions?

If you have questions about:
- **Garden components** — Check the official [Garden docs](https://garden.zendesk.com)
- **Project structure** — Review existing pages like `AdminCenterPage` or `WFMPage`
- **AI assistant setup** — See the "AI Assistant Setup" section above
- **Workflows** — Check `.cursor/skills/` for step-by-step guides
