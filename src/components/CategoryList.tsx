import Link from 'next/link';
import { categories } from '@/lib/utils';

export default function CategoryList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {categories.map(category => (
        <Link
          key={category.id}
          href={`/kategori/${category.slug}`}
          className="category-badge bg-primary-50 hover:bg-primary-100 transition-colors hover:shadow text-primary-800 py-3 px-4 rounded-lg text-center text-sm"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
} 