/**
 * Resource handlers for MCP server
 */
import * as path from 'path';
import { getMarkdownFiles, readFileContent } from './utils.js';
import { DOCS_DIR } from './config.js';

interface ReadResourceRequest {
  params: {
    uri: string;
  };
}

export function handleListResources() {
  const markdownFiles = getMarkdownFiles();

  // Categorize resources for better organization
  const categorizedResources = markdownFiles.map((file) => {
    let category = 'Other';
    let name = file;

    if (file.startsWith('components-')) {
      category = 'Components';
      name = file.replace('components-', '').replace('-docs.md', '');
    } else if (file.startsWith('foundations-')) {
      category = 'Foundations';
      name = file.replace('foundations-', '').replace('-docs.md', '');
    } else if (file.startsWith('resources-')) {
      category = 'Resources';
      name = file.replace('resources-', '').replace('-docs.md', '');
    } else if (file.includes('introduction')) {
      category = 'Getting Started';
      name = 'Introduction';
    }

    return {
      uri: `file://${path.join(DOCS_DIR, file)}`,
      name: `${category}: ${name}`,
      description: `IDS ${category.toLowerCase()} documentation for ${name}`,
      mimeType: 'text/markdown',
    };
  });

  return {
    resources: categorizedResources,
  };
}

export function handleReadResource(request: ReadResourceRequest) {
  const url = new URL(request.params.uri);

  if (url.protocol !== 'file:') {
    throw new Error(`Unsupported protocol: ${url.protocol}`);
  }

  const filePath = url.pathname;

  // Ensure the file is within our docs directory
  const relativePath = path.relative(DOCS_DIR, filePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error('Access denied: File is outside the docs directory');
  }

  try {
    const content = readFileContent(filePath);
    return {
      contents: [
        {
          uri: request.params.uri,
          mimeType: 'text/markdown',
          text: content,
        },
      ],
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to read file: ${errorMessage}`);
  }
}
