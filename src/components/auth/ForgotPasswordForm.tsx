'use client';
import React, { useState } from 'react';
import { resetPassword } from 'aws-amplify/auth';
import * as Form from '@radix-ui/react-form';

interface ForgotPasswordFormProps {
  onModeChange: (mode: 'signIn' | 'forgotPassword' | 'signUp' | 'confirmSignUp' | 'confirmResetPassword') => void;
  onLoading: (loading: boolean) => void;
  onEmailSet: (email: string) => void;
}

export default function ForgotPasswordForm({ onModeChange, onLoading, onEmailSet }: ForgotPasswordFormProps) {
  const [formError, setFormError] = useState('');
  const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoading(true);
    setFormError(''); // Clear previous errors

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    try {
      await resetPassword({ username: email });
      onEmailSet(email);
      onModeChange('confirmResetPassword');
      // Keep loading active until mode change completes
    } catch (err: unknown) {
      // Set form-level error using React state
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setFormError(errorMessage);
      // Only clear loading on error
      onLoading(false);
    }
  };

  return (
    <Form.Root onSubmit={handleForgotPassword} className="w-full max-w-[386px] space-y-6">
      {/* Form-level error message */}
      {formError && (
        <div className="text-sm px-4 py-2 rounded text-red-600 bg-red-50">
          {formError}
        </div>
      )}

      <Form.Field name="email" className="space-y-2">
        <Form.Label className="block text-sm font-medium text-gray-700">
          Email
        </Form.Label>
        <Form.Control asChild>
          <input
            type="email"
            placeholder="firstname@email.com"
            required
            autoComplete="username"
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

      <Form.Submit className="w-full h-10 bg-[#00A2C7] text-white font-medium text-base rounded-md hover:bg-[#0797b9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        Send reset code
      </Form.Submit>

      <button
        type="button"
        onClick={() => onModeChange('signIn')}
        className="w-full text-sm text-[rgba(0,7,20,0.62)] hover:text-[#00A2C7] transition-colors"
      >
        Back to Sign In
      </button>
    </Form.Root>
  );
}
