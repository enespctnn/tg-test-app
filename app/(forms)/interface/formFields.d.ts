type TFormField = 'email' | 'password' | 'plan' | 'gender' | 'acceptedTerms';
type TGender = 'male' | 'female';
type TPlan = 'pro' | 'enterprise' | 'free';

export interface IFormFields extends Record<Exclude<TFormField, 'acceptedTerms' | 'gender' | 'plan'>, string> {
  acceptedTerms: boolean;
  plan: TPlan | '';
  gender: TGender | null;
}
