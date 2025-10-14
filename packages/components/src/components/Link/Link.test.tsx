import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IressIcon } from '../Icon';
import { axe } from 'jest-axe';
import { IressLink } from './Link';
import { link } from './Link.styles';
import userEvent from '@testing-library/user-event';
import { GlobalCSSClass } from '@/enums';

describe('IressLink', () => {
  describe('Default rendering', () => {
    it('renders with the correct classes', () => {
      render(<IressLink className="test-class">Link</IressLink>);

      const button = screen.getByRole('button', { name: 'Link' });
      const text = screen.getByText('Link');

      expect(button).toHaveClass(
        `test-class ${link().root}`,
        GlobalCSSClass.Link,
      );
      expect(text).toHaveClass(link().content!);
    });
  });

  describe('props', () => {
    describe('type', () => {
      it('renders a button of type submit', () => {
        render(<IressLink type="submit">Link</IressLink>);

        const button = screen.getByRole('button', { name: 'Link' });
        expect(button).toHaveAttribute('type', 'submit');
      });
    });

    describe('Append & prepend', () => {
      it('renders prepend content before button content', () => {
        render(
          <IressLink className="test-class" prepend="Before">
            Link
          </IressLink>,
        );

        const button = screen.getByRole('button', { name: 'Before Link' });
        expect(button).toBeInTheDocument();
      });

      it('renders append content after button content', () => {
        render(
          <IressLink className="test-class" append="After">
            Link
          </IressLink>,
        );

        const button = screen.getByRole('button', { name: 'Link After' });
        expect(button).toBeInTheDocument();
      });

      it('renders append and prepend content when both are set', () => {
        render(
          <IressLink className="test-class" prepend="Before" append="After">
            Link
          </IressLink>,
        );

        const button = screen.getByRole('button', {
          name: 'Before Link After',
        });
        expect(button).toBeInTheDocument();
      });
    });

    describe('Loading', () => {
      it(`doesn't render the loading spinner when loading isn't set`, () => {
        render(<IressLink>Link</IressLink>);

        const button = screen.getByRole('button');
        const spinner = button.querySelector('.fal');

        expect(spinner).toBeNull();
      });

      it('renders loading spinner when loading is true', () => {
        render(<IressLink loading>Link</IressLink>);

        const button = screen.getByRole('button');
        const spinner = button.querySelector('.fal');

        expect(spinner).toBeVisible();
      });

      it('hides the prepend content when loading is true', () => {
        render(
          <IressLink loading prepend="Before">
            Link
          </IressLink>,
        );

        const button = screen.getByRole('button');
        const spinner = button.querySelector('.fal');

        expect(spinner).toBeVisible();
        expect(button.textContent).toBe('Link');
        expect(button.textContent).not.toBe('BeforeLink');
      });

      it('renders the correct aria-label on the spinner when loading is a string', () => {
        render(<IressLink loading="This is loading">Link</IressLink>);

        const spinner = screen.getByRole('button').querySelector('.fal');
        expect(spinner).toHaveAttribute('aria-label', 'This is loading');
      });

      it('renders the correct aria-describedby attribute on the button', () => {
        render(<IressLink loading>Link</IressLink>);

        const button = screen.getByRole('button');
        const spinnerId = button.querySelector('.fal')?.id;

        expect(button).toHaveAttribute('aria-describedby', spinnerId);
      });

      it(`doesn't render the aria-describedby attribute on the button when not loading`, () => {
        render(<IressLink>Link</IressLink>);
        expect(screen.getByRole('button')).not.toHaveAttribute(
          'aria-describedby',
        );
      });

      it(`allows button click events when not loading`, async () => {
        const clickSpy = vi.fn();

        render(<IressLink onClick={clickSpy}>Link</IressLink>);

        await userEvent.click(screen.getByRole('button'));
        expect(clickSpy).toHaveBeenCalled();
      });

      it(`prevents button click events when loading`, async () => {
        const clickSpy = vi.fn();

        render(
          <IressLink onClick={clickSpy} loading>
            Link
          </IressLink>,
        );

        await userEvent.click(screen.getByRole('button'));
        expect(clickSpy).not.toHaveBeenCalled();
      });
    });

    describe('href', () => {
      it('renders a link when the href prop is set', () => {
        render(<IressLink href="//iress.com">Link</IressLink>);

        const link = screen.getByRole('link', { name: 'Link' });
        expect(link).toBeInTheDocument();
      });
    });
  });
});

describe('accessibility', () => {
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <>
        <IressLink>Button</IressLink>
        <IressLink append={<IressIcon name="home" />}>Button append</IressLink>
        <IressLink prepend={<IressIcon name="home" />}>
          Button prepend
        </IressLink>
        <IressLink href="https://google.co.uk">Link</IressLink>
        <IressLink href="https://google.co.uk">
          <IressIcon name="home" screenreaderText="Home" />
        </IressLink>
        <IressLink
          append={<IressIcon name="home" />}
          href="https://google.co.uk"
        >
          Link append
        </IressLink>
        <IressLink
          prepend={<IressIcon name="home" />}
          href="https://google.co.uk"
        >
          Link prepend
        </IressLink>
        <IressLink loading>Button</IressLink>
        <IressLink append={<IressIcon name="home" />} loading>
          Loading append
        </IressLink>
        <IressLink prepend={<IressIcon name="home" />} loading>
          Loading prepend
        </IressLink>
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
