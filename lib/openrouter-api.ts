import { AudioModel, ImageModel, TextModel, VideoModel } from "./model.types";

const EDENAI_API = 'https://api.edenai.run/v2/info/provider_subfeatures';

interface EdenAIModel {
  name: string;
  version: string;
  provider: {
    name: string,
    fullname: string,
  },
  pricings: Array<{
    model_name: string;
    price: string;
    price_unit_quantity: number;
    price_unit_type: string;
  }>;
  feature: {
    name: string;
  };
  subfeature: {
    name: string;
    fullname: string;
    description: string;
  };
  models: {
    models: string[];
    default_model: string;
  };
}

export async function fetchOpenRouterModels() {
  try {
    const response = await fetch(EDENAI_API);
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.statusText}`);
    }

    const data = await response.json();
    const models = data as EdenAIModel[];

    const categorizedModels = {
      text: [] as TextModel[],
      image: [] as ImageModel[],
      video: [] as VideoModel[],
      audio: [] as AudioModel[]
    };
    const uniqueModels = new Set<string>();

    models.forEach(model => {
      const basePrice = parseFloat(model.pricings[0]?.price || '0');
      const pricePerUnit = basePrice / (model.pricings[0]?.price_unit_quantity || 1);
      const providerPrefix = model.provider.name.toLowerCase();

      switch (model.feature.name) {
        case 'text':
          if (model.models.models && model.models.models.length > 0) {
            model.models.models.forEach(modelName => {
              const pricing = model.pricings.find(p => p.model_name === modelName) || model.pricings[0];
              const price = parseFloat(pricing?.price || '0');
              const pricePerUnit = price / (pricing?.price_unit_quantity || 1);
              const modelId = `${providerPrefix}/${modelName}`;

              if (!uniqueModels.has(modelId)) {
                uniqueModels.add(modelId);
                categorizedModels.text.push({
                  model: modelId,
                  inputCostPerMillion: Number((pricePerUnit * 1000000).toFixed(10)),
                  outputCostPerMillion: Number((pricePerUnit * 1000000).toFixed(10))
                });
              }
            });
          } else {
            const modelId = `${providerPrefix}/${model.pricings[0].model_name || model.name}`;
            if (!uniqueModels.has(modelId)) {
              uniqueModels.add(modelId);
              categorizedModels.text.push({
                model: modelId,
                inputCostPerMillion: pricePerUnit * 1000000,
                outputCostPerMillion: pricePerUnit * 1000000
              });
            }
          }
          break;

        case 'image':
          if (model.models.models && model.models.models.length > 0) {
            model.models.models.forEach(modelName => {
              const pricing = model.pricings.find(p => p.model_name === modelName) || model.pricings[0];
              const price = parseFloat(pricing?.price || '0');
              const pricePerUnit = price / (pricing?.price_unit_quantity || 1);
              const modelId = `${providerPrefix}/${modelName}`;

              if (!uniqueModels.has(modelId)) {
                uniqueModels.add(modelId);
                categorizedModels.image.push({
                  model: modelId,
                  costPerImage: pricePerUnit
                });
              }
            });
          } else {
            const modelId = `${providerPrefix}/${model.pricings[0].model_name || model.name}`;
            if (!uniqueModels.has(modelId)) {
              uniqueModels.add(modelId);
              categorizedModels.image.push({
                model: modelId,
                costPerImage: Number(pricePerUnit.toFixed(10))
              });
            }
          }
          break;
        case 'audio':
          if (model.models.models && model.models.models.length > 0) {
            model.models.models.forEach(modelName => {
              const pricing = model.pricings.find(p => p.model_name === modelName) || model.pricings[0];
              const price = parseFloat(pricing?.price || '0');
              const pricePerUnit = price / (pricing?.price_unit_quantity || 1);
              const modelId = `${providerPrefix}/${modelName}`;

              if (!uniqueModels.has(modelId)) {
                uniqueModels.add(modelId);
                categorizedModels.audio.push({
                  model: modelId,
                  costPerSecond: pricePerUnit
                });
              }
            });
          } else {
            const modelId = `${providerPrefix}/${model.pricings[0].model_name || model.name}`;
            if (!uniqueModels.has(modelId)) {
              uniqueModels.add(modelId);
              categorizedModels.audio.push({
                model: modelId,
                costPerSecond: Number(pricePerUnit.toFixed(10))
              });
            }
          }
          break;
        case 'video':
          if (model.models.models && model.models.models.length > 0) {
            model.models.models.forEach(modelName => {
              const pricing = model.pricings.find(p => p.model_name === modelName) || model.pricings[0];
              const price = parseFloat(pricing?.price || '0');
              const pricePerUnit = price / (pricing?.price_unit_quantity || 1);
              const modelId = `${providerPrefix}/${modelName}`;

              if (!uniqueModels.has(modelId)) {
                uniqueModels.add(modelId);
                categorizedModels.video.push({
                  model: modelId,
                  costPerSecond: pricePerUnit
                });
              }
            });
          } else {
            const modelId = `${providerPrefix}/${model.pricings[0].model_name || model.name}`;
            if (!uniqueModels.has(modelId)) {
              uniqueModels.add(modelId);
              categorizedModels.video.push({
                model: modelId,
                costPerSecond: Number(pricePerUnit.toFixed(10))
              });
            }
          }
          break;
      }
    });

    return {
      text: categorizedModels.text,
      image: categorizedModels.image,
      video: categorizedModels.video,
      audio: categorizedModels.audio
    };
  } catch (error) {
    console.error('Error fetching EdenAI models:', error);
    return {
      text: [],
      image: [],
      video: [],
      audio: []
    };
  }
}