import {
  IressIcon,
  IressMenu,
  IressMenuDivider,
  IressMenuHeading,
  IressMenuItem,
} from '@/main';

export function MenuComplex() {
  return (
    <IressMenu maxWidth="3/12">
      <IressMenuHeading prepend={<IressIcon name="sentiment_excited" />}>
        Heading with prepend
      </IressMenuHeading>
      <IressMenuItem
        value="3"
        divider
        selected
        prepend={<IressIcon name="flag" />}
        append={<IressIcon name="chevron-right" />}
      >
        Button with append and prepend
      </IressMenuItem>
      <IressMenuHeading
        element="h3"
        append={<IressIcon name="sentiment_excited" />}
        prepend={<IressIcon name="sentiment_excited" />}
      >
        Heading with append and prepend
      </IressMenuHeading>
      <IressMenuItem
        value="4"
        append={<IressIcon name="chevron-right" />}
        href="https://iress.com"
      >
        Link with append
      </IressMenuItem>
      <IressMenuDivider />
      <IressMenuItem value="6" append={<IressIcon name="chevron-right" />}>
        Button with append
      </IressMenuItem>
    </IressMenu>
  );
}
