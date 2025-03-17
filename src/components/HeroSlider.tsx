'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedBooks, getImagePath } from '@/lib/utils';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredBooks = getFeaturedBooks().slice(0, 3);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredBooks.length]);

  return (
    <div className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="relative h-[500px]">
          {featuredBooks.map((book, index) => (
            <div 
              key={book.id}
              className={`absolute inset-0 transition-opacity duration-1000 flex flex-col md:flex-row items-center ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="md:w-1/2 p-6 md:pr-12">
                <div className="mb-2 text-primary-200 font-medium">Öne Çıkan Kitap</div>
                <h2 className="text-4xl font-bold mb-4">{book.title}</h2>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-300 mr-1">★★★★★</span>
                    <span className="text-primary-100">{book.rating}/5</span>
                  </div>
                  <p className="mb-6 text-primary-100 line-clamp-3 md:line-clamp-none">
                    {book.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href={`/kitap/${book.slug}`}
                    className="bg-white text-primary-800 font-medium px-6 py-3 rounded-full hover:bg-primary-50 transition-colors"
                  >
                    İncele
                  </Link>
                  {book.hasAudio && (
                    <Link 
                      href={`/kitap/${book.slug}#sesli-kitap`}
                      className="bg-secondary-600 text-white font-medium px-6 py-3 rounded-full hover:bg-secondary-700 transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.06-7.073m-2.11 9.9a9 9 0 010-12.728" />
                      </svg>
                      Sesli Dinle
                    </Link>
                  )}
                </div>
              </div>
              <div className="md:w-1/2 p-6 flex justify-center relative h-[300px] md:h-full w-full">
                <div className="relative h-full w-3/4 md:w-2/3 shadow-2xl rounded-lg overflow-hidden transform md:rotate-3 transition-transform hover:rotate-0 duration-300">
                  <Image
                    src={getImagePath(book.coverImage)}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center mt-4">
          {featuredBooks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
                index === currentSlide ? 'bg-white' : 'bg-primary-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}