'use client';

import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';
import { handleStripeCustomerPortal } from '@/lib/supabase/stripe.service';
import { useState } from 'react';

const PricingTier = ({ title, price, features, priceId, onSubscribe, isCurrentPlan }: {
  title: string;
  price: string;
  features: string[];
  priceId: string;
  isCurrentPlan?: boolean;
  onSubscribe?: (priceId: string) => void;
}) => (
  <div className="p-6 bg-white rounded-lg shadow-lg relative overflow-hidden">
    {isCurrentPlan && (
      <Badge className="absolute top-4 right-4 bg-green-500 text-white">
        Current Plan
      </Badge>
    )}
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-4xl font-bold mb-6">{price}</p>
    <ul className="mb-6 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg
            className="w-5 h-5 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <button
      onClick={() => onSubscribe?.(priceId)}
      className={`w-full ${isCurrentPlan ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 px-4 rounded-md transition-colors`}
    >
      {isCurrentPlan ? 'Manage Subscription' : 'Subscribe Now'}
    </button>
  </div>
);

export default function UpgradePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { plan, isLoading: isLoadingPlan } = useSubscription();


  const plans = [
    {
      title: 'Free Plan',
      price: '$0/month',
      priceId: process.env.NEXT_PUBLIC_STRIPE_FREE_PLAN_ID!,
      features: [
        '1 Project',
        '2 Tiers per Project',
        'Basic Model Selection',
        'Community Support',
        'Standard Response Time'
      ],
    },
    {
      title: 'Pro Plan',
      price: '$19/month',
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_ID!,
      features: [
        '5 Projects',
        '5 Tiers per Project',
        'Advanced Model Selection',
        'Priority Support',
        'Custom Integrations'
      ],
    },
  ];
  const handleManageSubscription = async () => {
    const { url } = await handleStripeCustomerPortal();
    window.location.href = url;
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600">
            Select the perfect plan for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((planItem) => (
            <PricingTier
              key={planItem.title}
              title={planItem.title}
              price={planItem.price}
              features={planItem.features}
              priceId={planItem.priceId}
              isCurrentPlan={plan === (planItem.title === 'Free Plan' ? 'FREE' : 'PRO')}
              onSubscribe={handleManageSubscription}
            />
          ))}
        </div>

        {(isLoading || isLoadingPlan) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
}