import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import styles from './TagListInput.module.scss';
import userEvent from '@testing-library/user-event';
import { TagListInput } from './TagListInput';
import { type TagListInputProps } from './TagListInput.types';

const TEST_ID = 'test-component';

function renderComponent(
  props?: Partial<TagListInputProps>,
  rerender?: typeof render,
) {
  const fn = rerender ?? render;
  return fn(
    <TagListInput {...props} data-testid={props?.['data-testid'] ?? TEST_ID} />,
  );
}

describe('TagListInput', () => {
  it('should render the component with the correct text and classes', () => {
    const screen = renderComponent({
      className: 'test-class',
    });

    const component = screen.getByTestId('test-component');
    expect(component).toBeInTheDocument();
    expect(component).toHaveClass(`test-class ${styles.tagListInput}`);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the correct data-testids', () => {
    const screen = renderComponent({ tags: ['Tag 1'] });

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__tag`)).toBeInTheDocument();
    expect(
      screen.getByTestId(`${TEST_ID}__tag__delete-button__button`),
    ).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__items`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__input`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__input__input`)).toBeInTheDocument();
  });

  describe('props', () => {
    describe('deleteButton', () => {
      it('adds a custom delete button if provided', () => {
        const screen = renderComponent({
          tags: ['Tag 1'],
          deleteButton: <button type="button">Custom delete</button>,
        });

        expect(
          screen.getByRole('button', { name: 'Custom delete' }),
        ).toBeInTheDocument();
      });
    });

    describe('onTagDelete', () => {
      it('called when a tag is deleted', async () => {
        const onTagDelete = vitest.fn();

        const screen = renderComponent({
          onTagDelete,
          tags: ['Tag 1', 'Tag 2'],
        });

        await userEvent.click(
          screen.getByRole('button', { name: 'Delete Tag 1' }),
        );

        expect(onTagDelete).toHaveBeenCalledTimes(1);
      });
    });

    describe('onTagDeleteButtonBlur', () => {
      it('called when a tag delete button is blurred', async () => {
        const onTagDeleteButtonBlur = vitest.fn();

        renderComponent({
          onTagDeleteButtonBlur,
          tags: ['Tag 1', 'Tag 2'],
        });

        await userEvent.tab(); // Focus button
        await userEvent.tab(); // Blur button

        expect(onTagDeleteButtonBlur).toHaveBeenCalledTimes(1);
      });
    });

    describe('selectedOptionsTagText', () => {
      it('adds custom selected options tag text when limit exceeded', () => {
        const screen = renderComponent({
          selectedOptionsTagText: 'test text',
          tags: ['Tag 1', 'Tag 2'],
          tagLimit: 1,
        });

        expect(screen.getByText('2 test text')).toBeInTheDocument();
      });
    });

    describe('styles', () => {
      it('Should add styles to the appropriate components', () => {
        const screen = renderComponent({
          styles: {
            tagListInput: 'tagListInput',
            tagListInput__element: 'tagListInput__element',
            tagListInput__items: 'tagListInput__items',
            tagListInput__itemsInner: 'tagListInput__itemsInner',
          },
        });

        expect(screen.getByTestId(TEST_ID)).toHaveClass('tagListInput');
        expect(
          screen.getByRole('textbox').closest('.tagListInput__element'),
        ).not.toBeNull();
        expect(screen.getByTestId(`${TEST_ID}__items`)).toHaveClass(
          'tagListInput__items',
        );
        expect(
          screen
            .getByTestId(`${TEST_ID}__items`)
            .querySelector('.tagListInput__itemsInner'),
        ).not.toBeNull();
      });
    });

    describe('tags', () => {
      it('Should add tags if there are any available', () => {
        const screen = renderComponent({
          tags: ['Tag 1', 'Tag 2'],
        });

        expect(screen.getAllByTestId(`${TEST_ID}__tag`)).toHaveLength(2);
        expect(screen.getByText('Tag 1')).toBeInTheDocument();
        expect(screen.getByText('Tag 2')).toBeInTheDocument();
      });
    });

    describe('tagLimit', () => {
      it('Should only show a single tag if tag limit reached', () => {
        const screen = renderComponent({
          tags: ['Tag 1', 'Tag 2'],
          tagLimit: 1,
        });

        expect(screen.getAllByTestId(`${TEST_ID}__tag`)).toHaveLength(1);
        expect(screen.queryByText('Tag 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Tag 2')).not.toBeInTheDocument();
        expect(screen.getByText('2 selected')).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <>
          <label htmlFor={TEST_ID}>Test</label>
          <TagListInput id={TEST_ID} tags={['Tag 1']} />
        </>,
      );

      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
