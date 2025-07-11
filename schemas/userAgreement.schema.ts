import * as yup from 'yup';
import type { TGender, TPlan } from '@/app/(forms)/interface/formFields';

export const userAgreementSchema = yup.object({
  email: yup.string().email('Please enter a valid email address.').required('Email is required.'),

  password: yup.string().min(6, 'Password must be at least 6 characters.').required('Password is required.'),

  acceptedTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions.'),

  plan: yup
    .mixed<TPlan | ''>()
    .oneOf(['free', 'pro', 'enterprise'], 'Please select a valid plan.')
    .required('Plan is required.'),

  gender: yup
    .mixed<TGender | ''>()
    .oneOf(['male', 'female'], 'Please select your gender.')
    .required('Gender is required.')
});
