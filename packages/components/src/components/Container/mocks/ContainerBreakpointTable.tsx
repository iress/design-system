import { BREAKPOINT_DETAILS, BREAKPOINTS, IressTable } from '@/main';

export const ContainerBreakpointTable = () => (
  <IressTable
    caption="Container breakpoints"
    rows={BREAKPOINTS.map((breakpoint) => ({
      breakpoint,
      screenWidths: BREAKPOINT_DETAILS[breakpoint].screenWidthRange,
      maxWidth: BREAKPOINT_DETAILS[breakpoint].containerMaxWidth,
    }))}
  />
);
