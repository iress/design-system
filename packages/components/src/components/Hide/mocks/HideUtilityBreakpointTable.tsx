import { BREAKPOINT_DETAILS, BREAKPOINTS, IressTable } from '@/main';

export const HideUtilityBreakpointTable = () => (
  <IressTable
    caption="Hide breakpoints"
    rows={BREAKPOINTS.map((breakpoint) => ({
      totallyHidden: <code>iress-hidden--{breakpoint}</code>,
      visuallyHidden: <code>iress-sr-only--{breakpoint}</code>,
      screenWidths: BREAKPOINT_DETAILS[breakpoint].screenWidthRange,
    }))}
  />
);
