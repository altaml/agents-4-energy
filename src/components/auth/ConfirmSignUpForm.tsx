'use client';
import React, { useState } from 'react';
import { confirmSignUp } from 'aws-amplify/auth';

interface ConfirmSignUpFormProps {
  email: string;
  onModeChange: (mode: 'signIn' | 'forgotPassword' | 'signUp' | 'confirmSignUp' | 'confirmResetPassword') => void;
  onError: (error: string) => void;
  onLoading: (loading: boolean) => void;
}

export default function ConfirmSignUpForm({ email, onModeChange, onError, onLoading }: ConfirmSignUpFormProps) {
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    onLoading(true);
    onError('');

    try {
      await confirmSignUp({ username: email, confirmationCode });
      onModeChange('signIn');
      onError('Account confirmed! Please sign in.');
    } catch (err: any) {
      onError(err.message || 'An error occurred during confirmation');
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleConfirmSignUp} className="w-full max-w-[386px] space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[#1c2024] mb-2">Confirm Account</h2>
        <p className="text-sm text-[rgba(0,7,20,0.62)]">Enter the confirmation code sent to your email</p>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Confirmation Code
        </label>
        <input
          type="text"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          placeholder="Enter confirmation code"
          required
          autoComplete="one-time-code"
          className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        className="w-full h-10 bg-[#00A2C7] text-white font-medium text-base rounded-md hover:bg-[#0797b9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Confirm Account
      </button>

      <button
        type="button"
        onClick={() => onModeChange('signUp')}
        className="w-full text-sm text-[rgba(0,7,20,0.62)] hover:text-[#00A2C7] transition-colors"
      >
        Back to Sign Up
      </button>
    </form>
  );
}
