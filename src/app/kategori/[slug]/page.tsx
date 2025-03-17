import { notFound } from 'next/navigation';
import { getCategoryById, categories } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryClientPage from './client';

type PageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function CategoryPage({ params }: PageProps) {
  // Slug'a göre kategori objesi bulalım
  const categoryBySlug = categories.find(cat => cat.slug === params.slug);
  
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
