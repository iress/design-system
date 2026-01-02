export const idsLogger = (
  msg: string,
  level: 'log' | 'warn' | 'error' = 'log',
): void => {
  console[level](
    '%c IDS ',
    'background: #21F5A8; color: #3A1C46; font-weight:bold;',
    msg,
  );
};
