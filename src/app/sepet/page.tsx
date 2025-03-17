'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { formatPrice } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleQuantityChange = (bookId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(bookId, newQuantity);
    }
  };

  const handleRemoveItem = (bookId: string) => {
    removeFromCart(bookId);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    
    // Kupon kodu uygulanıyor gibi simüle ediyoruz
    setTimeout(() => {
      setIsApplyingCoupon(false);
      // Gerçek uygulamada burada API çağrısı yapılır
      alert('Kupon kodu geçersiz veya süresi dolmuş.');
    }, 1000);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Alışveriş Sepeti</h1>

        {items.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Sepetiniz boş</h2>
            <p className="text-gray-600 mb-6">Sepetinize henüz ürün eklemediniz. Alışverişe başlamak için kitaplarımıza göz atabilirsiniz.</p>
            <Link 
              href="/"
              className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-medium"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sepet Ürünleri */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-gray-600 font-medium">
                  <div className="col-span-6">Ürün</div>
                  <div className="col-span-2 text-center">Fiyat</div>
                  <div className="col-span-2 text-center">Adet</div>
                  <div className="col-span-2 text-center">Toplam</div>
                </div>

                {items.map((item) => {
                  const itemPrice = item.book.discountedPrice || item.book.price;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div key={item.book.id} className="border-t border-gray-100 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Ürün Bilgisi */}
                        <div className="col-span-6 flex gap-4">
                          <div className="relative w-20 h-28 flex-shrink-0">
                            <Image 
                              src={item.book.coverImage} 
                              alt={item.book.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.book.title}</h3>
                            <div className="text-sm text-gray-500 mb-2">
                              {item.book.hasAudio && (
                                <span className="inline-flex items-center text-primary-600 mr-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.06-7.073m-2.11 9.9a9 9 0 010-12.728" />
                                  </svg>
                                  Sesli
                                </span>
                              )}
                            </div>
                            <button 
                              onClick={() => handleRemoveItem(item.book.id)}
                              className="text-sm text-red-500 hover:text-red-700 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Kaldır
                            </button>
                          </div>
                        </div>

                        {/* Fiyat */}
                        <div className="col-span-2 text-center">
                          <div className="md:hidden text-sm text-gray-500 mb-1">Fiyat:</div>
                          {item.book.discountedPrice ? (
                            <div>
                              <span className="text-gray-400 line-through text-sm block md:inline mr-2">{formatPrice(item.book.price)}</span>
                              <span>{formatPrice(item.book.discountedPrice)}</span>
                            </div>
                          ) : (
                            <span>{formatPrice(item.book.price)}</span>
                          )}
                        </div>

                        {/* Adet */}
                        <div className="col-span-2 flex justify-center">
                          <div className="md:hidden text-sm text-gray-500 mb-1 mr-2">Adet:</div>
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              onClick={() => handleQuantityChange(item.book.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.book.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Toplam */}
                        <div className="col-span-2 text-center font-medium">
                          <div className="md:hidden text-sm text-gray-500 mb-1">Toplam:</div>
                          {formatPrice(itemTotal)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="p-4 border-t border-gray-100 flex justify-between">
                  <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Sepeti Temizle
                  </button>
                  <Link 
                    href="/"
                    className="text-primary-600 hover:text-primary-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Alışverişe Devam Et
                  </Link>
                </div>
              </div>
            </div>

            {/* Sipariş Özeti */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kargo</span>
                    <span>{totalPrice >= 150 ? 'Ücretsiz' : formatPrice(29.90)}</span>
                  </div>
                  {totalPrice < 150 && (
                    <div className="text-sm text-primary-600">
                      {formatPrice(150 - totalPrice)} daha ekleyin, kargo bedava!
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Toplam</span>
                    <span>{formatPrice(totalPrice >= 150 ? totalPrice : totalPrice + 29.90)}</span>
                  </div>
                </div>

                {/* Kupon Kodu */}
                <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                    İndirim Kuponu
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Kupon kodunuz"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon}
                      className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700 transition-colors disabled:bg-primary-400"
                    >
                      {isApplyingCoupon ? 'Uygulanıyor...' : 'Uygula'}
                    </button>
                  </div>
                </div>

                <button className="w-full bg-primary-600 text-white py-3 rounded-md font-medium hover:bg-primary-700 transition-colors">
                  Siparişi Tamamla
                </button>

                <div className="mt-4 text-sm text-gray-500">
                  Siparişi tamamlayarak, <Link href="/kullanim-kosullari" className="text-primary-600 hover:underline">Kullanım Koşulları</Link>nı kabul etmiş olursunuz.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 