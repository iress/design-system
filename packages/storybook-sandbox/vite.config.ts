import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reloadStorybookPreviewPlugin from '../../shared/reload-storybook-preview-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reloadStorybookPreviewPlugin],
});
