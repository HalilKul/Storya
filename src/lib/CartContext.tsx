'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from './types';

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Local storage'dan sepeti yükle
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Sepet yüklenirken hata oluştu:', error);
      }
    }
  }, []);

  // Sepet güncellendiğinde local storage'a kaydet ve toplamları güncelle
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Toplam ürün sayısını hesapla
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    setTotalItems(itemCount);
    
    // Toplam fiyatı hesapla
    const price = items.reduce((total, item) => {
      const itemPrice = item.book.discountedPrice || item.book.price;
      return total + (itemPrice * item.quantity);
    }, 0);
    setTotalPrice(price);
  }, [items]);

  // Sepete ürün ekle
  const addToCart = (book: Book) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.book.id === book.id);
      
      if (existingItem) {
        // Ürün zaten sepette varsa, miktarını artır
        return prevItems.map(item => 
          item.book.id === book.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Ürün sepette yoksa, yeni ekle
        return [...prevItems, { book, quantity: 1 }];
      }
    });
  };

  // Sepetten ürün çıkar
  const removeFromCart = (bookId: string) => {
    setItems(prevItems => prevItems.filter(item => item.book.id !== bookId));
  };

  // Ürün miktarını güncelle
  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.book.id === bookId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Sepeti temizle
  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 