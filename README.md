# Severance - Resizable 3-Column Layout

A React application featuring a responsive, drag-to-resize 3-column layout with Instrument Sans and Inter fonts.

## Features

- **Resizable Columns**: Drag the dividers between columns to adjust their widths
- **Responsive Design**: Layout adapts based on screen width
  - Desktop (≥1024px): Full 3-column resizable layout
  - Tablet (768-1023px): 2-column layout with third column as overlay
  - Mobile (<768px): Stacked single-column layout
- **Modern Typography**: Uses Instrument Sans for headings and Inter for body text
- **Dark Theme**: Elegant dark corporate aesthetic
- **Smooth Animations**: Subtle CSS animations for enhanced UX
- **Touch Support**: Resizing works on both mouse and touch devices

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

### ResizableLayout Component

The main component that provides the resizable 3-column layout:

```jsx
import ResizableLayout from './components/ResizableLayout';

<ResizableLayout>
  <div>Column 1 content</div>
  <div>Column 2 content</div>
  <div>Column 3 content</div>
</ResizableLayout>
```

### Customization

Column behavior can be adjusted through CSS variables in `src/index.css`:

```css
:root {
  --resizer-width: 6px;      /* Visual width of the resizer */
  --resizer-hit-area: 12px;  /* Clickable area for easier dragging */
}
```

Minimum column width is set in the component (default: 150px).

### Panel Component

A styled container component for panel content:

```jsx
import Panel from './components/Panel';

<Panel title="Title" icon="◉" variant="primary">
  Content goes here
</Panel>
```

Variants: `default`, `primary`, `success`, `warning`

## Project Structure

```
src/
├── components/
│   ├── ResizableLayout/
│   │   ├── ResizableLayout.jsx  # Main resizable layout logic
│   │   ├── ResizableLayout.css  # Layout styles
│   │   └── index.js
│   └── Panel/
│       ├── Panel.jsx            # Panel container component
│       ├── Panel.css
│       └── index.js
├── App.jsx          # Main application with sample content
├── App.css          # App-level styles
├── index.css        # Global styles, CSS variables, fonts
├── content.css      # Styles for sample content components
└── main.jsx         # Entry point
```

## Tech Stack

- React 19
- Vite 7
- CSS (no framework dependencies)
- Google Fonts (Instrument Sans & Inter)
