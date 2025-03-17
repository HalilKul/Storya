'use client';

import { getFeaturedBooks, getBestSellers } from '@/lib/utils';
import BookCard from '@/components/BookCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Book } from '@/lib/types';
import Link from 'next/link';

export default function RecommendationsPage() {
  const featuredBooks = getFeaturedBooks().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kitap Tavsiyeleri</h1>
          <p className="text-gray-600">Okuma listenize ekleyebileceğiniz öneriler</p>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Editör Seçimleri</h2>
            <Link href="/cok-satanlar" className="text-primary-600 hover:underline">Tümünü Gör</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Okuyucuların Tercihleri</h2>
            <Link href="/cok-satanlar" className="text-primary-600 hover:underline">Tümünü Gör</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        <div className="bg-primary-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Kişiselleştirilmiş Tavsiyeler</h2>
          <p className="text-gray-700 mb-6">Okuma alışkanlıklarınıza göre size özel kitap tavsiyeleri almak için hesap oluşturun veya giriş yapın.</p>
          <div className="flex gap-4">
            <Link href="/giris" className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors">
              Giriş Yap
            </Link>
            <Link href="/kayit" className="bg-white border border-primary-600 text-primary-600 px-6 py-3 rounded-md hover:bg-primary-50 transition-colors">
              Hesap Oluştur
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 