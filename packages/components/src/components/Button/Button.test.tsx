import { fireEvent, render, screen } from '@testing-library/react';
import { IressButton, button as buttonStyles } from '.';
import { IressIcon } from '../Icon';
import { axe } from 'jest-axe';
import { GlobalCSSClass } from '@/enums';

describe('IressButton', () => {
  describe('Default rendering', () => {
    it('renders with the correct classes', () => {
      render(<IressButton className="test-class">Button</IressButton>);
      const button = screen.getByText('Button');
      expect(button).toHaveClass(
        `test-class ${buttonStyles().root}`,
        GlobalCSSClass.Button,
      );
    });

    it('renders an HTML button of type button', () => {
      render(<IressButton>Button</IressButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders with the correct data-testids', () => {
      const screen = render(
        <IressButton data-testid="test">Button</IressButton>,
      );

      expect(screen.getByTestId('test')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    describe('mode', () => {
      it('renders a button with a different mode', () => {
        render(<IressButton mode="primary">Button</IressButton>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(buttonStyles({ mode: 'primary' }).root);
      });
    });

    describe('type', () => {
      it('renders a button of type submit', () => {
        render(<IressButton type="submit">Button</IressButton>);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'submit');
      });
    });

    describe('Append & prepend', () => {
      it('renders prepend content before button content', () => {
        render(<IressButton prepend="Before">Button</IressButton>);
        const button = screen.getByRole('button');
        expect(button.textContent).toBe('BeforeButton');
      });

      it('renders append content after button content', () => {
        render(<IressButton append="After">Button</IressButton>);
        const button = screen.getByRole('button');
        expect(button.textContent).toBe('ButtonAfter');
      });

      it('renders append and prepend content when both are set', () => {
        render(
          <IressButton append="After" prepend="Before">
            Button
          </IressButton>,
        );
        const button = screen.getByRole('button');

        expect(button.textContent).toBe('BeforeButtonAfter');
      });
    });

    describe('Loading', () => {
      it(`doesn't render the loading spinner when loading isn't set`, () => {
        render(<IressButton>Button</IressButton>);
        const button = screen.getByRole('button');
        const spinner = button.querySelector('.fal');

        expect(spinner).toBeNull();
      });

      it(`doesn't render the loading spinner when loading is false`, () => {
        render(<IressButton loading={false}>Button</IressButton>);
        const button = screen.getByRole('button');
        const spinner = button.querySelector('.fal');

        expect(spinner).toBeNull();
      });

      it('renders loading spinner when loading is true', () => {
        render(<IressButton loading>Button</IressButton>);
        const button = screen.getByRole('button');
        const spinner = button.querySelector('.fal');

        expect(spinner).toBeVisible();
      });

      it('hides the prepend content when loading is true', () => {
        render(
          <IressButton prepend="Before" loading>
            Button
          </IressButton>,
        );
        const button = screen.getByRole('button');
        expect(button.textContent).toBe('Button');
        expect(button.textContent).not.toBe('BeforeButton');
      });

      it('renders the correct aria-label on the spinner when loading is a string', () => {
        render(<IressButton loading="This is loading">Button</IressButton>);
        const button = screen.getByRole('button');
        const spinner = button.querySelector('.fal');

        expect(spinner).toHaveAttribute('aria-label', 'This is loading');
      });

      it('renders the correct aria-describedby attribute on the button', () => {
        render(<IressButton loading>Button</IressButton>);
        const button = screen.getByRole('button');
        const spinnerId = button.querySelector('.fal')?.id;

        expect(button).toHaveAttribute('aria-describedby', spinnerId);
      });

      it(`doesn't render the aria-describedby attribute on the button when not loading`, () => {
        render(<IressButton>Button</IressButton>);
        const button = screen.getByRole('button');

        expect(button).not.toHaveAttribute('aria-describedby');
      });

      it(`allows button click events when not loading`, () => {
        const clickSpy = vi.fn();
        render(<IressButton onClick={clickSpy}>Button</IressButton>);
        const button = screen.getByRole('button');

        fireEvent.click(button);
        expect(clickSpy).toHaveBeenCalled();
      });

      it(`prevents button click events when loading`, () => {
        const clickSpy = vi.fn();
        render(
          <IressButton onClick={clickSpy} loading>
            Button
          </IressButton>,
        );
        const button = screen.getByRole('button');

        fireEvent.click(button);
        expect(clickSpy).not.toHaveBeenCalled();
      });
    });

    describe('href', () => {
      it('renders a link when the href prop is set', () => {
        render(<IressButton href="https://google.co.uk">Button</IressButton>);
        const link = screen.getByRole('link');

        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href', 'https://google.co.uk');
      });
    });

    describe('rel', () => {
      it('renders the rel attribute when the rel prop is set on a link', () => {
        render(
          <IressButton href="https://google.co.uk" rel="noopener">
            Button
          </IressButton>,
        );
        const link = screen.getByRole('link');

        expect(link).toHaveAttribute('rel', 'noopener');
      });
    });

    describe('target', () => {
      it('renders the target attribute when the target prop is set on a link', () => {
        render(
          <IressButton href="https://google.co.uk" target="_blank">
            Button
          </IressButton>,
        );
        const link = screen.getByRole('link');

        expect(link).toHaveAttribute('target', '_blank');
      });
    });

    describe('noWrap', () => {
      const noWrapButtonClassName = buttonStyles({ noWrap: true }).root;

      it(`doesn't add the noWrap class by default`, () => {
        render(<IressButton>Button</IressButton>);
        const button = screen.getByRole('button');
        expect(button).not.toHaveClass(noWrapButtonClassName);
      });

      it(`adds the noWrap class if noWrap is true`, () => {
        render(<IressButton noWrap>Button</IressButton>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(noWrapButtonClassName);
      });

      it(`doesn't add the noWrap class if noWrap is false`, () => {
        render(<IressButton noWrap={false}>Button</IressButton>);
        const button = screen.getByRole('button');
        expect(button).not.toHaveClass(noWrapButtonClassName);
      });
    });
  });
});

describe('accessibility', () => {
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <>
        <IressButton>Button</IressButton>
        <IressButton append={<IressIcon name="home" />}>
          Button append
        </IressButton>
        <IressButton prepend={<IressIcon name="home" />}>
          Button prepend
        </IressButton>
        <IressButton href="https://google.co.uk">Link</IressButton>
        <IressButton href="https://google.co.uk">
          <IressIcon name="home" screenreaderText="Home" />
        </IressButton>
        <IressButton
          append={<IressIcon name="home" />}
          href="https://google.co.uk"
        >
          Link append
        </IressButton>
        <IressButton
          prepend={<IressIcon name="home" />}
          href="https://google.co.uk"
        >
          Link prepend
        </IressButton>
        <IressButton loading>Button</IressButton>
        <IressButton append={<IressIcon name="home" />} loading>
          Loading append
        </IressButton>
        <IressButton prepend={<IressIcon name="home" />} loading>
          Loading prepend
        </IressButton>
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
