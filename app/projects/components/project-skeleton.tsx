'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProjectSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-4 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <div className="flex justify-end space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </Card>
      ))}
    </div>
  );
}