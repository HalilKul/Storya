import { notFound } from 'next/navigation';
import { getAuthorById } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthorContent from './client';

export default function AuthorPage({ params }: {
  params: { id: string }
}) {
  const author = getAuthorById(params.id);
  
  if (!author) {
    notFound();
  }

  return (
    <>
      <Header />
      <AuthorContent author={author} />
      <Footer />
    </>
  );
} 