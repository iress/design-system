import { type IressLabelProps } from './Label.types';
import { LabelBase } from './LabelBase/LabelBase';

export const IressLabel = (props: IressLabelProps) => (
  <LabelBase {...props} as={props.htmlFor ? 'label' : 'strong'} />
);
