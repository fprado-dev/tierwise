// --- Interfaces (Define or import from a shared types file) ---
export interface ImageModel {
  model: string;
  costPerImage: number;
}

export interface TextModel {
  model: string;
  inputCostPerMillion: number;
  outputCostPerMillion: number;
  provider?: string;
  size?: string;
  family?: string;
}

export interface VideoModel {
  model: string;
  costPerSecond: number;
  resolution?: string | null;
  type?: string;
}

export interface HardwareOption {
  name: string;
  id: string;
  pricePerSec: number;
  pricePerHour: number;
  gpuCount?: number;
  cpuMultiplier?: string;
  gpuRam?: string | null;
  ram?: string;
}

// Union type for all possible model/option types
export type ModelOption = ImageModel | TextModel | VideoModel | HardwareOption;

// Define ModelType enum or string literal union
export type ModelType = 'image' | 'text' | 'video' | 'hardware';