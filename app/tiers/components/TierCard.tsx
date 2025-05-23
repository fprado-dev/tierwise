// 'use client';

// import { useImageModelCalculator } from '@/app/hooks/useImageModelCalculator';
// import { useTextModelCalculator } from '@/app/hooks/useTextModelCalculator';
// import { useVideoModelCalculator } from '@/app/hooks/useVideoModelCalculator';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Checkbox } from '@/components/ui/checkbox';
// import { ConfirmDialog } from '@/components/ui/confirm-dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from "@/components/ui/label"; // Added import for Label
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useTiers } from '@/hooks/useTiers';
// import { useTierSummary } from '@/hooks/useTierSummary';
// import { ProcessedTier } from '@/lib/tier.types';
// import NumberFlow from '@number-flow/react';
// import { CogIcon, PencilLineIcon, SaveIcon, TrashIcon } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { ModelSelectionSheet } from './model-selection-sheet';
// import { TierEditSheet } from './tier-edit-sheet';

// interface TierCardProps {
//   tier: ProcessedTier;
// }


// export const getTypeColor = (type: string) => {
//   switch (type) {
//     case 'text': return 'bg-blue-100 text-blue-800';
//     case 'image': return 'bg-green-100 text-green-800';
//     case 'video': return 'bg-purple-100 text-purple-800';
//     case 'audio': return 'bg-yellow-100 text-yellow-800';
//     case 'hardware': return 'bg-red-100 text-red-800';
//     default: return 'bg-gray-100 text-gray-800';
//   }
// };

// export function TierCard({ tier }: TierCardProps) {
//   const [isEditing, setEditSheetopen] = useState(false);
//   const [modelType, setModelType] = useState<'text' | 'image' | 'video' | undefined>();
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

//   const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
//   const { deleteTier, updateTier } = useTiers();
//   const { summary, isLoading, saveSummary } = useTierSummary(tier.id);

//   const {
//     inputTokens,
//     outputTokens,
//     marginPercentage: textMarginPercentage,
//     useExpensiveModel: textUseExpensiveModel,
//     setInputTokens,
//     setOutputTokens,
//     setMarginPercentage: setTextMarginPercentage,
//     setUseExpensiveModel: setTextUseExpensiveModel,
//     totalBaseCost: textTotalBaseCost,
//     totalProfitValue: textTotalProfitValue,
//     totalCost: textTotalCost,
//     getMostExpensiveModel: getTextMostExpensiveModel,
//   } = useTextModelCalculator(tier);

//   const {
//     imageCount,
//     marginPercentage: imageMarginPercentage,
//     useExpensiveModel: imageUseExpensiveModel,
//     setImageCount,
//     setMarginPercentage: setImageMarginPercentage,
//     setUseExpensiveModel: setImageUseExpensiveModel,
//     totalBaseCost: imageTotalBaseCost,
//     totalProfitValue: imageTotalProfitValue,
//     totalCost: imageTotalCost,
//     getMostExpensiveModel: getImageMostExpensiveModel,
//   } = useImageModelCalculator(tier);

//   const {
//     videoSeconds,
//     marginPercentage: videoMarginPercentage,
//     useExpensiveModel: videoUseExpensiveModel,
//     setVideoSeconds,
//     setMarginPercentage: setVideoMarginPercentage,
//     setUseExpensiveModel: setVideoUseExpensiveModel,
//     totalBaseCost: videoTotalBaseCost,
//     totalProfitValue: videoTotalProfitValue,
//     totalCost: videoTotalCost,
//     getMostExpensiveModel: getVideoMostExpensiveModel,
//   } = useVideoModelCalculator(tier);




//   // Load summary data when component mounts
//   useEffect(() => {
//     if (summary) {
//       // Populate text model calculator fields
//       setInputTokens(summary.input_tokens);
//       setOutputTokens(summary.output_tokens);
//       setTextMarginPercentage(summary.text_margin_percentage);
//       setTextUseExpensiveModel(summary.text_use_expensive_model);

//       // Populate image model calculator fields
//       setImageCount(summary.image_count);
//       setImageMarginPercentage(summary.image_margin_percentage);
//       setImageUseExpensiveModel(summary.image_use_expensive_model);

//       // Populate video model calculator fields
//       setVideoSeconds(summary.video_seconds);
//       setVideoMarginPercentage(summary.video_margin_percentage);
//       setVideoUseExpensiveModel(summary.video_use_expensive_model);

