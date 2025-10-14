import { ReactNode } from 'react';
import { LabelBase, LabelBaseProps } from './LabelBase/LabelBase';

type LabelElement<THtmlFor extends string | undefined = undefined> =
  THtmlFor extends string ? 'label' : 'strong';

export type IressLabelProps<THtmlFor extends string | undefined = undefined> =
  Omit<LabelBaseProps<LabelElement<THtmlFor>>, 'element'> & {
    /**
     * Content to be displayed in the label.
     * This can also include error messages to make sure it makes sense in this context.
     */
    children: ReactNode;

    /**
     * Used to connect it to the input element, it should be the input's id.
     * If provided, the label will be rendered as a `<label>` element, otherwise it will be rendered as a `<strong>` element.
     *
     * [Learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for)
     */
    htmlFor?: THtmlFor;
  };

export const IressLabel = <THtmlFor extends string | undefined = undefined>(
  props: IressLabelProps<THtmlFor>,
) => <LabelBase {...props} element={props.htmlFor ? 'label' : 'strong'} />;
