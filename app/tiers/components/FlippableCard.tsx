'use client';

import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

interface FlippableCardProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  className?: string;
  cardColor?: string;
  isFlipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FlippableCard({ frontContent, backContent, className = '', cardColor = '', setFlipped, isFlipped }: FlippableCardProps) {

  return (
    <div className={`relative w-full min-h-[600px] ${className}`}>
      <div
        className={`w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front side */}
        <Card
          className={`absolute inset-0 w-full h-full backface-hidden cursor-pointer p-6 shadow-md border ${cardColor} ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col h-full">
            {frontContent}
          </div>
        </Card>

        {/* Back side */}
        <Card
          className={`absolute inset-0 w-full h-full backface-hidden cursor-pointer p-6 shadow-md border rotate-y-180 ${cardColor} ${isFlipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col h-full">
            {backContent}
          </div>
        </Card>
      </div>
    </div>
  );
}