//       // Reset unsaved changes flag when loading from summary
//       setHasUnsavedChanges(false);
//     }
//   }, [summary, setInputTokens, setOutputTokens, setTextMarginPercentage, setTextUseExpensiveModel,
//     setImageCount, setImageMarginPercentage, setImageUseExpensiveModel,
//     setVideoSeconds, setVideoMarginPercentage, setVideoUseExpensiveModel]);

//   const handleSummary = () => {
//     // Save summary data when showing the summary
//     saveSummary({
//       tier_id: tier.id,
//       input_tokens: inputTokens,
//       output_tokens: outputTokens,
//       image_count: imageCount,
//       video_seconds: videoSeconds,
//       text_margin_percentage: textMarginPercentage,
//       image_margin_percentage: imageMarginPercentage,
//       video_margin_percentage: videoMarginPercentage,
//       text_use_expensive_model: textUseExpensiveModel,
//       image_use_expensive_model: imageUseExpensiveModel,
//       video_use_expensive_model: videoUseExpensiveModel,
//       operational_overhead_percentage: 0,
//     });
//     setHasUnsavedChanges(false);
//   };

//   // Track changes in calculator values
//   useEffect(() => {
//     if (summary) {
//       const hasTextChanges =
//         inputTokens !== summary.input_tokens ||
//         outputTokens !== summary.output_tokens ||
//         textMarginPercentage !== summary.text_margin_percentage ||
//         textUseExpensiveModel !== summary.text_use_expensive_model;

//       const hasImageChanges =
//         imageCount !== summary.image_count ||
//         imageMarginPercentage !== summary.image_margin_percentage ||
//         imageUseExpensiveModel !== summary.image_use_expensive_model;

//       const hasVideoChanges =
//         videoSeconds !== summary.video_seconds ||
//         videoMarginPercentage !== summary.video_margin_percentage ||
//         videoUseExpensiveModel !== summary.video_use_expensive_model;

//       setHasUnsavedChanges(hasTextChanges || hasImageChanges || hasVideoChanges);
//     }
//   }, [summary, inputTokens, outputTokens, textMarginPercentage, textUseExpensiveModel,
//     imageCount, imageMarginPercentage, imageUseExpensiveModel,
//     videoSeconds, videoMarginPercentage, videoUseExpensiveModel]);


//   const hasTextModel = tier.models.some(model => model.model_type === 'text');
//   const hasImageModel = tier.models.some(model => model.model_type === 'image');
//   const hasVideoModel = tier.models.some(model => model.model_type === 'video');
//   return (
//     <Card className='bg-transparent'>
//       <CardHeader className=''>
//         <div className="flex flex-col  items-start gap-4 sm:flex-row sm:items-center justify-between ">
//           <div className='flex flex-col gap-2'>
//             <div className='flex items-center gap-3'>
//               <h3 className="text-xl font-bold tracking-tight">{tier.name}</h3>
//               <Badge variant="secondary" className='px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors'>
//                 {tier.models.length} Models
//               </Badge>
//             </div>
//             <p className='text-sm text-muted-foreground'>Manage your AI models and pricing configuration</p>
//           </div>
//           <div className='flex items-center gap-2'>
//             <Button
//               size="icon"
//               variant={hasUnsavedChanges ? "default" : "outline"}
//               onClick={handleSummary}
//               className={`${hasUnsavedChanges
//                 ? 'bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse'
//                 : 'hover:bg-sidebar-foreground/90 bg-sidebar hover:text-white text-primary'} transition-colors relative`}
//               title={hasUnsavedChanges ? "You have unsaved changes" : "Save changes"}
//             >
//               <SaveIcon className='h-4 w-4' />
//               {hasUnsavedChanges && (
//                 <span className="absolute -top-1 -right-1 flex h-3 w-3">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//                 </span>
//               )}
//             </Button>
//             <Button
//               size="icon"
//               variant="outline"
//               onClick={() => setModelType('text')}
//               className='hover:bg-primary/10 hover:text-primary transition-colors'
//             >
//               <CogIcon className='h-4 w-4' />
//             </Button>
//             <Button
//               size="icon"
//               variant="outline"
//               className='hover:bg-primary/10 hover:text-primary transition-colors'
//               onClick={() => setEditSheetopen(prev => !prev)}
//             >
//               <PencilLineIcon className='h-4 w-4' />
//             </Button>
//             <Button
//               size="icon"
//               variant="destructive"
//               className='hover:bg-destructive/10 hover:text-destructive transition-colors'
//               onClick={() => setIsDeleteConfirmOpen(true)}
//             >
//               <TrashIcon className='h-4 w-4' />
//             </Button>
//           </div>
//         </div>
//       </CardHeader>
//       <ConfirmDialog
//         isOpen={isDeleteConfirmOpen}
//         onOpenChange={setIsDeleteConfirmOpen}
//         onConfirm={() => deleteTier(tier.id)}
//         title="Delete Tier"
//         description="Are you sure you want to delete this tier? This action cannot be undone."
//         confirmText="Delete"
//       />
//       {modelType && (
//         <ModelSelectionSheet
//           tier={tier}
//           modelType={modelType}
//           isOpen={modelType !== undefined}
//           onOpenChange={(open) => !open && setModelType(undefined)}
//           onUpdateTier={updateTier}
//         />
//       )}
//       <TierEditSheet
//         tier={tier}
//         isOpen={isEditing}
//         onOpenChange={setEditSheetopen}
//         onUpdateTier={updateTier}
//       />
//       <CardContent className='flex flex-col gap-4 px-4'>
//         {(!hasTextModel && !hasImageModel && !hasVideoModel) ? (

