import { ImageModel, TextModel, VideoModel } from './model.types';
import { Tier } from './tier.types';

type CategoryCosts = {
  baseCost: string;
  profit: string;
  total?: string;
};

type TierCosts = {
  text: CategoryCosts;
  image: CategoryCosts;
  video: CategoryCosts;
  total: {
    baseCost: string;
    profit: string;
  };
};

const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const calculateTierCosts = (tier: Tier): TierCosts => {
  // Text costs calculation
  const textModel = tier.models.find((m): m is TextModel => 'inputCostPerMillion' in m);
  const textBaseCost = textModel
    ? ((tier.quantity?.textTokens?.input || 0) * textModel.inputCostPerMillion / 1000000 +
      (tier.quantity?.textTokens?.output || 0) * textModel.outputCostPerMillion / 1000000)
    : 0;
  const textProfit = textBaseCost * ((tier.margins?.text || 0) / 100);

  // Image costs calculation
  const imageModel = tier.models.find((m): m is ImageModel => 'costPerImage' in m);
  const imageBaseCost = imageModel
    ? (tier.quantity?.imageCount || 0) * imageModel.costPerImage
    : 0;
  const imageProfit = imageBaseCost * ((tier.margins?.image || 0) / 100);

  // Video costs calculation
  const videoModel = tier.models.find((m): m is VideoModel => 'costPerSecond' in m);
  const videoBaseCost = videoModel
    ? (tier.quantity?.videoSeconds || 0) * videoModel.costPerSecond
    : 0;
  const videoProfit = videoBaseCost * ((tier.margins?.video || 0) / 100);

  // Total costs
  const totalBaseCost = textBaseCost + imageBaseCost + videoBaseCost;
  const totalProfit = textProfit + imageProfit + videoProfit;

  const totalTextCost = textBaseCost + textProfit;
  const totalImageCost = imageBaseCost + imageProfit;
  const totalVideoCost = videoBaseCost + videoProfit;
  return {
    text: {
      baseCost: formatUSD(textBaseCost),
      profit: formatUSD(textProfit),
      total: formatUSD(totalTextCost)
    },
    image: {
      baseCost: formatUSD(imageBaseCost),
      profit: formatUSD(imageProfit),
      total: formatUSD(totalImageCost)
    },
    video: {
      baseCost: formatUSD(videoBaseCost),
      profit: formatUSD(videoProfit),
      total: formatUSD(totalVideoCost)
    },
    total: {
      baseCost: formatUSD(totalBaseCost),
      profit: formatUSD(totalProfit)
    }
  };
};

export const calculateTotalPrice = (tier: Tier): string => {
  const costs = calculateTierCosts(tier);
  const totalBaseCost = parseFloat(costs.total.baseCost.replace(/[^0-9.-]+/g, ''));
  const totalProfit = parseFloat(costs.total.profit.replace(/[^0-9.-]+/g, ''));
  return formatUSD(totalBaseCost + totalProfit);
};