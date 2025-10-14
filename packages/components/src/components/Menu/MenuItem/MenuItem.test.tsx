import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressMenuItem } from './MenuItem';
import { IressMenu } from '../Menu';
import { GlobalCSSClass } from '@/enums';

describe('IressMenuItem', () => {
  it('renders as button by default', () => {
    render(<IressMenuItem>Test</IressMenuItem>);
    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(GlobalCSSClass.MenuItem);
  });

  it('renders as a if provided href', () => {
    render(<IressMenuItem href="#">Test</IressMenuItem>);
    const anchor = screen.getByRole('link', { name: 'Test' });
    expect(anchor).toBeInTheDocument();
  });

  describe('inside menu', () => {
    it('renders inside a listitem element inside default menu', () => {
      render(
        <IressMenu>
          <IressMenuItem>Test</IressMenuItem>
        </IressMenu>,
      );
      const button = screen.getByRole('button', { name: 'Test' });
      expect(button).toBeInTheDocument();
      expect(button.parentElement).toHaveAttribute('role', 'listitem');
    });

    it('renders as a menuitem inside a menu with role=menu', () => {
      render(
        <IressMenu role="menu">
          <IressMenuItem>Test</IressMenuItem>
        </IressMenu>,
      );
      const button = screen.getByRole('menuitem', { name: 'Test' });
      expect(button).toBeInTheDocument();
    });

    it('renders as a option inside a menu with role=listbox', () => {
      render(
        <IressMenu role="listbox">
          <IressMenuItem>Test</IressMenuItem>
        </IressMenu>,
      );
      const button = screen.getByRole('option', { name: 'Test' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressMenuItem>Test</IressMenuItem>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=list', async () => {
      const { container } = render(
        <IressMenu role="list">
          <IressMenuItem>Test</IressMenuItem>
        </IressMenu>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=menu', async () => {
      const { container } = render(
        <IressMenu role="menu">
          <IressMenuItem>Test</IressMenuItem>
        </IressMenu>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=listbox', async () => {
      const { container } = render(
        <IressMenu role="listbox" aria-label="Test menu">
          <IressMenuItem>Test</IressMenuItem>
        </IressMenu>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=listbox and selected', async () => {
      const { container } = render(
        <IressMenu role="listbox" aria-label="Test menu" selected="test">
          <IressMenuItem value="test">Test</IressMenuItem>
        </IressMenu>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
