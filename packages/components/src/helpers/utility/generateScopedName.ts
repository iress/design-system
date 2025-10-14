import { CSS_IDS_VERSION } from '../../constants';

/**
 * This function generates a scoped class name for CSS modules.
 * We override it so we can have a predictable class name for consumers to use.
 * @param name The class name
 * @param filename The file name where the class name exists
 * @returns a scoped class name, in the format of `ids-${component}--${class}-${version}`
 */
export const generateScopedName = (name: string, filename: string) => {
  // Transform file name and class name to pretty css selectors (camels to kebabs)
  const component = toKebabCase(filename.split('/').reverse()[0].split('.')[0]);
  const cssName = toKebabCase(name);

  // Remove class name if it is the same as component
  const className = component === cssName ? '' : `${cssName}`;

  // Remove component prefix if we are mimic-ing :host-context classes
  let prefix = `ids-${component}`;
  if (name.startsWith('ids-')) {
    prefix = '';
  }

  // Merge above with IDS version to scope classes
  return `${prefix}${
    prefix && className ? '--' : ''
  }${className}-${CSS_IDS_VERSION}`;
};

const toKebabCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
