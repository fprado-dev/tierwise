'use client';

import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

interface FlippableCardProps {
  frontContent: ReactNode;
  className?: string;
  cardColor?: string;
}

export function FlippableCard({ frontContent, className = '', cardColor = '' }: FlippableCardProps) {

  return (
    <div className={`relative w-full h-fit ${className}`}>
      <div
        className={`w-full h-full transition-all duration-500 preserve-3d `}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front side */}
        <Card
          className={`absolute inset-0 w-full h-full backface-hidden p-6 shadow-md border ${cardColor}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col h-full">
            {frontContent}
          </div>
        </Card>


      </div>
    </div>
  );
}