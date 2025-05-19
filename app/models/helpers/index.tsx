import { Model } from "@/lib/supabase/model.service";

export function getCustomModels(models: Model[] | null | undefined): Model[] {
  if (!models) return [];
  return models.filter((model) => model.is_custom);
}

export function getDefaultModels(models: Model[] | null | undefined) {
  if (!models) return [];
  return models.filter((model) => !model.is_custom);
}

export type TCreateModelProps = {
  model_name: string,
  model_type: string,
  is_public: boolean,
  input_cost_per_million: number,
  output_cost_per_million: number,
  cost_per_image: number,
  cost_per_second: number,
  price_per_sec: number,
  price_per_hour: number,
  gpu_count: number,
  cpu_multiplier: number,
  gpu_ram: number,
  ram: number,
};
export function prepareModelPayload(model: TCreateModelProps) {
  // Always start with all fields as null
  const payload: any = {
    model_name: model.model_name ?? '',
    model_type: model.model_type ?? '',
    is_public: !!model.is_public,
    input_cost_per_million: null,
    output_cost_per_million: null,
    cost_per_image: null,
    cost_per_second: null,
    price_per_sec: null,
    price_per_hour: null,
    gpu_count: null,
    cpu_multiplier: null,
    gpu_ram: null,
    ram: null,
  };

  switch (model.model_type) {
    case 'text':
      payload.input_cost_per_million =
        model.input_cost_per_million !== 0 ? Number(model.input_cost_per_million) : null;
      payload.output_cost_per_million =
        model.output_cost_per_million !== 0 ? Number(model.output_cost_per_million) : null;
      break;
    case 'image':
      payload.cost_per_image =
        model.cost_per_image !== 0 ? Number(model.cost_per_image) : null;
      break;
    case 'video':
    case 'audio':
      payload.cost_per_second =
        model.cost_per_second !== 0 ? Number(model.cost_per_second) : null;
      break;
    case 'hardware':
      payload.price_per_sec =
        model.price_per_sec !== 0 ? Number(model.price_per_sec) : null;
      payload.price_per_hour =
        model.price_per_hour !== 0 ? Number(model.price_per_hour) : null;
      payload.gpu_count =
        model.gpu_count !== 0 ? Number(model.gpu_count) : null;
      payload.cpu_multiplier =
        model.cpu_multiplier !== 0 ? Number(model.cpu_multiplier) : null;
      payload.gpu_ram =
        model.gpu_ram !== 0 ? Number(model.gpu_ram) : null;
      payload.ram =
        model.ram !== 0 ? Number(model.ram) : null;
      break;
    default:
      // All other fields remain null
      break;
  }

  return payload;
}
