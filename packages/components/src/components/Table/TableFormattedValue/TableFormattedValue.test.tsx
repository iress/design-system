import { render } from '@testing-library/react';
import { IressTableFormattedValue } from './TableFormattedValue';

describe('IressTableFormattedValue', () => {
  it('renders as-is by default', () => {
    const screen = render(<IressTableFormattedValue value="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();

    screen.rerender(<IressTableFormattedValue value={9} />);
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  describe('function', () => {
    it('uses the formatting function if provided', () => {
      const screen = render(
        <IressTableFormattedValue
          format={(value: string, row) => (
            <button>
              {value}: {row?.key}
            </button>
          )}
          value="test"
          row={{ key: 'id' }}
        />,
      );
      expect(
        screen.getByRole('button', { name: 'test: id' }),
      ).toBeInTheDocument();
    });
  });

  describe('currency', () => {
    it('does not format a text string', () => {
      const screen = render(
        <IressTableFormattedValue format="currency" value="test" />,
      );
      expect(screen.getByText('$test')).toBeInTheDocument();
    });

    it('formats a number string', () => {
      const screen = render(
        <IressTableFormattedValue format="currency" value="0.100000" />,
      );
      expect(screen.getByText('$0.10')).toBeInTheDocument();
    });

    it('formats a number', () => {
      const screen = render(
        <IressTableFormattedValue format="currency" value={123123.42344} />,
      );
      expect(screen.getByText('$123,123.42')).toBeInTheDocument();
    });

    it('formats based on the currencyFormatOptions prop', () => {
      const screen = render(
        <IressTableFormattedValue
          format="currency"
          value={123123.42344}
          currencyCode=""
          currencyFormatOptions={{
            currencyCode: 'GBP',
            formatOptions: { currencyDisplay: 'narrowSymbol' },
          }}
        />,
      );
      expect(screen.getByText('£123,123.42')).toBeInTheDocument();
    });
  });

  describe('number', () => {
    it('formats a number', () => {
      const screen = render(
        <IressTableFormattedValue format="number" value={9} />,
      );
      expect(screen.getByText('9')).toBeInTheDocument();
    });

    it('formats a number string', () => {
      const screen = render(
        <IressTableFormattedValue format="number" value="9" />,
      );
      expect(screen.getByText('9')).toBeInTheDocument();
    });

    it('returns NaN if not a number', () => {
      const screen = render(
        <IressTableFormattedValue format="number" value="test" />,
      );
      expect(screen.getByText('NaN')).toBeInTheDocument();
    });
  });

  describe('date', () => {
    beforeAll(() => {
      vi.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('formats a string', () => {
      const screen = render(
        <IressTableFormattedValue format="date" value="2020-10-20" />,
      );
      expect(screen.getByText('20/10/2020')).toBeInTheDocument();
    });

    it('formats a timestamp', () => {
      const screen = render(
        <IressTableFormattedValue format="date" value={1631883423423} />,
      );
      expect(screen.getByText('17/09/2021')).toBeInTheDocument();
    });

    it('formats a date object', () => {
      const screen = render(
        <IressTableFormattedValue
          format="date"
          value={new Date(1631883423423)}
        />,
      );
      expect(screen.getByText('17/09/2021')).toBeInTheDocument();
    });
  });

  describe('shortDate', () => {
    beforeAll(() => {
      vi.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('formats a string', () => {
      const screen = render(
        <IressTableFormattedValue format="shortDate" value="2020-10-20" />,
      );
      expect(screen.getByText('20 Oct 2020')).toBeInTheDocument();
    });

    it('formats a timestamp', () => {
      const screen = render(
        <IressTableFormattedValue format="shortDate" value={1631883423423} />,
      );
      expect(screen.getByText('17 Sep 2021')).toBeInTheDocument();
    });

    it('formats a date object', () => {
      const screen = render(
        <IressTableFormattedValue
          format="shortDate"
          value={new Date(1631883423423)}
        />,
      );
      expect(screen.getByText('17 Sep 2021')).toBeInTheDocument();
    });
  });

  describe('isoDateTime', () => {
    beforeAll(() => {
      vi.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('formats a string', () => {
      const screen = render(
        <IressTableFormattedValue format="isoDateTime" value="2020-10-20" />,
      );
      expect(
        screen.getByText(/2020-10-20 (00:00:00|24:00:00) \(UTC\)/),
      ).toBeInTheDocument();
    });

    it('formats a timestamp', () => {
      const screen = render(
        <IressTableFormattedValue format="isoDateTime" value={1631883423423} />,
      );
      expect(screen.getByText('2021-09-17 12:57:03 (UTC)')).toBeInTheDocument();
    });

    it('formats a date object', () => {
      const screen = render(
        <IressTableFormattedValue
          format="isoDateTime"
          value={new Date(1631883423423)}
        />,
      );
      expect(screen.getByText('2021-09-17 12:57:03 (UTC)')).toBeInTheDocument();
    });
  });

  describe('relativeTime', () => {
    beforeAll(() => {
      vi.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('formats a string', () => {
      const screen = render(
        <IressTableFormattedValue format="relativeTime" value="2020-10-20" />,
      );
      expect(screen.getByText('20 Oct 2020')).toBeInTheDocument();
    });

    it('formats a timestamp', () => {
      const screen = render(
        <IressTableFormattedValue
          format="relativeTime"
          value={1631883423423}
        />,
      );
      expect(screen.getByText('17 Sep 2021')).toBeInTheDocument();
    });

    it('formats a date object', () => {
      // https://blog.devgenius.io/javascript-date-subtract-seconds-83b3285b7959
      const subtractSeconds = (date: Date, seconds: number) => {
        // make copy with Date() constructor
        const dateCopy = new Date(date);
        dateCopy.setSeconds(date.getSeconds() - seconds);
        return dateCopy;
      };

      const tenSecondsAgo = subtractSeconds(new Date(), 10);

      const screen = render(
        <IressTableFormattedValue
          format="relativeTime"
          value={tenSecondsAgo}
        />,
      );
      expect(screen.getByText('10 seconds ago')).toBeInTheDocument();
    });

    it('handles undefined values gracefully', () => {
      const undefinedValue = undefined as unknown;
      const screen = render(
        <IressTableFormattedValue
          format="relativeTime"
          value={undefinedValue}
        />,
      );
      expect(screen.container.textContent).toBe('');
    });
  });

  describe('percent', () => {
    it('formats a number', () => {
      const screen = render(
        <IressTableFormattedValue format="percent" value={9} />,
      );
      expect(screen.getByText('9%')).toBeInTheDocument();
    });

    it('formats a number string', () => {
      const screen = render(
        <IressTableFormattedValue format="percent" value="9" />,
      );
      expect(screen.getByText('9%')).toBeInTheDocument();
    });

    it('returns 0% if not a number', () => {
      const screen = render(
        <IressTableFormattedValue format="percent" value="test" />,
      );
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });
});
