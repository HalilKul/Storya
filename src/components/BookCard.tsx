'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/lib/types';
import { formatPrice, starRating, getImagePath } from '@/lib/utils';
import { useCart } from '@/lib/CartContext';
import { useFavorites } from '@/lib/FavoriteContext';

interface BookCardProps {
  book: Book;
  hideDescription?: boolean;
}

export default function BookCard({ book, hideDescription = false }: BookCardProps) {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const bookIsFavorite = isFavorite(book.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(book);
    setIsAdded(true);
    
    // 1.5 saniye sonra eklendi bildirimini kaldır
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Favori durumu değiştiriliyor:', book.title);
    console.log('Mevcut favori durumu:', bookIsFavorite);
    
    if (bookIsFavorite) {
      console.log('Favorilerden çıkarılıyor:', book.id);
      removeFromFavorites(book.id);
    } else {
      console.log('Favorilere ekleniyor:', book);
      addToFavorites(book);
    }
    
    // Durum değişikliğini zorlamak için state'i manuel güncelle
    // Bu, React'in state değişikliğini hemen algılamasını sağlar
    setTimeout(() => {
      const newFavoriteStatus = isFavorite(book.id);
      console.log('Yeni favori durumu:', newFavoriteStatus);
    }, 100);
  };

  return (
    <div 
      className="relative bg-white rounded-lg shadow-md overflow-hidden transition-shadow h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/kitap/${book.slug}`} className="block relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
        <Image
          src={getImagePath(book.coverImage)} 
          alt={book.title}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
      </Link>
      {book.discountedPrice && (
        <div className="discount-badge z-20 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          %{Math.round(((book.price - book.discountedPrice) / book.price) * 100)} İndirim
        </div>
      )}
      {book.hasAudio && (
        <div className="absolute bottom-2 left-2 bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-medium z-20 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.06-7.073m-2.11 9.9a9 9 0 010-12.728" />
          </svg>
          Sesli
        </div>
      )}
      
      {/* Favori Butonu */}
      <button 
        onClick={handleToggleFavorite}
        className={`absolute top-2 right-2 p-2 rounded-full z-30 ${
          bookIsFavorite 
            ? 'bg-red-500 text-white' 
            : 'bg-white/80 text-gray-700 hover:bg-white hover:text-red-500'
        } transition-all duration-300 transform hover:scale-110`}
      >
        {bookIsFavorite ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
      </button>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
          <Link href={`/kitap/${book.slug}`}>{book.title}</Link>
        </h3>
        
        <div className="text-sm text-gray-600 mb-2 flex items-center">
          <span className="text-yellow-500 mr-1">{starRating(book.rating)}</span> 
          <span>({book.rating})</span>
        </div>
        
        {!hideDescription && (
          <p className="text-gray-700 mb-4 text-sm line-clamp-2">{book.description}</p>
        )}
        
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <div>
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
              <button
                onClick={handleAddToCart}
                className={`text-sm px-3 py-1.5 rounded-full flex items-center ${
                  isAdded 
                    ? 'bg-green-600 text-white' 
                    : 'bg-secondary-600 text-white hover:bg-secondary-700'
                } transition-all duration-300 transform hover:scale-105`}
              >
                {isAdded ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Eklendi
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Sepete Ekle
                  </>
                )}
              </button>
              <Link 
                href={`/kitap/${book.slug}`} 
                className="text-sm text-white bg-primary-600 px-3 py-1.5 rounded-full hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                İncele
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 