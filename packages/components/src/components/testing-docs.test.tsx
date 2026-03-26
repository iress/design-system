/**
 * These tests verify that the testing guidance in our Storybook docs is
 * accurate. If a test here fails, the corresponding .docs.mdx needs updating.
 */
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { IressAlert } from '@/components/Alert';
import { IressAutocomplete } from '@/components/Autocomplete';
import { IressButton } from '@/components/Button';
import { IressButtonGroup } from '@/components/ButtonGroup';
import { IressCard } from '@/components/Card';
import { IressCheckbox } from '@/components/Checkbox';
import { IressCheckboxGroup } from '@/components/CheckboxGroup';
import { IressDivider } from '@/components/Divider';
import { IressExpander } from '@/components/Expander';
import { IressField } from '@/components/Field';
import { IressIcon } from '@/components/Icon';
import { IressInput } from '@/components/Input';
import { IressLabel } from '@/components/Label';
import { IressLink } from '@/components/Link';
import { IressModal, IressModalProvider } from '@/components/Modal';
import { IressPill } from '@/components/Pill';
import { IressPopover } from '@/components/Popover';
import { IressProgress } from '@/components/Progress';
import { IressRadio } from '@/components/Radio';
import { IressRadioGroup } from '@/components/RadioGroup';
import { IressReadonly } from '@/components/Readonly';
import { IressSelect } from '@/components/Select';
import { IressSlider } from '@/components/Slider';
import { IressSpinner } from '@/components/Spinner';
import { IressTabSet, IressTab } from '@/components/TabSet';
import { IressTag } from '@/components/Tag';
import { IressText } from '@/components/Text';
import { IressToggle } from '@/components/Toggle';
import { IressTooltip } from '@/components/Tooltip';

// -- Documented roles --------------------------------------------------------

