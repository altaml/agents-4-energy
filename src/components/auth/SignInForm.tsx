'use client';
import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';

interface SignInFormProps {
  onModeChange: (mode: 'signIn' | 'forgotPassword' | 'signUp' | 'confirmSignUp' | 'confirmResetPassword') => void;
  onError: (error: string) => void;
  onLoading: (loading: boolean) => void;
}

export default function SignInForm({ onModeChange, onError, onLoading }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    onLoading(true);
    onError('');

    try {
      await signIn({ username: email, password });
      // User will be redirected by the parent component
    } catch (err: any) {
      onError(err.message || 'An error occurred during sign in');
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="w-full max-w-[386px] space-y-6">
      {/* Email Field */}
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

      {/* Password Field */}
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
          autoComplete="current-password"
          className="w-full h-10 px-3 border border-[rgba(0,9,50,0.12)] rounded-md bg-[rgba(255,255,255,0.9)] text-base placeholder-[rgba(0,5,29,0.45)] focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:border-transparent"
        />
        <button
          type="button"
          onClick={() => onModeChange('forgotPassword')}
          className="text-xs text-[rgba(0,7,20,0.62)] underline hover:text-[#00A2C7] transition-colors"
        >
          forgot password?
        </button>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        className="w-full h-10 bg-[#00A2C7] text-white font-medium text-base rounded-md hover:bg-[#0797b9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Sign In
      </button>

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
    </form>
  );
}
