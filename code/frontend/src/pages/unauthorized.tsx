"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Footer from './components/FooterComponent';

const UnauthorizedPage: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/home');
  };

  return (
    <div className="flex-1 items-center justify-center h-screen bg-cover bg-center text-white bg-background p-10">
      <div className="bg-black bg-opacity-60 p-10 rounded-lg text-center max-w-md shadow-lg ">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">You don't have permission to access this page.</p>
        <button
          onClick={handleGoHome}
          className="px-5 py-2 bg-white text-black rounded transition duration-300 hover:bg-black hover:text-white"
        >
          Go back to home page
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default UnauthorizedPage;