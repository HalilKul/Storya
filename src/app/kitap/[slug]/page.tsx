'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { getBookBySlug, getAuthorById, getPublisherById, formatDate, formatPrice, starRating, getBooksByAuthor, getCategoryById, getImagePath } from '@/lib/utils';
import { useCart } from '@/lib/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';

export default function BookDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const book = getBookBySlug(params.slug);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  
  // Kitap bulunamadıysa 404 sayfasına yönlendir
  if (!book) {
    notFound();
  }

  const author = getAuthorById(book.authorId);
  const publisher = getPublisherById(book.publisherId);
  const categories = book.categories.map(categoryId => getCategoryById(categoryId)).filter(Boolean);
  const relatedBooks = getBooksByAuthor(book.authorId).filter(relatedBook => relatedBook.id !== book.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(book);
    setIsAdded(true);
    
    // 2 saniye sonra eklendi bildirimini kaldır
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Kitap Görsel Alanı */}
          <div className="md:w-1/3">
            <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={getImagePath(book.coverImage)}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Kitap Bilgileri */}
          <div className="md:w-2/3">
            <div className="flex flex-wrap gap-4 items-center">
              {categories.map(category => (
                <Link 
                  key={category?.id} 
                  href={`/kategori/${category?.slug}`}
                  className="category-badge bg-primary-50 text-primary-700"
                >
                  {category?.name}
                </Link>
              ))}
            </div>

            <h1 className="text-4xl font-bold mt-4 mb-2">{book.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-6">
                <span className="text-yellow-500 mr-2">{starRating(book.rating)}</span>
                <span className="text-gray-600">({book.rating.toFixed(1)})</span>
              </div>
              {book.hasAudio && (
                <div className="flex items-center text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.06-7.073m-2.11 9.9a9 9 0 010-12.728" />
                  </svg>
                  <span>Sesli Kitap Mevcut</span>
                </div>
              )}
            </div>

            <div className="flex items-center mb-6">
              <Link 
                href={`/yazar/${author?.id}`}
                className="flex items-center mr-6 hover:text-primary-600"
              >
                <span className="font-medium">{author?.name}</span>
              </Link>
              
              <Link 
                href={`/yayinevi/${publisher?.id}`}
                className="flex items-center hover:text-primary-600"
              >
                <span className="font-medium">{publisher?.name}</span>
              </Link>
            </div>

            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Sayfa Sayısı</div>
                <div className="font-medium">{book.pageCount}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Dil</div>
                <div className="font-medium">{book.language}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Yayın Tarihi</div>
                <div className="font-medium">{formatDate(book.publishDate)}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">ISBN</div>
                <div className="font-medium">{book.isbn}</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex items-end">
                {book.discountedPrice ? (
                  <div className="flex flex-col">
                    <span className="text-gray-400 line-through text-lg">{formatPrice(book.price)}</span>
                    <span className="text-3xl font-bold text-primary-600">{formatPrice(book.discountedPrice)}</span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary-600">{formatPrice(book.price)}</span>
                )}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className={`px-6 py-3 rounded-md font-medium flex-grow flex items-center justify-center transition-colors ${
                    isAdded 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Sepete Eklendi
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Sepete Ekle
                    </>
                  )}
                </button>
                
                <button className="border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sesli Kitap Bölümü */}
            {book.hasAudio && (
              <div id="sesli-kitap" className="bg-primary-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.06-7.073m-2.11 9.9a9 9 0 010-12.728" />
                  </svg>
                  Sesli Kitap
                </h3>
                <p className="text-gray-700 mb-4">
                  Bu kitabın sesli versiyonunu dinleyebilirsiniz. Aşağıdan bir örnek dinleyebilir veya tam sürümü satın alabilirsiniz.
                </p>
                <div className="audio-player">
                  <audio controls className="w-full">
                    <source src={book.audioSample || "#"} type="audio/mpeg" />
                    Tarayıcınız ses oynatıcıyı desteklemiyor.
                  </audio>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Yazar Bilgisi */}
        {author && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Yazar Hakkında</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-gray-50 p-6 rounded-lg">
              <div className="w-36 h-36 md:w-48 md:h-48 relative rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={getImagePath(author.image)}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{author.name}</h3>
                <p className="text-gray-700 mb-4">{author.bio}</p>
                <Link href={`/yazar/${author.id}`} className="text-primary-600 hover:underline font-medium">
                  Tüm Kitaplarını Gör
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Yazarın Diğer Kitapları */}
        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Yazarın Diğer Kitapları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map(relatedBook => (
                <BookCard key={relatedBook.id} book={relatedBook} hideDescription />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 