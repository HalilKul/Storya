import { notFound } from 'next/navigation';
import { getCategoryById, categories } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryClientPage from './client';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  let slug = resolvedParams.slug;
  
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
