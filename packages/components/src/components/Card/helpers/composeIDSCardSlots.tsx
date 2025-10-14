import {
  CardSlotClass,
  type CardCssSlotModule,
  type IressCardSlotsProps,
} from '../Card.types';
import { propagateTestid } from '@helpers/utility/propagateTestid';

export function composeIDSCardSlots(
  {
    children,
    'data-testid': testId,
    footer,
    heading,
    media,
    prepend,
    topRight,
  }: IressCardSlotsProps = {},
  styles: CardCssSlotModule = {},
): React.ReactNode {
  const headerElement =
    typeof heading === 'string' ? <h2>{heading}</h2> : heading;
  const cssClasses = { ...CardSlotClass, ...styles };

  const slots: [React.ReactNode, string, keyof typeof cssClasses][] = [
    [prepend, 'prepend', 'Prepend'],
    [topRight, 'topRight', 'TopRight'],
    [media, 'media', 'Media'],
    [headerElement, 'heading', 'Heading'],
    [children, 'body', 'Children'],
    [footer, 'footer', 'Footer'],
  ];

  const hasSlots = slots.some(([slot, name]) => name !== 'body' && slot);

  if (!hasSlots) return children;

  return slots
    .filter(([slot]) => !!slot)
    .map(([slot, slotName, slotClass]) => (
      <div
        key={slotName}
        className={cssClasses[slotClass]}
        data-testid={propagateTestid(testId, slotName)}
      >
        {slot}
      </div>
    ));
}
