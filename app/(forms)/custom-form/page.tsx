'use client';

import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { FormFieldEnum } from '@/app/(forms)/custom-form/enums/FormField.enum';
import { handleCustomFormSubmit, validateField } from '@/app/(forms)/custom-form/utils/customForm.util';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { IFormFields } from '@/app/(forms)/interface/formFields';

function FormDemo() {
  const [formData, setFormData] = React.useState<IFormFields>({
    email: '',
    password: '',
    plan: '',
    gender: null,
    acceptedTerms: false
  });

  const [errors, setErrors] = React.useState<Record<keyof typeof formData, string>>(
    {} as Record<keyof typeof formData, string>
  );

  const [showPassword, setShowPassword] = React.useState(false);

  const validateFields = React.useCallback((data: IFormFields) => {
    const newErrors: typeof errors = {} as typeof errors;

    Object.keys(data).forEach((field) => {
      const errorMessage = validateField(field as keyof IFormFields, data[field as keyof IFormFields]);

      if (errorMessage !== '') newErrors[field as keyof IFormFields] = errorMessage;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const checkFieldValidation = React.useCallback(
    (field: keyof IFormFields) => {
      setErrors((prevState) => ({ ...prevState, [field]: validateField(field, formData[field]) }));
    },
    [formData]
  );

  const onChange = React.useCallback(<T extends IFormFields>(field: keyof T, value: T[typeof field]) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
    const errorMessage = validateField(field, value);

    setErrors((prevState) => ({ ...prevState, [field]: errorMessage }));
  }, []);

  return (
    <form
      className="min-w-xs max-w-lg flex flex-col gap-2"
      onSubmit={(e) => handleCustomFormSubmit(e, formData, validateFields)}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor={FormFieldEnum.EMAIL}>Email</Label>
        <Input
          id={FormFieldEnum.EMAIL}
          name={FormFieldEnum.EMAIL}
          onBlur={() => checkFieldValidation('email')}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="you@example.com"
          type="text"
          value={formData.email}
        />
        <p
          className={`text-sm text-red-500 min-h-5 transition ${errors.email ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          {errors.email}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={FormFieldEnum.PASSWORD}>Password</Label>
        <div className="flex gap-1 items-center">
          <Input
            id={FormFieldEnum.PASSWORD}
            name={FormFieldEnum.PASSWORD}
            onBlur={() => checkFieldValidation('password')}
            onChange={(e) => onChange('password', e.target.value)}
            placeholder={showPassword ? 'Strongest Password' : '******'}
            type={!showPassword ? 'password' : 'text'}
            value={formData.password}
          />
          <div className="flex flex-col">
            <Label
              className="cursor-pointer"
              htmlFor={FormFieldEnum.PASSWORD}
              onClick={() => setShowPassword((prevState) => !prevState)}
              title={!showPassword ? 'Show Password' : 'Hide Password'}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </Label>
          </div>
        </div>
        <p
          className={`text-sm text-red-500 min-h-5 transition ${errors.password ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          {errors.password}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={FormFieldEnum.PLAN}>Choose a plan</Label>
        <Select
          name={FormFieldEnum.PLAN}
          onOpenChange={() => checkFieldValidation('plan')}
          onValueChange={(val: IFormFields['plan']) => setFormData((prevState) => ({ ...prevState, plan: val }))}
          value={formData.plan}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select a plan" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>

        <p
          className={`text-sm text-red-500 min-h-5 transition ${errors.plan ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          {errors.plan}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={FormFieldEnum.GENDER}>Gender</Label>
        <RadioGroup
          className="flex gap-4 mt-2"
          id={FormFieldEnum.GENDER}
          name={FormFieldEnum.GENDER}
          onValueChange={(gender: NonNullable<IFormFields['gender']>) => onChange('gender', gender)}
          value={formData.gender}
        >
          <div className="flex items-center">
            <RadioGroupItem
              id="male"
              value="male"
            />
            <Label
              className="pl-2 cursor-pointer"
              htmlFor="male"
            >
              Male
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem
              id="female"
              value="female"
            />
            <Label
              className="pl-2 cursor-pointer"
              htmlFor="female"
            >
              Female
            </Label>
          </div>
        </RadioGroup>
        <p
          className={`text-sm text-red-500 min-h-5 transition ${errors.gender ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          {errors.gender}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label
            className="cursor-pointer"
            htmlFor={FormFieldEnum.ACCEPTED_TERMS}
          >
            Accept Terms
          </Label>
          <Switch
            checked={formData.acceptedTerms}
            className="cursor-pointer"
            id={FormFieldEnum.ACCEPTED_TERMS}
            name={FormFieldEnum.ACCEPTED_TERMS}
            onCheckedChange={(val) => onChange('acceptedTerms', val)}
          />
        </div>
        <p
          className={`text-sm text-red-500 min-h-5 transition ${errors.acceptedTerms ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          {errors.acceptedTerms}
        </p>
      </div>

      <Button
        className="w-full"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default FormDemo;
