import { LabelBase } from '@/components/Label/LabelBase/LabelBase';
import { type FieldLegendProps } from '../Field.types';

export const FieldLegend = (props: FieldLegendProps) => (
  <LabelBase {...props} as="legend" />
);
