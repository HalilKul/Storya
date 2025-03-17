'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    setErrorMessage(error.message || 'Bir hata oluştu');
  }, [error]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-primary-600 mb-6">Hata!</h1>
        <h2 className="text-3xl font-bold mb-4">Bir Sorun Oluştu</h2>
        <p className="text-gray-600 max-w-md mb-8">
          {errorMessage}
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-medium"
          >
            Tekrar Dene
          </button>
          <Link 
            href="/"
            className="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Anasayfaya Dön
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
} 