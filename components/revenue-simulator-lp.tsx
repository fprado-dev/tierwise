import { Slider } from "@/components/ui/slider";
import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

// Define types for models
interface TextModel {
  id: string;
  name: string;
  provider: string;
  inputCost: number;
  outputCost: number;
  tokensBasic: number;
  tokensPro: number;
  tokensPremium: number;
  icon: string;
  type: 'text';
}

interface ImageModel {
  id: string;
  name: string;
  provider: string;
  cost: number;
  imagesBasic: number;
  imagesPro: number;
  imagesPremium: number;
  icon: string;
  type: 'image';
}

interface VideoModel {
  id: string;
  name: string;
  provider: string;
  cost: number;
  secondsBasic: number;
  secondsPro: number;
  secondsPremium: number;
  icon: string;
  type: 'video';
}

// Define types for model costs
interface TextModelCost {
  name: string;
  provider: string;
  cost: number;
  tokensPerUser: number;
  icon: string;
  type: 'text';
}

interface ImageModelCost {
  name: string;
  provider: string;
  cost: number;
  imagesPerUser: number;
  icon: string;
  type: 'image';
}

interface VideoModelCost {
  name: string;
  provider: string;
  cost: number;
  secondsPerUser: number;
  icon: string;
  type: 'video';
}

// Define types for tier pricing
interface TierModels {
  text: TextModel[];
  image: ImageModel[];
  video: VideoModel[];
}

interface TierPricing {
  basePrice: number;
  userMultiplier: number;
  models: TierModels;
}

interface TierPricingMap {
  basic: TierPricing;
  pro: TierPricing;
  premium: TierPricing;
}

// Define model data
const modelData: {
  text: TextModel[];
  image: ImageModel[];
  video: VideoModel[];
} = {
  text: [
    {
      id: 'gpt4o',
      name: 'GPT-4o',
      provider: 'OpenAI',
      inputCost: 1.00,
      outputCost: 2.00,
      tokensBasic: 500000,
      tokensPro: 1000000,
      tokensPremium: 2500000,
      icon: '📝',
      type: 'text'
    },
    {
      id: 'claude3opus',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      inputCost: 1.50,
      outputCost: 3.00,
      tokensBasic: 400000,
      tokensPro: 900000,
      tokensPremium: 2000000,
      icon: '🧠',
      type: 'text'
    },
    {
      id: 'llama3',
      name: 'Llama 3',
      provider: 'Meta',
      inputCost: 0.80,
      outputCost: 1.50,
      tokensBasic: 600000,
      tokensPro: 1200000,
      tokensPremium: 3000000,
      icon: '🦙',
      type: 'text'
    },
    {
      id: 'gemini',
      name: 'Gemini Pro',
      provider: 'Google',
      inputCost: 1.20,
      outputCost: 2.50,
      tokensBasic: 0,
      tokensPro: 800000,
      tokensPremium: 1800000,
      icon: '💎',
      type: 'text'
    },
    {
      id: 'mistral',
      name: 'Mistral Large',
      provider: 'Mistral AI',
      inputCost: 0.90,
      outputCost: 1.80,
      tokensBasic: 0,
      tokensPro: 700000,
      tokensPremium: 1500000,
      icon: '🌪️',
      type: 'text'
    },
    {
      id: 'command',
      name: 'Command R+',
      provider: 'Cohere',
      inputCost: 1.10,
      outputCost: 2.20,
      tokensBasic: 0,
      tokensPro: 0,
      tokensPremium: 1200000,
      icon: '🎮',
      type: 'text'
    }
  ],
  image: [
    {
      id: 'dalle3',
      name: 'DALL-E 3',
      provider: 'OpenAI',
      cost: 0.04,
      imagesBasic: 100,
      imagesPro: 500,
      imagesPremium: 2000,
      icon: '🎨',
      type: 'image'
    },
    {
      id: 'midjourney',
      name: 'Midjourney v6',
      provider: 'Midjourney',
      cost: 0.05,
      imagesBasic: 80,
      imagesPro: 400,
      imagesPremium: 1500,
      icon: '🖼️',
      type: 'image'
    },
    {
      id: 'sdxl',
      name: 'Stable Diffusion XL',
      provider: 'Stability AI',
      cost: 0.03,
      imagesBasic: 120,
      imagesPro: 600,
      imagesPremium: 2500,
      icon: '📷',
      type: 'image'
    },
    {
      id: 'imagen',
      name: 'Imagen 2',
      provider: 'Google',
      cost: 0.04,
      imagesBasic: 0,
      imagesPro: 450,
      imagesPremium: 1800,
      icon: '🖌️',
      type: 'image'
    },
    {
      id: 'firefly',
      name: 'Firefly',
      provider: 'Adobe',
      cost: 0.05,
      imagesBasic: 0,
      imagesPro: 0,
      imagesPremium: 1600,
      icon: '🔥',
      type: 'image'
    }
  ],
  video: [
    {
      id: 'sora',
      name: 'Sora',
      provider: 'OpenAI',
      cost: 0.20,
      secondsBasic: 30,
      secondsPro: 120,
      secondsPremium: 600,
      icon: '🎬',
      type: 'video'
    },
    {
      id: 'runway',
      name: 'Gen-2',
      provider: 'Runway',
      cost: 0.15,
      secondsBasic: 0,
      secondsPro: 90,
      secondsPremium: 450,
      icon: '📹',
      type: 'video'
    },
    {
      id: 'pika',
      name: 'Pika 1.0',
      provider: 'Pika Labs',
      cost: 0.12,
      secondsBasic: 0,
      secondsPro: 0,
      secondsPremium: 300,
      icon: '⚡',
      type: 'video'
    }
  ]
};

