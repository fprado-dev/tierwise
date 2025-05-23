// 'use client';

// import { arrayMove } from '@dnd-kit/sortable';
// import { Layers3 } from 'lucide-react'; // Modified: Removed BarChartIcon, LightbulbIcon
// import { useEffect, useState } from 'react';
// import { useTiers } from "../../../hooks/useTiers";
// import { TierCard } from "./TierCard";



// export default function AICostCalculator() {
//   const { addTier, createTierMutation, deleteTierMutation, updateTierMutation, addModelsToTierMutation, tiers: initialTiers, isLoading } = useTiers();
//   const [tiers, setTiers] = useState(initialTiers);
//   const [activeTab, setActiveTab] = useState(initialTiers[0]?.id);

//   // New state and logic for Revenue Simulator
//   const [projectedUsers, setProjectedUsers] = useState<{ [tierId: string]: string; }>({});
//   const [revenueDetails, setRevenueDetails] = useState<{ [tierId: string]: { name: string, projectedRevenue: number; }; }>({});
//   const [totalProjectedRevenue, setTotalProjectedRevenue] = useState<number>(0);



//   useEffect(() => {
//     let calculatedTotalRevenue = 0;
//     const calculatedNewRevenueDetails: { [tierId: string]: { name: string, projectedRevenue: number; }; } = {};

//     initialTiers.forEach(tier => {
//       const users = parseInt(projectedUsers[tier.id] || '0', 10);
//       // IMPORTANT: Assuming tier.price exists and is a number representing monthly price.
//       // This might need adjustment based on the actual structure of ProcessedTier (e.g., tier.calculatedPricing.monthly).
//       // Using (tier as any).price for flexibility if 'price' is not strictly on ProcessedTier type.
//       const price = (tier as any).price && typeof (tier as any).price === 'number' ? (tier as any).price : 0;
//       const tierRevenue = users * price;
//       calculatedNewRevenueDetails[tier.id] = { name: tier.name, projectedRevenue: tierRevenue };
//       calculatedTotalRevenue += tierRevenue;
//     });

//     // Only update state if the calculated values have actually changed
//     if (JSON.stringify(calculatedNewRevenueDetails) !== JSON.stringify(revenueDetails)) {
//       setRevenueDetails(calculatedNewRevenueDetails);
//     }
//     if (calculatedTotalRevenue !== totalProjectedRevenue) {
//       setTotalProjectedRevenue(calculatedTotalRevenue);
//     }
//   }, [projectedUsers, initialTiers]);

