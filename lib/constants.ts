import { HardwareOption, ImageModel, TextModel, VideoModel } from "./models-types";


// --- Constants --- (Keep constants here or move to a separate constants file)
export const IMAGE_MODELS: ImageModel[] = [
  { model: "black-forest-labs/flux-1.1-pro", costPerImage: 0.040 },
  { model: "black-forest-labs/flux-1.1-pro-ultra", costPerImage: 0.060 },
  { model: "black-forest-labs/flux-canny-dev", costPerImage: 0.025 },
  { model: "black-forest-labs/flux-canny-pro", costPerImage: 0.050 },
  { model: "black-forest-labs/flux-depth-dev", costPerImage: 0.025 },
  { model: "black-forest-labs/flux-depth-pro", costPerImage: 0.050 },
  { model: "black-forest-labs/flux-dev", costPerImage: 0.025 },
  { model: "black-forest-labs/flux-dev-lora", costPerImage: 0.032 },
  { model: "black-forest-labs/flux-fill-dev", costPerImage: 0.040 },
  { model: "black-forest-labs/flux-fill-pro", costPerImage: 0.050 },
  { model: "black-forest-labs/flux-pro", costPerImage: 0.055 },
  { model: "black-forest-labs/flux-redux-dev", costPerImage: 0.025 },
  { model: "black-forest-labs/flux-redux-schnell", costPerImage: 0.003 },
  { model: "black-forest-labs/flux-schnell", costPerImage: 0.003 },
  { model: "black-forest-labs/flux-schnell-lora", costPerImage: 0.020 },
  { model: "google/imagen-3", costPerImage: 0.050 },
  { model: "google/imagen-3-fast", costPerImage: 0.025 },
  { model: "google/upscaler", costPerImage: 0.020 },
  { model: "ideogram-ai/ideogram-v2", costPerImage: 0.080 },
  { model: "ideogram-ai/ideogram-v2a", costPerImage: 0.040 },
  { model: "ideogram-ai/ideogram-v2a-turbo", costPerImage: 0.025 },
  { model: "ideogram-ai/ideogram-v2-turbo", costPerImage: 0.050 },
  { model: "luma/photon", costPerImage: 0.030 },
  { model: "luma/photon-flash", costPerImage: 0.010 },
  { model: "minimax/image-01", costPerImage: 0.010 },
  { model: "recraft-ai/recraft-20b", costPerImage: 0.022 },
  { model: "recraft-ai/recraft-20b-svg", costPerImage: 0.044 },
  { model: "recraft-ai/recraft-creative-upscale", costPerImage: 0.300 },
  { model: "recraft-ai/recraft-crisp-upscale", costPerImage: 0.006 },
  { model: "recraft-ai/recraft-v3", costPerImage: 0.040 },
  { model: "recraft-ai/recraft-v3-svg", costPerImage: 0.080 },
  { model: "stability-ai/stable-diffusion-3", costPerImage: 0.035 },
  { model: "stability-ai/stable-diffusion-3.5-large", costPerImage: 0.065 },
  { model: "stability-ai/stable-diffusion-3.5-large-turbo", costPerImage: 0.040 },
  { model: "stability-ai/stable-diffusion-3.5-medium", costPerImage: 0.035 }
];

