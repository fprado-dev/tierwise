import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTierSummary } from "@/hooks/useTierSummary";
import { ProcessedTier } from "@/lib/tier.types";
import NumberFlow from "@number-flow/react";
import { CpuIcon, FileTextIcon, HardDriveIcon, ImageIcon, MicIcon, StarIcon, VideoIcon } from "lucide-react";
import { useEffect } from "react";
import { useImageModelCalculator } from "../hooks/useImageModelCalculator";
import { useTextModelCalculator } from "../hooks/useTextModelCalculator";
import { useVideoModelCalculator } from "../hooks/useVideoModelCalculator";

interface TierProjectionInputProps {
  tier: ProcessedTier;
  isRecommended?: boolean; // Added isRecommended
  projectedUsers: string;
  onProjectedUsersChange: (tierId: string, value: string) => void;
  onSummaryLoad: (tierId: string, summary: any) => void;
  onRevenueCalculated: (tierId: string, details: { name: string, projectedRevenue: number, suggestedPrice: number; }) => void;
}

// Helper for model type icons and colors
const modelTypeVisuals: { [key: string]: { icon: React.ElementType, color: string, bgColor: string, label: string; }; } = {
  text: { icon: FileTextIcon, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Text Models' },
  image: { icon: ImageIcon, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Image Models' },
  video: { icon: VideoIcon, color: 'text-purple-600', bgColor: 'bg-purple-100', label: 'Video Models' },
  audio: { icon: MicIcon, color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Audio Models' },
  hardware: { icon: HardDriveIcon, color: 'text-red-600', bgColor: 'bg-red-100', label: 'Hardware' },
  default: { icon: CpuIcon, color: 'text-gray-600', bgColor: 'bg-gray-100', label: 'Other Models' },
};

export function TierProjectionInput({ tier, isRecommended, projectedUsers, onProjectedUsersChange, onSummaryLoad, onRevenueCalculated }: TierProjectionInputProps) {
  const { summary, isLoading: isSummaryLoading } = useTierSummary(tier.id);

  const {
    setInputTokens, setOutputTokens, setMarginPercentage: setTextMarginPercentage,
    setUseExpensiveModel: setTextUseExpensiveModel, totalCost: textTotalCost,
  } = useTextModelCalculator(tier);

  const {
    setImageCount, setMarginPercentage: setImageMarginPercentage,
    setUseExpensiveModel: setImageUseExpensiveModel, totalCost: imageTotalCost,
  } = useImageModelCalculator(tier);

  const {
    setVideoSeconds, setMarginPercentage: setVideoMarginPercentage,
    setUseExpensiveModel: setVideoUseExpensiveModel, totalCost: videoTotalCost,
  } = useVideoModelCalculator(tier);

  useEffect(() => {
    if (summary) {
      setInputTokens(summary.input_tokens);
      setOutputTokens(summary.output_tokens);
      setImageCount(summary.image_count);
      setVideoSeconds(summary.video_seconds);
      setTextMarginPercentage(summary.text_margin_percentage);
      setImageMarginPercentage(summary.image_margin_percentage);
      setVideoMarginPercentage(summary.video_margin_percentage);
      setTextUseExpensiveModel(summary.text_use_expensive_model);
      setImageUseExpensiveModel(summary.image_use_expensive_model);
      setVideoUseExpensiveModel(summary.video_use_expensive_model);
      onSummaryLoad(tier.id, summary); // Ensure summary is passed up if needed by parent
    }
  }, [
    summary, tier.id, onSummaryLoad,
    setInputTokens, setOutputTokens, setTextMarginPercentage, setTextUseExpensiveModel,
    setImageCount, setImageMarginPercentage, setImageUseExpensiveModel,
    setVideoSeconds, setVideoMarginPercentage, setVideoUseExpensiveModel
  ]);

  const suggestedPrice = (textTotalCost + imageTotalCost + videoTotalCost) * (1 + (summary?.operational_overhead_percentage || 0) / 100);
  const projectedRevenue = (parseFloat(projectedUsers) || 0) * suggestedPrice;

  useEffect(() => {
    if (!isSummaryLoading) {
      onRevenueCalculated(tier.id, { name: tier.name, projectedRevenue, suggestedPrice });
    }
  }, [projectedUsers, suggestedPrice, tier.id, tier.name, onRevenueCalculated, isSummaryLoading, projectedRevenue]);


  const uniqueModelTypes = tier.models.reduce((acc, model) => {
    const type = model.model_type || 'default';
    const visual = modelTypeVisuals[type] || modelTypeVisuals.default;
    if (!acc[type]) {
      acc[type] = { count: 0, ...visual };
    }
    acc[type].count++;
    return acc;
  }, {} as { [key: string]: { count: number, icon: React.ElementType, color: string, bgColor: string, label: string; }; });

  return (
    <Card className={`h-full flex flex-col ${isRecommended ? 'border-primary ring-2 ring-primary shadow-lg' : 'border-border shadow'} transition-all duration-300`}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold leading-tight">{tier.name}</CardTitle>
          {isRecommended && (
            <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap text-xs px-2 py-0.5">
              <StarIcon className="w-3 h-3 " />
            </Badge>
          )}
        </div>
        {tier.created_at && (
          <CardDescription className="text-xs mt-1">
            {new Date(tier.created_at).toLocaleDateString()} - {tier.models.length} Models
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow space-y-3 pt-0">
        <div className="space-y-1">
          <Label htmlFor={`users-${tier.id}`} className="text-xs font-medium">
            Projected Users
          </Label>
          <Input
            id={`users-${tier.id}`}
            type="number"
            placeholder="e.g., 100"
            value={projectedUsers}
            onChange={(e) => onProjectedUsersChange(tier.id, e.target.value)}
            className="mt-1 text-sm h-9"
            min="0"
          />
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Models ({tier.models.length}):</p>
          {tier.models.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(uniqueModelTypes).map(([typeKey, data]) => {
                const VisualIcon = data.icon;
                return (
                  <Badge key={typeKey} variant="outline" className={`font-normal text-xs px-1.5 py-0.5 ${data.bgColor} ${data.color} border-current/30`}>
                    <VisualIcon className={`w-3 h-3 mr-1 ${data.color}`} />
                    {data.label.replace(' Models', '') /* Shorten label */} ({data.count})
                  </Badge>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">No models configured for this tier.</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-1.5 pt-3 pb-4 border-t mt-auto">
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Suggested Price:</span>
          <span className="font-semibold text-foreground">
            {isSummaryLoading ? '...' : <NumberFlow value={suggestedPrice} format={{ style: 'currency', currency: 'USD' }} />}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Est. Revenue:</span>
          <span className="font-bold text-primary">
            {isSummaryLoading ? '...' : <NumberFlow value={projectedRevenue} format={{ style: 'currency', currency: 'USD' }} />}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