//           <div className="flex flex-col items-center justify-center h-full text-center p-8">
//             <div className="rounded-full bg-muted p-3 mb-4">
//               <CogIcon className="h-6 w-6 text-muted-foreground" />
//             </div>
//             <h3 className="font-semibold text-lg mb-1">No models found</h3>
//             <p className="text-muted-foreground max-w-md">
//               Add models to your tier to get started.
//             </p>
//           </div>
//         ) : (


//           <Tabs defaultValue="text" className="w-full">
//             <TabsList className="grid w-full grid-cols-3">
//               {hasTextModel && <TabsTrigger value="text" >Text</TabsTrigger>}
//               {hasImageModel && <TabsTrigger value="image">Image</TabsTrigger>}
//               {hasVideoModel && <TabsTrigger value="video" >Video</TabsTrigger>}
//             </TabsList>
//             <TabsContent value="text">
//               {hasTextModel && (
//                 <div className="h-full flex flex-col p-1">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-2">
//                       <h3 className="font-semibold text-sm sm:text-lg text-stone-700 dark:text-stone-400">Configuration</h3>
//                       <Badge className={getTypeColor('text')}>Text</Badge>
//                     </div>
//                     <Button
//                       size="icon"
//                       variant="outline"
//                       onClick={(e) => { e.stopPropagation(); setModelType("text"); }}
//                       className={`flex items-center gap-2 transition-colors hover:bg-stone-100 dark:hover:bg-stone-900/50`}
//                       title="Configure Text Models"
//                     >
//                       <CogIcon className='w-4 h-4 text-stone-600 dark:text-stone-400' />
//                     </Button>
//                   </div>

//                   {/* Main Content Grid - Three Columns */}
//                   <div className="grid grid-cols-4 gap-4">
//                     {/* Cost & Profit Overview */}
//                     <div className="col-span-4 gap-4 border rounded-md">
//                       <div className="p-4  ">
//                         <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-4">Cost & Profit Overview</h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                           <CostDisplayItem
//                             label="Base Model Cost"
//                             value={textTotalBaseCost}
//                             description="Raw cost from model providers."
//                             iconColor="text-stone-500"
//                           />
//                           <CostDisplayItem
//                             label="Total Cost"
//                             value={textTotalCost}
//                             description={`Includes ${textMarginPercentage}% margin.`}
//                             iconColor="text-orange-500" // Keeping orange for emphasis on cost
//                           />
//                           <CostDisplayItem
//                             label="Projected Profit"
//                             value={textTotalProfitValue}
//                             description="Estimated profit from this model type."
//                             iconColor="text-green-500" // Keeping green for emphasis on profit
//                             isEmphasized
//                           />
//                         </div>
//                       </div>

//                     </div>

