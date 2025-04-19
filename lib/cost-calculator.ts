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
  const textModels = tier.models.filter((m): m is TextModel => 'inputCostPerMillion' in m);
  let textBaseCost = 0;
  if (tier.useHighestCost?.text && textModels.length > 0) {
    const mostExpensiveModel = textModels.reduce((prev, curr) =>
      (curr.inputCostPerMillion + curr.outputCostPerMillion) > (prev.inputCostPerMillion + prev.outputCostPerMillion) ? curr : prev
    );
    textBaseCost = ((tier.quantity?.textTokens?.input || 0) * mostExpensiveModel.inputCostPerMillion / 1000000 +
      (tier.quantity?.textTokens?.output || 0) * mostExpensiveModel.outputCostPerMillion / 1000000);
  } else {
    textBaseCost = textModels.reduce((total, model) => {
      return total + ((tier.quantity?.textTokens?.input || 0) * model.inputCostPerMillion / 1000000 +
        (tier.quantity?.textTokens?.output || 0) * model.outputCostPerMillion / 1000000);
    }, 0);
  }
  const textProfit = textBaseCost * ((tier.margins?.text || 0) / 100);

  // Image costs calculation
  const imageModels = tier.models.filter((m): m is ImageModel => 'costPerImage' in m);
  let imageBaseCost = 0;
  if (tier.useHighestCost?.image && imageModels.length > 0) {
    const mostExpensiveModel = imageModels.reduce((prev, curr) =>
      curr.costPerImage > prev.costPerImage ? curr : prev
    );
    imageBaseCost = (tier.quantity?.imageCount || 0) * mostExpensiveModel.costPerImage;
  } else {
    imageBaseCost = imageModels.reduce((total, model) => {
      return total + (tier.quantity?.imageCount || 0) * model.costPerImage;
    }, 0);
  }
  const imageProfit = imageBaseCost * ((tier.margins?.image || 0) / 100);

  // Video costs calculation
  const videoModels = tier.models.filter((m): m is VideoModel => 'costPerSecond' in m);
  let videoBaseCost = 0;
  if (tier.useHighestCost?.video && videoModels.length > 0) {
    const mostExpensiveModel = videoModels.reduce((prev, curr) =>
      curr.costPerSecond > prev.costPerSecond ? curr : prev
    );
    videoBaseCost = (tier.quantity?.videoSeconds || 0) * mostExpensiveModel.costPerSecond;
  } else {
    videoBaseCost = videoModels.reduce((total, model) => {
      return total + (tier.quantity?.videoSeconds || 0) * model.costPerSecond;
    }, 0);
  }
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