import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { remarkAutoTypeTable, createGenerator } from 'fumadocs-typescript';

export const docs = defineDocs({
  dir: 'content/docs',
});

const generator = createGenerator({
  // Point to the components tsconfig so the TS Compiler API can resolve types
  tsconfigPath: '../components/tsconfig.json',
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkAutoTypeTable, { generator }]],
  },
});
