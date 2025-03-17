'use client';

import { getAudioBooks } from '@/lib/utils';
import BookCard from '@/components/BookCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Book } from '@/lib/types';

export default function AudioBooksPage() {
  const audioBooks = getAudioBooks();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sesli Kitaplar</h1>
          <p className="text-gray-600">Profesyonel seslendirmelerle hazırlanmış sesli kitaplar</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audioBooks.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
} 