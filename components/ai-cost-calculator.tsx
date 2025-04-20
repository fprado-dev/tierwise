'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateTierCosts, calculateTotalPrice } from "@/lib/cost-calculator";
import { ImageModel, TextModel, VideoModel } from "@/lib/model.types";
import { Tier } from "@/lib/tier.types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Check, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { TierCreationSheet } from "./tier-creation-sheet";
import { TierEditSheet } from './tier-edit-sheet';
import { Button } from './ui/button';
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function AICostCalculator() {
  const [tiers, setTiers] = useState<Tier[]>([]);


  const handleAddTier = (newTier: Tier) => {
    setTiers([...tiers, newTier]);
  };

  const handleDeleteTier = (id: string) => {
    setTiers(tiers.filter(tier => tier.id !== id));
  };

  console.log({ tiers });

  // TODO: Add tiers to the database
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end p-4">
        <TierCreationSheet onAddTier={handleAddTier} tiers={tiers} />
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 gap-4">
          {tiers.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              setTiers={setTiers}
              handleDeleteTier={handleDeleteTier}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


function TierCard({
  tier,
  handleDeleteTier,
  setTiers,
}: {
  tier: Tier;
  setTiers: React.Dispatch<React.SetStateAction<Tier[]>>;
  onUpdateTier?: (updatedTier: Tier) => void;
  handleDeleteTier: (id: string) => void;
}) {
  const handleQuantityChange = (tierId: string, type: 'text' | 'image' | 'video', field: string, value: number) => {
    setTiers(prevTiers => prevTiers.map(t => {
      if (t.id !== tierId) return t;
      const quantity = t.quantity ? { ...t.quantity } : {};

      if (type === 'text') {
        quantity.textTokens = quantity.textTokens || { input: 0, output: 0 };
        quantity.textTokens = {
          ...quantity.textTokens,
          [field]: value
        };
      } else if (type === 'image') {
        quantity.imageCount = value;
      } else if (type === 'video') {
        quantity.videoSeconds = value;
      }

      return { ...t, quantity };
    }));
  };

  const handleMarginChange = (tierId: string, type: 'text' | 'image' | 'video', value: number) => {
    setTiers(prevTiers => prevTiers.map(t => {
      if (t.id !== tierId) return t;
      const margins = t.margins || {};
      margins[type] = value;
      return { ...t, margins };
    }));
  };


  return (
    <div
      key={tier.id}
      className="w-full h-full"
    >
      <Card
        className={`w-full overflow-hidden transition-all hover:shadow-md flex flex-col justify-between`}
      >
        <CardHeader className="w-full bg-muted/30" >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-bold text-primary">{tier.name}</CardTitle>
              <div className="flex gap-2">
              </div>
            </div>
            <div className="flex gap-2">
              <TierEditSheet
                tier={tier}
                onUpdateTier={(updatedTier) => {
                  setTiers(prevTiers =>
                    prevTiers.map(t => t.id === updatedTier.id ? updatedTier : t)
                  );
                }}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDeleteTier(tier.id)}
                className="p-2 transition-all hover:bg-destructive/40"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0" >
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-none">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
            </TabsList>
            <TabsContent className="p-4 min-h-60 space-y-6 bg-card shadow-sm transition-all" value="text">
              {tier.models.filter((model): model is TextModel => 'inputCostPerMillion' in model).length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="space-y-2">

                    <Table>
                      <TableHeader>
                        <TableRow key="provider" className="text-xs">
                          <TableHead>Provider</TableHead>
                          <TableHead>Input/Output</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tier.models
                          .filter((model): model is TextModel => 'inputCostPerMillion' in model)
                          .map((model, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell width={"100%"}>
                                  <div className="flex items-start justify-start">
                                    <div className="flex items-center gap-2">
                                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">{model.model}</span>
                                      {tier.models.filter((m): m is TextModel => 'inputCostPerMillion' in m).reduce((prev, curr) =>
                                        (curr.inputCostPerMillion + curr.outputCostPerMillion) > (prev.inputCostPerMillion + prev.outputCostPerMillion) ? curr : prev
                                      ).model === model.model && <Check className="w-4 h-4 text-green-500" />}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-green-300">
                                  <div className="flex items-start justify-start">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded rounded-r-none">${model.inputCostPerMillion}</span>
                                    <span className="bg-blue-300 text-blue-800 text-xs font-medium px-2 py-0.5 rounded rounded-l-none">${model.outputCostPerMillion}</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              <div className="space-y-2 flex flex-col gap-2">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`useHighestCost-text-${tier.id}`}
                      checked={tier.useHighestCost?.text || false}
                      onChange={(e) => {
                        setTiers(prevTiers => prevTiers.map(t =>
                          t.id === tier.id ? { ...t, useHighestCost: { ...t.useHighestCost, text: e.target.checked } } : t
                        ));
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor={`useHighestCost-text-${tier.id}`} className="text-sm text-gray-700">
                      Calculate using most expensive model only
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Input</Label>
                      <Input
                        type="number"
                        className="text-xs placeholder:text-xs"
                        placeholder="Enter input tokens"
                        value={tier.quantity?.textTokens?.input || ''}
                        onChange={(e) => handleQuantityChange(tier.id, 'text', 'input', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Output Tokens</Label>
                      <Input
                        type="number"
                        className="placeholder:text-xs"
                        placeholder="Enter output tokens"
                        value={tier.quantity?.textTokens?.output || ''}
                        onChange={(e) => handleQuantityChange(tier.id, 'text', 'output', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Profit Margin (%)</Label>
                    <Input
                      type="number"
                      className="placeholder:text-xs"
                      placeholder="Enter margin percentage"
                      value={tier.margins?.text || ''}
                      onChange={(e) => handleMarginChange(tier.id, 'text', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="p-4 min-h-60 space-y-6 bg-card shadow-sm transition-all" value="image">
              {tier.models.filter((model): model is ImageModel => 'costPerImage' in model).length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="space-y-2">
                    <Table>
                      <TableHeader>
                        <TableRow key="provider" className="text-xs">
                          <TableHead>Provider</TableHead>
                          <TableHead>Per image</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tier.models
                          .filter((model): model is ImageModel => 'costPerImage' in model)
                          .map((model, index) => {

                            return (
                              <TableRow key={index}>
                                <TableCell width={"100%"}>
                                  <div className="flex items-start justify-start">
                                    <div className="flex items-center gap-2">
                                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">{model.model}</span>
                                      {tier.models.filter((m): m is ImageModel => 'costPerImage' in m).reduce((prev, curr) =>
                                        curr.costPerImage > prev.costPerImage ? curr : prev
                                      ).model === model.model && <Check className="w-4 h-4 text-green-500" />}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-green-300">
                                  <div className="flex items-start justify-start">
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">${model.costPerImage}</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    id={`useHighestCost-image-${tier.id}`}
                    checked={tier.useHighestCost?.image || false}
                    onChange={(e) => {
                      setTiers(prevTiers => prevTiers.map(t =>
                        t.id === tier.id ? { ...t, useHighestCost: { ...t.useHighestCost, image: e.target.checked } } : t
                      ));
                    }}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor={`useHighestCost-image-${tier.id}`} className="text-sm text-gray-700">
                    Calculate using most expensive model only
                  </label>
                </div>
                <div className="flex flex-col gap-1 text-xs">
                  <Label className="text-xs">Number of Images</Label>
                  <Input
                    className="text-xs placeholder:text-xs"
                    type="number"
                    placeholder="Enter number of images"
                    value={tier.quantity?.imageCount || ''}
                    onChange={(e) => handleQuantityChange(tier.id, 'image', 'count', parseInt(e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Profit Margin (%)</Label>
                  <Input
                    type="number"
                    className="text-xs placeholder:text-xs"
                    placeholder="Enter margin percentage"
                    value={tier.margins?.image || ''}
                    onChange={(e) => handleMarginChange(tier.id, 'image', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent className="p-4 min-h-60 space-y-6 bg-card shadow-sm transition-all" value="video">
              {tier.models.filter((model): model is VideoModel => 'costPerSecond' in model).length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="space-y-2">
                    <Table>
                      <TableHeader>
                        <TableRow className="text-xs">
                          <TableHead>Provider</TableHead>
                          <TableHead>Per image</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tier.models
                          .filter((model): model is VideoModel => 'costPerSecond' in model)
                          .map((model, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell width={"100%"} align="left">
                                  <div className="flex items-start justify-start">
                                    <div className="flex items-center gap-2">
                                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">{model.model}</span>
                                      {tier.models.filter((m): m is VideoModel => 'costPerSecond' in m).reduce((prev, curr) =>
                                        curr.costPerSecond > prev.costPerSecond ? curr : prev
                                      ).model === model.model && <Check className="w-4 h-4 text-green-500" />}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell align="right" className="text-green-300">
                                  <div className="flex items-start justify-start">
                                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">${model.costPerSecond}</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    id={`useHighestCost-video-${tier.id}`}
                    checked={tier.useHighestCost?.video || false}
                    onChange={(e) => {
                      setTiers(prevTiers => prevTiers.map(t =>
                        t.id === tier.id ? { ...t, useHighestCost: { ...t.useHighestCost, video: e.target.checked } } : t
                      ));
                    }}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor={`useHighestCost-video-${tier.id}`} className="text-sm text-gray-700">
                    Calculate using most expensive model only
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Video Duration (seconds)</Label>
                  <Input
                    type="number"
                    className="text-xs placeholder:text-xs"
                    placeholder="Enter video duration"
                    value={tier.quantity?.videoSeconds || ''}
                    onChange={(e) => handleQuantityChange(tier.id, 'video', 'seconds', parseInt(e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Profit Margin (%)</Label>
                  <Input
                    type="number"
                    className="text-xs placeholder:text-xs"

                    placeholder="Enter margin percentage"
                    value={tier.margins?.video || ''}
                    onChange={(e) => handleMarginChange(tier.id, 'video', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="p-4 border-t">
            <div className="space-y-2">
              <h3 className="text-sm font-medium mb-4">Cost Summary</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Base Cost</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tier.models.filter((model): model is TextModel => 'inputCostPerMillion' in model).length > 0 && (
                    <TableRow>
                      <TableCell>Text</TableCell>
                      <TableCell>{calculateTierCosts(tier).text.baseCost}</TableCell>
                      <TableCell className="text-green-300">{calculateTierCosts(tier).text.profit}</TableCell>
                      <TableCell >{calculateTierCosts(tier).text.total}</TableCell>
                    </TableRow>
                  )}
                  {tier.models.filter((model): model is ImageModel => 'costPerImage' in model).length > 0 && (
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>{calculateTierCosts(tier).image.baseCost}</TableCell>
                      <TableCell className="text-green-300">{calculateTierCosts(tier).image.profit}</TableCell>
                      <TableCell >{calculateTierCosts(tier).image.total}</TableCell>

                    </TableRow>
                  )}
                  {tier.models.filter((model): model is VideoModel => 'costPerSecond' in model).length > 0 && (
                    <TableRow>
                      <TableCell>Video</TableCell>
                      <TableCell>{calculateTierCosts(tier).video.baseCost}</TableCell>
                      <TableCell className="text-green-300">{calculateTierCosts(tier).video.profit}</TableCell>
                      <TableCell>{calculateTierCosts(tier).video.total}</TableCell>

                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>{calculateTierCosts(tier).total.baseCost}</TableCell>
                    <TableCell className="text-green-300">{calculateTierCosts(tier).total.profit}</TableCell>
                    <TableCell>{calculateTotalPrice(tier)}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div >
  );
}




