'use client';
import React from 'react';
import Image from 'next/image';
import Pumpjack from '@/pumpjack1_mini.png';
import AltaMLLogo from '@/altaml_login.png';

interface LoginLayoutProps {
  children: React.ReactNode;
  title?: string;
  error?: string;
  success?: string;
  isLoading?: boolean;
}

export default function LoginLayout({ children, title = "Agents4Energy Login", error, success, isLoading }: LoginLayoutProps) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${Pumpjack.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dialog Container */}
      <div className="bg-white rounded-xl shadow-2xl max-w-[450px] w-full max-h-[690px] p-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-5">
            <div className="w-[206px] h-[61px] relative">
              <Image 
                src={AltaMLLogo} 
                alt="AltaML Logo" 
                fill
                sizes="206px"
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1c2024] tracking-[-0.1px] leading-[30px]">
              {title}
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm px-4 py-2 rounded text-red-600 bg-red-50">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-sm px-4 py-2 rounded text-green-600 bg-green-50">
              {success}
            </div>
          )}

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-xl">
              <div className="text-[#00A2C7]">Loading...</div>
            </div>
          )}

          {/* Form Content */}
          {children}
        </div>
      </div>
    </div>
  );
}
