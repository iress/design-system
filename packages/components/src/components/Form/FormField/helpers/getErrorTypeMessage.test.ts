import { getErrorTypeMessage } from './getErrorTypeMessage';
import { FormFieldErrorMessages } from '../FormField.types';

describe('getErrorTypeMessage', () => {
  it('returns the default message if nothing provided', () => {
    const message = getErrorTypeMessage();
    expect(message).toEqual(FormFieldErrorMessages.validate);
  });

  it('returns the message if provided', () => {
    const message = getErrorTypeMessage('message');
    expect(message).toEqual('message');
  });

  it('returns the default message for a type', () => {
    const message = getErrorTypeMessage('', 'required');
    expect(message).toEqual(FormFieldErrorMessages.required);
  });

  it('uses the attribute value in the message if applicable', () => {
    const message = getErrorTypeMessage('', 'minLength', {
      minLength: 2,
    });
    expect(message).toEqual(
      'Please lengthen this text to 2 characters or more',
    );
  });

  it('adds a prefix if provided', () => {
    const message = getErrorTypeMessage('', 'required', undefined, 'Name: ');
    expect(message).toEqual(`Name: ${FormFieldErrorMessages.required}`);
  });
});
