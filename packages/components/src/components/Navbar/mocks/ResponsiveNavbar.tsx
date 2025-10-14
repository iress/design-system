import {
  IressButton,
  IressHide,
  IressIcon,
  IressInline,
  IressMenu,
  IressMenuItem,
  IressNavbar,
  IressSlideout,
  IressSlideoutProvider,
  IressText,
  useSlideout,
} from '@/main';
import { useRef } from 'react';

const Navbar = () => {
  const { showSlideout } = useSlideout();
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} style={{ minHeight: '200px' }}>
      <IressNavbar
        nav={
          <IressHide hiddenOn={{ xs: true, md: false }}>
            <IressMenu layout="inline" role="nav">
              <IressMenuItem href="#">Link 1</IressMenuItem>
              <IressMenuItem href="#">Link 2</IressMenuItem>
              <IressMenuItem href="#">Link 3</IressMenuItem>
            </IressMenu>
          </IressHide>
        }
      >
        <IressInline gutter="md" verticalAlign="middle">
          <IressHide hiddenOn={{ md: true }}>
            <IressButton
              mode="tertiary"
              onClick={() => showSlideout('nav-slideout')}
            >
              <IressIcon name="bars" size="2x" />
            </IressButton>
          </IressHide>
          <img src="assets/ids-logo.png" alt="Iress logo" />
          <IressText>
            <h1>Custom navbar</h1>
          </IressText>
        </IressInline>
      </IressNavbar>
      <IressSlideout
        id="nav-slideout"
        style={{ '--iress-position': 'absolute' } as never}
        position="left"
        container={containerRef}
      >
        <nav aria-label="tertiary navigation">
          <IressMenu role="nav">
            <IressMenuItem href="#">Link 1</IressMenuItem>
            <IressMenuItem href="#">Link 2</IressMenuItem>
            <IressMenuItem href="#">Link 3</IressMenuItem>
          </IressMenu>
        </nav>
      </IressSlideout>
    </div>
  );
};

export const ResponsiveNavbar = () => (
  <IressSlideoutProvider>
    <Navbar />
  </IressSlideoutProvider>
);
