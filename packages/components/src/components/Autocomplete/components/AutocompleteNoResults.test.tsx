import { render, screen } from '@testing-library/react';
import { AutocompleteNoResults } from './AutocompleteNoResults';

const styles = {
  noResults: 'no-results',
};

describe('AutocompleteNoResults', () => {
  it('should wrap the string in a div, if provided a string', () => {
    render(
      <AutocompleteNoResults noResultsText="No results" styles={styles} />,
    );

    const noResults = screen.getByText('No results');
    expect(noResults).toHaveClass(styles.noResults);
  });

  it('should use node directly, if provided a node', () => {
    render(
      <AutocompleteNoResults
        noResultsText={<p>No results</p>}
        styles={styles}
      />,
    );

    const noResults = screen.getByText('No results');
    expect(noResults).not.toHaveClass(styles.noResults);
  });
});
