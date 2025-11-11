import { render } from '@testing-library/react';
import { createSandboxIconFontPortal } from './createSandboxIconFontPortal';

describe('createSandboxIconFontPortal', () => {
  it('inserts the font into the head of the document', () => {
    render(createSandboxIconFontPortal());
    expect(document.head.innerHTML).toContain('<link');
  });
});
