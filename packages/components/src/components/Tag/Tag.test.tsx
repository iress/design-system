import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressTag } from '.';
import userEvent from '@testing-library/user-event';
import { tag } from './Tag.styles';
import { GlobalCSSClass } from '@/enums';
import { STATUSES } from '@/constants';

describe('IressTag', () => {
  it('should render the component with the correct text, classes and testids', () => {
    render(<IressTag data-testid="test-component" className="test-class" />);

    const component = screen.getByTestId('test-component');
    expect(component).toHaveClass(
      `test-class ${tag().root}`,
      GlobalCSSClass.Tag,
    );

    expect(
      screen.queryByTestId('test-component__delete-button__button'),
    ).not.toBeInTheDocument();
  });

  it('renders as a span by default', () => {
    render(<IressTag data-testid="tag">Label</IressTag>);
    const component = screen.getByTestId('tag');
    expect(component.tagName).toBe('SPAN');
  });

  it('renders as a button when element="button"', async () => {
    const handleClick = vi.fn();
    render(
      <IressTag element="button" onClick={handleClick} data-testid="tag">
        Click me
      </IressTag>,
    );

    const component = screen.getByRole('button', { name: 'Click me' });
    expect(component).toHaveClass(
      ...(tag({ clickable: true }).root ?? '').split(' '),
    );

    await userEvent.click(component);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders as a link when element="a"', () => {
    render(
      <IressTag element="a" href="/test" data-testid="tag">
        Link tag
      </IressTag>,
    );

    const component = screen.getByRole('link', { name: 'Link tag' });
    expect(component).toHaveAttribute('href', '/test');
    expect(component).toHaveClass(
      ...(tag({ clickable: true }).root ?? '').split(' '),
    );
  });

  it('renders as clickable when onClick is provided without element', async () => {
    const handleClick = vi.fn();
    render(
      <IressTag onClick={handleClick} data-testid="clickable-tag">
        Click me
      </IressTag>,
    );

    const component = screen.getByRole('button', { name: 'Click me' });
    await userEvent.click(component);
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies bordered styles', () => {
    render(
      <IressTag bordered data-testid="bordered-tag">
        Bordered
      </IressTag>,
    );

    const component = screen.getByTestId('bordered-tag');
    expect(component).toHaveClass(tag({ bordered: true }).root!);
  });

  it('should render the delete button if onDelete is provided', () => {
    render(<IressTag onDelete={vi.fn()} data-testid="test-component" />);

    expect(
      screen.getByTestId('test-component__delete-button__button'),
    ).toBeInTheDocument();
  });

  it('should set the correct aria-label on the delete button when you set the deleteButtonText', () => {
    render(<IressTag onDelete={vi.fn()} deleteButtonText="Remove item" />);

    const removeButton = screen.getByRole('button', { name: 'Remove item' });
    expect(removeButton).toBeInTheDocument();
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
    const deleteBlurSpy = vi.fn();

    render(
      <IressTag onDelete={vi.fn()} onDeleteButtonBlur={deleteBlurSpy}>
        Bacon
      </IressTag>,
    );

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

  it.each(STATUSES)('applies %s status mode styles', (status) => {
    render(
      <IressTag mode={status} data-testid="status-tag">
        Tag
      </IressTag>,
    );

    const component = screen.getByTestId('status-tag');
    expect(component).toHaveClass(tag({ mode: status }).root!);
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
