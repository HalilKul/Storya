import { notFound } from 'next/navigation';
import { getBookBySlug } from '@/lib/utils';
import BookDetailContent from './client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BookDetailPage({ params }: {
  params: { slug: string }
}) {
  const book = getBookBySlug(params.slug);
  
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