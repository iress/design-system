export const waitUntilTrue = async (
  condition: () => boolean,
  timeout = 1000,
  interval = 50,
): Promise<void> => {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const checkCondition = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime >= timeout) {
        reject(new Error('Condition not met within timeout'));
      } else {
        setTimeout(checkCondition, interval);
      }
    };

    checkCondition();
  });
};
