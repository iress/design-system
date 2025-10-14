import { render, screen } from '@testing-library/react';
import { IressExpander } from '.';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { useState } from 'react';
import { IressButton } from '../Button';
import { expander } from './Expander.styles';
import { css } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

const DynamicContentExample = () => {
  const [content, setContent] = useState('The content will change on reload.');

  return (
    <>
      <IressExpander
        data-testid="test-component"
        activator={'Activator content'}
        open
      >
        {content}
      </IressExpander>
      <IressButton
        onClick={() =>
          setContent('The content has changed. Click the button to reload.')
        }
      >
        Click me to Reload
      </IressButton>
    </>
  );
};

const MultipleExpander = () => {
  const [openExpander, setOpenExpander] = useState('');

  const handleExpanderChange = (id: string, open?: boolean) => {
    setOpenExpander(open ? id : '');
  };

  return (
    <div>
      <IressExpander
        open={openExpander === 'test-component-one'}
        data-testid="test-component-one"
        activator={'Activator content one'}
        onChange={(open) => handleExpanderChange('test-component-one', open)}
      >
        One
      </IressExpander>
      <IressExpander
        open={openExpander === 'test-component-two'}
        data-testid="test-component-two"
        activator={'Activator content two'}
        onChange={(open) => handleExpanderChange('test-component-two', open)}
      >
        Two
      </IressExpander>
    </div>
  );
};

describe('IressExpander', () => {
  describe('default (no props)', () => {
    beforeEach(() => {
      render(
        <IressExpander
          data-testid="test-component"
          id="test-id"
          className="test-class"
          activator={'Activator content'}
        >
          Test content
        </IressExpander>,
      );
    });

    it('renders the correct content', () => {
      const activatorElement = screen.getByTestId('test-component__activator');
      const containerElement = screen.getByTestId('test-component__container');
      expect(containerElement).toHaveTextContent('Test content');
      expect(activatorElement).toHaveTextContent('Activator content');
    });

    it('renders the correct classes', () => {
      const cssClass = 'test-class';
      const component = screen.getByTestId('test-component');
      expect(component).toHaveClass(
        cssClass,
        expander().root!,
        GlobalCSSClass.Expander,
      );

      const activator = screen.getByTestId('test-component__activator');
      expect(activator).toHaveClass(expander().activator!);
    });

    it('renders a button of type "button"', () => {
      const activatorElement = screen.getByTestId('test-component__activator');
      expect(activatorElement.getAttribute('type')).toBe('button');
    });

    it('renders the container with the correct id', () => {
      const containerElement = screen.getByTestId('test-component__container');
      expect(containerElement.getAttribute('id')).toBe('test-id__container');
    });

    it('renders the activators aria-expanded as false', () => {
      const activatorElement = screen.getByTestId('test-component__activator');
      expect(activatorElement.getAttribute('aria-expanded')).toBe('false');
    });

    it('renders the activators aria-controls as the containers id', () => {
      const activatorElement = screen.getByTestId('test-component__activator');
      expect(activatorElement.getAttribute('aria-controls')).toBe(
        'test-id__container',
      );
    });

    it('renders the correct data-testids', () => {
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(
        screen.getByTestId('test-component__activator'),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('test-component__container'),
      ).toBeInTheDocument();
    });
  });

  describe('props', () => {
    describe('activatorStyle', () => {
      it('adds additional classes and style to the activator', () => {
        render(
          <IressExpander
            activator="Activator"
            activatorStyle={{
              className: 'test-activator-class',
              color: 'colour.neutral.10',
              style: { color: 'red' },
            }}
          >
            Test content
          </IressExpander>,
        );

        const activator = screen.getByRole('button', { name: 'Activator' });
        expect(activator).toHaveClass(
          'test-activator-class',
          css({ color: 'colour.neutral.10' }),
        );
        expect(activator).toHaveStyle({ color: 'rgb(255, 0, 0)' });
      });
    });

    describe('mode', () => {
      it('renders the correct class for link mode', () => {
        render(
          <IressExpander
            data-testid="test-component"
            className="test-class"
            id={'test-id'}
            activator={'Activator content'}
            mode="link"
          >
            Test content
          </IressExpander>,
        );
        const component = screen.getByTestId('test-component');
        expect(component).toHaveClass(expander({ mode: 'link' }).root!);

        const activator = screen.getByTestId('test-component__activator');
        expect(activator).toHaveClass(expander({ mode: 'link' }).activator!);
      });
    });

    describe('onChange', () => {
      it('emits the correct value when the activator is clicked', async () => {
        const onChange = vi.fn();

        render(
          <IressExpander
            onChange={onChange}
            activator="Activator"
            data-testid="test-component"
          >
            Test content
          </IressExpander>,
        );

        const activator = screen.getByRole('button');

        await userEvent.click(activator);

        expect(onChange).toHaveBeenCalledWith(true);

        await userEvent.click(activator);

        expect(onChange).toHaveBeenCalledWith(false);
      });
    });

    describe('open', () => {
      beforeEach(() => {
        render(
          <IressExpander
            data-testid="test-component"
            activator={'Activator content'}
            open
          >
            Test content
          </IressExpander>,
        );
      });

      it('renders the activator aria-expanded as true', () => {
        const activatorElement = screen.getByTestId(
          'test-component__activator',
        );
        expect(activatorElement.getAttribute('aria-expanded')).toBe('true');
      });
    });
  });

  describe('Dynamic content', () => {
    it('should load the latest content', async () => {
      render(<DynamicContentExample />);

      const oldText = 'The content will change on reload.';
      const newText = 'The content has changed. Click the button to reload.';

      expect(screen.getByText(oldText)).toBeInTheDocument();
      expect(screen.queryByText(newText)).not.toBeInTheDocument();

      await userEvent.click(
        screen.getByRole('button', { name: 'Click me to Reload' }),
      );

      expect(screen.getByText(newText)).toBeInTheDocument();
      expect(screen.queryByText(oldText)).not.toBeInTheDocument();
    });
  });

  describe('interactions & events', () => {
    it('clicking the activator toggles the open state', async () => {
      render(
        <IressExpander
          data-testid="test-component"
          activator={'Activator content'}
        >
          Test content
        </IressExpander>,
      );
      const activatorElement = screen.getByTestId('test-component__activator');

      await userEvent.click(activatorElement); // open expander

      expect(activatorElement.getAttribute('aria-expanded')).toBe('true');

      await userEvent.click(activatorElement); // close expander

      expect(activatorElement.getAttribute('aria-expanded')).toBe('false');
    });

    it('should only keep one expander open at a time when multiple expanders are present', async () => {
      render(<MultipleExpander />);

      const activatorOne = screen.getByRole('button', {
        name: 'Activator content one',
      });
      const activatorTwo = screen.getByRole('button', {
        name: 'Activator content two',
      });

      await userEvent.click(activatorOne);

      expect(activatorOne.getAttribute('aria-expanded')).toBe('true');

      await userEvent.click(activatorTwo);

      expect(activatorOne.getAttribute('aria-expanded')).toBe('false');
      expect(activatorTwo.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressExpander
          data-testid="test-component"
          activator={'Activator content'}
        >
          Test content
        </IressExpander>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
