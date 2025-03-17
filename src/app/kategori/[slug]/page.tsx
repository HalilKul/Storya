import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getCategoryById } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryContent from './CategoryContent';

type Props = {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function CategoryPage({ params }: Props) {
  const category = getCategoryById(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryContent category={category} />
      </Suspense>
      <Footer />
    </>
  );
}
