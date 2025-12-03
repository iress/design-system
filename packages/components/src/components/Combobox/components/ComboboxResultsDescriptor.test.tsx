import { render, screen } from '@testing-library/react';
import { ComboboxResultsDescriptor } from './ComboboxResultsDescriptor';
import { type ComboboxResultsDescriptorProps, GlobalCSSClass } from '@/main';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';

const renderComboboxResultsDescriptor = (
  props: ComboboxResultsDescriptorProps = {},
) => {
  return render(<ComboboxResultsDescriptor {...props} />);
};

describe('ComboboxResultsDescriptor', () => {
  it('renders none selected by default', () => {
    renderComboboxResultsDescriptor();
    const descriptor = screen.getByText('None selected');
    expect(descriptor).toHaveClass(GlobalCSSClass.SROnly);
  });

  it('renders selected item label if selected', () => {
    renderComboboxResultsDescriptor({
      value: MOCK_LABEL_VALUE_META[0],
    });
    const descriptor = screen.getByText(MOCK_LABEL_VALUE_META[0].label);
    expect(descriptor).toBeInTheDocument();
  });

  it('renders no results if shown and no results available', () => {
    renderComboboxResultsDescriptor({
      show: true,
    });
    const descriptor = screen.getByText('No results');
    expect(descriptor).toBeInTheDocument();
  });

  it('renders number of results if shown and results available', () => {
    renderComboboxResultsDescriptor({
      results: MOCK_LABEL_VALUE_META,
      show: true,
    });
    const descriptor = screen.getByText(
      `${MOCK_LABEL_VALUE_META.length} results`,
    );
    expect(descriptor).toBeInTheDocument();
  });

  it('renders loading if loading', () => {
    renderComboboxResultsDescriptor({
      loading: true,
      results: MOCK_LABEL_VALUE_META,
      show: true,
    });
    const descriptor = screen.getByText('loading');
    expect(descriptor).toBeInTheDocument();
  });
});
