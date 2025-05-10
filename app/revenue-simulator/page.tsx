'use client';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Added Alert components
import { Badge } from "@/components/ui/badge"; // Added Badge
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProcessedTier } from '@/lib/tier.types';
import NumberFlow from '@number-flow/react';
import { BarChartIcon, CpuIcon, DollarSignIcon, FileTextIcon, HardDriveIcon, ImageIcon, LightbulbIcon, MicIcon, StarIcon, TrendingUpIcon, UsersIcon, VideoIcon } from 'lucide-react'; // Added more icons
import { useCallback, useEffect, useState } from 'react';
import { useTiers } from "../../hooks/useTiers";
import { useTierSummary } from "../../hooks/useTierSummary";
import { useImageModelCalculator } from "../hooks/useImageModelCalculator";
import { useTextModelCalculator } from "../hooks/useTextModelCalculator";
import { useVideoModelCalculator } from "../hooks/useVideoModelCalculator";

export default function RevenueSimulatorPage() {
  const { tiers: initialTiers, isLoading } = useTiers();
  const [projectedUsers, setProjectedUsers] = useState<{ [tierId: string]: string; }>({});
  const [tierSummaries, setTierSummaries] = useState<{ [tierId: string]: any; }>({}); // Keeping 'any' for now as per original
  const [revenueDetails, setRevenueDetails] = useState<{ [tierId: string]: { name: string, projectedRevenue: number, suggestedPrice: number; }; }>({});
  const [totalProjectedRevenue, setTotalProjectedRevenue] = useState<number>(0);

  // Determine recommended tier
  let recommendedTierId = '';
  if (initialTiers && initialTiers.length > 0) {
    // Sort tiers by a score: unique model types (desc), then total models (desc)
    const sortedTiers = [...initialTiers].sort((a, b) => {
      const uniqueTypesA = new Set(a.models.map(m => m.model_type)).size;
      const uniqueTypesB = new Set(b.models.map(m => m.model_type)).size;

      if (uniqueTypesB !== uniqueTypesA) {
        return uniqueTypesB - uniqueTypesA; // Higher unique types first
      }
      return b.models.length - a.models.length; // Then higher total models first
    });
    if (sortedTiers.length > 0) { // Check if sortedTiers is not empty
      recommendedTierId = sortedTiers[0].id;
    }
  }

  const handleProjectedUsersChange = useCallback((tierId: string, value: string) => {
    setProjectedUsers(prev => ({ ...prev, [tierId]: value }));
  }, []);

  const handleRevenueCalculated = useCallback((tierId: string, details: { name: string, projectedRevenue: number, suggestedPrice: number; }) => {
    setRevenueDetails(prev => ({ ...prev, [tierId]: details }));
  }, []);

  const handleSummaryLoad = useCallback((tierId: string, summary: any) => {
    setTierSummaries(prev => ({ ...prev, [tierId]: summary }));
  }, []);

  useEffect(() => {
    const newTotal = Object.values(revenueDetails).reduce((acc, detail) => acc + (detail?.projectedRevenue || 0), 0);
    setTotalProjectedRevenue(newTotal);
  }, [revenueDetails]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
        <div className="animate-pulse text-center">
          <TrendingUpIcon className="w-16 h-16 text-primary mx-auto mb-4" />
          <p className="text-xl font-semibold text-foreground">Loading Revenue Simulator...</p>
          <p className="text-muted-foreground">Preparing your tiers and data.</p>
        </div>
      </div>
    );
  }

  if (!initialTiers || initialTiers.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center bg-background">
        <UsersIcon className="w-20 h-20 text-destructive/70" />
        <h2 className="text-2xl font-bold text-foreground">No Pricing Tiers Found</h2>
        <p className="text-muted-foreground max-w-md">
          The Revenue Simulator requires at least one pricing tier to function. Please navigate to the
          pricing section and create your tiers.
        </p>
        <Button variant="outline" onClick={() => { /* Add navigation to tier creation page */ }}>
          Create Pricing Tiers
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-6 lg:p-8">
      <header className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Revenue Simulator</h1>
        <p className="text-lg text-muted-foreground mt-1">
          Forecast potential income by projecting user numbers for your pricing tiers.
        </p>
      </header>
      <Alert className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-yellow-300 text-yellow-700 shadow-md hover:shadow-lg transition-shadow duration-300">
        <LightbulbIcon className="h-5 w-5 text-yellow-600" />
        <AlertTitle className="font-semibold text-yellow-800">Coming Soon: Unlock Actionable Insights!</AlertTitle>
        <AlertDescription className="text-sm text-yellow-700/90">
          Receive intelligent suggestions based on your projections and model configurations to supercharge your pricing strategy.
          <br />
          <span className="text-xs italic opacity-80">
            (e.g., "Consider a promotional discount on Tier 1 to potentially increase overall user adoption by X%.")
          </span>
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 items-start my-6">
        {/* Column 1: Tier Configuration */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <UsersIcon className="w-6 h-6 text-primary" />
              Tier User Projections
            </CardTitle>
            <CardDescription>
              Enter the anticipated number of subscribers for each tier to see individual and total revenue estimates.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialTiers.map((tier) => (
              <div key={tier.id} className="flex flex-col h-full">
                <TierProjectionInput
                  tier={tier}
                  isRecommended={tier.id === recommendedTierId}
                  projectedUsers={projectedUsers[tier.id] || ''}
                  onProjectedUsersChange={handleProjectedUsersChange}
                  onSummaryLoad={handleSummaryLoad}
                  onRevenueCalculated={handleRevenueCalculated}
                />
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              The "Suggested Price" is derived from model usage costs and configured margins within each tier's settings.
            </p>
            <Button
              onClick={() => console.log("Run/Save Simulation clicked", { projectedUsers, revenueDetails, totalProjectedRevenue })}
              className="mt-2 self-end" // Aligns button to the right
            >
              Save Scenario
            </Button>
          </CardFooter>
        </Card>

        {/* Column 2: Summary & Insights */}
        <div className="space-y-6 xl:space-y-8 lg:col-span-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <DollarSignIcon className="w-6 h-6 text-green-500" />
                Total Projected Revenue
              </CardTitle>
              <CardDescription>Overall estimated monthly revenue based on your projections.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold tracking-tight text-green-600">
                <NumberFlow value={totalProjectedRevenue} format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }} />
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Updates automatically as you adjust user numbers.
              </p>
            </CardContent>
          </Card>


          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChartIcon className="w-6 h-6 text-blue-500" />
                Visualize Projections
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[12rem] bg-muted/20 rounded-md border border-dashed p-6">
              <BarChartIcon className="w-16 h-16 text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground font-medium text-center">Revenue Breakdown Chart</p>
              <p className="text-xs text-muted-foreground text-center mt-1">
                A visual representation of revenue per tier will be displayed here once data is available.
              </p>
              {/* Consider adding a small button or link: "Generate Chart" if it's not live */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

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

function TierProjectionInput({ tier, isRecommended, projectedUsers, onProjectedUsersChange, onSummaryLoad, onRevenueCalculated }: TierProjectionInputProps) {
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
            <Badge variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap text-xs px-2 py-0.5">
              <StarIcon className="w-3 h-3 mr-1" />
              Recommended
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