//                     {/* Interactive Calculator Section */}
//                     <div className="col-span-4 sm:col-span-2">
//                       <div className="p-4 h-full border rounded-md">
//                         <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-3">Interactive Calculator</h4>
//                         <div className="space-y-4">
//                           <div className="flex items-center gap-3 p-3  rounded-md border border-stone-100 dark:border-stone-900/20">
//                             <Checkbox
//                               id="text-use-expensive"
//                               checked={textUseExpensiveModel}
//                               onCheckedChange={(checked) => setTextUseExpensiveModel(checked as boolean)}
//                               className="data-[state=checked]:bg-primary data-[state=checked]:border-primary transform scale-90"
//                             />
//                             <Label htmlFor="text-use-expensive" className="text-sm font-medium text-stone-700 dark:text-stone-400 cursor-pointer">
//                               Prioritize Most Expensive Model
//                             </Label>
//                           </div>

//                           <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
//                             <div className="space-y-1.5">
//                               <Label htmlFor="input-tokens" className="text-xs font-medium text-muted-foreground">Input Tokens</Label>
//                               <Input
//                                 id="input-tokens"
//                                 type="number"
//                                 value={inputTokens}
//                                 onChange={(e) => setInputTokens(Number(e.target.value))}
//                                 className="bg-background focus:ring-1 focus:ring-primary/20 w-full text-sm p-2 rounded-md border-stone-200 dark:border-stone-800/50"
//                                 placeholder="e.g., 100k"
//                               />
//                             </div>

//                             <div className="space-y-1.5">
//                               <Label htmlFor="output-tokens" className="text-xs font-medium text-muted-foreground">Output Tokens</Label>
//                               <Input
//                                 id="output-tokens"
//                                 type="number"
//                                 value={outputTokens}
//                                 onChange={(e) => setOutputTokens(Number(e.target.value))}
//                                 className="bg-background focus:ring-1 focus:ring-primary/20 w-full text-sm p-2 rounded-md border-stone-200 dark:border-stone-800/50"
//                                 placeholder="e.g., 50k"
//                               />
//                             </div>
//                           </div>

//                           <div className="space-y-1.5">
//                             <Label htmlFor="text-margin" className="text-xs font-medium text-muted-foreground">Margin (%)</Label>
//                             <Input
//                               id="text-margin"
//                               type="number"
//                               value={textMarginPercentage}
//                               onChange={(e) => setTextMarginPercentage(Number(e.target.value))}
//                               className="bg-background focus:ring-1 focus:ring-primary/20 w-full text-sm p-2 rounded-md border-stone-200 dark:border-stone-800/50"
//                               placeholder="e.g., 20"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Key Metrics Section */}
//                     <div className="col-span-4 sm:col-span-2 gap-4 border rounded-md">
//                       <div className="p-4 bg-white dark:bg-background/30 rounded-lg shadow-sm border border-stone-100 dark:border-stone-900/20 h-full">
//                         <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-3">Key Metrics</h4>
//                         <div className="space-y-2.5 text-sm">
//                           <MetricItem label="Avg. Input Tokens" value={inputTokens.toLocaleString()} />
//                           <MetricItem label="Avg. Output Tokens" value={outputTokens.toLocaleString()} />
//                           <MetricItem label="Est. Cost per 1M Tokens">
//                             <NumberFlow
//                               format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2 }}
//                               value={(inputTokens + outputTokens) > 0 ? textTotalBaseCost / ((inputTokens + outputTokens) / 1000000) : 0} />
//                           </MetricItem>
//                           <MetricItem label="Applied Margin" value={`${textMarginPercentage}%`} />
//                           {getTextMostExpensiveModel() && (
//                             <MetricItem label="Expensive Model Used" value={getTextMostExpensiveModel()?.model_name || 'N/A'} />
//                           )}
//                         </div>
//                       </div>

//                     </div>

