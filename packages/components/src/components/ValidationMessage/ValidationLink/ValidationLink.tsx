import { isValidFormInputElement } from '@helpers/form/isValidFormInputElement';
import { ValidationBase } from '../ValidationBase/ValidationBase';
import { type IressValidationLinkProps } from './ValidationLink.types';

export const IressValidationLink = ({
  linkToTarget,
  ...props
}: IressValidationLinkProps) => (
  <ValidationBase
    {...props}
    as="a"
    href={`#${linkToTarget}`}
    onClick={(e) => {
      const target = document.getElementById(linkToTarget);

      if (!target) {
        return;
      }

      e.preventDefault();

      if (isValidFormInputElement(target)) {
        target.focus();
      } else {
        target.setAttribute('tabIndex', '-1');
        target.focus();
        target.removeAttribute('tabIndex');
      }
    }}
  />
);
