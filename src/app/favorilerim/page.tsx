'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFavorites } from '@/lib/FavoriteContext';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Book } from '@/lib/types';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, totalFavorites } = useFavorites();
  const [isClient, setIsClient] = useState(false);

  // Hydration hatası engellemek için client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Server-side rendering sırasında yükleme göster
    return (
      <>
        <Header />
        <main className="py-12 min-h-screen">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Favorilerim</h1>
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Favorilerim</h1>

          {totalFavorites === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Favori Listeniz Boş</h2>
                <p className="text-gray-500 mb-6">Henüz favori kitap eklemediniz.</p>
                <Link href="/" className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors">
                  Kitapları Keşfedin
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {favorites.map((book: Book) => (
                <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
                      <Image 
                        src={book.coverImage} 
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0">{book.title}</h2>
                        <button 
                          onClick={() => removeFromFavorites(book.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-gray-700 mb-4 line-clamp-2">{book.description}</p>
                      <div className="mt-auto flex flex-wrap justify-between items-center">
                        <div className="mb-2 sm:mb-0">
                          {book.discountedPrice ? (
                            <div className="flex flex-col">
                              <span className="text-gray-400 line-through text-sm">{formatPrice(book.price)}</span>
                              <span className="text-primary-600 font-bold">{formatPrice(book.discountedPrice)}</span>
                            </div>
                          ) : (
                            <span className="text-primary-600 font-bold">{formatPrice(book.price)}</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Link 
                            href={`/kitap/${book.slug}`} 
                            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                          >
                            İncele
                          </Link>
                          <Link 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (window && window.location) {
                                // Sepete ekleme işlemi yapabilir, şimdilik kitap detay sayfasına yönlendirelim
                                window.location.href = `/kitap/${book.slug}`;
                              }
                            }}
                            className="bg-secondary-600 text-white px-4 py-2 rounded-md hover:bg-secondary-700 transition-colors"
                          >
                            Sepete Ekle
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
} 