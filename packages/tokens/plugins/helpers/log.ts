import chalk from 'chalk';

const badgeContent = '[IDS]';
const badge = chalk.hex('#FF99A8').bgHex('#13213F')(badgeContent);

export const log = {
  message: (content: string) => console.log(`${badge} ${content}`),
  title: (content: string) => console.log(`${badge} ${chalk.bold(content)}`),
};
