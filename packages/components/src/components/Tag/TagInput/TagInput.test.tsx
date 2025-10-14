import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { IressTagInput } from './TagInput';

const TEST_ID = 'test-component';

describe('TagInput', () => {
  it('renders the component with the correct text and classes', () => {
    render(<IressTagInput />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the correct data-testids', () => {
    render(<IressTagInput data-testid={TEST_ID} value={['Tag']} name="test" />);

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__tag`)).toBeInTheDocument();
    expect(
      screen.getByTestId(`${TEST_ID}__tag__delete-button__button`),
    ).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__input`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__hidden-input`)).toBeInTheDocument();
  });

  describe('interactions', () => {
    it('changes items in the tag list', async () => {
      render(<IressTagInput defaultValue={['Tag 1']} />);

      const input = screen.getByRole('textbox');

      // Add a tag using enter key
      await userEvent.type(input, 'Tag 2{enter}');
      expect(
        screen.queryByRole('button', { name: 'Delete Tag 2' }),
      ).toBeInTheDocument();

      // Delete a tag using backspace key
      await userEvent.type(input, '{backspace}');
      expect(
        screen.queryByRole('button', { name: 'Delete Tag 2' }),
      ).not.toBeInTheDocument();

      // Add a tag using blur
      await userEvent.type(input, 'Tag 3');
      await userEvent.tab();
      expect(
        screen.queryByRole('button', { name: 'Delete Tag 3' }),
      ).toBeInTheDocument();
    });
  });

  describe('props', () => {
    describe('defaultValue', () => {
      it('renders default value as tags', () => {
        render(<IressTagInput defaultValue={['Tag 1']} />);

        expect(
          screen.getByRole('button', { name: 'Delete Tag 1' }),
        ).toBeInTheDocument();
      });
    });

    describe('name', () => {
      it('renders hidden input if name provided', () => {
        render(
          <IressTagInput
            defaultValue={['Tag 1']}
            name="test-input"
            data-testid="test"
          />,
        );

        const hiddenInput = screen.getByTestId('test__hidden-input');
        expect(hiddenInput).toHaveValue('Tag 1');
      });
    });

    describe('onChange', () => {
      it('calls the method when the value of the input changes', async () => {
        const onChange = vi.fn();
        render(<IressTagInput onChange={onChange} />);
        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'Tag 1{enter}');
        expect(onChange).toHaveBeenCalledWith(expect.anything(), ['Tag 1']);
        await userEvent.type(input, 'Tag 2{enter}');
        expect(onChange).toHaveBeenCalledWith(expect.anything(), [
          'Tag 1',
          'Tag 2',
        ]);
        await userEvent.type(input, '{backspace}');
        expect(onChange).toHaveBeenCalledWith(expect.anything(), ['Tag 1']);
      });
    });

    describe('onExistingTag', () => {
      it('calls the method when user attempts to add a tag that exists', async () => {
        const onChange = vi.fn();
        const onExistingTag = vi.fn();
        render(
          <IressTagInput
            defaultValue={['Tag 1']}
            onChange={onChange}
            onExistingTag={onExistingTag}
          />,
        );
        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'Tag 1{enter}');
        expect(onExistingTag).toHaveBeenCalledWith('Tag 1');
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe('onTagDelete', () => {
      it('called when a tag is deleted', async () => {
        const onTagDelete = vi.fn();

        render(
          <IressTagInput
            value={['Tag 1', 'Tag 2']}
            onTagDelete={onTagDelete}
          />,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'Delete Tag 1' }),
        );

        expect(onTagDelete).toHaveBeenCalledWith('Tag 1', expect.anything());
      });
    });

    describe('onTagDeleteButtonBlur', () => {
      it('called when a tag delete button is blurred', async () => {
        const onTagDeleteButtonBlur = vitest.fn();

        render(
          <IressTagInput
            value={['Tag 1', 'Tag 2']}
            onTagDeleteButtonBlur={onTagDeleteButtonBlur}
          />,
        );

        await userEvent.tab(); // Focus button
        await userEvent.tab(); // Blur button

        expect(onTagDeleteButtonBlur).toHaveBeenCalledTimes(1);
      });
    });

    describe('selectedOptionsTagText', () => {
      it('adds custom selected options tag text when limit exceeded', () => {
        render(
          <IressTagInput
            value={['Tag 1', 'Tag 2']}
            selectedOptionsTagText="test text"
            tagLimit={1}
          />,
        );

        expect(screen.getByText('2 test text')).toBeInTheDocument();
      });
    });

    describe('tagLimit', () => {
      it('Should only show a single tag if tag limit reached', () => {
        render(
          <IressTagInput
            data-testid={TEST_ID}
            value={['Tag 1', 'Tag 2']}
            tagLimit={1}
          />,
        );

        expect(screen.getAllByTestId(`${TEST_ID}__tag`)).toHaveLength(1);
        expect(screen.queryByText('Tag 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Tag 2')).not.toBeInTheDocument();
        expect(screen.getByText('2 selected')).toBeInTheDocument();
      });
    });

    describe('value', () => {
      it('renders value as tags', () => {
        render(<IressTagInput value={['Tag 1']} />);

        expect(
          screen.getByRole('button', { name: 'Delete Tag 1' }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <>
          <label htmlFor="id">Test</label>
          <IressTagInput id="id" defaultValue={['Tag 1']} />
        </>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
