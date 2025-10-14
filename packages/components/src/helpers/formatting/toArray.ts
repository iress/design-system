export const toArray = <T>(item?: T | T[]): T[] => {
  if (Array.isArray(item)) {
    return item;
  }

  return item !== undefined ? [item] : [];
};
