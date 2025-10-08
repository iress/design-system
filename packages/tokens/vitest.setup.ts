import { afterEach, vi } from 'vitest';

const logMock = {
  log: {
    title: vi.fn(),
    message: vi.fn(),
  },
};

afterEach(() => {
  Object.values(logMock.log).forEach((mock) => {
    mock.mockClear();
  });
});

vi.mock('./plugins/helpers/log', () => logMock);
