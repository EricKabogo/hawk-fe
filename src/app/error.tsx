// src/app/error.tsx
'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
      <p className="text-gray-600 max-w-md mb-8">
        We're sorry, but there was an error loading this page. Our team has been notified and is working to fix the issue.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset}>Try Again</Button>
        <Link href="/">
          <Button variant="outline">Go to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}