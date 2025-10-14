import { fireEvent, render } from '@testing-library/react';
import {
  IressButton,
  ButtonMode,
  ButtonType,
  IressButtonProps,
  ButtonCssClass,
} from '.';
import { IressIcon } from '../Icon';
import { axe } from 'jest-axe';

const renderButton = (props: IressButtonProps) => {
  const { getByTestId } = render(
    <IressButton data-testid="test" {...props}>
      Button
    </IressButton>,
  );
  return getByTestId('test');
};

describe('IressButton', () => {
  describe('Default rendering', () => {
    it('renders with the correct classes', () => {
      const button = renderButton({ className: 'test-class' });

      expect(button).toHaveClass(`test-class ${ButtonCssClass.Base}`);
    });

    it('renders a secondary button', () => {
      const button = renderButton({});

      expect(button).toHaveClass(
        `${ButtonCssClass.Mode}--${ButtonMode.Secondary}`,
      );
    });

    it('renders an HTML button of type button', () => {
      const button = renderButton({});

      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders with the correct data-testids', () => {
      const screen = render(
        <IressButton data-testid="test">Button</IressButton>,
      );

      expect(screen.getByTestId('test')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    describe('Mode', () => {
      const modeArr = Object.values(ButtonMode).map((mode) => [mode, mode]);
      it.each(modeArr)('renders a %s button when mode is %s', (mode) => {
        const button = renderButton({ mode: mode });

        expect(button).toHaveClass(`${ButtonCssClass.Mode}--${mode}`);
      });
    });

    describe('Type', () => {
      const typeArr = Object.values(ButtonType).map((type) => [type, type]);
      it.each(typeArr)(
        'renders a button of type %s when type is %s',
        (type) => {
          const button = renderButton({ type: type });

          expect(button).toHaveAttribute('type', type);
        },
      );
    });

    describe('Append & prepend', () => {
      it('renders prepend content before button content', () => {
        const button = renderButton({ prepend: <span>Before</span> });

        expect(button.textContent).toBe('BeforeButton');
      });

      it('renders append content after button content', () => {
        const button = renderButton({ append: <span>After</span> });

        expect(button.textContent).toBe('ButtonAfter');
      });

      it('renders append and prepend content when both are set', () => {
        const button = renderButton({
          append: <span>After</span>,
          prepend: <span>Before</span>,
        });

        expect(button.textContent).toBe('BeforeButtonAfter');
      });
    });

    describe('Loading', () => {
      it(`doesn't render the loading spinner when loading isn't set`, () => {
        const button = renderButton({});
        const spinner = button.querySelector('.fal');

        expect(spinner).toBeNull();
      });

      it(`doesn't render the loading spinner when loading is false`, () => {
        const button = renderButton({ loading: false });
        const spinner = button.querySelector('.fal');

        expect(spinner).toBeNull();
      });

      it('renders loading spinner when loading is true', () => {
        const button = renderButton({ loading: true });
        const spinner = button.querySelector('.fal');

        expect(spinner).toBeVisible();
      });

      it('hides the prepend content when loading is true', () => {
        const button = renderButton({
          prepend: <span>Before</span>,
          loading: true,
        });
        const prependWrapper = button.querySelector(':first-child');

        expect(prependWrapper).toHaveClass('iress-hidden');
      });

      it('renders the correct aria-label on the spinner when loading is a string', () => {
        const button = renderButton({
          loading: 'This is loading',
        });
        const spinner = button.querySelector('.fal');

        expect(spinner).toHaveAttribute('aria-label', 'This is loading');
      });

      it('renders the correct aria-describedby attribute on the button', () => {
        const button = renderButton({ loading: true });
        const spinnerId = button.querySelector('.fal')?.id;

        expect(button).toHaveAttribute('aria-describedby', spinnerId);
      });

      it(`doesn't render the aria-describedby attribute on the button when not loading`, () => {
        const button = renderButton({});

        expect(button).not.toHaveAttribute('aria-describedby');
      });

      it(`allows button click events when not loading`, () => {
        const clickSpy = vi.fn();
        const button = renderButton({ onClick: clickSpy });

        fireEvent.click(button);
        expect(clickSpy).toHaveBeenCalled();
      });

      it(`prevents button click events when loading`, () => {
        const clickSpy = vi.fn();
        const button = renderButton({
          loading: true,
          onClick: clickSpy,
        });

        fireEvent.click(button);
        expect(clickSpy).not.toHaveBeenCalled();
      });
    });

    describe('href', () => {
      it('renders a link when the href prop is set', () => {
        const link = renderButton({ href: 'https://google.co.uk' });

        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href', 'https://google.co.uk');
      });
    });

    describe('rel', () => {
      it('renders the rel attribute when the rel prop is set on a link', () => {
        const link = renderButton({
          href: 'https://google.co.uk',
          rel: 'noopener',
        });

        expect(link).toHaveAttribute('rel', 'noopener');
      });

      it(`doesn't render the rel attribute when the rel prop is set on a button`, () => {
        const link = renderButton({ rel: 'noopener' });

        expect(link).not.toHaveAttribute('rel', 'noopener');
      });
    });

    describe('target', () => {
      it('renders the target attribute when the target prop is set on a link', () => {
        const link = renderButton({
          href: 'https://google.co.uk',
          target: '_blank',
        });

        expect(link).toHaveAttribute('target', '_blank');
      });

      it(`doesn't render the target attribute when the rel prop is set on a button`, () => {
        const link = renderButton({ target: '_blank' });

        expect(link).not.toHaveAttribute('target', '_blank');
      });
    });

    describe('noWrap', () => {
      it(`doesn't add the noWrap class by default`, () => {
        const button = renderButton({});

        expect(button).not.toHaveClass(ButtonCssClass.NoWrap);
      });

      it(`adds the noWrap class if noWrap is true`, () => {
        const button = renderButton({ noWrap: true });

        expect(button).toHaveClass(ButtonCssClass.NoWrap);
      });

      it(`doesn't add the noWrap class if noWrap is false`, () => {
        const button = renderButton({ noWrap: false });

        expect(button).not.toHaveClass(ButtonCssClass.NoWrap);
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