// Define tier pricing
const tierPricing: TierPricingMap = {
  basic: {
    basePrice: 19,
    userMultiplier: 0.05,
    models: {
      text: modelData.text.slice(0, 3),
      image: modelData.image.slice(0, 3),
      video: modelData.video.slice(0, 1)
    }
  },
  pro: {
    basePrice: 49,
    userMultiplier: 0.1,
    models: {
      text: modelData.text.slice(0, 5),
      image: modelData.image.slice(0, 4),
      video: modelData.video.slice(0, 2)
    }
  },
  premium: {
    basePrice: 99,
    userMultiplier: 0.15,
    models: {
      text: modelData.text,
      image: modelData.image,
      video: modelData.video
    }
  }
};

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Type for tier selection
type TierType = 'basic' | 'pro' | 'premium';

// Type for model type selection
type ModelType = 'text' | 'image' | 'video';

const MinimalRevenueSimulator: React.FC = () => {
  const [users, setUsers] = useState<number>(100);
  const [tier, setTier] = useState<TierType>('pro');
  const [totalCost, setTotalCost] = useState<number>(0);
  const [perUserCost, setPerUserCost] = useState<number>(0);
  const [suggestedPrice, setSuggestedPrice] = useState<number>(0);

  // Calculate costs based on users and tier
  useEffect(() => {
    const selectedTier = tierPricing[tier];
    const basePrice = selectedTier.basePrice;
    const userFactor = selectedTier.userMultiplier * users;

    // Calculate base subscription cost
    const subscriptionCost = basePrice + userFactor;

    // Calculate costs for each model in the tier
    let totalModelCost = 0;

    // Calculate for text models
    selectedTier.models.text.forEach((model: TextModel) => {
      const availableTokens = model[`tokens${tier.charAt(0).toUpperCase() + tier.slice(1)}` as keyof TextModel] as number;

      if (availableTokens > 0) {
        // Assume 60% input, 40% output for token distribution
        const inputTokens = availableTokens * 0.6;
        const outputTokens = availableTokens * 0.4;

        const inputCost = (inputTokens / 1000000) * model.inputCost;
        const outputCost = (outputTokens / 1000000) * model.outputCost;
        const modelCost = inputCost + outputCost;

        totalModelCost += modelCost;
      }
    });

    // Calculate for image models
    selectedTier.models.image.forEach((model: ImageModel) => {
      const availableImages = model[`images${tier.charAt(0).toUpperCase() + tier.slice(1)}` as keyof ImageModel] as number;

      if (availableImages > 0) {
        const modelCost = availableImages * model.cost;
        totalModelCost += modelCost;
      }
    });

    // Calculate for video models
    selectedTier.models.video.forEach((model: VideoModel) => {
      const availableSeconds = model[`seconds${tier.charAt(0).toUpperCase() + tier.slice(1)}` as keyof VideoModel] as number;

      if (availableSeconds > 0) {
        const modelCost = availableSeconds * model.cost;
        totalModelCost += modelCost;
      }
    });

    // Set total cost and derived values
    const finalCost = subscriptionCost + totalModelCost;
    setTotalCost(finalCost);
    setPerUserCost(finalCost / users);
    setSuggestedPrice((finalCost / users) * 3);
  }, [users, tier]);

  // Get model counts for each tier
  const getModelCounts = () => {
    return {
      basic: tierPricing.basic.models.text.length + tierPricing.basic.models.image.length + tierPricing.basic.models.video.length,
      pro: tierPricing.pro.models.text.length + tierPricing.pro.models.image.length + tierPricing.pro.models.video.length,
      premium: tierPricing.premium.models.text.length + tierPricing.premium.models.image.length + tierPricing.premium.models.video.length
    };
  };

  const modelCounts = getModelCounts();

  return (
    <section
      id="revenue-simulator"
      className="py-16 bg-white"
      aria-labelledby="simulator-heading"
    >
      <div className="max-w-5xl mx-auto px-4 ">
        <div className="text-center mb-10">
          <div className="inline-block mb-4 px-4 py-1 text-pretty bg-gradient-to-r from-brand to-brand-darker text-white rounded-full text-xs">
            Revenue Simulator
          </div>
          <h2 id="simulator-heading" className="text-2xl md:text-3xl text-brand font-bold mb-2">
            Calculate Your AI Pricing Strategy
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Adjust users and tier to find your optimal pricing
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-6">
              {/* Monthly Users Slider */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Monthly Active Users</label>
                  <span className="text-sm font-bold">{users}</span>
                </div>
                <Slider
                  value={[users]}
                  min={10}
                  max={1000}
                  step={10}
                  onValueChange={(value: number[]) => setUsers(value[0])}
                  className="w-full"
                />
              </div>

              {/* Tier Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Pricing Tier</label>
                <Tabs value={tier} onValueChange={(value: string) => setTier(value as TierType)} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="basic">
                      <div className="flex flex-col">
                        <span>Basic</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="pro">
                      <div className="flex flex-col">
                        <span>Pro</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="premium">
                      <div className="flex flex-col">
                        <span>Premium</span>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Tier Details */}
              <div className="bg-gray-50 rounded p-3 text-sm ">
                <div className="font-medium mb-2 capitalize">{tier} Tier Includes:</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{tierPricing[tier].models.text.length}</div>
                    <div className="text-xs text-gray-500">Text Models</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{tierPricing[tier].models.image.length}</div>
                    <div className="text-xs text-gray-500">Image Models</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{tierPricing[tier].models.video.length}</div>
                    <div className="text-xs text-gray-500">Video Models</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Results */}
              <div className="bg-brand/5 grid grid-cols-1 sm:grid-cols-3 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-500 mb-1">Total Monthly Cost</div>
                  <div className="text-3xl font-bold text-brand">{formatCurrency(totalCost)}</div>
                </div>
                <div className="text-center mb-4 border-y py-4 sm:border-y-0 sm:border-x sm:py-0">
                  <div className="text-sm text-gray-500 mb-1">Cost Per User</div>
                  <div className="text-3xl font-bold text-brand">{formatCurrency(perUserCost)}</div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-500 mb-1">Suggested Price</div>
                  <div className="text-3xl font-bold text-brand">{formatCurrency(suggestedPrice)}</div>
                </div>


              </div>
              {/* Recommendation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-brand/10 to-brand/5 rounded-lg p-4 text-center"
              >
                <h4 className="font-medium text-brand mb-2">TierWise Recommendation</h4>
                <p className="text-sm text-gray-700">
                  Based on your selections, we recommend pricing your service at <span className="font-bold">{formatCurrency(suggestedPrice)}</span> per user/month for optimal revenue.
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Suggested markup: 3x cost (200% margin)
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimalRevenueSimulator;
