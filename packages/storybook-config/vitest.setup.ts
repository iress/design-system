/// <reference types="vitest/globals" />
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  userEvent.setup();
});

afterEach(() => {
  cleanup();
});
