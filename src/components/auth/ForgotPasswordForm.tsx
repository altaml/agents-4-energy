'use client';
import React, { useState } from 'react';
import { resetPassword } from 'aws-amplify/auth';

interface ForgotPasswordFormProps {
  onModeChange: (mode: 'signIn' | 'forgotPassword' | 'signUp' | 'confirmSignUp' | 'confirmResetPassword') => void;
  onError: (error: string) => void;
  onSuccess: (message: string) => void;
  onLoading: (loading: boolean) => void;
  onEmailSet: (email: string) => void;
}

export default function ForgotPasswordForm({ onModeChange, onError, onSuccess, onLoading, onEmailSet }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    onLoading(true);
    onError('');

    try {
      await resetPassword({ username: email });
      onEmailSet(email);
      onSuccess('Password reset code sent to your email');
      onModeChange('confirmResetPassword');
    } catch (err: any) {
      onError(err.message || 'An error occurred');
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleForgotPassword} className="w-full max-w-[386px] space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[#1c2024] mb-2">Reset Password</h2>
        <p className="text-sm text-[rgba(0,7,20,0.62)]">Enter your email to receive a password reset link</p>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="firstname@email.com"
          required
          className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        className="w-full h-10 bg-[#00A2C7] text-white font-medium text-base rounded-md hover:bg-[#0797b9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Send Reset Link
      </button>

      <button
        type="button"
        onClick={() => onModeChange('signIn')}
        className="w-full text-sm text-[rgba(0,7,20,0.62)] hover:text-[#00A2C7] transition-colors"
      >
        Back to Sign In
      </button>
    </form>
  );
}
