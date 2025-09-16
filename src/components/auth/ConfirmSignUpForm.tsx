'use client';
import React from 'react';
import { confirmSignUp } from 'aws-amplify/auth';
import * as Form from '@radix-ui/react-form';

interface ConfirmSignUpFormProps {
  email: string;
  onModeChange: (mode: 'signIn' | 'forgotPassword' | 'signUp' | 'confirmSignUp' | 'confirmResetPassword') => void;
  onLoading: (loading: boolean) => void;
}

export default function ConfirmSignUpForm({ email, onModeChange, onLoading }: ConfirmSignUpFormProps) {
  const handleConfirmSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoading(true);

    const formData = new FormData(event.currentTarget);
    const confirmationCode = formData.get('confirmationCode') as string;

    try {
      await confirmSignUp({ username: email, confirmationCode });
      onModeChange('signIn');
    } catch (err: any) {
      // Set form-level error
      const form = event.currentTarget;
      const errorElement = form.querySelector('[data-form-error]');
      if (errorElement) {
        errorElement.textContent = err.message || 'An error occurred during confirmation';
        errorElement.setAttribute('data-valid', 'false');
      }
    } finally {
      onLoading(false);
    }
  };

  return (
    <Form.Root onSubmit={handleConfirmSignUp} className="w-full max-w-[386px] space-y-6">
      <div className="text-center">
        <p className="text-sm text-[rgba(0,7,20,0.62)]">Enter the confirmation code sent to your email</p>
      </div>

      {/* Form-level error message */}
      <div 
        data-form-error
        data-valid="true"
        className="text-sm px-4 py-2 rounded text-red-600 bg-red-50 hidden data-[valid=false]:block"
      />
      
      <Form.Field name="confirmationCode" className="space-y-2">
        <Form.Label className="block text-sm font-medium text-gray-700">
          Confirmation Code
        </Form.Label>
        <Form.Control asChild>
          <input
            type="text"
            placeholder="Enter confirmation code"
            required
            autoComplete="one-time-code"
            className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent data-[invalid]:border-red-500 data-[invalid]:focus:ring-red-500"
          />
        </Form.Control>
        <Form.Message match="valueMissing" className="text-red-600 text-xs">
          Please enter the confirmation code.
        </Form.Message>
      </Form.Field>

      <Form.Submit className="w-full h-10 bg-[#00A2C7] text-white font-medium text-base rounded-md hover:bg-[#0797b9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        Confirm Account
      </Form.Submit>

      <button
        type="button"
        onClick={() => onModeChange('signUp')}
        className="w-full text-sm text-[rgba(0,7,20,0.62)] hover:text-[#00A2C7] transition-colors"
      >
        Back to Sign Up
      </button>
    </Form.Root>
  );
}