//                     <div className="col-span-4 flex flex-col gap-4 rounded-md border">
//                       {/* Column 3: Included Text Models */}
//                       {tier.models.filter(m => m.model_type === 'text').length > 0 && (
//                         <div className="p-4 bg-white dark:bg-background/30 rounded-lg shadow-sm border border-stone-100 dark:border-stone-900/20">
//                           <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-3">Included Text Models</h4>
//                           <div className="space-y-2">
//                             {tier.models.filter(m => m.model_type === 'text').map(model => (
//                               <div key={model.id} className="flex justify-between items-center p-2 bg-stone-50/50 dark:bg-stone-950/10 rounded-md text-xs">
//                                 <span className="font-medium text-stone-700 dark:text-stone-300">{model.model_name}</span>
//                                 <Badge variant="outline" className="border-stone-300 text-stone-600 dark:border-stone-700 dark:text-stone-400">
//                                   {model.provider || "Custom Provider"}
//                                 </Badge>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </TabsContent>
//             <TabsContent value="image">
//               {hasImageModel && (
//                 <div className="h-full flex flex-col p-1">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-2">
//                       <h3 className="font-semibold text-sm sm:text-lg text-stone-700 dark:text-stone-400">Configuration</h3>
//                       <Badge className={getTypeColor('image')}>Image</Badge>
//                     </div>
//                     <Button
//                       size="icon"
//                       variant="outline"
//                       onClick={(e) => { e.stopPropagation(); setModelType("image"); }}
//                       className={`flex items-center gap-2 transition-colors hover:bg-stone-100 dark:hover:bg-stone-900/50`}
//                       title="Configure Image Models"
//                     >
//                       <CogIcon className='w-4 h-4 text-stone-600 dark:text-stone-400' />
//                     </Button>
//                   </div>

//                   {/* Main Content Grid - Three Columns */}
//                   <div className="grid grid-cols-4 gap-4">
//                     {/* Cost & Profit Overview */}
//                     <div className="col-span-4 gap-4 border flex flex-col rounded-md">
//                       <div className="p-4 ">
//                         <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-4">Cost & Profit Overview</h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                           <CostDisplayItem
//                             label="Base Model Cost"
//                             value={imageTotalBaseCost}
//                             description="Raw cost from model providers."
//                             iconColor="text-stone-500"
//                           />
//                           <CostDisplayItem
//                             label="Total Cost"
//                             value={imageTotalCost}
//                             description={`Includes ${imageMarginPercentage}% margin.`}
//                             iconColor="text-orange-500"
//                           />
//                           <CostDisplayItem
//                             label="Projected Profit"
//                             value={imageTotalProfitValue}
//                             description="Estimated profit from this model type."
//                             iconColor="text-green-500"
//                             isEmphasized
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-span-4 sm:col-span-2 gap-4 flex flex-col rounded-md border">
//                       {/* Interactive Calculator Section */}
//                       <div className="p-4 bg-white dark:bg-background/30 rounded-lg shadow-sm border border-stone-100 dark:border-stone-900/20 h-full">
//                         <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-3">Interactive Calculator</h4>
//                         <div className="space-y-4">
//                           <div className="flex items-center gap-3 p-3 rounded-md border border-stone-100 dark:border-stone-900/20">
//                             <Checkbox
//                               id="image-use-expensive"
//                               checked={imageUseExpensiveModel}
//                               onCheckedChange={(checked) => setImageUseExpensiveModel(checked as boolean)}
//                               className="data-[state=checked]:bg-primary data-[state=checked]:border-primary transform scale-90"
//                             />
//                             <Label htmlFor="image-use-expensive" className="text-sm font-medium text-stone-700 dark:text-stone-400 cursor-pointer">
//                               Prioritize Most Expensive Model
//                             </Label>
//                           </div>

//                           <div className="space-y-1.5">
//                             <Label htmlFor="image-count" className="text-xs font-medium text-muted-foreground">Image Count</Label>
//                             <Input
//                               id="image-count"
//                               type="number"
//                               value={imageCount}
//                               onChange={(e) => setImageCount(Number(e.target.value))}
//                               className="bg-background focus:ring-1 focus:ring-primary/20 w-full text-sm p-2 rounded-md border-stone-200 dark:border-stone-800/50"
//                               placeholder="e.g., 1000"
//                             />
//                           </div>

