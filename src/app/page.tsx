'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedBooks, getBestSellers, getNewReleases, getDiscountedBooks, formatPrice, authors } from '@/lib/utils';
import BookCard from '@/components/BookCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import { Book } from '@/lib/types';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('bestsellers');
  const featuredBooks = getFeaturedBooks().slice(0, 8);
  const bestSellers = getBestSellers().slice(0, 8);
  const newReleases = getNewReleases().slice(0, 8);
  const discountedBooks = getDiscountedBooks().slice(0, 8);

  const popularAuthors = authors.slice(0, 6);

  const getImagePath = (imagePath: string) => {
    if (imagePath && imagePath.startsWith('public/')) {
      return imagePath.replace('public/', '/');
    }
    return imagePath;
  };

  const getActiveBooks = () => {
    switch (activeTab) {
      case 'bestsellers':
        return bestSellers;
      case 'new':
        return newReleases;
      case 'discounted':
        return discountedBooks;
      default:
        return bestSellers;
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Kategoriler */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Kategoriler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link href="/kategori/roman" className="category-card">
                <div className="bg-primary-50 rounded-xl p-6 text-center hover:bg-primary-100 transition-colors h-full flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-medium">Roman</span>
                </div>
              </Link>
              <Link href="/kategori/bilim-kurgu" className="category-card">
                <div className="bg-secondary-50 rounded-xl p-6 text-center hover:bg-secondary-100 transition-colors h-full flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span className="font-medium">Bilim Kurgu</span>
                </div>
              </Link>
              <Link href="/kategori/polisiye" className="category-card">
                <div className="bg-primary-50 rounded-xl p-6 text-center hover:bg-primary-100 transition-colors h-full flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="font-medium">Polisiye</span>
                </div>
              </Link>
              <Link href="/kategori/tarih" className="category-card">
                <div className="bg-secondary-50 rounded-xl p-6 text-center hover:bg-secondary-100 transition-colors h-full flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Tarih</span>
                </div>
              </Link>
              <Link href="/kategori/felsefe" className="category-card">
                <div className="bg-primary-50 rounded-xl p-6 text-center hover:bg-primary-100 transition-colors h-full flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-medium">Felsefe</span>
                </div>
              </Link>
              <Link href="/kategori/cocuk" className="category-card">
                <div className="bg-secondary-50 rounded-xl p-6 text-center hover:bg-secondary-100 transition-colors h-full flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Çocuk</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Öne Çıkan Kitaplar */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Öne Çıkan Kitaplar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book: Book) => (
                <BookCard key={book.id} book={book} hideDescription />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/tavsiyeler" 
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
              >
                <span>Tüm Öne Çıkanlar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Tabbed Kitap Listesi */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Popüler Yazarlar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {popularAuthors.map((author) => (
                <Link href={`/yazar/${author.id}`} key={author.id} className="group">
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image 
                        src={getImagePath(author.image)} 
                        alt={author.name} 
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium group-hover:text-primary-600 transition-colors">{author.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Abone Ol */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Yeni Kitaplardan Haberdar Olun</h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Yeni çıkan kitaplar, özel indirimler ve kampanyalardan ilk siz haberdar olmak için bültenimize abone olun.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="bg-secondary-600 text-white px-6 py-3 rounded-full hover:bg-secondary-700 transition-colors"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 
