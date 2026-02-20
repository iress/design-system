import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import { IressMenuGroup } from './MenuGroup';
import { IressMenuItem } from '../MenuItem/MenuItem';
import { IressMenu } from '../Menu';

describe('IressMenuGroup', () => {
  it('renders with label', () => {
    render(
      <IressMenu>
        <IressMenuGroup label="Group Label">
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    expect(
      screen.getByRole('heading', { name: 'Group Label', level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders children within the group', () => {
    const { getByText } = render(
      <IressMenu>
        <IressMenuGroup label="Group Label">
          <IressMenuItem>Item 1</IressMenuItem>
          <IressMenuItem>Item 2</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
  });

  it('renders divider when divider prop is true', () => {
    const { container } = render(
      <IressMenu>
        <IressMenuGroup label="Group Label" divider>
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const divider = container.querySelector('hr');
    expect(divider).toBeInTheDocument();
  });

  it('does not render divider when divider prop is false', () => {
    const { container } = render(
      <IressMenu>
        <IressMenuGroup label="Group Label" divider={false}>
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const divider = container.querySelector('hr');
    expect(divider).not.toBeInTheDocument();
  });

  it('applies custom data-testid', () => {
    const { getByTestId } = render(
      <IressMenu>
        <IressMenuGroup label="Group Label" data-testid="custom-group">
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    expect(getByTestId('custom-group')).toBeInTheDocument();
  });

  it('renders multiple groups correctly', () => {
    const { getByText } = render(
      <IressMenu>
        <IressMenuGroup label="Group 1">
          <IressMenuItem>Item 1-1</IressMenuItem>
          <IressMenuItem>Item 1-2</IressMenuItem>
        </IressMenuGroup>
        <IressMenuGroup label="Group 2">
          <IressMenuItem>Item 2-1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    expect(getByText('Group 1')).toBeInTheDocument();
    expect(getByText('Group 2')).toBeInTheDocument();
    expect(getByText('Item 1-1')).toBeInTheDocument();
    expect(getByText('Item 1-2')).toBeInTheDocument();
    expect(getByText('Item 2-1')).toBeInTheDocument();
  });

  it('passes accessibility tests', async () => {
    const { container } = render(
      <IressMenu>
        <IressMenuGroup label="Group Label">
          <IressMenuItem>Item 1</IressMenuItem>
          <IressMenuItem>Item 2</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
