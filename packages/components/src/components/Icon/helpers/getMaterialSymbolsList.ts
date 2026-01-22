import type { MaterialSymbol } from 'material-symbols';

/**
 * Extracts all Material Symbol names from the type definition.
 * This is done lazily to avoid processing 3800+ icon names until needed.
 *
 * @returns Promise resolving to array of all Material Symbol names
 */
export const getMaterialSymbolsList = async (): Promise<MaterialSymbol[]> => {
  // Lazy load the type definition content only when needed
  const { default: materialSymbolsTypes } =
    await import('material-symbols/index.d.ts?raw');

  const content = materialSymbolsTypes;
  const match = /type MaterialSymbols = (\[)([\s\S]*?)(\]);/.exec(content);

  if (!match) {
    throw new Error('Could not parse Material Symbols type definition');
  }

  // Parse the comma-separated list of quoted strings
  const symbolsText = match[2];
  const symbols = symbolsText
    .split(',')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('"'))
    .map((line) => line.replace(/(^")|("$)/g, '')) as MaterialSymbol[];

  return symbols;
};

/**
 * Cached promise to avoid re-fetching the symbols list
 */
let symbolsPromise: Promise<MaterialSymbol[]> | null = null;

/**
 * Get the Material Symbols list with caching
 */
export const getMaterialSymbolsListCached = (): Promise<MaterialSymbol[]> => {
  symbolsPromise ??= getMaterialSymbolsList();
  return symbolsPromise;
};
