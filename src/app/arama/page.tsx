import { Suspense } from 'react';
import SearchClient from './client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="py-12 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          </div>
        </div>
      }>
        <SearchClient />
      </Suspense>
      <Footer />
    </>
  );
} 