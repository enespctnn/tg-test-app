import type { IFormFields } from '@/app/(forms)/interface/formFields';

export function handleCustomFormSubmit(
  e: React.FormEvent<HTMLFormElement>,
  formData: IFormFields,
  validateFields: (data: IFormFields) => boolean
) {
  e.preventDefault();
  const isFormValid = validateFields(formData);

  if (!isFormValid) return;
}

export function validateField<T extends IFormFields>(field: keyof T, value: T[typeof field]): string {
  if (field === 'email') {
    if (!value) return 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(value as IFormFields['email'])) return 'Email is not valid!';
    return '';
  } else if (field === 'password') {
    if (!value) return 'Password is required.';
    else if ((value as IFormFields['password']).length < 6) return 'Password must be at least 6 characters.';
    return '';
  } else if (field === 'plan') {
    if (!value) return 'Please select a plan.';
    return '';
  } else if (field === 'gender') {
    if (!value) return 'Please choose your gender.';
    return '';
  } else if (field === 'acceptedTerms') {
    if (!value) return 'You must accept the terms to apply.';
    return '';
  }
  return '';
}
