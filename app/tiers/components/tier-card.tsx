import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Separator } from "@/components/ui/separator";
import { ProcessedTier } from "@/lib/tier.types";
import NumberFlow from "@number-flow/react";
import { SaveIcon } from "lucide-react";
import { useState } from "react";
import { ActionsTier } from "./actions-tier";
import { EmptyTierModels } from "./empty-tier-models";
import { ModelSelectionSheet } from "./model-selection-sheet";
import { ModelTypeNavigation } from "./model-type-navigation";
import { TierEditSheet } from "./tier-edit-sheet";

type TTierProps = {
  tier: ProcessedTier;
  onRemoveModelsFromTier: (tierId: string, modelIds: string[]) => void;
  onAddModelsToTier: (tierId: string, modelIds: string[]) => void;
  onUpdateTier: (tierId: string, name: string) => void;
  onDeleteTier: (tierId: string) => void;
  isLoading: boolean;
};

function TierCard({ tier, onAddModelsToTier, onRemoveModelsFromTier, onUpdateTier, onDeleteTier, isLoading }: TTierProps) {
  const [isModelSheetOpen, setModelSheetOpen] = useState(false);
  const [isEditSheetOpen, setEditSheetOpen] = useState(false);
  const [isDeletingConfirmationOpen, setDeletingConfirmationSheetOpen] = useState(false);

  const [modelType, setModelType] = useState<"text" | "image" | "video">("text");

  const handleDeleteTier = () => {
    setDeletingConfirmationSheetOpen(true);
  };

  const handleDeleteTierConfirmation = (id: string) => {
    onDeleteTier(id);
    setDeletingConfirmationSheetOpen(false);
  };

  const handleSetModelType = (modelType: "text" | "image" | "video") => {
    setModelSheetOpen(true);
    setModelType(modelType);
  };


  return (
    <div className="flex flex-col gap-4">
      <div className="border-dashed border border-brand/20 p-4 rounded-md flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Badge className="border-brand text-brand" variant="outline">
              {tier.models.length} Models
            </Badge>
          </div>
          <div className="flex items-center gap-2">

            <Button variant="outline" size="icon" className="border-brand/40">
              <SaveIcon className="w-4 h-4 text-brand" />
            </Button>
            <ActionsTier
              onClickDeleteOption={handleDeleteTier}
              onClickEditOption={() => setEditSheetOpen(true)}
              onClickModelOption={handleSetModelType}
            />
            {isModelSheetOpen && <ModelSelectionSheet
              isOpen={isModelSheetOpen}
              onOpenChange={setModelSheetOpen}
              onAddModelsToTier={onAddModelsToTier}
              onRemoveModelsFromTier={onRemoveModelsFromTier}
              modelType={modelType}
              tier={tier}
              isLoading={isLoading}
            />}

            <ConfirmDialog
              isOpen={isDeletingConfirmationOpen}
              onOpenChange={setDeletingConfirmationSheetOpen}
              onConfirm={() => handleDeleteTierConfirmation(tier.id)}
              title="Delete Tier"
              description="Are you sure you want to delete this tier? This action cannot be undone."
              confirmText="Delete"

            />
            <TierEditSheet
              isOpen={isEditSheetOpen}
              onOpenChange={setEditSheetOpen}
              tier={tier}
              onUpdateTier={onUpdateTier}
            />
          </div>
        </div>
      </div>
      <div className="border  border-dashed border-brand/20 p-5 rounded-lg bg-background/30 flex flex-col">
        {tier.models.length === 0 ? (
          <EmptyTierModels tierName={tier.name} />)
          : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{modelType.charAt(0).toUpperCase() + modelType.slice(1)} Models</h3>
                  <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-brand/10 text-brand hover:bg-brand/20 transition-colors">
                    {tier.models.filter(model => model.model_type === modelType).length} models
                  </Badge>
                </div>
                <div className="flex gap-2">

                  <ModelTypeNavigation
                    models={tier.models}
                    activeModelType={modelType}
                    onSelectModelType={(type) => setModelType(type)}
                  />
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleSetModelType(modelType)}
                    className="text-xs border-brand/30 text-brand hover:bg-brand/10 hover:text-brand transition-colors"
                  >
                    Manage Models
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {tier.models
                  .filter(model => model.model_type === modelType)
                  .map(model => (
                    <div key={model.id} className="border border-brand/30 rounded-lg p-4 bg-background shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-200">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium truncate text-sm text-muted-foreground">{model.model_name}</div>
                          <Badge variant="outline" className={`text-xs px-2 py-0.5 border-brand/30 ${model.model_type === 'text' ? 'bg-blue-50 text-blue-700' : model.model_type === 'image' ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-700'}`}>
                            {model.model_type}
                          </Badge>
                        </div>

                        <Separator className="my-2 bg-brand/30" />

                        <div className="pt-1">
                          {model.model_type === 'text' && (
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {model.input_cost_per_million && (
                                <div className="flex flex-col">
                                  <span className="text-muted-foreground">Input Cost - 1M Tokens</span>
                                  <span className="font-medium text-foreground">
                                    <NumberFlow
                                      value={model.input_cost_per_million}
                                      format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 3, trailingZeroDisplay: 'stripIfInteger' }}
                                    />
                                  </span>
                                </div>
                              )}
                              {model.output_cost_per_million && (
                                <div className="flex flex-col">
                                  <span className="text-muted-foreground">Output Cost - 1M Tokens</span>
                                  <span className="font-medium text-foreground">
                                    <NumberFlow
                                      value={model.output_cost_per_million}
                                      format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 3, trailingZeroDisplay: 'stripIfInteger' }}
                                    />/token
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                          {model.model_type === 'image' && model.cost_per_image && (
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-muted-foreground">Cost per Image</span>
                              <span className="font-medium text-foreground">
                                <NumberFlow
                                  value={model.cost_per_image}
                                  format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 4 }}
                                />
                              </span>
                            </div>
                          )}
                          {model.model_type === 'video' && model.cost_per_second && (
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-muted-foreground">Cost per Second</span>
                              <span className="font-medium text-foreground">
                                <NumberFlow
                                  value={model.cost_per_second}
                                  format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 4 }}
                                />
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
}

export { TierCard };