describe('Documented roles', () => {
  it('Alert: role="alert" for danger/warning/success, role="status" for info/neutral', () => {
    const { unmount: u1 } = render(
      <IressAlert status="danger">Err</IressAlert>,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    u1();

    const { unmount: u2 } = render(
      <IressAlert status="warning">Warn</IressAlert>,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    u2();

    const { unmount: u3 } = render(
      <IressAlert status="success">OK</IressAlert>,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    u3();

    const { unmount: u4 } = render(<IressAlert status="info">Info</IressAlert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    u4();

    const { unmount: u5 } = render(<IressAlert>Default</IressAlert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    u5();

    // Consumer can override the role
    render(
      <IressAlert status="info" role="alert">
        Urgent info
      </IressAlert>,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('Button: role="button", or role="link" with href', () => {
    const { unmount } = render(<IressButton>Submit</IressButton>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    unmount();

    render(<IressButton href="/dashboard">Go</IressButton>);
    expect(screen.getByRole('link', { name: 'Go' })).toBeInTheDocument();
  });

  it('Checkbox: role="checkbox"', () => {
    render(<IressCheckbox name="t">Accept terms</IressCheckbox>);
    expect(
      screen.getByRole('checkbox', { name: 'Accept terms' }),
    ).toBeInTheDocument();
  });

  it('CheckboxGroup: role="group"', () => {
    render(
      <IressCheckboxGroup name="g" data-testid="g">
        <IressCheckbox value="a">A</IressCheckbox>
      </IressCheckboxGroup>,
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('Card: role depends on element prop', () => {
    const { unmount: u1 } = render(
      <IressCard data-testid="c">Content</IressCard>,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    u1();

    const { unmount: u2 } = render(
      <IressCard element="button">Content</IressCard>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    u2();

    render(
      <IressCard element="a" href="/page">
        Content
      </IressCard>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('Divider: role="separator"', () => {
    render(<IressDivider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('Icon with screenreaderText: role="img"', () => {
    render(<IressIcon name="home" screenreaderText="Home" />);
    expect(screen.getByRole('img', { name: 'Home' })).toBeInTheDocument();
  });

  it('Input: role="textbox"', () => {
    render(
      <IressField label="Email" htmlFor="e">
        <IressInput id="e" />
      </IressField>,
    );
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  });

  it('Input type=number: role="spinbutton"', () => {
    render(
      <IressField label="Qty" htmlFor="q">
        <IressInput id="q" type="number" />
      </IressField>,
    );
    expect(screen.getByRole('spinbutton', { name: 'Qty' })).toBeInTheDocument();
  });

  it('Link: role="link" with href, role="button" without', () => {
    const { unmount } = render(<IressLink href="#">Learn more</IressLink>);
    expect(
      screen.getByRole('link', { name: 'Learn more' }),
    ).toBeInTheDocument();
    unmount();

    render(<IressLink>Show details</IressLink>);
    expect(
      screen.getByRole('button', { name: 'Show details' }),
    ).toBeInTheDocument();
  });

  it('Pill: queryable by text', () => {
    render(<IressPill>Active</IressPill>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('Progress: role="progressbar" with toHaveValue', () => {
    render(<IressProgress value={75} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveValue(75);
  });

  it('Radio: role="radio"', () => {
    render(
      <IressRadio value="a" name="r">
        Option A
      </IressRadio>,
    );
    expect(screen.getByRole('radio', { name: 'Option A' })).toBeInTheDocument();
  });

  it('RadioGroup: role="radiogroup"', () => {
    render(
      <IressRadioGroup name="rg" data-testid="rg">
        <IressRadio value="a">A</IressRadio>
      </IressRadioGroup>,
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('Select: role="combobox"', () => {
    render(<IressSelect options={[{ label: 'One', value: '1' }]} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('Slider: role="slider"', () => {
    render(
      <>
        <IressLabel htmlFor="s">Volume</IressLabel>
        <IressSlider id="s" />
      </>,
    );
    expect(screen.getByRole('slider', { name: 'Volume' })).toBeInTheDocument();
  });

  it('Spinner default: decorative icon (aria-hidden)', () => {
    render(<IressSpinner data-testid="sp" />);
    expect(screen.getByTestId('sp')).toBeInTheDocument();
  });

  it('Spinner chatty: role="status"', () => {
    render(<IressSpinner variant="chatty" screenreaderText="Loading" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('TabSet: role="tab" (queried by label prop) and role="tabpanel"', () => {
    render(
      <IressTabSet>
        <IressTab label="Details">Content</IressTab>
      </IressTabSet>,
    );
    expect(screen.getByRole('tab', { name: 'Details' })).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('Text heading: role="heading"', () => {
    render(
      <IressText element="h2" textStyle="typography.heading.2">
        Page title
      </IressText>,
    );
    expect(
      screen.getByRole('heading', { name: 'Page title' }),
    ).toBeInTheDocument();
  });

  it('Toggle: role="switch" (not checkbox)', () => {
    render(<IressToggle>Dark mode</IressToggle>);
    const toggle = screen.getByRole('switch', { name: 'Dark mode' });
    expect(toggle).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('Tag: span by default, button when onClick is provided', () => {
    const { unmount } = render(<IressTag>Category</IressTag>);
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Category' }),
    ).not.toBeInTheDocument();
    unmount();

    render(<IressTag onClick={() => undefined}>Category</IressTag>);
    expect(
      screen.getByRole('button', { name: 'Category' }),
    ).toBeInTheDocument();
  });
});

// -- Documented testid suffixes ----------------------------------------------

describe('Documented testid suffixes', () => {
  it('Alert: heading, footer', () => {
    render(
      <IressAlert
        data-testid="a"
        heading="Title"
        actions={[{ children: 'OK' }]}
      >
        Body
      </IressAlert>,
    );
    expect(screen.getByTestId('a__heading')).toBeInTheDocument();
    expect(screen.getByTestId('a__footer')).toBeInTheDocument();
  });

  it('Autocomplete: input, menu', async () => {
    render(
      <IressAutocomplete
        data-testid="ac"
        options={[{ label: 'Apple', value: 'apple' }]}
      />,
    );
    expect(screen.getByTestId('ac__input')).toBeInTheDocument();

    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'A');
    await waitFor(() => {
      expect(screen.getByTestId('ac__menu')).toBeInTheDocument();
    });
  });

  it('ButtonGroup: label', () => {
    render(
      <IressButtonGroup data-testid="bg" label="Alignment">
        <IressButton>Left</IressButton>
      </IressButtonGroup>,
    );
    expect(screen.getByTestId('bg__label')).toBeInTheDocument();
  });

  it('Card: heading, body', () => {
    render(
      <IressCard data-testid="c" heading="Title">
        Body
      </IressCard>,
    );
    expect(screen.getByTestId('c__heading')).toBeInTheDocument();
    expect(screen.getByTestId('c__body')).toBeInTheDocument();
  });

  it('Checkbox: checkboxMark', () => {
    render(
      <IressCheckbox data-testid="cb" name="t">
        Check
      </IressCheckbox>,
    );
    expect(screen.getByTestId('cb__checkboxMark')).toBeInTheDocument();
  });

  it('Expander: activator, container', () => {
    render(
      <IressExpander data-testid="ex" activator="Toggle">
        Content
      </IressExpander>,
    );
    expect(screen.getByTestId('ex__activator')).toBeInTheDocument();
    expect(screen.getByTestId('ex__container')).toBeInTheDocument();
  });

  it('Field: label, hint, error', () => {
    render(
      <IressField
        data-testid="f"
        label="Name"
        htmlFor="n"
        hint="Enter full name"
        errorMessages={[{ message: 'Required' }]}
      >
        <IressInput id="n" />
      </IressField>,
    );
    expect(screen.getByTestId('f__label')).toBeInTheDocument();
    expect(screen.getByTestId('f__hint')).toBeInTheDocument();
    expect(screen.getByTestId('f__error')).toBeInTheDocument();
  });

  it('Field: nested label__text propagation', () => {
    render(
      <IressField data-testid="f" label="Name" htmlFor="n">
        <IressInput id="n" />
      </IressField>,
    );
    expect(screen.getByTestId('f__label__text')).toBeInTheDocument();
  });

  it('Input: __input for single-line, __textarea for multi-line', () => {
    const { unmount } = render(<IressInput data-testid="i" />);
    expect(screen.getByTestId('i__input')).toBeInTheDocument();
    unmount();

    render(<IressInput data-testid="i" rows={3} />);
    expect(screen.getByTestId('i__textarea')).toBeInTheDocument();
  });

  it('Label: text', () => {
    render(
      <IressLabel data-testid="l" htmlFor="x">
        Email
      </IressLabel>,
    );
    expect(screen.getByTestId('l__text')).toBeInTheDocument();
  });

  it('Modal: heading, backdrop, close-button__button, content', async () => {
    render(
      <IressModalProvider>
        <IressModal data-testid="m" id="m" heading="Title" show>
          Body
        </IressModal>
      </IressModalProvider>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('m__heading')).toBeInTheDocument();
    });
    expect(screen.getByTestId('m__backdrop')).toBeInTheDocument();
    expect(screen.getByTestId('m__close-button__button')).toBeInTheDocument();
    expect(screen.getByTestId('m__content')).toBeInTheDocument();
  });

  it('Popover: activator, content', () => {
    render(
      <IressPopover data-testid="p" activator={<button>Open</button>}>
        Panel
      </IressPopover>,
    );
    expect(screen.getByTestId('p__activator')).toBeInTheDocument();
    expect(screen.getByTestId('p__content')).toBeInTheDocument();
  });

  it('Radio: input, radioMark', () => {
    render(
      <IressRadio data-testid="r" value="a" name="r">
        A
      </IressRadio>,
    );
    expect(screen.getByTestId('r__input')).toBeInTheDocument();
    expect(screen.getByTestId('r__radioMark')).toBeInTheDocument();
  });

  it('Readonly: input', () => {
    render(<IressReadonly data-testid="ro" value="Hello" name="ro" />);
    expect(screen.getByTestId('ro__input')).toBeInTheDocument();
  });

  it('Select: hidden-input', () => {
    render(
      <IressSelect data-testid="s" options={[{ label: 'One', value: '1' }]} />,
    );
    expect(screen.getByTestId('s__hidden-input')).toBeInTheDocument();
  });

  it('Slider: slider, datalist', () => {
    render(
      <IressSlider
        data-testid="sl"
        tickLabels={[
          { label: 'Low', value: 0 },
          { label: 'High', value: 10 },
        ]}
      />,
    );
    expect(screen.getByTestId('sl__slider')).toBeInTheDocument();
    expect(screen.getByTestId('sl__datalist')).toBeInTheDocument();
  });

  it('TabSet: panel', () => {
    render(
      <IressTabSet data-testid="ts">
        <IressTab label="Tab 1">Content</IressTab>
      </IressTabSet>,
    );
    expect(screen.getByTestId('ts__panel')).toBeInTheDocument();
  });

  it('Toggle: label, button__button', () => {
    render(<IressToggle data-testid="tg">Label</IressToggle>);
    expect(screen.getByTestId('tg__label')).toBeInTheDocument();
    expect(screen.getByTestId('tg__button__button')).toBeInTheDocument();
  });

  it('Tooltip: activator, tooltip-text', async () => {
    render(
      <IressTooltip data-testid="tt" tooltipText="Help">
        <button>Hover me</button>
      </IressTooltip>,
    );
    expect(screen.getByTestId('tt__activator')).toBeInTheDocument();

    await userEvent.hover(screen.getByText('Hover me'));
    await waitFor(() => {
      expect(screen.getByTestId('tt__tooltip-text')).toBeInTheDocument();
    });
  });
});

// -- Documented gotchas ------------------------------------------------------

describe('Documented gotchas', () => {
  it('Radio readOnly: radio role is removed', () => {
    render(
      <IressRadio value="a" name="r" defaultChecked readOnly>
        Option A
      </IressRadio>,
    );
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('Radio readOnly unchecked: renders nothing', () => {
    const { container } = render(
      <IressRadio value="a" name="r" readOnly>
        Option A
      </IressRadio>,
    );
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
    expect(screen.queryByText('Option A')).not.toBeInTheDocument();
    expect(container.querySelector('input')).not.toBeInTheDocument();
  });

  it('RadioGroup readOnly with no selection: renders empty', () => {
    render(
      <IressRadioGroup name="rg" data-testid="rg" readOnly>
        <IressRadio value="a">A</IressRadio>
        <IressRadio value="b">B</IressRadio>
      </IressRadioGroup>,
    );
    const group = screen.getByRole('radiogroup');
    expect(group.innerHTML).toBe('');
  });

  it('RadioGroup: within() scopes queries for multiple groups', () => {
    render(
      <>
        <IressRadioGroup name="g1" data-testid="g1" aria-label="Group 1">
          <IressRadio value="y">Yes</IressRadio>
          <IressRadio value="n">No</IressRadio>
        </IressRadioGroup>
        <IressRadioGroup name="g2" data-testid="g2" aria-label="Group 2">
          <IressRadio value="y">Yes</IressRadio>
          <IressRadio value="n">No</IressRadio>
        </IressRadioGroup>
      </>,
    );
    const g1 = screen.getByRole('radiogroup', { name: 'Group 1' });
    const g1Yes = within(g1).getByRole('radio', { name: 'Yes' });
    expect(g1Yes).toBeInTheDocument();

    const g2 = screen.getByRole('radiogroup', { name: 'Group 2' });
    const g2Yes = within(g2).getByRole('radio', { name: 'Yes' });
    expect(g2Yes).toBeInTheDocument();

    expect(g1Yes).not.toBe(g2Yes);
  });

  it('Checkbox readOnly: checkbox role is removed', () => {
    render(
      <IressCheckbox value="a" defaultChecked readOnly>
        Accept
      </IressCheckbox>,
    );
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it('Checkbox readOnly unchecked: renders nothing', () => {
    render(
      <IressCheckbox value="a" readOnly>
        Accept
      </IressCheckbox>,
    );
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(screen.queryByText('Accept')).not.toBeInTheDocument();
  });

  it('CheckboxGroup readOnly with no selection: renders empty', () => {
    render(
      <IressCheckboxGroup name="cg" data-testid="cg" readOnly>
        <IressCheckbox value="a">A</IressCheckbox>
      </IressCheckboxGroup>,
    );
    const group = screen.getByRole('group');
    expect(group.innerHTML).toBe('');
  });

  it('Input readOnly: textbox role is removed', () => {
    render(<IressInput defaultValue="Hello" readOnly />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('Slider readOnly: slider role is removed', () => {
    render(
      <>
        <IressLabel htmlFor="s">Vol</IressLabel>
        <IressSlider id="s" data-testid="sl" name="s" readOnly value={5} />
      </>,
    );
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('Modal: not in DOM until show=true', () => {
    render(
      <IressModalProvider>
        <IressModal id="m" data-testid="m" heading="Title">
          Body
        </IressModal>
      </IressModalProvider>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Body')).not.toBeInTheDocument();
  });

  it('Modal: appears with findByRole when shown', async () => {
    render(
      <IressModalProvider>
        <IressModal id="m" data-testid="m" heading="Title" show>
          Body
        </IressModal>
      </IressModalProvider>,
    );
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('Expander: aria-expanded tracks open state', async () => {
    render(
      <IressExpander data-testid="ex" activator="Toggle">
        Content
      </IressExpander>,
    );
    const trigger = screen.getByRole('button', { name: 'Toggle' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('Toggle: toBeChecked works with switch role', async () => {
    render(<IressToggle>Dark mode</IressToggle>);
    const toggle = screen.getByRole('switch', { name: 'Dark mode' });
    expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it('Field: hint and error testids are conditional', () => {
    render(
      <IressField data-testid="f" label="Name" htmlFor="n">
        <IressInput id="n" />
      </IressField>,
    );
    expect(screen.queryByTestId('f__hint')).not.toBeInTheDocument();
    expect(screen.queryByTestId('f__error')).not.toBeInTheDocument();
  });
});
