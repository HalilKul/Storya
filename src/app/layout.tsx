import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/CartContext';
import { FavoriteProvider } from '@/lib/FavoriteContext';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Storya - Online Kitap Mağazası',
  description: 'Binlerce kitap, e-kitap ve sesli kitap Storya\'da. Hemen keşfedin!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <CartProvider>
          <FavoriteProvider>
            {children}
          </FavoriteProvider>
        </CartProvider>
      </body>
    </html>
  );
} 