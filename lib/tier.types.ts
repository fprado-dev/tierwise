import { ModelOption } from "./model.types";

export type Tier = {
  id: string;
  name: string;
  models: ModelOption[];
  quantity?: TierQuantity;
  margins?: TierMargins;
  useHighestCost?: {
    text?: boolean;
    image?: boolean;
    video?: boolean;
  };
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