import {
  IressIcon,
  IressMenu,
  IressMenuItem,
  IressNavbar,
  IressSlideout,
  IressTooltip,
} from '@/main';
import { useRef, useState } from 'react';

export const NavbarIconStrip = () => {
  const [secondary, setSecondary] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSecondaryMenuItem = () => !secondary && setSecondary(true);

  return (
    <div ref={containerRef} style={{ minHeight: '250px', height: '100%' }}>
      <IressNavbar
        style={
          {
            width: 'fit-content',
            '--iress-nav-padding-x': 0,
            position: 'relative',
            zIndex: 1050,
            height: '100%',
          } as never
        }
      >
        <nav aria-label="secondary navigation">
          <IressMenu role="nav">
            <IressTooltip align="right" tooltipText="Hubs">
              <IressMenuItem onClick={handleSecondaryMenuItem}>
                <IressIcon name="chart-network" size="2x" fixedWidth />
              </IressMenuItem>
            </IressTooltip>
            <IressTooltip align="right" tooltipText="My links">
              <IressMenuItem onClick={handleSecondaryMenuItem} selected>
                <IressIcon name="link" size="2x" fixedWidth />
              </IressMenuItem>
            </IressTooltip>
            <IressTooltip align="right" tooltipText="Portfolios">
              <IressMenuItem onClick={handleSecondaryMenuItem}>
                <IressIcon name="coins" size="2x" fixedWidth />
              </IressMenuItem>
            </IressTooltip>
            <IressTooltip align="right" tooltipText="Research">
              <IressMenuItem onClick={handleSecondaryMenuItem}>
                <IressIcon name="binoculars" size="2x" fixedWidth />
              </IressMenuItem>
            </IressTooltip>
            <IressTooltip align="right" tooltipText="Admin">
              <IressMenuItem onClick={handleSecondaryMenuItem}>
                <IressIcon name="cogs" size="2x" fixedWidth />
              </IressMenuItem>
            </IressTooltip>
          </IressMenu>
        </nav>
      </IressNavbar>
      <IressSlideout
        style={
          {
            '--iress-position': 'absolute',
            '--iress-initial-offset': '4.5rem',
            zIndex: '1',
          } as never
        }
        position="left"
        container={containerRef}
        show={secondary}
        onShowChange={(show, reason) => {
          if (reason !== 'outside-press') {
            setSecondary(show);
          }
        }}
      >
        <nav aria-label="tertiary navigation">
          <IressMenu role="nav">
            <IressMenuItem href="#">Link 1</IressMenuItem>
            <IressMenuItem href="#">Link 2</IressMenuItem>
            <IressMenuItem href="#">Link 3</IressMenuItem>
            <IressMenuItem href="#">Link 4</IressMenuItem>
            <IressMenuItem href="#">Link 5</IressMenuItem>
            <IressMenuItem href="#">Link 6</IressMenuItem>
          </IressMenu>
        </nav>
      </IressSlideout>
    </div>
  );
};
