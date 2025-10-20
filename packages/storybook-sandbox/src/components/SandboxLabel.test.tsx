import { render, screen } from '@testing-library/react';
import { SandboxLabel } from './SandboxLabel';
import { ADDON_TITLE_SHORT } from '../constants';

describe('SandboxLabel', () => {
  it('renders default label', () => {
    render(<SandboxLabel />);
    expect(screen.getByText(ADDON_TITLE_SHORT)).toBeInTheDocument();
  });

  it('renders custom label', () => {
    render(<SandboxLabel title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
