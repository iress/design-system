import { getMainConfig } from '@iress-oss/ids-storybook-config/main';
import { execSync } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Helper function to get the current git branch name
function getCurrentBranch() {
  try {
    // eslint-disable-next-line sonarjs/no-os-command-from-path
    const branch = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
    })
      .trim()
      // Sanitize branch name for URL usage
      .replace(/[^a-zA-Z0-9-]/g, '-');
    return branch;
  } catch (error) {
    console.warn('Failed to detect git branch, using fallback', error);
    return '5.x';
  }
}

const config = getMainConfig({
  absolutePath: dirname(dirname(fileURLToPath(import.meta.url))),
});

const isProduction = process.env.NODE_ENV === 'production';
const branch = getCurrentBranch();

config.refs = isProduction
  ? {
      components: {
        title: 'React components',
        url: `https://${branch}--69166895eb243715fcd0d241.chromatic.com`,
      },
    }
  : {
      components: {
        title: 'React components',
        url: 'http://localhost:6006',
      },
    };

export default config;