//                           <div className="space-y-1.5">
//                             <Label htmlFor="image-margin" className="text-xs font-medium text-muted-foreground">Margin (%)</Label>
//                             <Input
//                               id="image-margin"
//                               type="number"
//                               value={imageMarginPercentage}
//                               onChange={(e) => setImageMarginPercentage(Number(e.target.value))}
//                               className="bg-background focus:ring-1 focus:ring-primary/20 w-full text-sm p-2 rounded-md border-stone-200 dark:border-stone-800/50"
//                               placeholder="e.g., 20"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-span-4 sm:col-span-2 gap-4 flex flex-col rounded-md border">
//                       {/* Key Metrics Section */}
//                       <div className="p-4 bg-white dark:bg-background/30 rounded-lg shadow-sm border border-stone-100 dark:border-stone-900/20 h-full">
//                         <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-3">Key Metrics</h4>
//                         <div className="space-y-2.5 text-sm">
//                           <MetricItem label="Avg. Image Count" value={imageCount.toLocaleString()} />
//                           <MetricItem label="Est. Cost per Image">
//                             <NumberFlow
//                               format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 4 }}
//                               value={imageCount > 0 ? imageTotalBaseCost / imageCount : 0} />
//                           </MetricItem>
//                           <MetricItem label="Applied Margin" value={`${imageMarginPercentage}%`} />
//                           {getImageMostExpensiveModel() && (
//                             <MetricItem label="Expensive Model Used" value={getImageMostExpensiveModel()?.model_name || 'N/A'} />
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-span-4 flex flex-col gap-4">
//                       {/* Included Image Models */}
//                       {tier.models.filter(m => m.model_type === 'image').length > 0 && (
//                         <div className="p-4 border rounded-md">
//                           <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-3">Included Image Models</h4>
//                           <div className="space-y-2">
//                             {tier.models.filter(m => m.model_type === 'image').map(model => (
//                               <div key={model.id} className="flex justify-between items-center p-2 bg-stone-50/50 dark:bg-stone-950/10 rounded-md text-xs">
//                                 <span className="font-medium text-stone-700 dark:text-stone-300">{model.model_name}</span>
//                                 <Badge variant="outline" className="border-stone-300 text-stone-600 dark:border-stone-700 dark:text-stone-400">
//                                   {model.provider || "Custom Provider"}
//                                 </Badge>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </TabsContent>
//             <TabsContent value="video">
//               {hasVideoModel && (
//                 <div className="h-full flex flex-col p-1">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-2">
//                       <h3 className="font-semibold text-sm sm:text-lg text-stone-700 dark:text-stone-400">Configuration</h3>
//                       <Badge className={getTypeColor('video')}>Video</Badge>
//                     </div>
//                     <Button
//                       size="icon"
//                       variant="outline"
//                       onClick={(e) => { e.stopPropagation(); setModelType("video"); }}
//                       className={`flex items-center gap-2 transition-colors hover:bg-stone-100 dark:hover:bg-stone-900/50`}
//                       title="Configure Video Models"
//                     >
//                       <CogIcon className='w-4 h-4 text-stone-600 dark:text-stone-400' />
//                     </Button>
//                   </div>

//                   {/* Main Content Grid - Three Columns */}
//                   <div className="grid grid-cols-4 gap-4">
//                     {/* Cost & Profit Overview */}
//                     <div className="col-span-4 gap-4 flex flex-col border rounded-md">
//                       <div className="p-4 rounded border border-stone-100 dark:border-stone-900/20">
//                         <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-4">Cost & Profit Overview</h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                           <CostDisplayItem
//                             label="Base Model Cost"
//                             value={videoTotalBaseCost}
//                             description="Raw cost from model providers."
//                             iconColor="text-stone-500"
//                           />
//                           <CostDisplayItem
//                             label="Total Cost"
//                             value={videoTotalCost}
//                             description={`Includes ${videoMarginPercentage}% margin.`}
//                             iconColor="text-orange-500"
//                           />
//                           <CostDisplayItem
//                             label="Projected Profit"
//                             value={videoTotalProfitValue}
//                             description="Estimated profit from this model type."
//                             iconColor="text-green-500"
//                             isEmphasized
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-span-4 sm:col-span-2 gap-4 flex flex-col border rounded-md">
//                       {/* Interactive Calculator Section */}
//                       <div className="p-4 bg-white dark:bg-background/30 rounded-lg shadow-sm border border-stone-100 dark:border-stone-900/20 h-full">
//                         <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-3">Interactive Calculator</h4>
//                         <div className="space-y-4">
//                           <div className="flex items-center gap-3 p-3 rounded-md border border-stone-100 dark:border-stone-900/20">
//                             <Checkbox
//                               id="video-use-expensive"
//                               checked={videoUseExpensiveModel}
//                               onCheckedChange={(checked) => setVideoUseExpensiveModel(checked as boolean)}
//                               className="data-[state=checked]:bg-primary data-[state=checked]:border-primary transform scale-90"
//                             />
//                             <Label htmlFor="video-use-expensive" className="text-sm font-medium text-stone-700 dark:text-stone-400 cursor-pointer">
//                               Prioritize Most Expensive Model
//                             </Label>
//                           </div>

