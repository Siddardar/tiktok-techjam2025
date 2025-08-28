'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload, Image } from 'lucide-react';

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/upload');
  };

  const handleSignup = () => {
    router.push('/upload');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* App Icon/Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Camera className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PhotoApp</h1>
          <p className="text-gray-600">Upload and manage your photos with ease</p>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center space-x-8 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Upload className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-xs text-gray-500">Easy Upload</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Image className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-xs text-gray-500">Smart Processing</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Camera className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-xs text-gray-500">Gallery View</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
          
          <button
            onClick={handleLogin}
            className="w-full border border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            Sign In
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Start uploading your photos today
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
