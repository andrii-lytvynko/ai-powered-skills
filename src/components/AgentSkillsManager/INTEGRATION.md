# Agent skills manager — integration guide

Portable modal for managing agent skill assignments and proficiency scores. Copy the entire `AgentSkillsManager/` folder into any ZenBox-compatible React project.

## Requirements

- React 19+
- Zendesk Garden v9 (`@zendeskgarden/react-modals`, `react-buttons`, `react-avatars`, `react-tables`, `react-typography`)
- `GardenThemeProvider` at app root (do not wrap again inside the modal)
- Design tokens in `src/index.css` (spacing, colors, chart tokens)

## Folder contents

```
AgentSkillsManager/
├── AgentSkillsManager.jsx   # Main modal
├── AgentSkillsManager.css
├── SkillRadarChart.jsx      # Radar + compact charts
├── agentSkillsData.js       # Skills catalog, seed agents, helpers
├── hooks/useLocalStorage.js
├── icons.jsx
├── index.js
└── INTEGRATION.md
```

## Quick integration

1. Copy `AgentSkillsManager/` to `src/components/AgentSkillsManager/`.

2. Import and render where you need the modal:

```jsx
import { useState } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import AgentSkillsManager from './components/AgentSkillsManager';

function YourPage() {
  const [isSkillsManagerOpen, setIsSkillsManagerOpen] = useState(false);

  return (
    <>
      <Button isBasic onClick={() => setIsSkillsManagerOpen(true)}>
        Manage agent skills
      </Button>

      <AgentSkillsManager
        isOpen={isSkillsManagerOpen}
        onClose={() => setIsSkillsManagerOpen(false)}
      />
    </>
  );
}
```

3. Run the dev server and open the modal from your trigger.

## Public API

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Controls modal visibility |
| `onClose` | `() => void` | Called when the user closes the modal |
| `agents` | `Agent[]` | Optional controlled agent list (see controlled mode) |
| `onAgentsChange` | `(agents: Agent[]) => void` | Required with `agents` for controlled mode |
| `skillsCatalog` | `{ id, name }[]` | Optional skills list; defaults to module `SKILLS` |

### Controlled mode (ZenBox v2)

Pass `agents`, `onAgentsChange`, and `skillsCatalog` to sync with `useSkillsMatrix` instead of the module's `localStorage` seed data. See `src/utils/agentSkillsMatrixBridge.js` for conversion helpers.

```jsx
const { categories, syncAgentAssignments } = useSkillsMatrix();
const managerAgents = useMemo(() => buildAgentsFromMatrix(categories), [categories]);
const skillsCatalog = useMemo(() => buildSkillsCatalog(categories), [categories]);

<AgentSkillsManager
  isOpen={isOpen}
  onClose={onClose}
  agents={managerAgents}
  onAgentsChange={syncAgentAssignments}
  skillsCatalog={skillsCatalog}
/>
```

## Data and persistence

- Agent data persists to `localStorage` key `zenbox:agentSkills`.
- Seed data and skill catalog live in `agentSkillsData.js` (`SKILLS`, `INITIAL_AGENTS`, `MAX_SKILLS`).
- To reset during development: `localStorage.removeItem('zenbox:agentSkills')`.

## Optional exports

```js
export { default } from './AgentSkillsManager';
export { SKILLS, INITIAL_AGENTS, MAX_SKILLS } from './agentSkillsData';
export { getSkillGraphDescription } from './SkillRadarChart';
```

## v1 integration point

In ZenBox v1, the modal opens from **Admin center → Routing config → Skills matrix → Manage agent skills** (`RoutingConfigPage.jsx`).

## v2 integration point

In ZenBox v2, the modal opens from **Skills page → Skills matrix → Manage agent skills** (`SkillsPage.jsx`). The page passes matrix data via controlled props so edits stay in sync with `useSkillsMatrix` and the skills catalog in `skillsData.js`.