//                           <div className="space-y-1.5">
//                             <Label htmlFor="video-seconds" className="text-xs font-medium text-muted-foreground">Video Seconds</Label>
//                             <Input
//                               id="video-seconds"
//                               type="number"
//                               value={videoSeconds}
//                               onChange={(e) => setVideoSeconds(Number(e.target.value))}
//                               className="bg-background focus:ring-1 focus:ring-primary/20 w-full text-sm p-2 rounded-md border-stone-200 dark:border-stone-800/50"
//                               placeholder="e.g., 60"
//                             />
//                           </div>

//                           <div className="space-y-1.5">
//                             <Label htmlFor="video-margin" className="text-xs font-medium text-muted-foreground">Margin (%)</Label>
//                             <Input
//                               id="video-margin"
//                               type="number"
//                               value={videoMarginPercentage}
//                               onChange={(e) => setVideoMarginPercentage(Number(e.target.value))}
//                               className="bg-background focus:ring-1 focus:ring-primary/20 w-full text-sm p-2 rounded-md border-stone-200 dark:border-stone-800/50"
//                               placeholder="e.g., 20"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-span-4 sm:col-span-2 gap-4 flex flex-col border-stone-100 dark:border-stone-900/30">
//                       {/* Key Metrics Section */}
//                       <div className="p-4 border rounded-md h-full">
//                         <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-3">Key Metrics</h4>
//                         <div className="space-y-2.5 text-sm">
//                           <MetricItem label="Avg. Video Seconds" value={videoSeconds.toLocaleString()} />
//                           <MetricItem label="Est. Cost per Second">
//                             <NumberFlow
//                               format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 4 }}
//                               value={videoSeconds > 0 ? videoTotalBaseCost / videoSeconds : 0} />
//                           </MetricItem>
//                           <MetricItem label="Applied Margin" value={`${videoMarginPercentage}%`} />
//                           {getVideoMostExpensiveModel() && (
//                             <MetricItem label="Expensive Model Used" value={getVideoMostExpensiveModel()?.model_name || 'N/A'} />
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-span-4 flex flex-col gap-4 border rounded-md">
//                       {/* Included Video Models */}
//                       {tier.models.filter(m => m.model_type === 'video').length > 0 && (
//                         <div className="p-4 bg-white dark:bg-background/30 rounded-lg shadow-sm border border-stone-100 dark:border-stone-900/20">
//                           <h4 className="text-md font-semibold text-stone-600 dark:text-stone-300 mb-3">Included Video Models</h4>
//                           <div className="space-y-2">
//                             {tier.models.filter(m => m.model_type === 'video').map(model => (
//                               <div key={model.id} className="flex justify-between items-center p-2 bg-stone-50/50 dark:bg-stone-950/10 rounded-md text-xs">
//                                 <span className="font-medium text-stone-700 dark:text-stone-300">{model.model_name}</span>
//                                 <Badge variant="outline" className="border-stone-300 text-stone-600 dark:border-stone-700 dark:text-stone-400">
//                                   {model.provider || "Custom Provider"}
//                                 </Badge>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </TabsContent>
//           </Tabs>)}
//       </CardContent>


//     </Card >
//   );
// };



// const MetricItem = ({ label, value, children }: { label: string, value?: string | number, children?: React.ReactNode; }) => (
//   <div className="flex justify-between items-center py-1.5 border-b">
//     <span className="text-xs text-muted-foreground whitespace-nowrap mr-2">{label}:</span>
//     {children ? <span className="font-medium text-xs text-right">{children}</span> : <span className="font-semibold text-xs text-primary text-right">{value}</span>}
//   </div>
// );

// const CostDisplayItem = ({ label, value, description, iconColor, isEmphasized }: { label: string, value: number, description: string, iconColor: string, isEmphasized?: boolean; }) => (
//   <div className="p-3 rounded-md border">
//     <div className="flex items-center justify-between mb-1">
//       <h5 className={`text-sm font-medium ${isEmphasized ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-400'}`}>{label}</h5>
//     </div>
//     <p className={`text-2xl font-bold ${isEmphasized ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
//       <NumberFlow format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger', minimumFractionDigits: 2 }} value={value} />
//     </p>
//     <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
//   </div>
// );