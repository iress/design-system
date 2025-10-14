/**
 * Configuration constants for the IDS MCP Server
 */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DOCS_DIR = path.join(__dirname, '..', 'generated', 'docs');

export const SERVER_CONFIG = {
  name: 'ids-mcp-server',
  version: '1.0.0',
} as const;

export const CAPABILITIES = {
  resources: {},
  tools: {},
} as const;
