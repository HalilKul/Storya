export interface Author {
  id: string;
  name: string;
  bio: string;
  image: string;
  birthDate?: string;
  country?: string;
  genres?: string[];
  awards?: string[];
  website?: string;
  quotes?: string[];
  funFacts?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Publisher {
  id: string;
  name: string;
  logo?: string;
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  price: number;
  discountedPrice?: number | null;
  pageCount: number;
  publishDate: string;
  language: string;
  isbn: string;
  authorId: string;
  publisherId: string;
  categories: string[];
  rating: number;
  hasAudio: boolean;
  audioSample?: string | null;
  ageRestriction?: string;
  bestSeller?: boolean;
  featured?: boolean;
  newRelease?: boolean;
} 