export const HARDWARE_OPTIONS: HardwareOption[] = [
  {
    name: "CPU",
    id: "cpu",
    pricePerSec: 0.000100,
    pricePerHour: 0.36,
    gpuCount: 0,
    cpuMultiplier: "4x",
    gpuRam: null,
    ram: "8GB"
  },
  {
    name: "Nvidia A100 (80GB) GPU",
    id: "gpu-a100-large",
    pricePerSec: 0.001400,
    pricePerHour: 5.04,
    gpuCount: 1,
    cpuMultiplier: "10x",
    gpuRam: "80GB",
    ram: "144GB"
  },
  {
    name: "2x Nvidia A100 (80GB) GPU",
    id: "gpu-a100-large-2x",
    pricePerSec: 0.002800,
    pricePerHour: 10.08,
    gpuCount: 2,
    cpuMultiplier: "20x",
    gpuRam: "160GB",
    ram: "288GB"
  },
  {
    name: "4x Nvidia A100 (80GB) GPU",
    id: "gpu-a100-large-4x",
    pricePerSec: 0.005600,
    pricePerHour: 20.16,
    gpuCount: 4,
    cpuMultiplier: "40x",
    gpuRam: "320GB",
    ram: "576GB"
  },
  {
    name: "8x Nvidia A100 (80GB) GPU",
    id: "gpu-a100-large-8x",
    pricePerSec: 0.011200,
    pricePerHour: 40.32,
    gpuCount: 8,
    cpuMultiplier: "80x",
    gpuRam: "640GB",
    ram: "960GB"
  },
  {
    name: "Nvidia L40S GPU",
    id: "gpu-l40s",
    pricePerSec: 0.000975,
    pricePerHour: 3.51,
    gpuCount: 1,
    cpuMultiplier: "10x",
    gpuRam: "48GB",
    ram: "65GB"
  },
  {
    name: "2x Nvidia L40S GPU",
    id: "gpu-l40s-2x",
    pricePerSec: 0.001950,
    pricePerHour: 7.02,
    gpuCount: 2,
    cpuMultiplier: "20x",
    gpuRam: "96GB",
    ram: "144GB"
  },
  {
    name: "4x Nvidia L40S GPU",
    id: "gpu-l40s-4x",
    pricePerSec: 0.003900,
    pricePerHour: 14.04,
    gpuCount: 4,
    cpuMultiplier: "40x",
    gpuRam: "192GB",
    ram: "288GB"
  },
  {
    name: "8x Nvidia L40S GPU",
    id: "gpu-l40s-8x",
    pricePerSec: 0.007800,
    pricePerHour: 28.08,
    gpuCount: 8,
    cpuMultiplier: "80x",
    gpuRam: "384GB",
    ram: "576GB"
  },
  {
    name: "Nvidia T4 GPU",
    id: "gpu-t4",
    pricePerSec: 0.000225,
    pricePerHour: 0.81,
    gpuCount: 1,
    cpuMultiplier: "4x",
    gpuRam: "16GB",
    ram: "16GB"
  }
];

export const VIDEO_MODELS: VideoModel[] = [
  {
    model: "google/veo-2",
    costPerSecond: 0.500,
    resolution: null,
    type: "video"
  },
  {
    model: "haiper-ai/haiper-video-2",
    costPerSecond: 0.050,
    resolution: null,
    type: "video"
  },
  {
    model: "kwaivgi/kling-v1.6-pro",
    costPerSecond: 0.098,
    resolution: null,
    type: "video"
  },
  {
    model: "kwaivgi/kling-v1.6-standard",
    costPerSecond: 0.056,
    resolution: null,
    type: "video"
  },
  {
    model: "luma/ray-2-540p",
    costPerSecond: 0.100,
    resolution: "540p",
    type: "video"
  },
  {
    model: "luma/ray-2-720p",
    costPerSecond: 0.180,
    resolution: "720p",
    type: "video"
  },
  {
    model: "luma/ray-flash-2-540p",
    costPerSecond: 0.033,
    resolution: "540p",
    type: "video"
  },
  {
    model: "luma/ray-flash-2-720p",
    costPerSecond: 0.060,
    resolution: "720p",
    type: "video"
  },
  {
    model: "wavespeedai/hunyuan-video-fast",
    costPerSecond: 0.200,
    resolution: null,
    type: "video"
  },
  {
    model: "wavespeedai/step-video",
    costPerSecond: 0.250,
    resolution: null,
    type: "video"
  },
  {
    model: "wavespeedai/wan-2.1-i2v-480p",
    costPerSecond: 0.090,
    resolution: "480p",
    type: "image-to-video"
  },
  {
    model: "wavespeedai/wan-2.1-i2v-720p",
    costPerSecond: 0.250,
    resolution: "720p",
    type: "image-to-video"
  },
  {
    model: "wavespeedai/wan-2.1-t2v-480p",
    costPerSecond: 0.070,
    resolution: "480p",
    type: "text-to-video"
  },
  {
    model: "wavespeedai/wan-2.1-t2v-720p",
    costPerSecond: 0.240,
    resolution: "720p",
    type: "text-to-video"
  }
];

