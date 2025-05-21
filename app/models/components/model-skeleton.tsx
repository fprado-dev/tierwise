'use client';

import { Card } from '@/components/ui/card';

interface ModelSkeletonProps {
  count?: number;
}

export function ModelSkeleton({ count = 4 }: ModelSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <Card
          key={i}
          className="flex flex-col justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-pulse"
        >
          {/* Header: Badge placeholders */}
          <div className="flex justify-between items-center my-2">
            <div className="h-6 w-6 rounded-full bg-gray-300" />
            <div className="flex gap-2">
              <div className="h-5 w-10 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Model name placeholder */}
          <div className="h-4 w-3/4 rounded bg-gray-300 mb-1" />

          {/* Cost info placeholders */}
          <div className="space-y-1 mb-2">
            <div className="h-4 w-1/2 rounded bg-gray-300" />
            <div className="h-4 w-1/3 rounded bg-gray-300" />
          </div>

          {/* Footer: date and buttons placeholders */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-300">
            <div className="h-4 w-20 rounded bg-gray-300" />
            <div className="flex gap-3">
              <div className="h-5 w-12 rounded bg-gray-300" />
              <div className="h-5 w-12 rounded bg-gray-300" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
