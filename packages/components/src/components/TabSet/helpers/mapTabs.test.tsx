import { render } from '@testing-library/react';
import { Tab } from '../TabSet.types';
import { mapTabs } from './mapTabs';
import { IressTabSet } from '../TabSet';

const MOCK_TABS_LENGTH = 3;
const TEST_ID = 'test-component';

export function generateTabs(amount = MOCK_TABS_LENGTH): Tab[] {
  return [...Array(amount).keys()].map((number) => ({
    tabButtonText: `Tab ${number + 1}`,
    tabPanelContent: `Content ${number + 1}`,
    active: true,
    tabName: String(number),
    tabButtonTestId: TEST_ID,
    tabPanelTestId: `${TEST_ID}-panel`,
  }));
}

describe('mapTabs', () => {
  const tabs = generateTabs();

  it('renders the tabs', () => {
    const screen = render(<IressTabSet>{mapTabs(tabs)}</IressTabSet>);

    const renderedTabs = screen.getAllByTestId(TEST_ID);
    const renderedPanels = screen.getAllByTestId(`${TEST_ID}-panel`);

    expect(renderedTabs).toHaveLength(MOCK_TABS_LENGTH);
    expect(renderedPanels).toHaveLength(MOCK_TABS_LENGTH);

    tabs.forEach((_tab, index) => {
      expect(screen.getByText(`Tab ${index + 1}`)).toBeInTheDocument();
    });

    expect(screen.getByText(`Content 1`)).toBeInTheDocument();
  });

  it('returns null when no items are passed', () => {
    expect(mapTabs([])).toBe(null);
  });
});
