import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressTag } from '.';
import userEvent from '@testing-library/user-event';
import { tag } from './Tag.styles';
import { GlobalCSSClass } from '@/enums';

describe('IressTag', () => {
  it('should render the component with the correct text, classes and testids', () => {
    const { getByTestId } = render(
      <IressTag data-testid="test-component" className="test-class" />,
    );

    const component = getByTestId('test-component');
    expect(component).toHaveClass(
      `test-class ${tag().root}`,
      GlobalCSSClass.Tag,
    );

    expect(
      getByTestId('test-component__delete-button__button'),
    ).toBeInTheDocument();
  });

  it('should set the correct aria-label on the delete button when you set the deleteButtonText', () => {
    const { getByRole } = render(<IressTag deleteButtonText="Remove item" />);

    const component = getByRole('img');
    expect(component).toHaveAttribute('aria-label', 'Remove item');
  });

  it('should call the onDelete function with the tag text when the delete button is clicked', () => {
    const deleteSpy = vitest.fn();
    const { getByRole } = render(
      <IressTag onDelete={deleteSpy}>Bacon</IressTag>,
    );

    const button = getByRole('button');
    fireEvent.click(button);
    expect(deleteSpy).toHaveBeenCalledWith('Bacon', expect.anything());
  });

  it('should call the onDeleteButtonBlur function with the tag text when the delete button is blurred', async () => {
    const deleteBlurSpy = vitest.fn();

    render(<IressTag onDeleteButtonBlur={deleteBlurSpy}>Bacon</IressTag>);

    await userEvent.tab(); // Go to button
    await userEvent.tab(); // Blur away

    expect(deleteBlurSpy).toHaveBeenCalledTimes(1);
  });

  it('should use the custom delete button if provided', async () => {
    const onDelete = vitest.fn();
    const onCustomDelete = vitest.fn();

    const screen = render(
      <IressTag
        deleteButton={
          <button type="button" onClick={onCustomDelete}>
            Hello
          </button>
        }
        onDelete={onDelete}
      >
        Bacon
      </IressTag>,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(onCustomDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).not.toHaveBeenCalled();
  });
});

describe('accessibility', () => {
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <>
        <IressTag />
        <IressTag deleteButtonText="Remove item" />
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
