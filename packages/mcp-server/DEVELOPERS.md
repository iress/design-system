# For developers

> **⚠️ DEPRECATED** — This package is deprecated. AI context is now provided via static `.ai/` folders and `.agents/skills/` files in the repository. These deliver the same information without runtime dependencies, Playwright, or Storybook.
>
> **Use agent skills instead:** `npx skills add iress/design-system`
>
> See `packages/components/.ai/`, `packages/tokens/.ai/`, and `.agents/skills/` for the replacement.

---

<details>
<summary>Legacy development instructions (archived)</summary>

## Installation

Terminal 1:

```bash
yarn dev
```

Terminal 2:

```bash
yarn install
yarn playwright install chromium # Install Chromium for Playwright tests
yarn collect               # Generate a list of all pages in Storybook
yarn generate          # Generate all pages in Storybook from the list
yarn guidelines         # Merge foundations into guidelines for easier context
yarn build                       # Build the server
```

## Usage

### Development Server

For easy testing during development, use the interactive dev server:

```bash
yarn test:dev
```

This starts an interactive shell where you can test MCP commands and shows detailed connection information:

```
🚀 IDS Component Library MCP Server
===================================

📍 Server Configuration:
   Protocol: stdio (Model Context Protocol)
   Server Path: /Users/luke.peary/Sandbox/ids-mcp-server/build/index.js
   Docs Directory: /Users/luke.peary/Sandbox/ids-mcp-server/docs/ids
   Working Directory: /Users/luke.peary/Sandbox/ids-mcp-server

🔌 Starting MCP server...
✅ MCP server is ready!
📡 Connection: stdio transport established
🔗 MCP Client Config:
   {
     "command": "node",
     "args": ["/Users/luke.peary/Sandbox/ids-mcp-server/build/index.js"],
     "cwd": "/Users/luke.peary/Sandbox/ids-mcp-server"
   }

Available commands:
  find-component <name>     - Find IDS components by name or functionality
  get-props <component>     - Get component props and API details
  get-examples <component>  - Get usage examples and patterns
  search-ids <query>        - Search across all IDS documentation
  list-components [category] - List available components
  get-tokens [type]         - Get design tokens (colors, spacing, etc.)
  list-resources           - List available resources
  help                     - Show this help
  exit                     - Exit the dev server

> find-component button
📤 Request: {"jsonrpc":"2.0","id":123,"method":"tools/call","params":{"name":"find_component","arguments":{"query":"button"}}}
📥 Response: {
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Found 3 relevant IDS components:\n\n1. **components-button-docs.md**\n   button: A button is a clickable item used to perform an action.\n\n2. **components-buttongroup-docs.md**\n   buttongroup: Button group component documentation..."
      }
    ]
  }
}
```

#### Common Dev Server Commands

**Testing Pattern Support (NEW):**

- `find-component IressForm` - Find the Form pattern (was previously not discoverable)
- `find-component Form` - Also works without "Iress" prefix
- `find-component IressHookForm` - Find the HookForm pattern
- `get-props IressForm` - Get Form pattern props and API

**Testing Backward Compatibility:**

- `find-component button` - Find button-related components
- `find-component IressButton` - Direct component lookup still works
- `get-props button` - Get IressButton component props and API
- `get-examples input` - Get IressInput usage examples

**Other Commands:**

- `search-ids "mode=primary"` - Search for primary mode usage
- `list-components components` - List all UI components
- `get-tokens colors` - Get IDS color design tokens
- `raw {"jsonrpc":"2.0","id":1,"method":"tools/list"}` - Send custom MCP request

### Running the Server

The server runs on stdio and communicates using the MCP protocol:

```bash
node build/index.js
```

## Example Usage

### With MCP Client

```bash
# List available IDS tools
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node build/index.js

# Find button components
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"find_component","arguments":{"query":"button"}}}' | node build/index.js

# Get IressButton props
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_component_props","arguments":{"component":"button"}}}' | node build/index.js

# Search for primary mode usage
echo '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"search_ids_docs","arguments":{"query":"mode=\"primary\""}}}' | node build/index.js
```

### Configuration for MCP Clients

Add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "ids-component-library": {
      "command": "node",
      "args": ["/path/to/ids-mcp-server/build/index.js"],
      "cwd": "/path/to/ids-mcp-server"
    }
  }
}
```

## Project Structure

```
├── src/
│   └── index.ts          # IDS MCP server implementation
├── generated/
│   └── docs/              # IDS component library documentation
│       ├── components-*-docs.md     # Component documentation
│       ├── foundations-*-docs.md    # Design tokens and foundations
│       └── resources-*-docs.md      # Guidelines and resources
├── build/                # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

### Customization

To use a different documentation directory, modify the `DOCS_DIR` constant in `src/index.ts`:

```typescript
const DOCS_DIR = path.join(__dirname, '..', 'docs', 'your-docs-folder');
```

## Security

- Files are restricted to the configured docs directory
- Path traversal attacks are prevented
- Only `.md` files are processed
- All input parameters are validated

</details>
