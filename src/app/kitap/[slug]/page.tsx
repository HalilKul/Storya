import { notFound } from 'next/navigation';
import { getBookBySlug } from '@/lib/utils';
import BookDetailContent from './client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BookDetailPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const book = getBookBySlug(resolvedParams.slug);
  
  // Kitap bulunamadıysa 404 sayfasına yönlendir
  if (!book) {
    notFound();
  }

  return (
    <>
      <Header />
      <BookDetailContent book={book} />
      <Footer />
    </>
  );
} 