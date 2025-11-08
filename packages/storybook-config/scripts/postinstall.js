// scripts/postinstall.js
import { resolve } from 'path';
import { mkdirSync, copyFileSync } from 'fs';

// npm sets INIT_CWD to the consumer project's root
const projectRoot = process.env.INIT_CWD;
if (!projectRoot) {
  console.error('❌ INIT_CWD not set — cannot determine consumer root.');
  process.exit(1);
}

const assetSrc = new URL(
  '../public/assets/ids-logo-wealth.png',
  import.meta.url,
).pathname;
const assetDest = resolve(projectRoot, 'public/assets/ids-logo-wealth.png');

mkdirSync(resolve(projectRoot, 'public/assets'), { recursive: true });
copyFileSync(assetSrc, assetDest);

console.log(`✅ Copied logo to ${assetDest}`);
