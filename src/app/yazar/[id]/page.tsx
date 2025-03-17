import { notFound } from 'next/navigation';
import { getAuthorById } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthorContent from './client';

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AuthorPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const author = getAuthorById(resolvedParams.id);
  
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