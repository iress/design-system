/**
 * Type definitions for the IDS MCP Server
 */

export interface SearchResult {
  file: string;
  relevance: number;
  description: string;
}

export interface SearchMatch {
  file: string;
  line: number;
  content: string;
  context: string;
}

export interface ComponentCategories {
  components: string[];
  foundations: string[];
  resources: string[];
}

export interface ToolResponse {
  content: {
    type: 'text';
    text: string;
  }[];
  isError?: boolean;
}

export interface ComponentMapping {
  componentName: string;
  filePath: string | null;
}

export interface FileOperationResult {
  success: boolean;
  content?: string;
  error?: Error;
}
