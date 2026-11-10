/**
 * Transforms internal import paths to the public package name.
 */
export function transformImports(source: string): string {
  return source
    .replace(/from\s+['"]@\/main['"]/g, "from '@iress-oss/ids-components'")
    .replace(/from\s+['"]@\/components\/([^'"]+)['"]/g, "from '@iress-oss/ids-components'")
    .replace(/from\s+['"]@\/main\/([^'"]+)['"]/g, "from '@iress-oss/ids-components'");
}
