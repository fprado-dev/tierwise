// import { ModelOption } from "./model.types";

import { Model } from "./supabase/model.service";




// Define a type for the join table result
export type TierModelJoin = {
  models_default: Model;
};

// Update the Tier type to match the query structure
export type Tier = {
  id: string;
  project_id: string;
  user_id: string;
  name: string;
  created_at: string;
  // Other tier properties
  tiers_models?: TierModelJoin[]; // This matches your query structure
};

// If you want a processed version with direct models array
export type ProcessedTier = Omit<Tier, 'tiers_models'> & {
  models: Model[];
};



export interface TierQuantity {
  textTokens?: {
    input: number;
    output: number;
  };
  imageCount?: number;
  videoSeconds?: number;
}

export interface TierMargins {
  text?: number;
  image?: number;
  video?: number;
}