import {
  BREAKPOINTS,
  IressBadge,
  IressButton,
  IressCombobox,
  IressContainer,
  IressField,
  IressFieldGroup,
  IressHide,
  IressIcon,
  IressInline,
  IressInput,
  IressMenu,
  IressMenuItem,
  IressNavbar,
  IressNavbarProps,
  IressPanel,
  IressPopover,
  IressSelect,
  IressStack,
  IressText,
} from '@/main';
import { ReactElement } from 'react';

const logoSrc = 'assets/ids-logo.png';

const ButtonExample = ({
  logo = <img src={logoSrc} alt="Iress Design System logo" />,
}: Pick<IressNavbarProps, 'logo'>) => (
  <IressNavbar
    logo={logo}
    horizontalAlign="between"
    nav={
      <IressInline gutter="md">
        <IressButton mode="primary">Primary</IressButton>
        <IressBadge
          pill
          mode="danger"
          host={<IressButton>Secondary</IressButton>}
        >
          6
        </IressBadge>
        <IressBadge
          pill
          mode="background-default"
          host={<IressButton>Secondary</IressButton>}
        >
          6
        </IressBadge>
        <IressButton mode="tertiary">Tertiary</IressButton>
        <IressButton mode="link">Link button</IressButton>
        <IressPopover
          type="listbox"
          align="bottom-start"
          activator={
            <IressButton
              id="btn"
              append={<IressIcon name="chevron-down" size="sm" />}
            >
              Popover
            </IressButton>
          }
        >
          <IressMenu role="nav">
            <IressMenuItem>Item 1</IressMenuItem>
            <IressMenuItem>Item 2</IressMenuItem>
            <IressMenuItem>Item 3</IressMenuItem>
          </IressMenu>
        </IressPopover>
      </IressInline>
    }
  >
    <IressText>Buttons</IressText>
  </IressNavbar>
);

const AlignExample = ({
  logo = <img src={logoSrc} alt="Iress Design System logo" />,
  horizontalAlign,
}: Pick<IressNavbarProps, 'logo' | 'horizontalAlign'>) => (
  <IressNavbar
    logo={logo}
    horizontalAlign={horizontalAlign}
    nav={
      <IressMenu layout="inline" role="nav" aria-label="Navigation">
        <IressMenuItem href="#">Menu item 1</IressMenuItem>
        <IressMenuItem href="#" selected>
          Menu item 2
        </IressMenuItem>
        <IressMenuItem href="#">Menu item 3</IressMenuItem>
      </IressMenu>
    }
  >
    <IressText>
      <strong>Alignment: {horizontalAlign}</strong>
    </IressText>
  </IressNavbar>
);

const NavbarResponsive = (): ReactElement => {
  return (
    <>
      {BREAKPOINTS.map((breakpoint) => (
        <IressStack gutter="xs" key={`navbar-bp-${breakpoint}`}>
          <h3 className="iress-pt--md">Responsive navbar ({breakpoint})</h3>
          <IressNavbar
            breakpoint={breakpoint}
            key={`bp-navbar-${breakpoint}`}
            nav={
              <IressMenu layout="inline" role="nav">
                <IressMenuItem href="#">Menu item 1</IressMenuItem>
                <IressMenuItem href="#" selected>
                  Menu item 2
                </IressMenuItem>
                <IressMenuItem href="">Menu item 3</IressMenuItem>
              </IressMenu>
            }
          ></IressNavbar>
        </IressStack>
      ))}
    </>
  );
};

