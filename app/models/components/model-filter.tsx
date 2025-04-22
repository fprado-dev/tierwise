'use client';

import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Cpu, FileText, Image, Video } from 'lucide-react';

interface ModelFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTypes: string[];
  onTypeChange: (value: string[]) => void;
}

export function ModelFilter({
  searchTerm,
  onSearchChange,
  selectedTypes,
  onTypeChange,
}: ModelFilterProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text': return 'bg-blue-100 text-blue-800';
      case 'image': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'audio': return 'bg-yellow-100 text-yellow-800';
      case 'hardware': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        placeholder="Search models..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:w-64"
      />
      <ToggleGroup
        type="multiple"
        value={selectedTypes}
        onValueChange={onTypeChange}
        className="flex flex-wrap gap-2"
      >
        <ToggleGroupItem value="text" className={getTypeColor('text')}>
          <FileText className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="image" className={getTypeColor('image')}>
          <Image className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="video" className={getTypeColor('video')}>
          <Video className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="hardware" className={getTypeColor('hardware')}>
          <Cpu className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}