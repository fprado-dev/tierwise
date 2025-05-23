import { useImageModelCalculator } from "@/app/hooks/useImageModelCalculator";
import { useTextModelCalculator } from "@/app/hooks/useTextModelCalculator";
import { useVideoModelCalculator } from "@/app/hooks/useVideoModelCalculator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProcessedTier } from "@/lib/tier.types";
import NumberFlow from "@number-flow/react";
import { ChartBarIcon } from "lucide-react";

// Cost & Profit Overview component
export function CostProfitOverview({ tier, modelType }: { tier: ProcessedTier; modelType: "text" | "image" | "video"; }) {

  const {
    totalBaseCost: textBaseCost,
    totalProfitValue: textProfitValue,
    totalCost: textTotalCost,
  } = useTextModelCalculator(tier);

  const {
    totalBaseCost: imageBaseCost,
    totalProfitValue: imageProfitValue,
    totalCost: imageTotalCost,
  } = useImageModelCalculator(tier);

  const {
    totalBaseCost: videoBaseCost,
    totalProfitValue: videoProfitValue,
    totalCost: videoTotalCost,
  } = useVideoModelCalculator(tier);

  // Get the values based on the selected model type
  const baseCost = modelType === "text" ? textBaseCost : modelType === "image" ? imageBaseCost : videoBaseCost;
  const profitValue = modelType === "text" ? textProfitValue : modelType === "image" ? imageProfitValue : videoProfitValue;
  const totalCost = modelType === "text" ? textTotalCost : modelType === "image" ? imageTotalCost : videoTotalCost;

  // Check if there are models of the selected type
  const hasModelsOfType = tier.models.some(model => model.model_type === modelType);

  if (!hasModelsOfType) {
    return null;
  }

  return (
    <div className="border border-dashed border-brand/20 p-5 rounded-lg bg-background/30 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">Cost & Profit Overview</h3>
          <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-brand/10 text-brand hover:bg-brand/20 transition-colors">
            {modelType.charAt(0).toUpperCase() + modelType.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <ChartBarIcon className="w-4 h-4 text-brand" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-background/50 border-dashed border-brand/30 shadow-none">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Base Cost</span>
              <span className="text-lg font-semibold text-foreground">
                <NumberFlow
                  value={baseCost}
                  format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2 }}
                />
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {modelType === "text" ? "For input & output tokens" :
                  modelType === "image" ? "Per image generation" :
                    "Per video generation"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border-dashed border-brand/30 shadow-none">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Profit Margin</span>
              <span className="text-lg font-semibold text-foreground">
                <NumberFlow
                  value={profitValue}
                  format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2 }}
                />
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {baseCost > 0 ? `${(profitValue / baseCost * 100).toFixed(1)}% of base cost` : 'No base cost'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/50 border-dashed border-brand/30 shadow-none">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Total Cost</span>
              <span className="text-lg font-semibold text-brand">
                <NumberFlow
                  value={totalCost}
                  format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2 }}
                />
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Base cost + profit margin
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
