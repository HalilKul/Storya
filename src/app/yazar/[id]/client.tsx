'use client';

import Image from 'next/image';
import { getBooksByAuthor, formatDate, getImagePath } from '@/lib/utils';
import BookCard from '@/components/BookCard';
import { Author, Book } from '@/lib/types';

interface AuthorContentProps {
  author: Author;
}

export default function AuthorContent({ author }: AuthorContentProps) {
  const authorBooks = getBooksByAuthor(author.id);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{author.name}</h1>
        <p className="text-gray-600">Yazar Profili</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/4">
          <div className="relative h-64 md:h-96 w-full md:w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src={getImagePath(author.image)}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Yazar Bilgileri</h3>
            
            <div className="space-y-3">
              {author.birthDate && (
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Doğum Tarihi</p>
                    <p className="text-gray-700">{formatDate(author.birthDate)}</p>
                  </div>
                </div>
              )}
              
              {author.country && (
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Ülke</p>
                    <p className="text-gray-700">{author.country}</p>
                  </div>
                </div>
              )}
              
              {author.genres && author.genres.length > 0 && (
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Yazım Türleri</p>
                    <p className="text-gray-700">{author.genres.join(', ')}</p>
                  </div>
                </div>
              )}
              
              {author.awards && author.awards.length > 0 && (
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Ödüller</p>
                    <ul className="text-gray-700 list-disc list-inside ml-1">
                      {author.awards.map((award, index) => (
                        <li key={index} className="text-sm">{award}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {author.website && (
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Web Sitesi</p>
                    <a href={author.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{author.website}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Biyografi</h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p className="whitespace-pre-line">{author.bio}</p>
            </div>
          </div>
          
          {author.quotes && author.quotes.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Alıntılar</h2>
              <div className="space-y-4">
                {author.quotes.map((quote, index) => (
                  <blockquote key={index} className="border-l-4 border-primary-500 pl-4 italic text-gray-700">
                    "{quote}"
                  </blockquote>
                ))}
              </div>
            </div>
          )}
          
          {author.funFacts && author.funFacts.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">İlginç Bilgiler</h2>
              <ul className="list-disc list-inside space-y-2">
                {author.funFacts.map((fact, index) => (
                  <li key={index} className="text-gray-700">{fact}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{author.name} Kitapları</h2>
        {authorBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {authorBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">Bu yazara ait kitap bulunamadı.</p>
        )}
      </div>
    </main>
  );
} 