import { BREAKPOINT_DETAILS, BREAKPOINTS, IressTable } from '@/main';

export const HideBreakpointTable = () => (
  <IressTable
    caption="Hide breakpoints"
    rows={BREAKPOINTS.map((breakpoint) => ({
      breakpoint: <code>{breakpoint}</code>,
      screenWidths: (
        <span>
          Above {BREAKPOINT_DETAILS[breakpoint].minScreenWidth} (inclusive)
        </span>
      ),
    }))}
  />
);
