export default function ProductCardSkeleton() {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-64 bg-gray-200" />
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-10 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }