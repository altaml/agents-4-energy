'use client';
import React, { useState } from 'react';
import { confirmResetPassword } from 'aws-amplify/auth';

interface ConfirmResetPasswordFormProps {
  email: string;
  onModeChange: (mode: 'signIn' | 'forgotPassword' | 'signUp' | 'confirmSignUp' | 'confirmResetPassword') => void;
  onError: (error: string) => void;
  onLoading: (loading: boolean) => void;
}

export default function ConfirmResetPasswordForm({ email, onModeChange, onError, onLoading }: ConfirmResetPasswordFormProps) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleConfirmResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    onLoading(true);
    onError('');

    try {
      await confirmResetPassword({ username: email, confirmationCode, newPassword });
      onError('Password reset successful! Please sign in with your new password.');
      onModeChange('signIn');
    } catch (err: any) {
      onError(err.message || 'An error occurred during password reset');
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleConfirmResetPassword} className="w-full max-w-[386px] space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[#1c2024] mb-2">Enter Reset Code</h2>
        <p className="text-sm text-[rgba(0,7,20,0.62)]">Enter the code sent to {email} and your new password</p>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Verification Code
        </label>
        <input
          type="text"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          placeholder="Enter verification code"
          required
          className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
          className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        className="w-full h-10 bg-[#00A2C7] text-white font-medium text-base rounded-md hover:bg-[#0797b9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Reset Password
      </button>

      <button
        type="button"
        onClick={() => onModeChange('forgotPassword')}
        className="w-full text-sm text-[rgba(0,7,20,0.62)] hover:text-[#00A2C7] transition-colors"
      >
        Back to Reset Password
      </button>
    </form>
  );
}
