'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { books, getAuthorById, getPublisherById } from '@/lib/utils';
import { Book } from '@/lib/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    // Kitapları getir ve arama terimine göre filtrele
    setLoading(true);
    
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = books.filter((book: Book) => {
        // Yazar ve yayınevi bilgilerini al
        const author = getAuthorById(book.authorId);
        const publisher = getPublisherById(book.publisherId);
        
        return book.title.toLowerCase().includes(lowerCaseQuery) ||
          (author && author.name.toLowerCase().includes(lowerCaseQuery)) ||
          (publisher && publisher.name.toLowerCase().includes(lowerCaseQuery)) ||
          book.description.toLowerCase().includes(lowerCaseQuery) ||
          book.categories.some((category: string) => category.toLowerCase().includes(lowerCaseQuery));
      });
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
    
    setLoading(false);
  }, [query]);

  // Kitapları sırala
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case 'priceAsc':
        const aPrice = a.discountedPrice || a.price;
        const bPrice = b.discountedPrice || b.price;
        return aPrice - bPrice;
      case 'priceDesc':
        const aPrice2 = a.discountedPrice || a.price;
        const bPrice2 = b.discountedPrice || b.price;
        return bPrice2 - aPrice2;
      case 'newest':
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <>
      <Header />
      <main className="py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold mb-2">Arama Sonuçları</h1>
            <p className="text-gray-600">
              {query ? (
                <>
                  <span className="font-semibold">&quot;{query}&quot;</span> için {filteredBooks.length} sonuç bulundu
                </>
              ) : (
                "Lütfen bir arama terimi girin"
              )}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredBooks.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">{filteredBooks.length} kitap listeleniyor</p>
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-gray-600">Sırala:</label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  >
                    <option value="newest">En Yeniler</option>
                    <option value="priceAsc">Fiyat: Düşükten Yükseğe</option>
                    <option value="priceDesc">Fiyat: Yüksekten Düşüğe</option>
                    <option value="rating">Puanı Yüksek</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </>
          ) : query ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Sonuç Bulunamadı</h2>
                <p className="text-gray-500 mb-6">Aramanızla eşleşen kitap bulamadık. Lütfen başka anahtar kelimelerle tekrar deneyin.</p>
              </div>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
} 