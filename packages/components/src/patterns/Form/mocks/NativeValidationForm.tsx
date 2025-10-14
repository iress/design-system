import {
  IressInput,
  IressButton,
  IressField,
  IressAlert,
  type InputBaseElement,
} from '@/main';
import { useState } from 'react';

export const NativeValidationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({
    name: false,
    email: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasErrors = Object.values(errors).some((error) => !!error);

  const handleInputChange = (e: React.ChangeEvent<InputBaseElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({
      ...errors,
      [e.target.name]: !e.currentTarget.reportValidity(),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitted(true);

    if (!form.checkValidity()) {
      const fieldData = Object.fromEntries(new FormData(form).entries());
      const fieldNames = Object.keys(fieldData);

      setErrors(
        fieldNames.reduce(
          (newErrors, fieldName) => {
            newErrors[fieldName] = !form
              .querySelector<HTMLInputElement>(`[name=${fieldName}]`)
              ?.checkValidity();
            return newErrors;
          },
          {} as Record<string, boolean>,
        ),
      );
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {isSubmitted && hasErrors && (
        <IressAlert status="danger">
          There's a problem with your submission.
        </IressAlert>
      )}
      <IressField
        label="Name"
        error={errors.name && 'Name is required'}
        required
      >
        <IressInput name="name" onChange={handleInputChange} required />
      </IressField>
      <IressField
        label="Email address"
        error={errors.email && 'Email is required'}
        required
      >
        <IressInput name="email" onChange={handleInputChange} required />
      </IressField>
      <IressButton mode="primary" type="submit">
        Sign up
      </IressButton>
    </form>
  );
};
