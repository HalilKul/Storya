'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { authors } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AuthorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('nameAsc');

  // Yazarları filtrele
  const filteredAuthors = authors.filter(author => 
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Yazarları sırala
  const sortedAuthors = [...filteredAuthors].sort((a, b) => {
    switch (sortOption) {
      case 'nameAsc':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Görsel yolunu düzenleyen yardımcı fonksiyon
  const getImagePath = (imagePath: string) => {
    if (imagePath.startsWith('public/')) {
      return imagePath.replace('public/', '/');
    }
    return imagePath;
  };

  return (
    <>
      <Header />
      <main className="py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Yazarlar</h1>
            <p className="text-gray-600">Tüm yazarlarımızı keşfedin ve sevdiğiniz yazarların kitaplarına göz atın.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Arama */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Yazar ara..."
                    className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="absolute right-3 top-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sıralama */}
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-600">Sırala:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                >
                  <option value="nameAsc">A-Z</option>
                  <option value="nameDesc">Z-A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Yazarlar Listesi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedAuthors.map(author => (
              <Link 
                href={`/yazar/${author.id}`} 
                key={author.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <Image 
                    src={getImagePath(author.image)} 
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h2 className="text-xl font-bold text-white mb-1">{author.name}</h2>
                    <div className="flex items-center text-white/80 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Yazarın Kitapları
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredAuthors.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Sonuç Bulunamadı</h2>
                <p className="text-gray-500 mb-6">Aramanızla eşleşen yazar bulamadık. Lütfen başka anahtar kelimelerle tekrar deneyin.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
} 