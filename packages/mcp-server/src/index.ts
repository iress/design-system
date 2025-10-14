#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { SERVER_CONFIG, CAPABILITIES } from './config.js';
import { toolDefinitions } from './tools.js';
import { handleToolCall } from './toolHandler.js';
import { handleListResources, handleReadResource } from './resourceHandlers.js';

/**
 * Create MCP server for Iress Design System (IDS) component library context
 */
const server = new Server(SERVER_CONFIG, { capabilities: CAPABILITIES });

/**
 * List available IDS component documentation resources
 */
server.setRequestHandler(ListResourcesRequestSchema, () => {
  const result = handleListResources();
  return result;
});
/**
 * Read content from a specific markdown file
 */
server.setRequestHandler(ReadResourceRequestSchema, (request) => {
  const result = handleReadResource(request);
  return result;
});

/**
 * List available IDS development tools
 */
server.setRequestHandler(ListToolsRequestSchema, () => {
  return {
    tools: toolDefinitions,
  };
});

/**
 * Handle IDS component library tool calls
 */
server.setRequestHandler(CallToolRequestSchema, (request) => {
  const result = handleToolCall(request);
  return result;
});

/**
 * Start the server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('IDS Component Library MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
