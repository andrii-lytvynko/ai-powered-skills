import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = JSON.parse(
  readFileSync(join(__dirname, 'garden-components.json'), 'utf-8')
);
const components = data.components;

const server = new McpServer({
  name: 'garden',
  version: '1.0.0',
});

server.tool(
  'list_garden_components',
  'List all Zendesk Garden components. Pass an optional category to filter results. ' +
    'Available categories: navigation, buttons, forms, tables, modals, menus, loaders, ' +
    'notifications, overlays, indicators, layout, theming, accordions, avatars, ' +
    'pagination, accessibility, animation, selection, dropdowns.',
  {
    category: z
      .string()
      .optional()
      .describe('Optional category name to filter components by'),
  },
  ({ category }) => {
    const filtered = category
      ? components.filter(
          (c) => c.category.toLowerCase() === category.toLowerCase()
        )
      : components;

    const list = filtered.map((c) => ({
      component: c.component,
      category: c.category,
      package: c.package,
      description: c.description,
      intendedUsage: c.intendedUsage,
    }));

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(list, null, 2),
        },
      ],
    };
  }
);

server.tool(
  'get_garden_component',
  'Get full details for a specific Zendesk Garden component by name, including props, ' +
    'examples, accessibility requirements, theming tokens, constraints, and usage guidelines.',
  {
    name: z
      .string()
      .describe(
        'Exact component name, e.g. "Button", "Modal", "Combobox", "Tabs"'
      ),
  },
  ({ name }) => {
    const component = components.find(
      (c) => c.component.toLowerCase() === name.toLowerCase()
    );

    if (!component) {
      const available = components.map((c) => c.component).join(', ');
      return {
        content: [
          {
            type: 'text',
            text: `No Garden component named "${name}" found.\n\nAvailable components: ${available}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(component, null, 2),
        },
      ],
    };
  }
);

server.tool(
  'search_garden_components',
  'Search Zendesk Garden components by keyword. Searches across component name, ' +
    'description, intended usage, and use cases. Use this to check whether a Garden ' +
    'component already covers a UI need before building a custom component.',
  {
    query: z
      .string()
      .describe(
        'Search term, e.g. "dropdown", "loading", "notification", "date picker"'
      ),
  },
  ({ query }) => {
    const q = query.toLowerCase();
    const matches = components.filter((c) => {
      const haystack = [
        c.component,
        c.description,
        c.intendedUsage,
        c.category,
        ...(c.useCases || []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });

    if (matches.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `No Garden components matched "${query}". A custom component may be appropriate for this use case.`,
          },
        ],
      };
    }

    const results = matches.map((c) => ({
      component: c.component,
      category: c.category,
      package: c.package,
      description: c.description,
      intendedUsage: c.intendedUsage,
      useCases: c.useCases,
    }));

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
