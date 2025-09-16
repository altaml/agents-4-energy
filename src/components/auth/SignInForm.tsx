'use client';
import React from 'react';
import { signIn } from 'aws-amplify/auth';
import * as Form from '@radix-ui/react-form';

interface SignInFormProps {
  onModeChange: (mode: 'signIn' | 'forgotPassword' | 'signUp' | 'confirmSignUp' | 'confirmResetPassword') => void;
  onLoading: (loading: boolean) => void;
}

export default function SignInForm({ onModeChange, onLoading }: SignInFormProps) {
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signIn({ username: email, password });
      // User will be redirected by the parent component
    } catch (err: any) {
      // Set form-level error
      const form = event.currentTarget;
      const errorElement = form.querySelector('[data-form-error]');
      if (errorElement) {
        errorElement.textContent = err.message || 'An error occurred during sign in';
        errorElement.setAttribute('data-valid', 'false');
      }
    } finally {
      onLoading(false);
    }
  };

  return (
    <Form.Root onSubmit={handleSignIn} className="w-full max-w-[386px] space-y-6">
      {/* Form-level error message */}
      <div 
        data-form-error
        data-valid="true"
        className="text-sm px-4 py-2 rounded text-red-600 bg-red-50 hidden data-[valid=false]:block"
      />

      {/* Email Field */}
      <Form.Field name="email" className="space-y-2">
        <Form.Label className="block text-sm font-medium text-gray-700">
          Email
        </Form.Label>
        <Form.Control asChild>
          <input
            type="email"
            placeholder="firstname@email.com"
            required
            autoComplete="email"
            className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent data-[invalid]:border-red-500 data-[invalid]:focus:ring-red-500"
          />
        </Form.Control>
        <Form.Message match="valueMissing" className="text-red-600 text-xs">
          Please enter your email address.
        </Form.Message>
        <Form.Message match="typeMismatch" className="text-red-600 text-xs">
          Please enter a valid email address.
        </Form.Message>
      </Form.Field>

      {/* Password Field */}
      <Form.Field name="password" className="space-y-2">
        <Form.Label className="block text-sm font-medium text-gray-700">
          Password
        </Form.Label>
        <Form.Control asChild>
          <input
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent data-[invalid]:border-red-500 data-[invalid]:focus:ring-red-500"
          />
        </Form.Control>
        <Form.Message match="valueMissing" className="text-red-600 text-xs">
          Please enter your password.
        </Form.Message>
        <button
          type="button"
          onClick={() => onModeChange('forgotPassword')}
          className="text-xs text-[rgba(0,7,20,0.62)] underline hover:text-[#00A2C7] transition-colors"
        >
          forgot password?
        </button>
      </Form.Field>

      {/* Sign In Button */}
      <Form.Submit className="w-full h-10 bg-[#00A2C7] text-white font-medium text-base rounded-md hover:bg-[#0797b9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        Sign In
      </Form.Submit>

      {/* Register Link */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => onModeChange('signUp')}
          className="text-xs text-[rgba(0,7,20,0.62)] hover:text-[#00A2C7] transition-colors"
        >
          Don't have an account yet? Register now
        </button>
      </div>
    </Form.Root>
  );
}
