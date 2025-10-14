import { waitUntilTrue } from './waitUntilTrue';

describe('waitUntilTrue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves when the condition is true', async () => {
    let conditionMet = false;

    // Schedule condition to become true after 100ms
    setTimeout(() => {
      conditionMet = true;
    }, 100);

    const promise = waitUntilTrue(() => conditionMet, 500);

    // Advance time by 100ms to trigger the condition change
    vi.advanceTimersByTime(100);

    const isVoid = await promise;

    expect(isVoid).toBeUndefined();
  });

  it('rejects when the condition is not met within the timeout', async () => {
    const conditionMet = false;
    let conditionCheckCount = 0;

    const promise = waitUntilTrue(() => {
      conditionCheckCount++;
      return conditionMet;
    }, 100);

    // Advance time past the timeout
    vi.advanceTimersByTime(100);

    await expect(promise).rejects.toThrow('Condition not met within timeout');
    expect(conditionMet).toBe(false);
    expect(conditionCheckCount).toBeGreaterThan(0);
  });

  it('checks the condition at specified intervals', async () => {
    let checkCount = 0;

    // Schedule increment after 50ms
    setTimeout(() => {
      checkCount++;
    }, 50);

    const promise = waitUntilTrue(() => checkCount > 0, 200, 50);

    // Advance time by 50ms to trigger the increment
    vi.advanceTimersByTime(50);

    await promise;
    expect(checkCount).toBeGreaterThan(0);
  });
});
