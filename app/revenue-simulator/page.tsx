'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NumberFlow from '@number-flow/react';
import { DollarSignIcon, PiggyBank, TrendingUpIcon, UsersIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useTiers } from "../../hooks/useTiers";
import { RevenueForecastChart } from "./ChartRevenue";
import { TierProjectionInput } from "./ProjectedUsers";

export default function RevenueSimulatorPage() {
  const { tiers: initialTiers, isLoading } = useTiers();
  const [projectedUsers, setProjectedUsers] = useState<{ [tierId: string]: string; }>({});
  const [tierSummaries, setTierSummaries] = useState<{ [tierId: string]: any; }>({}); // Keeping 'any' for now as per original
  const [revenueDetails, setRevenueDetails] = useState<{ [tierId: string]: { name: string, projectedRevenue: number, suggestedPrice: number; }; }>({});
  const [totalProjectedRevenue, setTotalProjectedRevenue] = useState<number>(0);
  const [targetMRR, setTargetMRR] = useState<number>(0);

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
      <div className="p-4 h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="rounded-full bg-primary/10 p-6">
            <PiggyBank className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">No Tiers Created</h2>
          <p className="text-muted-foreground">
            Get started by creating your first tier. Add AI models and configure pricing to see your cost breakdown.
          </p>
          <Button
            onClick={() => window.location.href = '/tiers'}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create Your First Tier
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6  w-full">
      <div className="flex p-4 items-center justify-between ">
        <div>
          <h1 className="text-3xl font-bold">Revenue Simulator</h1>
          <p className="text-muted-foreground text-xs sm:text-base">Forecast potential income by projecting user numbers for your pricing tiers.</p>
        </div>
      </div>

      <div className="grid gap-4 mx-4">
        <Card >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <UsersIcon className="w-6 h-6 text-primary" />
              Tier User Projections
            </CardTitle>
            <CardDescription>
              Enter the anticipated number of subscribers for each tier to see individual and total revenue estimates.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialTiers.map((tier) => (
              <div key={tier.id} className="flex flex-col h-full">
                <TierProjectionInput
                  tier={tier}
                  isRecommended={false}
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

          </CardFooter>
        </Card>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 my-4">
          <Card className="col-span-1 sm:col-span-2" >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <DollarSignIcon className="w-6 h-6 text-green-500" />
                Total Projected Revenue
              </CardTitle>
              <CardDescription>Overall estimated monthly revenue based on your projections.</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <div className="space-y-2">
                <Label htmlFor="target-mrr" className="text-sm font-medium">
                  Target Monthly Revenue
                </Label>
                <Input
                  id="target-mrr"
                  type="number"
                  placeholder="e.g., 10000"
                  value={targetMRR}
                  onChange={(e) => setTargetMRR(Number(e.target.value))}
                  className="w-full"
                  min="0"
                />
                <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-lg">
                  <span className="text-sm text-muted-foreground mb-2">Current Projected Revenue</span>
                  <p className="text-2xl font-bold tracking-tight text-green-600">
                    <NumberFlow value={totalProjectedRevenue} format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }} />
                  </p>
                </div>
              </div>

            </CardContent>
          </Card>
          {Number(targetMRR) > 0 && (
            <RevenueForecastChart
              TotalProjectedRevenue={totalProjectedRevenue}
              targetMMR={Number(targetMRR)}
              tierRevenueDetails={revenueDetails}
            />
          )}
        </div>
      </div>

    </div>
  );
}



