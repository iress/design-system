import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IressImage } from './Image';
import { GlobalCSSClass } from '@/enums';

describe('Image', () => {
  it('renders with required props', () => {
    render(<IressImage src="test-image.jpg" alt="Test image" />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'test-image.jpg');
  });

  it('applies default max width', () => {
    render(<IressImage src="test-image.jpg" alt="Test image" />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveStyle('max-width: 100%');
  });

  it('applies custom max width', () => {
    render(
      <IressImage src="test-image.jpg" alt="Test image" maxWidth="200px" />,
    );
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveStyle('max-width: 200px');
  });

  it('applies alt text', () => {
    render(<IressImage src="test-image.jpg" alt="Test image description" />);
    const imgElement = screen.getByAltText('Test image description');
    expect(imgElement).toBeInTheDocument();
  });

  it('applies additional styles', () => {
    render(
      <IressImage
        src="test-image.jpg"
        alt="Test image"
        style={{ margin: '20px' }}
      />,
    );
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveStyle('margin: 20px');
  });

  it('has correct base styles', () => {
    render(<IressImage src="test-image.jpg" alt="Test image" />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveClass(
      'd_block h_auto obj-f_contain',
      GlobalCSSClass.Image,
    );
  });
});