export const NavbarSink = () => {
  return (
    <IressStack gutter="md">
      <AlignExample horizontalAlign="between" />
      <AlignExample horizontalAlign="start" />
      <AlignExample horizontalAlign="end" />

      <IressNavbar
        logo={<img src={logoSrc} alt="Iress Design System logo" />}
        breakpoint="sm"
        horizontalAlign="between"
        nav={
          <IressMenu layout="inline" role="nav">
            <IressMenuItem href="#">Menu item 1</IressMenuItem>
            <IressMenuItem href="#" selected>
              Menu item 2
            </IressMenuItem>
            <IressMenuItem href="#">Menu item 3</IressMenuItem>
          </IressMenu>
        }
        navLabel="Sm main navigation"
      >
        <IressText>
          <strong>Responsive (sm)</strong>
        </IressText>
      </IressNavbar>

      <IressNavbar
        logo={<img src={logoSrc} alt="Iress Design System logo" />}
        nav={
          <IressMenu layout="inline" role="nav">
            <IressMenuItem href="Bro">
              <IressText>
                {' '}
                <a href="/">Menu link 1</a>
              </IressText>
            </IressMenuItem>
            <IressMenuItem href="Bro" selected>
              <IressText>
                {' '}
                <a href="/">Menu link 2</a>
              </IressText>
            </IressMenuItem>
            <IressMenuItem href="Bro">
              <IressText>
                {' '}
                <a href="/">Menu link 3</a>
              </IressText>
            </IressMenuItem>
          </IressMenu>
        }
      >
        <IressText>Custom route links</IressText>
      </IressNavbar>

      <IressNavbar
        logoSrc="https://www.iress.com/madeupurl.png"
        logoAltText="Home"
        homeUrl="/"
      >
        <IressText>Bad logo URL</IressText>
      </IressNavbar>

      <IressNavbar
        horizontalAlign="start"
        logo={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.48 100.01">
            <defs></defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <rect
                  style={{ fill: '#a1c46' }}
                  width="107.48"
                  height="100.01"
                  rx="8.31"
                />
                <path
                  style={{ fill: '#fff' }}
                  className="cls-2"
                  d="M11.69,89.46V32.72H27.47a22.19,22.19,0,0,1,12.11,3.37,22.61,22.61,0,0,1,8.33,9.58,32.14,32.14,0,0,1,3,14.13v2.61A32.24,32.24,0,0,1,48,76.48a22.09,22.09,0,0,1-20.38,13ZM22.26,42.19V80.07h5.11q6.19,0,9.48-4.48t3.34-12.83v-3q0-8.65-3.24-13.11t-9.48-4.46Z"
                />
                <path
                  style={{ fill: '#fff' }}
                  d="M85.19,74.57a6.25,6.25,0,0,0-2.12-5.08c-1.41-1.19-3.94-2.43-7.61-3.75a51.47,51.47,0,0,1-8.7-3.87Q58,56.65,58,47.8a14.69,14.69,0,0,1,2.35-8.21A15.57,15.57,0,0,1,67.09,34a23.25,23.25,0,0,1,9.85-2,21.17,21.17,0,0,1,9.8,2.2,16.23,16.23,0,0,1,6.68,6.21,17.62,17.62,0,0,1,2.37,9.12H85.22A8.1,8.1,0,0,0,83,43.41a8.57,8.57,0,0,0-6.23-2.16,9.06,9.06,0,0,0-6,1.81,6,6,0,0,0-2.15,4.78,5.58,5.58,0,0,0,2.52,4.63A27,27,0,0,0,78.53,56q9,3,13.14,7.45a15.63,15.63,0,0,1,4.12,11.06q0,7.37-5,11.56T77.19,90.24a24,24,0,0,1-10.78-2.4A17.52,17.52,0,0,1,59,81.28a18.18,18.18,0,0,1-2.55-9.67H67Q67,81,77.19,81a9.17,9.17,0,0,0,5.88-1.69A5.74,5.74,0,0,0,85.19,74.57Z"
                />
                <polygon
                  style={{ fill: '#f5a8' }}
                  points="95.77 21.5 11.71 21.5 11.69 21.48 11.69 10.96 11.71 10.93 95.77 10.93 95.79 10.96 95.79 21.48 95.77 21.5"
                />
              </g>
            </g>
          </svg>
        }
      >
        <IressText>SVG logo</IressText>
      </IressNavbar>

      <div>
        <IressNavbar
          nav={
            <IressHide hiddenOn={{ xs: true, md: false }}>
              <IressMenu layout="inline" role="nav">
                <IressMenuItem href="#">Menu item 1</IressMenuItem>
                <IressMenuItem href="#" selected>
                  Menu item 2
                </IressMenuItem>
                <IressMenuItem href="">Menu item 3</IressMenuItem>
              </IressMenu>
            </IressHide>
          }
        >
          <IressInline gutter="md" verticalAlign="middle">
            <IressHide hiddenOn={{ md: true }}>
              <IressButton
                id="show-slideout-nav"
                mode={IressButton.Mode.Tertiary}
              >
                <IressIcon name="bars" size="2x" />
              </IressButton>
            </IressHide>
            <img src={logoSrc} alt="Iress Design System logo" />
            <IressText>
              <h1>Custom navbar</h1>
            </IressText>
          </IressInline>
        </IressNavbar>
        <IressHide hiddenOn={{ xs: true, md: false }}>
          <nav aria-label="secondary-nav">
            <IressPanel background="alt" padding="none">
              <IressContainer fluid>
                <IressMenu layout="inline" role="nav">
                  <IressMenuItem href="#" selected>
                    Menu item 1
                  </IressMenuItem>
                  <IressMenuItem href="#">Menu item 2</IressMenuItem>
                  <IressMenuItem href="#">Menu item 3</IressMenuItem>
                </IressMenu>
              </IressContainer>
            </IressPanel>
          </nav>
        </IressHide>
      </div>

      <ButtonExample />
      <ButtonExample />

      <IressNavbar
        logo={<img src={logoSrc} alt="Iress Design System logo" />}
        horizontalAlign="between"
        nav={
          <IressInline gutter="md" horizontalAlign="center">
            <IressField label="Select" hiddenLabel htmlFor="aname-select">
              <IressSelect placeholder="select" name="aname" id="aname-select">
                <option>One</option>
                <option>Two</option>
              </IressSelect>
            </IressField>
            <IressField label="Input" hiddenLabel>
              <IressInput placeholder="Text input" name="aname"></IressInput>
            </IressField>
            <IressField label="Comobobox" hiddenLabel>
              <IressCombobox
                placeholder="Combobox"
                name="aname"
                append={<span>US</span>}
                prepend={<IressIcon name="dollar-sign" />}
                options={[]}
              />
            </IressField>
            <IressFieldGroup label="Joined search input" hiddenLabel join>
              <IressField label="Name" hiddenLabel htmlFor="aname-1">
                <IressInput
                  name="aname"
                  id="aname-1"
                  prepend={<IressIcon name="search" />}
                ></IressInput>
              </IressField>
              <IressButton>Button</IressButton>
            </IressFieldGroup>
            <IressFieldGroup
              label="Joined search input with settings"
              hiddenLabel
              join
            >
              <IressField label="Name" hiddenLabel htmlFor="aname-2">
                <IressInput
                  watermark
                  name="aname"
                  id="aname-2"
                  prepend={<IressIcon name="search" />}
                ></IressInput>
              </IressField>
              <IressPopover
                align="bottom-end"
                activator={
                  <IressButton
                    append={<IressIcon name="chevron-down" size="sm" />}
                  >
                    <IressIcon
                      name="users"
                      screenreaderText="Users"
                      size={IressIcon.Size.Lg}
                    />
                  </IressButton>
                }
              >
                <IressMenu>
                  <IressMenuItem>Item 1</IressMenuItem>
                  <IressMenuItem>Item 2</IressMenuItem>
                  <IressMenuItem>Item 3</IressMenuItem>
                  <IressMenuItem>Item 4</IressMenuItem>
                </IressMenu>
              </IressPopover>
            </IressFieldGroup>
          </IressInline>
        }
      >
        <IressText>Form elements</IressText>
      </IressNavbar>

      <IressNavbar
        logo={<img src={logoSrc} alt="Iress Design System logo" />}
        horizontalAlign="between"
        nav={
          <IressInline gutter="md" verticalAlign="middle">
            <IressText>Normal text</IressText>
            <IressText variant="h2">Heading 2</IressText>
            <IressText variant="display">Display</IressText>
            <IressText>
              <a href="/link">Link</a>
            </IressText>
            <IressIcon name="bacon" size="2x" />
          </IressInline>
        }
      >
        <IressText>Text elements</IressText>
      </IressNavbar>
      <div>
        <IressText element="h2">Responsive navbars</IressText>
        <NavbarResponsive />
      </div>
    </IressStack>
  );
};
