'use client';
import { useAuthenticator } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react';
import { Hub } from 'aws-amplify/utils';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import LoginLayout from '@/components/auth/LoginLayout';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import ConfirmSignUpForm from '@/components/auth/ConfirmSignUpForm';
import ConfirmResetPasswordForm from '@/components/auth/ConfirmResetPasswordForm';

export default function Login() {
  const { user, authStatus } = useAuthenticator((context) => [context.user, context.authStatus]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'signIn' | 'forgotPassword' | 'signUp' | 'confirmSignUp' | 'confirmResetPassword'>('signIn');
  const [userEmail, setUserEmail] = useState('');


  useEffect(() => {
    // Ensure sign-in is completed
    // https://docs.amplify.aws/nextjs/build-a-backend/auth/concepts/external-identity-providers/#required-for-multi-page-applications-complete-external-sign-in-after-redirect
    // Note: We can only use this in client components
    const hubListenerCancel = Hub.listen('auth', async ({ payload }) => {
      switch (payload.event) {
        case 'signInWithRedirect':
          {
          const user = await getCurrentUser();
          const userAttributes = await fetchUserAttributes();
          console.log('Login (signInWithRedirect): ', {user, userAttributes});
          break;
          }
        case 'signInWithRedirect_failure':
          // handle sign in failure
          console.log('Login (signInWithRedirect_failure): ', payload.data);
          break;
        case 'customOAuthState':
          const state = payload.data; // this will be customState provided on signInWithRedirect function
          console.log('Login (customOAuthState): ', state);
          break;
        case 'signedIn':
          const user = await getCurrentUser();
          const userAttributes = await fetchUserAttributes();
          console.log('Login (signedIn): ', {user, userAttributes});
          console.log('Hub signedIn event - redirecting to landing...');
          window.location.href = '/landing';
          break;
        default:
          console.error('Login unhandled auth event:', payload.event);
      }
    });
    return hubListenerCancel;
  }, []);

  // Show loading while checking auth status
  if (authStatus === 'configuring') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const renderForm = () => {
    switch (mode) {
      case 'signIn':
        return (
          <SignInForm
            onModeChange={setMode}
            onError={setError}
            onLoading={setIsLoading}
          />
        );
      case 'signUp':
        return (
          <SignUpForm
            onModeChange={setMode}
            onError={setError}
            onLoading={setIsLoading}
            onEmailSet={setUserEmail}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordForm
            onModeChange={setMode}
            onError={setError}
            onLoading={setIsLoading}
            onEmailSet={setUserEmail}
          />
        );
      case 'confirmSignUp':
        return (
          <ConfirmSignUpForm
            email={userEmail}
            onModeChange={setMode}
            onError={setError}
            onLoading={setIsLoading}
          />
        );
      case 'confirmResetPassword':
        return (
          <ConfirmResetPasswordForm
            email={userEmail}
            onModeChange={setMode}
            onError={setError}
            onLoading={setIsLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <LoginLayout error={error} isLoading={isLoading}>
      {renderForm()}
    </LoginLayout>
  );
}