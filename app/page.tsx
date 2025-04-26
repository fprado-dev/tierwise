"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from 'react';


export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email) {
      console.log('Email submitted:', email);
      setSubmitted(true);
      // Here you would add code to save email to your database
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-[#0d1b2a] text-[#e0e1dd]">
      {/* Meta tags */}
      <head>
        <title>TierWise | Exclusive Early Access</title>
        <meta name="description" content="Exclusive early access to TierWise - The ultimate platform for optimizing AI product pricing." />
        <meta name="keywords" content="AI pricing calculator, SaaS pricing strategy, AI cost calculator, pricing tiers, profit margin calculator, AI business tools" />
        <meta property="og:title" content="TierWise | Exclusive Early Access" />
        <meta property="og:description" content="Exclusive early access to TierWise - The ultimate platform for optimizing AI product pricing." />
        <meta property="og:type" content="website" />
      </head>

      {/* Header */}
      <header className="py-6 px-4 md:px-8 border-b border-[#1b263b]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#778da9] to-[#e0e1dd]">TierWise</span>
          </div>
          <div className="flex items-center space-x-6">
            <Button variant="outline" className="hidden md:block border-[#415a77] text-[#778da9] hover:bg-[#1b263b]">
              Partner Program
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto text-center flex items-center flex-col">
          <div className="flex justify-center mb-12">
            <a href="https://www.producthunt.com/posts/tierwise?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tierwise" target="_blank">
              <Image src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=957803&theme=light&t=1745621379760" alt="TierWise - Strategic&#0032;pricing&#0032;for&#0032;AI&#0032;products | Product Hunt" width="250" height="54" />
            </a>
          </div>
          <h1 className="text-4xl md:text-6xl max-w-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#778da9] to-[#e0e1dd]">
            Strategic pricing for AI products
          </h1>
          <p className="text-xl md:text-2xl text-[#778da9] mb-6 max-w-3xl text-pretty">
            Stop guessing your AI product pricing. TierWise helps you calculate costs,
            optimize margins, and scale profitably with confidence.
          </p>
          <div className="max-w-lg mx-auto my-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Your best email"
                  className="bg-[#1b263b] border-[#415a77] h-12 text-[#e0e1dd] min-w-80"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#415a77] to-[#778da9] hover:from-[#1b263b] hover:to-[#415a77] text-[#e0e1dd] h-12 text-md"
                >
                  Secure my Spot
                </Button>
              </form>
            ) : (
              <div className="bg-[#1b263b] border border-[#778da9] rounded-lg p-4 text-[#778da9]">
                Thank you! You'll receive exclusive updates soon.
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-8 mt-16">Early Access Benefits</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-[#1b263b] border-[#415a77] p-6 rounded-xl">
              <h3 className="text-xl text-[#e0e1dd] font-bold mb-3">Exclusive Pricing</h3>
              <p className="text-[#778da9]">Secure special pricing conditions as a founding member.</p>
            </Card>

            <Card className="bg-[#1b263b] border-[#415a77] p-6 rounded-xl">
              <h3 className="text-xl text-[#e0e1dd] font-bold mb-3">Priority Support</h3>
              <p className="text-[#778da9]">Receive dedicated support and personalized onboarding.</p>
            </Card>

            <Card className="bg-[#1b263b] border-[#415a77] p-6 rounded-xl">
              <h3 className="text-xl text-[#e0e1dd] font-bold mb-3">Influence the Product</h3>
              <p className="text-[#778da9]">Help shape the future of the platform with your feedback.</p>
            </Card>
          </div>

          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-[#0d1b2a]/50 to-[#0d1b2a]/80 z-10 h-full bottom-0"></div>
            <img
              src="/print-2.png"
              alt="TierWise Dashboard"
              className="rounded-lg shadow-2xl border border-[#1b263b] mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-8 bg-[#1b263b]">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Exclusive features for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#778da9] to-[#e0e1dd]">your pricing strategy</span></h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-[#0d1b2a] border-[#415a77] p-6 rounded-xl">
              <div className="h-12 w-12 rounded-full bg-[#415a77]/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#778da9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Cost Calculator</h3>
              <p className="text-[#778da9]">Access to over 250 pre-configured AI models with costs updated weekly.</p>
            </Card>

            <Card className="bg-[#0d1b2a] border-[#415a77] p-6 rounded-xl">
              <div className="h-12 w-12 rounded-full bg-[#778da9]/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e0e1dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">"What If" Simulator</h3>
              <p className="text-[#778da9]">Test different pricing scenarios and see the direct impact on your profit margin and revenue.</p>
            </Card>

            <Card className="bg-[#0d1b2a] border-[#415a77] p-6 rounded-xl">
              <div className="h-12 w-12 rounded-full bg-[#415a77]/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#778da9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Tier Manager</h3>
              <p className="text-[#778da9]">Create and manage multiple pricing tiers with customized resource allocations per user.</p>
            </Card>

            <Card className="bg-[#0d1b2a] border-[#415a77] p-6 rounded-xl">
              <div className="h-12 w-12 rounded-full bg-[#778da9]/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e0e1dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Competitive Analysis</h3>
              <p className="text-[#778da9]">Market price benchmarking to position your product competitively in the AI space.</p>
            </Card>

            <Card className="bg-[#0d1b2a] border-[#415a77] p-6 rounded-xl">
              <div className="h-12 w-12 rounded-full bg-[#415a77]/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#778da9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Price Alerts</h3>
              <p className="text-[#778da9]">Receive notifications when AI provider prices change, keeping your calculations up-to-date.</p>
            </Card>

            <Card className="bg-[#0d1b2a] border-[#415a77] p-6 rounded-xl">
              <div className="h-12 w-12 rounded-full bg-[#778da9]/30 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e0e1dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Financial Projections</h3>
              <p className="text-[#778da9]">Visualize revenue and profit projections based on different growth rates and scenarios.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Who can benefit</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-[#1b263b] border-[#415a77] p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-3">AI Startups</h3>
              <p className="text-[#778da9]">Early-stage companies that need to define their pricing strategy for AI-based products, maximizing margins from the start.</p>
            </Card>

            <Card className="bg-[#1b263b] border-[#415a77] p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-3">SaaS Companies</h3>
              <p className="text-[#778da9]">Businesses that are incorporating AI features into their existing products and need to adjust their pricing strategy to reflect the added value.</p>
            </Card>

            <Card className="bg-[#1b263b] border-[#415a77] p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Development Agencies</h3>
              <p className="text-[#778da9]">Teams that create customized solutions with AI and need a reliable way to calculate costs and set prices for their clients.</p>
            </Card>

            <Card className="bg-[#1b263b] border-[#415a77] p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Business Consultants</h3>
              <p className="text-[#778da9]">Professionals specialized in technology and digital transformation who help companies optimize their pricing strategies for AI products.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-[#1b263b] to-[#415a77]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to optimize your pricing strategy?</h2>
          <p className="text-xl text-[#e0e1dd] mb-10 max-w-2xl mx-auto">
            Join hundreds of founders who are maximizing their margins with strategic pricing for AI products.
          </p>

          {!submitted ? (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <Input
                  type="email"
                  placeholder="Your best email"
                  className="bg-[#0d1b2a] border-[#415a77] h-12 text-[#e0e1dd]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#415a77] to-[#778da9] hover:from-[#1b263b] hover:to-[#415a77] text-[#e0e1dd] h-12 text-lg"
                >
                  Secure My Early Access
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-[#0d1b2a] border border-[#778da9] rounded-lg p-4 text-[#778da9] max-w-md mx-auto">
              Thank you! You'll receive exclusive updates soon.
            </div>
          )}

          <p className="text-[#e0e1dd] mt-4">Limited spots available for the early access program</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 border-t border-[#1b263b]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#778da9] to-[#e0e1dd]">TierWise</span>
            </div>
            <div className="text-[#778da9] text-sm">
              © 2025 TierWise. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
