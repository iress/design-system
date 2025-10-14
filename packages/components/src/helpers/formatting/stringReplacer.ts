import { NameValue } from '@/interfaces';

export const stringReplacer = (
  str: string,
  replaceArr: NameValue[] = [],
): string => {
  let replacedStr = str;
  replaceArr.forEach((replaceObj: NameValue) => {
    replacedStr = replacedStr.split(replaceObj.name).join(replaceObj.value);
  });
  return replacedStr;
};