export const TEXT_MODELS: TextModel[] = [
  {
    model: "anthropic/claude-3.5-haiku",
    inputCostPerMillion: 1.000,
    outputCostPerMillion: 5.000,
    provider: "anthropic"
  },
  {
    model: "anthropic/claude-3.5-sonnet",
    inputCostPerMillion: 3.750,
    outputCostPerMillion: 18.750,
    provider: "anthropic"
  },
  {
    model: "anthropic/claude-3.7-sonnet",
    inputCostPerMillion: 3.000,
    outputCostPerMillion: 15.000,
    provider: "anthropic"
  },
  {
    model: "deepseek-ai/deepseek-r1",
    inputCostPerMillion: 3.750,
    outputCostPerMillion: 10.000,
    provider: "deepseek"
  },
  {
    model: "deepseek-ai/deepseek-v3",
    inputCostPerMillion: 1.450,
    outputCostPerMillion: 1.450,
    provider: "deepseek"
  },
  {
    model: "ibm-granite/granite-20b-code-instruct-8k",
    inputCostPerMillion: 0.100,
    outputCostPerMillion: 0.500,
    provider: "ibm",
    size: "20b"
  },
  {
    model: "ibm-granite/granite-3.0-2b-instruct",
    inputCostPerMillion: 0.030,
    outputCostPerMillion: 0.250,
    provider: "ibm",
    size: "2b"
  },
  {
    model: "ibm-granite/granite-3.0-8b-instruct",
    inputCostPerMillion: 0.050,
    outputCostPerMillion: 0.250,
    provider: "ibm",
    size: "8b"
  },
  {
    model: "ibm-granite/granite-3.1-2b-instruct",
    inputCostPerMillion: 0.030,
    outputCostPerMillion: 0.250,
    provider: "ibm",
    size: "2b"
  },
  {
    model: "ibm-granite/granite-3.1-8b-instruct",
    inputCostPerMillion: 0.030,
    outputCostPerMillion: 0.250,
    provider: "ibm",
    size: "8b"
  },
  {
    model: "ibm-granite/granite-3.2-8b-instruct",
    inputCostPerMillion: 0.030,
    outputCostPerMillion: 0.250,
    provider: "ibm",
    size: "8b"
  },
  {
    model: "ibm-granite/granite-3.3-8b-instruct",
    inputCostPerMillion: 0.030,
    outputCostPerMillion: 0.250,
    provider: "ibm",
    size: "8b"
  },
  {
    model: "ibm-granite/granite-8b-code-instruct-128k",
    inputCostPerMillion: 0.050,
    outputCostPerMillion: 0.250,
    provider: "ibm",
    size: "8b"
  },
  {
    model: "meta/llama-2-13b",
    inputCostPerMillion: 0.100,
    outputCostPerMillion: 0.500,
    provider: "meta",
    size: "13b"
  },
  {
    model: "meta/llama-2-13b-chat",
    inputCostPerMillion: 0.100,
    outputCostPerMillion: 0.500,
    provider: "meta",
    size: "13b"
  },
  {
    model: "meta/llama-2-70b",
    inputCostPerMillion: 0.650,
    outputCostPerMillion: 2.750,
    provider: "meta",
    size: "70b"
  },
  {
    model: "meta/llama-2-70b-chat",
    inputCostPerMillion: 0.650,
    outputCostPerMillion: 2.750,
    provider: "meta",
    size: "70b"
  },
  {
    model: "meta/llama-2-7b",
    inputCostPerMillion: 0.050,
    outputCostPerMillion: 0.250,
    provider: "meta",
    size: "7b"
  },
  {
    model: "meta/llama-2-7b-chat",
    inputCostPerMillion: 0.050,
    outputCostPerMillion: 0.250,
    provider: "meta",
    size: "7b"
  },
  {
    model: "meta/llama-4-maverick-instruct",
    inputCostPerMillion: 0.250,
    outputCostPerMillion: 0.950,
    provider: "meta",
    family: "llama-4"
  },
  {
    model: "meta/llama-4-scout-instruct",
    inputCostPerMillion: 0.170,
    outputCostPerMillion: 0.650,
    provider: "meta",
    family: "llama-4"
  },
  {
    model: "meta/meta-llama-3.1-405b-instruct",
    inputCostPerMillion: 9.500,
    outputCostPerMillion: 9.500,
    provider: "meta",
    size: "405b"
  },
  {
    model: "meta/meta-llama-3-70b",
    inputCostPerMillion: 0.650,
    outputCostPerMillion: 2.750,
    provider: "meta",
    size: "70b"
  },
  {
    model: "meta/meta-llama-3-70b-instruct",
    inputCostPerMillion: 0.650,
    outputCostPerMillion: 2.750,
    provider: "meta",
    size: "70b"
  },
  {
    model: "meta/meta-llama-3-8b",
    inputCostPerMillion: 0.050,
    outputCostPerMillion: 0.250,
    provider: "meta",
    size: "8b"
  },
  {
    model: "meta/meta-llama-3-8b-instruct",
    inputCostPerMillion: 0.050,
    outputCostPerMillion: 0.250,
    provider: "meta",
    size: "8b"
  },
  {
    model: "mistralai/mistral-7b-instruct-v0.2",
    inputCostPerMillion: 0.050,
    outputCostPerMillion: 0.250,
    provider: "mistral",
    size: "7b"
  },
  {
    model: "mistralai/mistral-7b-v0.1",
    inputCostPerMillion: 0.050,
    outputCostPerMillion: 0.250,
    provider: "mistral",
    size: "7b"
  }
];