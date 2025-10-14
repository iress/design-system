export const isValidFormInputElement = (ele: HTMLElement): boolean =>
  (ele.tagName === 'SELECT' && !(ele as HTMLSelectElement).disabled) ||
  (!!(ele as HTMLInputElement).name &&
    !(ele as HTMLInputElement).disabled &&
    (ele as HTMLInputElement).type !== 'file' &&
    (ele as HTMLInputElement).type !== 'reset' &&
    (ele as HTMLInputElement).type !== 'submit' &&
    (ele as HTMLInputElement).type !== 'button');
