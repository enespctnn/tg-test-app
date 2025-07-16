'use client';

import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { IFormFields } from '@/app/(forms)/interface/formFields';

function Page() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormFields>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      plan: '',
      gender: null,
      acceptedTerms: false
    }
  });

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <form
      className="min-w-xs max-w-lg flex flex-col gap-2"
      onSubmit={handleSubmit(() => {})}
    >
      <div className="flex flex-col gap-2">
        <Controller<IFormFields, 'email'>
          control={control}
          name="email"
          render={({ field }) => (
            <>
              <Label htmlFor={field.name}>Email</Label>
              <Input
                {...field}
                id={field.name}
                placeholder="you@example.com"
              />
            </>
          )}
          rules={{
            required: 'Email is required.',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Email is not valid!' }
          }}
        />

        <p
          className={`text-sm text-red-500 min-h-5 transition ${errors.email ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          {errors.email?.message}
        </p>
      </div>

      <Controller<IFormFields, 'password'>
        control={control}
        name="password"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Password</Label>
            <div className="flex gap-1 items-center">
              <Input
                {...field}
                id={field.name}
                placeholder={showPassword ? 'Strongest Password' : '******'}
                type={showPassword ? 'text' : 'password'}
              />
              <div className="flex flex-col">
                <Label
                  className="cursor-pointer"
                  htmlFor={field.name}
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
              {errors.password?.message}
            </p>
          </div>
        )}
        rules={{
          required: 'Password is required.',
          minLength: { value: 6, message: 'Password must be at least 6 characters.' }
        }}
      />

      <div className="flex flex-col gap-2">
        <Controller<IFormFields, 'plan'>
          control={control}
          name="plan"
          render={({ field }) => (
            <>
              <Label htmlFor={field.name}>Choose a plan</Label>
              <Select
                {...field}
                onOpenChange={field.onBlur}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className="w-40"
                  id={field.name}
                >
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
          rules={{ required: 'Please select a plan.' }}
        />

        <p
          className={`text-sm text-red-500 min-h-5 transition ${errors.plan ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          {errors.plan?.message}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Controller<IFormFields, 'gender'>
          control={control}
          name="gender"
          render={({ field }) => (
            <>
              <Label id={field.name}>Gender</Label>
              <RadioGroup
                {...field}
                className="flex gap-4 mt-2"
                id={field.name}
                onValueChange={field.onChange}
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
            </>
          )}
          rules={{ required: 'Please choose your gender.' }}
        />

        <p
          className={`text-sm text-red-500 min-h-5 transition ${errors.gender ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          {errors.gender?.message}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Controller<IFormFields, 'acceptedTerms'>
            control={control}
            name="acceptedTerms"
            render={({ field }) => (
              <>
                <Label
                  className="cursor-pointer"
                  htmlFor={field.name}
                >
                  Accept Terms
                </Label>
                <Switch
                  {...field}
                  checked={field.value}
                  className="cursor-pointer"
                  id={field.name}
                  onCheckedChange={field.onChange}
                  value={undefined}
                />
              </>
            )}
            rules={{ required: 'You must accept the terms to apply.' }}
          />
        </div>
        <p
          className={`text-sm text-red-500 min-h-5 transition ${errors.acceptedTerms ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          {errors.acceptedTerms?.message}
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

export default Page;
