import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="text-3xl font-bold mb-4 -mt-12">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        We couldn&apos;t find the page you were looking for. The page may have been moved, deleted, or never existed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button>Go to Homepage</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline">Browse Products</Button>
        </Link>
      </div>
    </div>
  );
}