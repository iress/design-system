import { IressIcon, IressBadge, IressText } from '@/main';
import { IressMenuDivider } from '../MenuDivider/MenuDivider';
import { IressMenuHeading } from '../MenuHeading/MenuHeading';
import { IressMenuItem } from '../MenuItem/MenuItem';

export const MENU_CHILDREN_OPTIONS = {
  none: null,
  basic: [
    <IressMenuHeading key="1">Menu heading</IressMenuHeading>,
    <IressMenuItem key="2" value="2">
      Menu item (button)
    </IressMenuItem>,
    <IressMenuDivider key="3" />,
    <IressMenuItem key="4" href="https://iress.com">
      Menu item (link)
    </IressMenuItem>,
    <IressMenuItem selected key="5" value={5}>
      Menu item (selected)
    </IressMenuItem>,
  ],
  complex: [
    <IressMenuHeading key="1" prepend={<IressIcon name="smile" fixedWidth />}>
      Heading with prepend
    </IressMenuHeading>,
    <IressMenuItem
      key="3"
      value="3"
      divider
      selected
      prepend={<IressIcon name="flag" fixedWidth />}
      append={<IressIcon name="chevron-right" />}
    >
      Button with append and prepend
    </IressMenuItem>,
    <IressMenuHeading
      key="2"
      level="h3"
      append={<IressIcon name="smile" fixedWidth />}
      prepend={<IressIcon name="smile" fixedWidth />}
    >
      Heading with append and prepend
    </IressMenuHeading>,
    <IressMenuItem
      key="4"
      value="4"
      append={<IressIcon name="chevron-right" />}
      href="https://iress.com"
    >
      Link with append
    </IressMenuItem>,
    <IressMenuDivider key="5" />,
    <IressMenuItem
      key="6"
      value="6"
      append={<IressIcon name="chevron-right" />}
    >
      Button with append
    </IressMenuItem>,
    <IressMenuItem
      key="7"
      value="7"
      href="https://iress.com"
      append={<IressIcon name="chevron-right" />}
    >
      A link with a very long name that wraps based on the menu&apos;s{' '}
      <code>noWrap</code> prop
    </IressMenuItem>,
  ],
  navigation: [
    <IressMenuItem
      href="https://www.iress.com/software/financial-advice/"
      key="1"
    >
      Financial advice
    </IressMenuItem>,
    <IressMenuItem
      selected
      href="https://www.iress.com/software/trading-and-market-data/"
      key="2"
    >
      Trading and market data
    </IressMenuItem>,
    <IressMenuItem
      href="https://www.iress.com/software/investment-management/"
      key="3"
    >
      Investment management
    </IressMenuItem>,
    <IressMenuItem href="https://www.iress.com/software/mortgages/" key="4">
      Mortgages
    </IressMenuItem>,
    <IressMenuItem
      href="https://www.iress.com/software/life-and-pensions/"
      key="5"
    >
      Life and pensions
    </IressMenuItem>,
  ],
  headings: [
    <IressMenuHeading key="1" level="h4">
      Menu heading (h4)
    </IressMenuHeading>,
    <IressMenuItem key="2">Menu item 1</IressMenuItem>,
    <IressMenuHeading key="3" level="h5">
      Menu heading (h5)
    </IressMenuHeading>,
    <IressMenuItem key="4">Menu item 2</IressMenuItem>,
  ],
  dividers: [
    <IressMenuHeading key="1" level="h4" divider>
      Menu heading (h4)
    </IressMenuHeading>,
    <IressMenuItem key="1-1">Menu item 1</IressMenuItem>,
    <IressMenuItem key="1-2" divider>
      Menu item 2
    </IressMenuItem>,
    <IressMenuHeading key="2" level="h5">
      Menu heading (h5)
    </IressMenuHeading>,
    <IressMenuItem key="2-1" selected>
      Menu item 3
    </IressMenuItem>,
    <IressMenuItem key="2-2">Menu item 4</IressMenuItem>,
    <IressMenuDivider key="2-3" />,
    <IressMenuItem key="2-4">Menu item 5</IressMenuItem>,
  ],
  slots: [
    <IressMenuHeading prepend={<IressIcon name="cog" />} key={0}>
      Prepend slot
    </IressMenuHeading>,
    <IressMenuItem
      prepend={<IressIcon name="file-alt" />}
      onClick={() => alert('You clicked: New file')}
      key={1}
    >
      New file
    </IressMenuItem>,
    <IressMenuItem
      divider
      prepend={<IressIcon name="save" />}
      onClick={() => alert('You clicked: Save file as')}
      key={2}
    >
      Save file as
    </IressMenuItem>,
    <IressMenuHeading level="h3" append={<IressIcon name="link" />} key={3}>
      Append slot
    </IressMenuHeading>,
    <IressMenuItem
      href="https://www.iress.com"
      append={<IressIcon name="chevron-right" />}
      key={4}
    >
      Visit the Iress website
    </IressMenuItem>,
    <IressMenuItem
      href="https://google.com"
      append={<IressBadge mode={IressBadge.Mode.Warning}>8+</IressBadge>}
      key={5}
    >
      Visit Google
    </IressMenuItem>,
  ],
  extraInformation: [
    <IressMenuItem key={0}>
      <IressText>New task</IressText>
      <IressText element={IressText.Element.Small} mode={IressText.Mode.Muted}>
        Modified on: 01/01/2020 00:00am
      </IressText>
    </IressMenuItem>,
    <IressMenuItem key={1}>
      <IressText>Send prospect welcome pack</IressText>
      <IressText element={IressText.Element.Small} mode={IressText.Mode.Muted}>
        Modified on: 01/01/2020 01:30am
      </IressText>
    </IressMenuItem>,
    <IressMenuItem key={2}>
      <IressText>Book in Discovery meeting</IressText>
      <IressText element={IressText.Element.Small} mode={IressText.Mode.Muted}>
        Modified on: 01/01/2020 11:59am
      </IressText>
    </IressMenuItem>,
    <IressMenuItem key={3}>
      <IressText>Prospect proceeding</IressText>
      <IressText element={IressText.Element.Small} mode={IressText.Mode.Muted}>
        Modified on: 01/01/2020 04:00pm
      </IressText>
    </IressMenuItem>,
  ],
  selectable: [
    <IressMenuItem key={0} value={0}>
      New task
    </IressMenuItem>,
    <IressMenuItem key={1} value={1}>
      Send prospect welcome pack
    </IressMenuItem>,
    <IressMenuItem key={2} value={2}>
      Book in Discovery meeting
    </IressMenuItem>,
    <IressMenuItem key={3} value={3}>
      Prospect proceeding
    </IressMenuItem>,
  ],
};
