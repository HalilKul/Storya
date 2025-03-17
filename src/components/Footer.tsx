'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada e-posta aboneliği işlemi yapılabilir
    alert(`${email} adresine bülten aboneliği başarıyla kaydedildi.`);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Storya</h3>
            <p className="text-gray-300 mb-4">
              Binlerce kitap, e-kitap ve sesli kitapla Türkiye'nin en büyük online kitap mağazası.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li><Link href="/kategori/roman" className="text-gray-300 hover:text-white transition-colors">Roman</Link></li>
              <li><Link href="/kategori/bilim-kurgu" className="text-gray-300 hover:text-white transition-colors">Bilim Kurgu</Link></li>
              <li><Link href="/kategori/polisiye" className="text-gray-300 hover:text-white transition-colors">Polisiye</Link></li>
              <li><Link href="/kategori/tarih" className="text-gray-300 hover:text-white transition-colors">Tarih</Link></li>
              <li><Link href="/kategori/felsefe" className="text-gray-300 hover:text-white transition-colors">Felsefe</Link></li>
              <li><Link href="/kategori/psikoloji" className="text-gray-300 hover:text-white transition-colors">Psikoloji</Link></li>
              <li><Link href="/kategori/cocuk" className="text-gray-300 hover:text-white transition-colors">Çocuk Kitapları</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Yardım</h3>
            <ul className="space-y-2">
              <li><Link href="/sss" className="text-gray-300 hover:text-white transition-colors">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="/kargo-ve-teslimat" className="text-gray-300 hover:text-white transition-colors">Kargo ve Teslimat</Link></li>
              <li><Link href="/iade-kosullari" className="text-gray-300 hover:text-white transition-colors">İade Koşulları</Link></li>
              <li><Link href="/gizlilik-politikasi" className="text-gray-300 hover:text-white transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/kullanim-kosullari" className="text-gray-300 hover:text-white transition-colors">Kullanım Koşulları</Link></li>
              <li><Link href="/iletisim" className="text-gray-300 hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">E-Bülten</h3>
            <p className="text-gray-300 mb-4">
              Yeni çıkan kitaplar ve özel indirimlerden haberdar olmak için bültenimize abone olun.
            </p>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 rounded-l-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  Abone Ol
                </button>
              </div>
            </form>

            <div>
              <h4 className="font-bold text-gray-300 mb-2">Ödeme Yöntemleri</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <svg viewBox="0 0 60 40" className="w-full h-full">
                      <path d="M60 35H0V5h60v30z" fill="#fff"/>
                      <path d="M37 20.8c0 6.4-5.2 11.6-11.6 11.6-6.4 0-11.6-5.2-11.6-11.6 0-6.4 5.2-11.6 11.6-11.6 6.4 0 11.6 5.2 11.6 11.6z" fill="#EB001B"/>
                      <path d="M46.2 20.8c0 6.4-5.2 11.6-11.6 11.6-6.4 0-11.6-5.2-11.6-11.6 0-6.4 5.2-11.6 11.6-11.6 6.4 0 11.6 5.2 11.6 11.6z" fill="#F79E1B"/>
                      <path d="M41.6 20.8c0-3.9-1.8-7.4-4.6-9.6-2.8 2.2-4.6 5.7-4.6 9.6 0 3.9 1.8 7.4 4.6 9.6 2.8-2.2 4.6-5.7 4.6-9.6z" fill="#FF5F00"/>
                    </svg>
                  </div>
                </div>
                <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <svg viewBox="0 0 60 40" className="w-full h-full">
                      <path d="M60 35H0V5h60v30z" fill="#fff"/>
                      <path d="M25 25.15h-5.11l3.19-19.65h5.11L25 25.15z" fill="#00579f"/>
                      <path d="M42.85 6c-1.79 0-3.58.33-5.09.92l.76-4.69h-5.15l-5.35 22.92h5.15l3.06-15.13c1.25-.64 2.69-1.24 4.34-1.24 2.35 0 3.45 1.24 3.06 3.7l-3.14 12.67h5.15l3.25-13.25c.65-3.95-1.92-5.9-6.04-5.9z" fill="#00579f"/>
                      <path d="M18.1 6c-6.01 0-9.89 3.11-9.89 7.52 0 3.3 2.9 5.13 5.11 6.23 2.27 1.11 3.03 1.83 3.03 2.81 0 1.5-1.82 2.18-3.49 2.18-2.94 0-4.52-.41-6.94-1.41l-.96 4.6c1.75.77 5 1.43 8.38 1.43 6.37 0 10.5-3.05 10.5-7.7 0-2.93-2.24-5.01-5.11-6.22-2.27-1.01-3.03-1.7-3.03-2.81 0-1.37 1.62-1.97 3.25-1.97 2.3 0 4.06.48 5.94 1.17l.96-4.47C24.63 6.53 21.57 6 18.1 6z" fill="#00579f"/>
                    </svg>
                  </div>
                </div>
                <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <svg viewBox="0 0 60 40" className="w-full h-full">
                      <path d="M60 35H0V5h60v30z" fill="#fff"/>
                      <path d="M22.5 22.83l1.74-10.81h2.77l-1.74 10.81H22.5z" fill="#006FCF"/>
                      <path d="M33.25 12.27c-.57-.22-1.46-.46-2.57-.46-2.83 0-4.82 1.51-4.83 3.66-.02 1.6 1.42 2.48 2.51 3.01 1.12.54 1.49.89 1.49 1.37-.01.74-.89 1.07-1.71 1.07-1.14 0-1.75-.16-2.69-.56l-.37-.17-.4 2.48c.67.31 1.9.58 3.19.59 3 0 4.95-1.48 4.97-3.79.01-1.26-.75-2.22-2.41-3.01-1-.51-1.62-.85-1.61-1.36.01-.46.51-.94 1.61-.94.92-.02 1.59.19 2.11.41l.25.12.38-2.42z" fill="#006FCF"/>
                      <path d="M38.08 18.94c.23-.63 1.12-3.04 1.12-3.04-.01.03.23-.63.37-1.04l.19.92s.54 2.58.65 3.16h-2.33zm3.46-6.92h-2.13c-.66 0-1.16.19-1.44.87l-4.11 9.76h2.91l.58-1.59h3.54l.33 1.59h2.57l-2.25-10.63z" fill="#006FCF"/>
                      <path d="M20.69 12.31l-2.73 7.31-.29-1.47c-.51-1.72-2.1-3.58-3.88-4.51l2.51 9.19h2.97l4.41-10.52h-2.99z" fill="#006FCF"/>
                      <path d="M15.84 12.31H11.2l-.04.23c3.65.93 6.04 3.17 7.04 5.86l-1.02-5.14c-.17-.7-.69-.91-1.34-.95z" fill="#006FCF"/>
                    </svg>
                  </div>
                </div>
                <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <svg viewBox="0 0 60 40" className="w-full h-full">
                      <path d="M60 35H0V5h60v30z" fill="#fff"/>
                      <path d="M39.98 27h-7.95c-1.13 0-2.05-.92-2.05-2.05V15.05c0-1.13.92-2.05 2.05-2.05h7.95c1.13 0 2.05.92 2.05 2.05v9.9c0 1.13-.92 2.05-2.05 2.05z" fill="#5F6368"/>
                      <path d="M28.43 20.42l-3.97-7.42h-1.92v13.9h1.92V16.1l3.62 6.76h.7l3.62-6.76v10.8h1.92v-13.9h-1.92l-3.97 7.42z" fill="#5F6368"/>
                      <path d="M15.77 13h-3.09c-1.13 0-2.05.92-2.05 2.05v9.9c0 1.13.92 2.05 2.05 2.05h3.09c3.04 0 5.24-2.4 5.24-7s-2.2-7-5.24-7zm0 11.9h-2.05V15.05h2.05c1.93 0 3.32 1.5 3.32 4.95s-1.39 4.9-3.32 4.9z" fill="#5F6368"/>
                    </svg>
                  </div>
                </div>
                <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <svg viewBox="0 0 60 40" className="w-full h-full">
                      <path d="M60 35H0V5h60v30z" fill="#fff"/>
                      <path d="M20.2 13.83c-.5.04-.95.33-1.2.77-2.76-.7-5.63 1.22-5.74 1.3-.06.04-.1.1-.1.17 0 .04 0 .07.02.1.03.07.1.12.18.12h.05c.8-.1 1.6-.15 2.38-.15 1.76 0 3.44.3 5.02.85-.5.95-.26 2.13.6 2.9 1.36 1.24 3.4.36 3.44.34.04-.02.07-.05.1-.1.02-.04.02-.08.02-.12-.02-.08-.08-.14-.16-.16-.76-.1-1.37-.54-1.62-1.22.76-.45 1.4-1.08 1.86-1.84.06-.1.03-.23-.07-.3-.8-.6-1.72-.95-2.7-1.02-.04-.68-.42-1.27-1-.56-.03-.06-.07-.08-.05-.1z" fill="#F7931A"/>
                      <path d="M27.7 12.92h1.22v4.9h1.22v-6.1h-2.44v1.22zm12.83 3.67v-1.23h-2.44v-2.44h-1.22v6.1H38.1v-2.45h2.44zm-6.1-3.67h1.22v4.9h1.22v-4.9h1.22v-1.22h-3.67v1.22zm-3.68 0h1.22v4.9h1.22v-6.1h-2.44v1.22zm-2.45 4.9h1.22v-6.1h-1.22v6.1zm-13.02-.02c.7 0 1.27-.57 1.27-1.27 0-.7-.57-1.27-1.27-1.27s-1.27.57-1.27 1.27c0 .7.57 1.27 1.27 1.27zm13.23-9.8c2.37 0 4.5 1 6.03 2.6-1.36 1.14-2.23 2.85-2.23 4.77 0 1.92.87 3.64 2.23 4.78-1.53 1.6-3.66 2.6-6.03 2.6-4.62 0-8.36-3.75-8.36-8.37 0-4.63 3.74-8.37 8.36-8.37zm0-1.23c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c2.55 0 4.87-1 6.58-2.63 1.7-1.62 2.76-3.8 2.76-6.14v-.83c0-5.3-4.3-9.6-9.6-9.6h.26z" fill="#F7931A"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Storya. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}