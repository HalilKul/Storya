'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/utils';
import { useCart } from '@/lib/CartContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      window.location.href = `/arama?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className={`bg-white ${isScrolled ? 'shadow-md sticky top-0 z-50 transition-all duration-300' : 'shadow-sm'}`}>
      {/* Ana Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-500 group-hover:from-primary-700 group-hover:to-secondary-600 transition-all duration-300">Storya</h1>
          </Link>

          {/* Arama */}
          <div className="flex-grow max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Kitap, yazar veya yayınevi ara..."
                className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-2 text-gray-500 hover:text-primary-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Kullanıcı Menüsü ve Sepet */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden md:inline">Hesabım</span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                  <Link href="/giris" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">Giriş Yap</Link>
                  <Link href="/kayit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">Kayıt Ol</Link>
                  <Link href="/siparislerim" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">Siparişlerim</Link>
                  <Link href="/favorilerim" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">Favorilerim</Link>
                </div>
              )}
            </div>

            <Link href="/sepet" className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors relative group">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center group-hover:bg-secondary-600 transition-colors">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Sepetim</span>
            </Link>

            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Kategoriler Menüsü */}
      <nav className="bg-gradient-to-r from-primary-50 to-primary-100 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            {/* Kategoriler Dropdown */}
            <div className="relative group">
              <button
                onClick={toggleCategoryMenu}
                className="flex items-center gap-2 py-3 px-4 font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <span>Kategoriler</span>
              </button>
              {isCategoryMenuOpen && (
                <div className="absolute left-0 mt-1 w-60 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      href={`/kategori/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Ana Menü */}
            <div className="hidden md:flex">
              <Link href="/cok-satanlar" className="py-3 px-4 font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Çok Satanlar
              </Link>
              <Link href="/yeni-cikanlar" className="py-3 px-4 font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Yeni Çıkanlar
              </Link>
              <Link href="/indirimli-kitaplar" className="py-3 px-4 font-medium text-gray-700 hover:text-primary-600 transition-colors">
                İndirimli Kitaplar
              </Link>
              <Link href="/sesli-kitaplar" className="py-3 px-4 font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Sesli Kitaplar
              </Link>
              <Link href="/yazarlar" className="py-3 px-4 font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Yazarlar
              </Link>
              <Link href="/yayinevleri" className="py-3 px-4 font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Yayınevleri
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col">
              <Link href="/cok-satanlar" className="py-2 font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Çok Satanlar
              </Link>
              <Link href="/yeni-cikanlar" className="py-2 font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Yeni Çıkanlar
              </Link>
              <Link href="/indirimli-kitaplar" className="py-2 font-medium text-gray-700 hover:text-primary-600 transition-colors">
                İndirimli Kitaplar
              </Link>
              <Link href="/sesli-kitaplar" className="py-2 font-medium text-gray-700 hover:text-primary-600 transition-colors">
                Sesli Kitaplar
              </Link>
              <div className="border-t border-gray-200 mt-2 pt-2">
                <Link href="/yazarlar" className="py-2 block text-gray-700 hover:text-primary-600 transition-colors">Yazarlar</Link>
                <Link href="/yayinevleri" className="py-2 block text-gray-700 hover:text-primary-600 transition-colors">Yayınevleri</Link>
                <Link href="/hakkimizda" className="py-2 block text-gray-700 hover:text-primary-600 transition-colors">Hakkımızda</Link>
                <Link href="/iletisim" className="py-2 block text-gray-700 hover:text-primary-600 transition-colors">İletişim</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 