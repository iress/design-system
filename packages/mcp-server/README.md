# IDS Component Library MCP Server

A Model Context Protocol (MCP) server specifically designed for the **Iress Design System (IDS)** component library. This server provides AI assistants and MCP clients with contextual information about IDS components, design tokens, usage patterns, and implementation details to help engineers build consistent user interfaces.

## Features

- **Component Discovery**: Find IDS components by name or functionality
- **Props & API Reference**: Get detailed component prop information and usage examples
- **Usage Examples**: Real-world React code examples and implementation patterns
- **Design Tokens**: Access to IDS design tokens (colors, spacing, typography)
- **Smart Search**: Search across all IDS documentation with context-aware results
- **Categorized Resources**: Organized by Components, Foundations, and Resources
- **Engineer-Focused**: Tools designed specifically for UI development workflows

## Installation

### Quick Setup (VS Code)

**🚀 One-Click Installation**: Click the link below to automatically add the IDS MCP server to your VS Code settings:

[**Add IDS MCP Server to VS Code**](vscode:mcp/install?%7B%22name%22%3A%22iress-design-system%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22%40iress-oss%2Fids-mcp-server%22%5D%7D)

This will automatically configure VS Code to use the IDS Component Library MCP Server with your AI assistant.

### Manual Setup (VS Code)

Alternatively, you can manually add the server to your VS Code settings:

1. Open VS Code Settings (⌘/Ctrl + ,)
2. Search for "MCP"
3. Add the following server configuration:

```json
"mcp": {
  "servers": {
    "iress-design-system": {
      "command": "npx",
      "args": ["@iress-oss/ids-mcp-server"]
    }
  }
}
```

### Other MCP Clients

For other MCP clients or manual configuration, use this server configuration:

```json
{
  "command": "npx",
  "args": ["@iress-oss/ids-mcp-server"]
}
```

## Available Tools

1. **find_component**: Find IDS components by name or functionality - perfect for component discovery
2. **get_component_props**: Get detailed prop information and API reference for specific components
3. **get_usage_examples**: Get real-world React code examples and implementation patterns
4. **search_ids_docs**: Search across all IDS documentation with context-aware results
5. **list_components**: List all available components organized by category
6. **get_design_tokens**: Access IDS design tokens (colors, spacing, typography, etc.)

## Available Resources

All IDS component documentation files are exposed as categorized resources:

- **Components**: Button, Input, Table, Modal, etc. (`components-*-docs.md`)
- **Foundations**: Colors, Typography, Spacing, etc. (`foundations-*-docs.md`)
- **Resources**: Changelog, Guidelines, etc. (`resources-*-docs.md`)

## Documentation Structure

The server works with the IDS component library documentation in the `generated/docs/` directory:

**Components** (50+ UI components):

- `components-button-docs.md` - IressButton component
- `components-input-docs.md` - IressInput component
- `components-table-docs.md` - IressTable component
- `components-modal-docs.md` - IressModal component
- `components-*-recipes-docs.md` - Usage patterns and recipes

**Foundations** (Guidelines and tokens):

- `foundations-colours-docs.md` - Color palette and usage
- `foundations-typography-docs.md` - Text styles and hierarchy
- `foundations-spacing-docs.md` - Layout and spacing tokens

**Resources** (Supporting documentation):

- `resources-changelog-docs.md` - Version history and updates
- `introduction-docs.md` - Getting started guide
