import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { IressTagInput } from './TagInput';

describe('TagInput', () => {
  it('renders the component with the correct text and classes', () => {
    const screen = render(<IressTagInput />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  describe('interactions', () => {
    it('changes items in the tag list', async () => {
      const screen = render(<IressTagInput defaultValue={['Tag 1']} />);

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
        const screen = render(<IressTagInput defaultValue={['Tag 1']} />);

        expect(
          screen.getByRole('button', { name: 'Delete Tag 1' }),
        ).toBeInTheDocument();
      });
    });

    describe('onChange', () => {
      it('calls the method when the value of the input changes', async () => {
        const onChange = vi.fn();
        const screen = render(<IressTagInput onChange={onChange} />);
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
        const screen = render(
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

    describe('value', () => {
      it('renders value as tags', () => {
        const screen = render(<IressTagInput value={['Tag 1']} />);

        expect(
          screen.getByRole('button', { name: 'Delete Tag 1' }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <>
          <label htmlFor="id">Test</label>
          <IressTagInput id="id" defaultValue={['Tag 1']} />
        </>,
      );

      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
