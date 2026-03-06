# Cursor Configuration

This directory contains rules and skills for Cursor IDE to ensure consistent code quality and adherence to Zendesk design standards.

## Structure

```
.cursor/
├── rules/              # MDC rules that apply automatically
│   ├── garden-buttons.mdc
│   ├── garden-design-system.mdc
│   └── zendesk-content-design.mdc
└── skills/             # Invokable skills for common tasks
    ├── content-review/
    │   ├── SKILL.md
    │   └── reference.md
    └── create-new-page/
        └── SKILL.md
```

## Rules

Rules in the `rules/` directory are MDC (Markdown + frontmatter) files that automatically guide Cursor when working on matching files.

### garden-design-system.mdc
- **Applies to:** `src/**/*.{jsx,tsx,js,ts,css}`
- **Purpose:** Enforces Zendesk Garden component usage, design tokens, and typography patterns
- **Always active:** Yes

### zendesk-content-design.mdc
- **Applies to:** All files
- **Purpose:** Enforces Zendesk Content Design voice, tone, grammar, and CTA verb guidelines
- **Always active:** Yes

### garden-buttons.mdc
- **Applies to:** Files using button components
- **Purpose:** Specific guidance on Garden button usage and props

## Skills

Skills are invokable workflows for specific tasks. Use them in Cursor's chat by describing the task.

### create-new-page
**Trigger phrases:** "create a new page", "add a new page", "add a product page", "scaffold a page"

Scaffolds a complete product page with:
- Component structure (JSX, CSS, index)
- Shared `PageSidebarNav` integration
- App.jsx routing updates
- TopBar dropdown registration

### content-review
**Trigger phrases:** "review content", "check copy", "validate UI text"

Reviews all UI copy against Zendesk Content Design guidelines.

## Cross-IDE Compatibility

For users working with **Claude Code** instead of Cursor:
- All rules are consolidated in `/CLAUDE.md` at project root
- Skill instructions are also readable directly from `.cursor/skills/*/SKILL.md`
- Both IDEs can work on the same project without conflicts

## Adding New Rules

To add a new rule:

1. Create a new `.mdc` file in `rules/`
2. Add YAML frontmatter:
   ```yaml
   ---
   description: Brief description
   globs: src/**/*.{jsx,tsx}
   alwaysApply: true
   ---
   ```
3. Write Markdown instructions below the frontmatter
4. Update `/CLAUDE.md` to include the new rule for Claude Code compatibility

## Adding New Skills

To add a new skill:

1. Create a new directory in `skills/`
2. Add a `SKILL.md` file with YAML frontmatter:
   ```yaml
   ---
   name: skill-name
   description: Brief description and trigger phrases
   ---
   ```
3. Write step-by-step instructions in Markdown
4. Add any reference files as needed
5. Document the skill in this README
