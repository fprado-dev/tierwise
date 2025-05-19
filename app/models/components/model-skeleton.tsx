'use client';

import { Card } from '@/components/ui/card';

interface ModelSkeletonProps {
  title: string;
  count?: number;
}

export function ModelSkeleton({ title, count = 4 }: ModelSkeletonProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(count)].map((_, i) => (
          <Card key={i} className="p-4 min-h-60">
            <div className="flex flex-col h-full justify-between gap-3">
              <div className="flex items-center justify-between">
                <div className="h-6 w-1/6 bg-muted rounded-full animate-pulse" />
              </div>
              <div className="h-6 w-1/2 bg-muted rounded animate-pulse" />
              <div className="space-y-1">
                <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                <div className="h-3 w-10 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-muted">
                <div className="h-4 w-20  bg-muted rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-8 w-16 bg-muted rounded animate-pulse" />
                  <div className="h-8 w-16 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}