'use client';

export function TierSummarySkeleton() {
  return (
    <div className='w-full bg-sidebar rounded-xl p-8 shadow-md border border-primary/10 overflow-hidden relative animate-pulse'>
      <div className="relative z-10">
        <div className='flex justify-between w-full items-start'>
          <div>
            {/* Title skeleton */}
            <div className='h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2'></div>
            {/* Description skeleton */}
            <div className='h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded'></div>
          </div>
          {/* Button skeleton */}
          <div className='h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded'></div>
        </div>

        {/* Header section skeleton */}
        <div className="flex items-start justify-between mt-6">
          {/* Badge skeleton */}
          <div className='h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>

          {/* Controls skeleton */}
          <div className="flex items-center gap-2">
            <div className='h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full'></div>
            <div className='h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded'></div>
            <div className='h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded'></div>
          </div>
        </div>

        {/* Main pricing card skeleton */}
        <div className='grid grid-cols-4 gap-4 my-4 min-h-40'>
          {/* SUGGESTED skeleton */}
          <div className="flex col-span-4 flex-col items-center border justify-center bg-sidebar rounded-lg p-4">
            <div className='flex items-center justify-center gap-1 mb-2'>
              <div className='h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded'></div>
            </div>
            <div className='h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded'></div>
          </div>

          {/* BASE COST skeleton */}
          <div className="col-span-2 flex flex-col items-center border justify-center bg-sidebar rounded-lg p-4">
            <div className='flex items-center justify-center gap-1 mb-2'>
              <div className='h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded'></div>
            </div>
            <div className='h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded'></div>
          </div>

          {/* PROFIT MARGIN skeleton */}
          <div className="col-span-2 flex flex-col items-center justify-center border bg-sidebar rounded-lg p-4">
            <div className='flex items-center justify-center gap-1 mb-2'>
              <div className='h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded'></div>
            </div>
            <div className='h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TierSummarySkeletonGrid() {
  // Create an array of 3 items to render 3 skeleton cards
  return (
    <div className="grid px-4 mb-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <TierSummarySkeleton key={item} />
      ))}
    </div>
  );
}