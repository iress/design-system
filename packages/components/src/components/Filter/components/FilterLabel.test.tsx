import { render, screen } from '@testing-library/react';
import { FilterLabel, FilterLabelProps } from './FilterLabel';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';

const TEST_LABEL = 'Label';

const renderFilterLabel = <TMultiple extends boolean = false>(
  props: Partial<FilterLabelProps<TMultiple>> = {},
) => {
  return render(<FilterLabel {...props} label={props.label ?? TEST_LABEL} />);
};

describe('FilterLabel', () => {
  it('renders label directly if no value', () => {
    renderFilterLabel();
    const descriptor = screen.getByText(TEST_LABEL);
    expect(descriptor).toBeInTheDocument();
  });

  it('renders label of value if a single value', () => {
    renderFilterLabel({
      value: MOCK_LABEL_VALUE_META[0],
    });
    const descriptor = screen.getByText(
      `${TEST_LABEL}: ${MOCK_LABEL_VALUE_META[0].label}`,
    );
    expect(descriptor).toBeInTheDocument();
  });

  it('renders label with number of items, if multiple values', () => {
    renderFilterLabel<true>({
      selectedOptionsText: '{{numOptions}} items',
      value: MOCK_LABEL_VALUE_META,
    });
    const descriptor = screen.getByText(
      `${TEST_LABEL}: ${MOCK_LABEL_VALUE_META.length} items`,
    );
    expect(descriptor).toBeInTheDocument();
  });
});
