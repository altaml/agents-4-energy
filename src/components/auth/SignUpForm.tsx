'use client';
import React, { useState } from 'react';
import { signUp } from 'aws-amplify/auth';

interface SignUpFormProps {
  onModeChange: (mode: 'signIn' | 'forgotPassword' | 'signUp' | 'confirmSignUp' | 'confirmResetPassword') => void;
  onError: (error: string) => void;
  onLoading: (loading: boolean) => void;
  onEmailSet: (email: string) => void;
}

export default function SignUpForm({ onModeChange, onError, onLoading, onEmailSet }: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    onLoading(true);
    onError('');

    try {
      await signUp({ username: email, password });
      onEmailSet(email);
      onModeChange('confirmSignUp');
    } catch (err: any) {
      onError(err.message || 'An error occurred during sign up');
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="w-full max-w-[386px] space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[#1c2024] mb-2">Create Account</h2>
        <p className="text-sm text-[rgba(0,7,20,0.62)]">Sign up for Agents4Energy</p>
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
          autoComplete="email"
          className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          autoComplete="new-password"
          className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        className="w-full h-10 bg-[#00A2C7] text-white font-medium text-base rounded-md hover:bg-[#0797b9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Sign Up
      </button>

      <button
        type="button"
        onClick={() => onModeChange('signIn')}
        className="w-full text-sm text-[rgba(0,7,20,0.62)] hover:text-[#00A2C7] transition-colors"
      >
        Already have an account? Sign In
      </button>
    </form>
  );
}
