'use client';
import React, { useState } from 'react';
import { confirmResetPassword } from 'aws-amplify/auth';
import * as Form from '@radix-ui/react-form';

interface ConfirmResetPasswordFormProps {
  email: string;
  onModeChange: (mode: 'signIn' | 'forgotPassword' | 'signUp' | 'confirmSignUp' | 'confirmResetPassword') => void;
  onLoading: (loading: boolean) => void;
}

export default function ConfirmResetPasswordForm({ email, onModeChange, onLoading }: ConfirmResetPasswordFormProps) {
  const [formError, setFormError] = useState('');
  const handleConfirmResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoading(true);
    setFormError(''); // Clear previous errors

    const formData = new FormData(event.currentTarget);
    const confirmationCode = formData.get('confirmationCode') as string;
    const newPassword = formData.get('newPassword') as string;

    try {
      await confirmResetPassword({ username: email, confirmationCode, newPassword });
      onModeChange('signIn');
      // Keep loading active until mode change completes
    } catch (err: any) {
      // Set form-level error using React state
      setFormError(err.message || 'An error occurred during password reset');
      // Only clear loading on error
      onLoading(false);
    }
  };

  return (
    <Form.Root onSubmit={handleConfirmResetPassword} className="w-full max-w-[386px] space-y-6">
      <div className="text-center">
        <p className="text-sm text-[rgba(0,7,20,0.62)]">Enter the code sent to {email} and your new password</p>
      </div>

      {/* Form-level error message */}
      {formError && (
        <div className="text-sm px-4 py-2 rounded text-red-600 bg-red-50">
          {formError}
        </div>
      )}
      
      <Form.Field name="confirmationCode" className="space-y-2">
        <Form.Label className="block text-sm font-medium text-gray-700">
          Verification Code
        </Form.Label>
        <Form.Control asChild>
          <input
            type="text"
            placeholder="Enter verification code"
            required
            autoComplete="one-time-code"
            className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent data-[invalid]:border-red-500 data-[invalid]:focus:ring-red-500"
          />
        </Form.Control>
        <Form.Message match="valueMissing" className="text-red-600 text-xs">
          Please enter the verification code.
        </Form.Message>
      </Form.Field>

      <Form.Field name="newPassword" className="space-y-2">
        <Form.Label className="block text-sm font-medium text-gray-700">
          New Password
        </Form.Label>
        <Form.Control asChild>
          <input
            type="password"
            placeholder="Enter new password"
            required
            autoComplete="new-password"
            className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent data-[invalid]:border-red-500 data-[invalid]:focus:ring-red-500"
          />
        </Form.Control>
        <Form.Message match="valueMissing" className="text-red-600 text-xs">
          Please enter a new password.
        </Form.Message>
      </Form.Field>

      <Form.Field name="confirmNewPassword" className="space-y-2">
        <Form.Label className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </Form.Label>
        <Form.Control asChild>
          <input
            type="password"
            placeholder="Confirm new password"
            required
            autoComplete="new-password"
            className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent data-[invalid]:border-red-500 data-[invalid]:focus:ring-red-500"
          />
        </Form.Control>
        <Form.Message match="valueMissing" className="text-red-600 text-xs">
          Please confirm your new password.
        </Form.Message>
        <Form.Message match={(value, formData) => {
          return value !== formData.get('newPassword');
        }} className="text-red-600 text-xs">
          Passwords do not match.
        </Form.Message>
      </Form.Field>

      <Form.Submit className="w-full h-10 bg-[#00A2C7] text-white font-medium text-base rounded-md hover:bg-[#0797b9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        Reset Password
      </Form.Submit>

      <button
        type="button"
        onClick={() => onModeChange('forgotPassword')}
        className="w-full text-sm text-[rgba(0,7,20,0.62)] hover:text-[#00A2C7] transition-colors"
      >
        Back to Reset Password
      </button>
    </Form.Root>
  );
}
