'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBooksByCategory } from '@/lib/utils';
import BookCard from '@/components/BookCard';
import { Book, Category } from '@/lib/types';

type CategoryContentProps = {
  category: Category;
};

export default function CategoryContent({ category }: CategoryContentProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const categoryBooks = getBooksByCategory(category.id);
    setBooks(categoryBooks);
  }, [category]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSortOption(option);
    
    const sortedBooks = [...books];
    switch(option) {
      case 'price-asc':
        sortedBooks.sort((a, b) => {
          const aPrice = a.discountedPrice || a.price;
          const bPrice = b.discountedPrice || b.price;
          return aPrice - bPrice;
        });
        break;
      case 'price-desc':
        sortedBooks.sort((a, b) => {
          const aPrice = a.discountedPrice || a.price;
          const bPrice = b.discountedPrice || b.price;
          return bPrice - aPrice;
        });
        break;
      case 'name-asc':
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-desc':
        sortedBooks.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Varsayılan sıralama
        break;
    }
    
    setBooks(sortedBooks);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{category.name}</h1>
        <p className="text-gray-600">{`${category.name} kategorisindeki tüm kitaplar`}</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtreler */}
        <div className="md:w-1/4 lg:w-1/5">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Filtreler</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3 text-gray-700">Sıralama</h3>
              <select 
                value={sortOption}
                onChange={handleSortChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="default">Önerilen</option>
                <option value="price-asc">Fiyat (Artan)</option>
                <option value="price-desc">Fiyat (Azalan)</option>
                <option value="name-asc">İsim (A-Z)</option>
                <option value="name-desc">İsim (Z-A)</option>
                <option value="rating-desc">Puan (Yüksek-Düşük)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Kitap Listesi */}
        <div className="md:w-3/4 lg:w-4/5">
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Bu kategoride kitap bulunamadı</h2>
              <p className="text-gray-600 mb-6">Üzgünüz, bu kategoride henüz kitap bulunmuyor.</p>
              <Link 
                href="/"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 