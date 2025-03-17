import { notFound } from 'next/navigation';
import { getCategoryById, categories } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryClientPage from './client';

export default function CategoryPage({ params }: {
  params: { slug: string }
}) {
  let slug = params.slug;
  
  // "cocuk" slug'ı için özel durum - "cocuk-kitaplari" slug'ına yönlendir
  if (slug === 'cocuk') {
    slug = 'cocuk-kitaplari';
  }
  
  // Slug'a göre kategori objesi bulalım
  const categoryBySlug = categories.find(cat => cat.slug === slug);
  
  // Kategori bulunamazsa 404
  if (!categoryBySlug) {
    notFound();
  }
  
  // ID'ye göre kategori verilerini alalım
  const category = getCategoryById(categoryBySlug.id);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <CategoryClientPage category={category} />
      <Footer />
    </>
  );
}
