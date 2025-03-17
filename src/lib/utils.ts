import { Book, Author, Category, Publisher } from "./types";
import booksData from "../data/books.json";
import booksData2 from "../data/books-part2.json";
import booksData3 from "../data/books-part3.json";
import authorsData from "../data/authors.json";
import authorsData2 from "../data/authors-part2.json";
import categoriesData from "../data/categories.json";
import publishersData from "../data/publishers.json";

// Tüm kitapları birleştir
export const books: Book[] = [...booksData, ...booksData2, ...booksData3];
export const authors: Author[] = [...authorsData, ...authorsData2];
export const categories: Category[] = categoriesData;
export const publishers: Publisher[] = publishersData;

// Resim yollarını düzgün şekilde işleme fonksiyonu
export const getImagePath = (imagePath: string): string => {
  if (!imagePath) return '/img/placeholder.jpg';
  
  // public/ ile başlayan yolları düzeltme
  if (imagePath.startsWith('public/')) {
    return imagePath.replace('public/', '/');
  }
  
  // Zaten / ile başlıyorsa veya http/https URL ise değiştirmeden döndür
  if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Diğer tüm durumlarda başına / ekle
  return `/${imagePath}`;
};

// Kitapları filtreleme fonksiyonları
export const getBestSellers = (): Book[] => {
  return books.filter(book => book.bestSeller);
};

export const getFeaturedBooks = (): Book[] => {
  return books.filter(book => book.featured);
};

export const getNewReleases = (): Book[] => {
  return books.filter(book => book.newRelease);
};

export const getBooksByCategory = (categoryId: string): Book[] => {
  return books.filter(book => book.categories.includes(categoryId));
};

export const getBooksByAuthor = (authorId: string): Book[] => {
  return books.filter(book => book.authorId === authorId);
};

export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

export const getBookBySlug = (slug: string): Book | undefined => {
  return books.find(book => book.slug === slug);
};

export const getAuthorById = (id: string): Author | undefined => {
  return authors.find(author => author.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getPublisherById = (id: string): Publisher | undefined => {
  return publishers.find(publisher => publisher.id === id);
};

export const getBooksByAgeRange = (minAge: number, maxAge: number): Book[] => {
  return books.filter(book => {
    if (!book.ageRestriction) return false;
    const age = parseInt(book.ageRestriction);
    return !isNaN(age) && age >= minAge && age <= maxAge;
  });
};

export const getChildrenBooks = (): Book[] => {
  return books.filter(book => {
    if (!book.ageRestriction) return false;
    const age = parseInt(book.ageRestriction);
    return !isNaN(age) && age <= 12;
  });
};

export const searchBooks = (query: string): Book[] => {
  const lowerCaseQuery = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(lowerCaseQuery) ||
    book.description.toLowerCase().includes(lowerCaseQuery)
  );
};

export const getDiscountedBooks = (): Book[] => {
  return books.filter(book => book.discountedPrice !== undefined && book.discountedPrice !== null);
};

export const getAudioBooks = (): Book[] => {
  return books.filter(book => book.hasAudio);
};

// Tarih ve para biçimlendirme
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('tr-TR', options);
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
};

// Yıldız değerlendirmesi gösterme için yardımcı fonksiyon
export const starRating = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return `${'★'.repeat(fullStars)}${halfStar ? '½' : ''}${'☆'.repeat(emptyStars)}`;
};

// Slug oluşturma fonksiyonu (Türkçe karakterleri destekler)
export const createSlug = (text: string): string => {
  const trMap: Record<string, string> = {
    'çÇ': 'c',
    'ğĞ': 'g',
    'şŞ': 's',
    'üÜ': 'u',
    'ıİ': 'i',
    'öÖ': 'o'
  };
  
  for (let key in trMap) {
    text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
  }
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}; 