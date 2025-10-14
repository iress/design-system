import { type ResponsiveSizing } from '@/interfaces';
import { type ReactNode } from 'react';

export interface IressHideProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to hide.
   */
  children: ReactNode;

  /**
   * Content will be hidden on any screen sizes that are set to true.
   */
  hiddenOn: ResponsiveSizing<boolean>;

  /**
   * If true, the content will not be visible, but will be available to screen readers
   */
  visuallyHidden?: boolean;
}

export enum HideTypes {
  VisuallyHidden = 'VisuallyHidden',
  TotallyHidden = 'TotallyHidden',
}

export enum HideCssClass {
  VisuallyHidden = 'iress-sr-only',
  TotallyHidden = 'iress-hidden',
}
