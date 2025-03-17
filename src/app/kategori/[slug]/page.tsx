import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getBooksByCategory, getChildrenBooks } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find(cat => cat.slug === params.slug);
  
  if (!category) {
    notFound();
  }
  
  // Çocuk kitapları kategorisi için özel işlem
  const books = params.slug === 'cocuk-kitaplari' 
    ? getChildrenBooks() 
    : getBooksByCategory(category.id);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="bg-primary-50 p-8 rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-4 text-primary-800">{category.name} Kitapları</h1>
          <p className="text-gray-600">
            Bu sayfada {category.name} kategorisindeki tüm kitapları bulabilirsiniz. 
            Aşağıda listelenmiş olan {books.length} kitap arasından size uygun olanı seçebilirsiniz.
          </p>
        </div>

        {/* Filtreler ve Sıralama */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Toplam {books.length} kitap</span>
          </div>
          <div className="flex gap-4">
            <select className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="popularity">Popülerliğe Göre</option>
              <option value="price_low">Fiyat (Düşükten Yükseğe)</option>
              <option value="price_high">Fiyat (Yüksekten Düşüğe)</option>
              <option value="newest">En Yeniler</option>
              <option value="rating">Puanı Yüksek</option>
            </select>
          </div>
        </div>

        {/* Kitap Listesi */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Bu kategoride henüz kitap bulunmuyor</h2>
            <p className="text-gray-600 mb-4">Lütfen başka bir kategori seçin veya daha sonra tekrar deneyin.</p>
            <Link href="/" className="text-primary-600 hover:underline font-medium">
              Anasayfaya Dön
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 