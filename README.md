# ZenBox — Zendesk Product Prototype

A high-fidelity React prototype of the Zendesk Support suite, built with the Zendesk Garden design system. Simulates multiple product areas including Support, Admin Center, Workforce Management, and Queues.

## Features

- **Multi-product navigation** — Switch between Support, Admin Center, and Workforce Management via the TopBar product switcher
- **Resizable layout** — Drag dividers to adjust the width of the nav, ticket list, and conversation panel columns
- **Support page** — Ticket list with conversation panel, inline status changes, and ticket navigation
- **Ticket detail page** — Full-screen conversation view with sidebar actions
- **Admin Center** — Settings and configuration pages
- **Workforce Management (WFM)** — Schedule and staffing overview
- **Queues** — Queue list and queue edit page with predictive routing support
- **AI Agent panel** — Embedded AI assistant panel in the conversation view
- **Command palette** — Keyboard-accessible command search
- **Theme context** — Per-product color theming via React context
- **Page transitions** — Animated page-level transitions between products

## Getting started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Project structure

```
src/
├── components/
│   ├── AIAgentPanel/        # Inline AI assistant panel
│   ├── AdminCenterPage/     # Admin Center product page
│   ├── CommandPalette/      # Keyboard command search overlay
│   ├── ConversationPanel/   # Ticket conversation thread
│   ├── ExplorePage/         # Explore product page
│   ├── Header/              # Top header bar
│   ├── Icons/               # Shared icon components
│   ├── PageSidebarNav/      # Page-level sidebar navigation
│   ├── PageTransition/      # Animated route transitions
│   ├── Panel/               # Generic panel container
│   ├── ProfileMenu/         # User profile dropdown
│   ├── QueuesPage/          # Queues list and queue edit pages
│   ├── ResizableLayout/     # Drag-to-resize 3-column layout
│   ├── Sidebar/             # Primary and secondary sidebars
│   ├── TicketDetailPage/    # Full-screen ticket detail view
│   ├── TicketList/          # Ticket list with selection
│   ├── TopBar/              # Product switcher top bar
│   ├── WFMPage/             # Workforce Management product page
│   └── Widgets/             # Dashboard widgets for Support home
├── contexts/                # React contexts (theme, etc.)
├── App.jsx                  # Root app with product routing logic
├── App.css
├── index.css                # Global styles and CSS design tokens
└── main.jsx                 # Entry point with GardenThemeProvider
```

## Tech stack

| | |
|---|---|
| Framework | React 19 |
| Build tool | Vite 7 |
| Design system | Zendesk Garden (`@zendeskgarden/*` v9.15) |
| Styling | CSS modules + Tailwind CSS + `styled-components` |
| Testing | Playwright |
| UI versioning | uifork |
| Deployment | GitHub Pages (`gh-pages`) |

## Design system

All UI components use [Zendesk Garden](https://garden.zendesk.com/components). Garden's `ThemeProvider` is configured once in `src/main.jsx` and wraps the entire app. CSS design tokens are defined in `src/index.css` and map to Garden's token system.
