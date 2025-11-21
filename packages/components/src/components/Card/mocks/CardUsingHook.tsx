import {
  CardSlotClass,
  composeIDSCard,
  composeIDSCardSlots,
  type IressCardProps,
  IressStack,
  IressText,
} from '@/main';
import styles from '@iress-storybook/styles.module.scss';

export const CardUsingHook = (args: IressCardProps) => {
  const cardProps = composeIDSCard(args);

  const cardChildren = composeIDSCardSlots(args, {
    ...Object.fromEntries(
      Object.entries(CardSlotClass).map(([key, value]) => [
        key,
        `${value} ${styles.addBorder}`,
      ]),
    ),
  });

  return (
    <IressStack gutter="md">
      <IressText element="h2">
        Article mark-up, with custom classes for border
      </IressText>
      <article {...cardProps}>{cardChildren}</article>
    </IressStack>
  );
};
