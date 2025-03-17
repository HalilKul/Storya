import { notFound } from 'next/navigation';
import { getCategoryById } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryClientPage from './client';

type PageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function CategoryPage({ params }: PageProps) {
  const category = getCategoryById(params.slug);

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
