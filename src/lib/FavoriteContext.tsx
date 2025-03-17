'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from './types';

interface FavoriteContextType {
  favorites: Book[];
  totalFavorites: number;
  addToFavorites: (book: Book) => void;
  removeFromFavorites: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  clearFavorites: () => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [totalFavorites, setTotalFavorites] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan favori kitapları yükle
  useEffect(() => {
    const loadFavorites = () => {
      if (typeof window === 'undefined') return;

      try {
        const storedFavorites = window.localStorage.getItem('favorites');
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          setFavorites(parsedFavorites);
          setTotalFavorites(parsedFavorites.length);
        }
      } catch (error) {
        console.error('Failed to load favorites from localStorage:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadFavorites();
  }, []);

  // Favoriler değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (!isInitialized) return;

    try {
      window.localStorage.setItem('favorites', JSON.stringify(favorites));
      setTotalFavorites(favorites.length);
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favorites, isInitialized]);

  // Favorilere kitap ekle
  const addToFavorites = (book: Book) => {
    setFavorites(prevFavorites => {
      // Kitap zaten favorilerde varsa, tekrar eklemeyelim
      if (prevFavorites.some(item => item.id === book.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, book];
    });
  };

  // Favorilerden kitap çıkar
  const removeFromFavorites = (bookId: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(item => item.id !== bookId)
    );
  };

  // Kitabın favorilerde olup olmadığını kontrol et
  const isFavorite = (bookId: string): boolean => {
    return favorites.some(item => item.id === bookId);
  };

  // Tüm favorileri temizle
  const clearFavorites = () => {
    setFavorites([]);
  };

  const contextValue: FavoriteContextType = {
    favorites,
    totalFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
} 