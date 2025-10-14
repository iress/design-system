import { render, screen } from '@testing-library/react';
import {
  FilterResultsDescriptor,
  FilterResultsDescriptorProps,
} from './FilterResultsDescriptor';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';
import { css } from '@/styled-system/css';

const renderFilterResultsDescriptor = (
  props: FilterResultsDescriptorProps = {},
) => {
  return render(<FilterResultsDescriptor {...props} />);
};

describe('FilterResultsDescriptor', () => {
  it('renders none selected by default', () => {
    renderFilterResultsDescriptor();
    const descriptor = screen.getByText('None selected');
    expect(descriptor).toHaveClass(css({ srOnly: true }));
  });

  it('renders selected item label if selected', () => {
    renderFilterResultsDescriptor({
      value: MOCK_LABEL_VALUE_META[0],
    });
    const descriptor = screen.getByText(MOCK_LABEL_VALUE_META[0].label);
    expect(descriptor).toBeInTheDocument();
  });

  it('renders no results if shown and no results available', () => {
    renderFilterResultsDescriptor({
      show: true,
    });
    const descriptor = screen.getByText('No results');
    expect(descriptor).toBeInTheDocument();
  });

  it('renders number of results if shown and results available', () => {
    renderFilterResultsDescriptor({
      results: MOCK_LABEL_VALUE_META,
      show: true,
    });
    const descriptor = screen.getByText(
      `${MOCK_LABEL_VALUE_META.length} results`,
    );
    expect(descriptor).toBeInTheDocument();
  });

  it('renders loading if loading', () => {
    renderFilterResultsDescriptor({
      loading: true,
      results: MOCK_LABEL_VALUE_META,
      show: true,
    });
    const descriptor = screen.getByText('loading');
    expect(descriptor).toBeInTheDocument();
  });
});
