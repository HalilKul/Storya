import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-primary-600 mb-6">404</h1>
        <h2 className="text-3xl font-bold mb-4">Sayfa Bulunamadı</h2>
        <p className="text-gray-600 max-w-md mb-8">
          Aradığınız sayfa taşınmış, silinmiş olabilir veya hiç var olmamış olabilir.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/"
            className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-medium"
          >
            Anasayfaya Dön
          </Link>
          <Link 
            href="/iletisim"
            className="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            İletişime Geç
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
