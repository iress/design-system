import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressValidationLink } from './ValidationLink';
import userEvent from '@testing-library/user-event';

describe('IressValidationLink', () => {
  it('should render the component with the correct text and classes', () => {
    render(
      <IressValidationLink
        data-testid="test-component"
        className="test-class"
        linkToTarget="test"
      >
        Test message
      </IressValidationLink>,
    );

    const component = screen.getByTestId('test-component');
    expect(component.tagName).equals('A');
    expect(component).toHaveAttribute('href', '#test');
  });

  describe('props', () => {
    describe('linkToTarget & targetId', () => {
      it('href is set to targetId', () => {
        render(
          <IressValidationLink linkToTarget="test-id">
            Test message
          </IressValidationLink>,
        );
        const anchor = screen.getByRole('link', {
          name: 'Error: Test message',
        });
        expect(anchor.getAttribute('href')).toEqual('#test-id');
      });
    });
  });

  describe('interactions', () => {
    it('focuses on the input it is linked to', async () => {
      render(
        <>
          <IressValidationLink linkToTarget="test-id">
            Test message
          </IressValidationLink>
          <input id="test-id" />
        </>,
      );

      await userEvent.click(screen.getByRole('link'));

      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('focuses on the div it is linked to', async () => {
      render(
        <>
          <IressValidationLink linkToTarget="test-id">
            Test message
          </IressValidationLink>
          <div id="test-id" role="complementary" />
        </>,
      );

      await userEvent.click(screen.getByRole('link'));

      expect(screen.getByRole('complementary')).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('anchor should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressValidationLink
          data-testid="test-component"
          className="test-class"
          linkToTarget="test-id"
        >
          Label content
        </IressValidationLink>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
