const getEnvVar = (key: string, defaultValue: string): string => {
  const value = process.env[key];
  return value?.trim() ? value.trim() : defaultValue;
};

const folder = getEnvVar('MCP_GENERATED_FOLDER', 'generated');

export default {
  browserTimeout: 0, // No timeout, it can be quite long in pipeline
  docsFolder: `${folder}/docs`,
  docItemsFile: `${folder}/index.json`,
  folder,
  guidelinesFile: `${folder}/docs/guidelines.md`,
  selectorTimeout: 10000,
  storybookBaseUrl: getEnvVar(
    'STORYBOOK_BASE_URL',
    'https://main--691abcc79dfa560a36d0a74f.chromatic.com',
  ),
  storybookContentSelector: '#storybook-docs',
};