//   useEffect(() => {
//     if (JSON.stringify(tiers) !== JSON.stringify(initialTiers)) {
//       setTiers(initialTiers);
//     }
//   }, [initialTiers]); // REMOVED tiers from dependency array

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (over && active.id !== over.id) {
//       setTiers((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   useEffect(() => {
//     if (tiers.length > 0) {
//       const currentTabIsValid = tiers.some(t => t.id === activeTab);
//       // If there's no activeTab, or the current activeTab is no longer valid
//       if (!activeTab || !currentTabIsValid) {
//         setActiveTab(tiers[0].id); // Set to the first available tier
//       }
//     } else {
//       // If there are no tiers, ensure activeTab is cleared
//       if (activeTab !== undefined) { // Only set if it's not already undefined
//         setActiveTab("");
//       }
//     }
//   }, [tiers]); // Only depend on tiers

//   if (isLoading || createTierMutation.isPending || deleteTierMutation.isPending || updateTierMutation.isPending || addModelsToTierMutation.isPending) {
//     return (
//       <Skeleton />
//     );
//   }

//   if (tiers.length === 0) {
//     return (
//       <div className="p-4 h-[calc(100vh-4rem)] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4 max-w-md text-center">
//           <div className="rounded-full bg-primary/10 p-6">
//             <Layers3 className="w-12 h-12 text-primary" />
//           </div>
//           <h2 className="text-2xl font-bold tracking-tight">No Tiers Created</h2>
//           <p className="text-muted-foreground">
//             Get started by creating your first tier. Add AI models and configure pricing to see your cost breakdown.
//           </p>
//         </div>
//       </div>

//     );
//   }

//   return (
//     <div className="flex flex-col gap-6  w-full">
//       <div className="flex p-4 items-center justify-between ">
//         <div>
//           <h1 className="text-3xl font-bold">Tier Builder</h1>
//           <p className="text-muted-foreground text-xs sm:text-base">Create and manage your AI service tiers and pricing</p>
//         </div>
//       </div>
//       <div className="w-ful">

//         <div className='my-4 p-4'>
//           {tiers.map((tier) => (
//             <div
//               key={tier.id}
//               className={`${tier.id === activeTab ? 'block' : 'hidden'}`}
//             >
//               <TierCard tier={tier} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const Skeleton = () => (
//   <div className="flex flex-col gap-6 px-6 bg-primary-foreground animate-pulse py-4">
//     <div className="w-full min-h-screen">
//       {/* Navigation Skeleton */}
//       <div className='px-4'>
//         <nav className="flex space-x-8 items-center" aria-label="Tiers">
//           {/* Skeleton tabs - 4 placeholders */}
//           {[1].map((i) => (
//             <div key={i} className="h-10 w-24 bg-gray-200 rounded-md"></div>
//           ))}
//           {/* Add tier button skeleton */}
//           <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
//         </nav>
//         <div className='w-full h-0.5 bg-gray-200 my-2 px-4' />
//       </div>

//       {/* Content Skeleton */}
//       <div>
//         <div className="block">
//           <div className="border-none shadow-none overflow-hidden ">
//             {/* Card Header Skeleton */}
//             <div className="p-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex flex-col gap-2">
//                   <div className="flex items-center gap-3">
//                     <div className="h-7 w-40 bg-gray-200 rounded-md"></div>
//                     <div className="h-7 w-24 bg-gray-200 rounded-md"></div>
//                   </div>
//                   <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {/* Action buttons skeleton */}
//                   {[1, 2, 3, 4].map((i) => (
//                     <div key={i} className="h-8 w-8 bg-gray-200 rounded-md"></div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Card Content Skeleton */}
//             <div className="flex flex-col gap-2 px-0">
//               {/* Tabs Skeleton */}
//               <div className="w-full px-4">
//                 <div className="grid w-full grid-cols-5 h-10 bg-gray-200 rounded-md mb-6"></div>

//                 {/* Cost Breakdown Skeleton */}
//                 <div className="bg-card rounded-xl p-6 shadow-sm border mb-8">
//                   <div className="h-7 w-48 bg-gray-200 rounded-md mb-6"></div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {[1, 2, 3, 4].map((i) => (
//                       <div key={i} className="p-6 bg-gray-100 rounded-xl">
//                         <div className="h-4 w-32 bg-gray-200 rounded-md mb-2"></div>
//                         <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Two Column Layout Skeleton */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   {/* Text Models Skeleton */}
//                   <div className="bg-card rounded-xl p-6 shadow-sm border space-y-6">
//                     <div className="flex items-center justify-between">
//                       <div className="h-7 w-32 bg-gray-200 rounded-md"></div>
//                       <div className="h-9 w-36 bg-gray-200 rounded-md"></div>
//                     </div>

//                     {/* Model Cards Skeleton */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//                       {[1, 2, 3].map((i) => (
//                         <div key={i} className="h-40 bg-gray-100 rounded-xl"></div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Cost Calculator Skeleton */}
//                   <div className="bg-card rounded-xl p-6 shadow-sm border">
//                     <div className="flex items-center gap-2 mb-6">
//                       <div className="h-7 w-40 bg-gray-200 rounded-md"></div>
//                       <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
//                     </div>

//                     <div className="space-y-6">
//                       <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl">
//                         <div className="h-5 w-5 bg-gray-200 rounded-sm"></div>
//                         <div className="h-5 w-64 bg-gray-200 rounded-md"></div>
//                       </div>

//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         {[1, 2].map((i) => (
//                           <div key={i} className="space-y-2">
//                             <div className="h-5 w-28 bg-gray-200 rounded-md"></div>
//                             <div className="h-10 w-full bg-gray-200 rounded-md"></div>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="space-y-2">
//                         <div className="h-5 w-36 bg-gray-200 rounded-md"></div>
//                         <div className="h-10 w-full bg-gray-200 rounded-md"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

// );
