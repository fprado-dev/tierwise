"use client";

import RevenueSimulator from "@/components/revenue-simulator-lp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { motion } from 'framer-motion';
import { GanttChart, Layers, PiggyBank } from 'lucide-react';
import { useTheme } from "next-themes";
import Head from 'next/head';
import Image from "next/image";
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';

// Brand Colors
const BRAND = {
  primary: "#724FEB",
  accent: "#15B2C4",
  accent2: "#1A64C8",
  darkText: "#484848",
  lightText: "#FFFFFF",
  mutedText: "#DCDCDC",
};

interface Feature {
  title: string;
  icon: ReactNode;
  description?: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
  linkedIn?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ClientLogo {
  name: string;
  logo: string;
}

interface Step {
  title: string;
  description: string;
  icon?: string;
}

// Define tier and model types
type TierType = 'hobby' | 'pro' | 'premium';
type ModelType = 'deepseek' | 'anthropic';

// Define pricing tier structure
interface PricingTier {
  basePrice: number;
  userMultiplier: number;
  modelMultipliers: {
    [key in ModelType]: number;
  };
}

// Define pricing tiers object with proper typing
interface PricingTiers {
  hobby: PricingTier;
  pro: PricingTier;
  premium: PricingTier;
}

const features: Feature[] = [
  { title: 'Guided Tier Builder', icon: <Layers className="h-10 w-10 text-brand" />, description: 'Create optimal pricing tiers with our interactive step-by-step guide' },
  { title: 'Cost Calculator', icon: <PiggyBank className="h-10 w-10 text-brand" />, description: 'Calculate precise costs and margins across all your pricing tiers' },
  {
    title: 'Revenue Simulator', icon: <GanttChart className="h-10 w-10 text-brand" />, description: 'Project revenue impact with interactive what-if scenarios'
  },
];

const testimonials: Testimonial[] = [
  {
    name: 'Filipe Prado',
    role: 'Founder',
    company: 'Aillustra',
    quote: 'TierWise transformed our SaaS pricing strategy completely. We saw a 27% revenue increase within just two months of implementation.',
  },
  {
    name: 'Gerald Franklin',
    role: 'CEO',
    company: 'Interactive World',
    quote: 'The AI recommendations were spot on for our market. Implementation was seamless and our conversion rates improved immediately.',
  },
  {
    name: 'Gabriela Marinho',
    role: 'Product Manager',
    company: 'GMed',
    quote: 'As a product manager, TierWise gave me data-backed confidence when presenting pricing changes to stakeholders.',
  }
];

const clientLogos: ClientLogo[] = [
  { name: 'AIllustra', logo: '/logos/aillustra.png' },
  { name: 'Globex', logo: '/logos/globex.png' },
  { name: 'Initech', logo: '/logos/initech.png' },
  { name: 'Massive Dynamic', logo: '/logos/md.png' },
];

const faqs: FAQ[] = [
  {
    question: "Will this work for my AI product's unique cost structure?",
    answer: "Absolutely! TierWise is designed to handle sophisticated cost structures, including AI-specific metrics like compute resources, API calls, and storage requirements. Our platform adapts to your unique business model, not the other way around."
  },
  {
    question: "How much time will it take to set up?",
    answer: "Most customers complete their initial pricing model in under 30 minutes. Our guided process is designed to be intuitive and efficient, with pre-built templates available for various industries to accelerate your setup process."
  },
  {
    question: "Can I export my pricing to my website?",
    answer: "Yes, you have multiple options: export pricing as HTML/CSS that can be directly added to your site, use our JavaScript widget for dynamic pricing displays, or implement via our API for full customization. We also provide integrations with popular website builders."
  },
  {
    question: "How accurate are the revenue projections?",
    answer: "Our AI models are trained on data from thousands of SaaS businesses across diverse industries. Projections typically fall within 10-15% of actual outcomes, with accuracy improving as you input more customer data and usage patterns specific to your business."
  }
];

const steps: Step[] = [
  {
    title: "Create your pricing profile",
    description: "Create your project to easy management.",
    icon: "✏️"
  },
  {
    title: "Build pricing tiers with our guided wizard",
    description: "Our step-by-step process helps you define features and price points for each tier.",
    icon: "🧙‍♂️"
  },
  {
    title: "Cost Calculator And Summary",
    description: "Calculate the cost of each tier and get a summary of your pricing strategy.",
    icon: "🧮"
  },
  {
    title: "Revenue Simulator",
    description: "Test your pricing strategy with our revenue simulator to see how it will impact your revenue.",
    icon: "📈"
  }
];

const problemItems: string[] = [
  "Undervalued products leaving money on the table",
  "Pricing that doesn't match customer value perception",
  "Inability to articulate pricing strategy to investors",
  "Missed revenue opportunities from proper tier structuring"
];

const solutionItems: string[] = [
  "AI-driven analysis of your market, costs, and customers",
  "Value-based tier structures that maximize conversion",
  "Pricing simulation tools that predict revenue impact",
  "Competitor benchmarks from your specific industry"
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Pricing tiers data for the simulator with proper typing
const pricingTiers: PricingTiers = {
  hobby: {
    basePrice: 19,
    userMultiplier: 0.05,
    modelMultipliers: {
      deepseek: 1,
      anthropic: 1.2
    }
  },
  pro: {
    basePrice: 49,
    userMultiplier: 0.1,
    modelMultipliers: {
      deepseek: 1,
      anthropic: 1.3
    }
  },
  premium: {
    basePrice: 99,
    userMultiplier: 0.15,
    modelMultipliers: {
      deepseek: 1,
      anthropic: 1.5
    }
  }
};

// Arcade embed for demo
const ArcadeEmbed = () => {
  return (
    <div className="arcade-embed ">
      <iframe src="https://demo.arcade.software/sfCEBZjOiPR3fAjWfKVc?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
        title="Streamline AI Model Management with Hobby Pricing"
        loading="lazy" allowFullScreen allow="clipboard-write"
        className="w-full h-96"
      ></iframe>
    </div>
  );
};

// Countdown Timer Component
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

        return {
          hours: newHours < 0 ? 23 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 flex items-center justify-center">
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          <span className="mr-2">🎉</span>
          <span className="font-medium">Product Hunt Launch Special:</span>
          <span className="ml-2">Get 3 months FREE!</span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <div className="countdown-timer flex items-center">
              <div className="bg-white text-red-500 rounded px-2 py-1 font-bold">
                {formatTime(timeLeft.hours)}
              </div>
              <span className="mx-1 font-bold">:</span>
              <div className="bg-white text-red-500 rounded px-2 py-1 font-bold">
                {formatTime(timeLeft.minutes)}
              </div>
              <span className="mx-1 font-bold">:</span>
              <div className="bg-white text-red-500 rounded px-2 py-1 font-bold">
                {formatTime(timeLeft.seconds)}
              </div>
            </div>
          </div>

          <a
            href="https://www.producthunt.com/posts/tierwise"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-red-500 hover:bg-gray-100 transition-colors px-4 py-1 rounded-full font-medium text-sm"
          >
            Claim Now
          </a>
        </div>
      </div>
    </div>
  );
};

// Demo Modal Component
const DemoModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void; }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-brand">✨ See TierWise in Action: Interactive Demo</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <ArcadeEmbed />
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const { setTheme } = useTheme();
  const [users, setUsers] = useState(100);
  const [tier, setTier] = useState<TierType>('pro');
  const [model, setModel] = useState<ModelType>('deepseek');
  const [revenue, setRevenue] = useState(0);
  const [showDemo, setShowDemo] = useState(false);

  // Calculate revenue based on simulator inputs
  useEffect(() => {
    const selectedTier = pricingTiers[tier];
    const basePrice = selectedTier.basePrice;
    const userFactor = selectedTier.userMultiplier * users;
    const modelMultiplier = selectedTier.modelMultipliers[model];

    const calculatedRevenue = (basePrice + userFactor) * modelMultiplier;
    setRevenue(Math.round(calculatedRevenue));
  }, [users, tier, model]);

  useEffect(() => {
    setTheme('light');

  }, []);
  return (
    <>
      <Head>
        <title>TierWise.pro | Optimize Your Pricing Strategy with AI</title>
        <meta name="description" content="Transform your pricing strategy with AI-powered recommendations and industry benchmarks that boost your revenue and conversion rates." />
        <meta name="keywords" content="pricing strategy, SaaS pricing, AI pricing tool, tier pricing, revenue optimization" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="TierWise.pro | Optimize Your Pricing Strategy with AI" />
        <meta property="og:description" content="Increase your revenue by up to 25% with AI-optimized pricing strategies." />
        <meta property="og:image" content="https://tierwise.pro/og-image.jpg" />
        <meta property="og:url" content="https://tierwise.pro" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TierWise.pro | AI-Powered Pricing Strategy" />
        <meta name="twitter:description" content="Transform your pricing strategy with AI-powered recommendations." />
        <meta name="twitter:image" content="https://tierwise.pro/twitter-card.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://tierwise.pro" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background dots pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-dots-pattern opacity-5"></div>

      {/* Countdown Timer */}
      <CountdownTimer />

      <div className="min-h-screen overflow-x-hidden relative">
        {/* Navigation */}
        <header
          className="sticky top-0 z-40 w-full backdrop-blur-md border-b shadow-sm bg-white/90"
          role="banner"
        >
          <div className="container max-w-7xl flex py-2 items-center justify-between mx-auto px-4">
            {/* Logo */}
            <div className="flex">
              <Link href="/" aria-label="TierWise Homepage">
                <Image src="/logo-full.png" width={120} height={5} className="hover:rotate-3 transition-transform cursor-pointer" priority alt="TierWise Logo" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block" aria-label="Main Navigation">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link
                      className="group inline-flex h-10 w-max items-center hover:border-b hover:border-primary/40 hover:-translate-y-1 text-primary/80 justify-center px-4 py-2 text-sm font-medium transition-transform"
                      href="#features"
                      passHref
                    >
                      Features
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      className="group inline-flex h-10 w-max items-center hover:border-b hover:border-primary/40 hover:-translate-y-1 text-primary/80 justify-center px-4 py-2 text-sm font-medium transition-transform"
                      href="#how-it-works"
                      passHref
                    >
                      How It Works
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      className="group inline-flex h-10 w-max items-center hover:border-b hover:border-primary/40 hover:-translate-y-1 text-primary/80 justify-center px-4 py-2 text-sm font-medium transition-transform"
                      href="#pricing"
                      passHref
                    >
                      Pricing
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Login Button */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                className="rounded-full px-6 bg-gradient-to-r from-brand to-brand-darker hover:opacity-90 hover:scale-105 transition-all"
              >
                <Link href="/sign-in" passHref>
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-transparent flex items-start justify-start" aria-labelledby="hero-heading">
            <motion.div
              className="text-center pt-32 max-w-4xl mx-auto px-4"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <motion.div
                className="inline-block mb-6 px-6 py-2 text-pretty bg-gradient-to-r from-brand to-brand-darker text-white rounded-full text-xs md:text-sm"
                variants={fadeIn}
              >
                The AI-driven Pricing Platform
              </motion.div>
              <motion.h1
                id="hero-heading"
                className="text-4xl text-balance md:text-6xl lg:text-8xl font-bold bg-clip-text bg-gradient-to-r from-brand via-brand-darker/40 to-brand-darker text-transparent"
                variants={fadeIn}
              >
                Transform Your Pricing Strategy
              </motion.h1>
              <motion.p
                className="text-sm text-balance md:text-xl my-8 max-w-2xl mx-auto text-muted-foreground/70"
                variants={fadeIn}
              >
                Build optimal pricing structures with AI-powered recommendations and industry benchmarks that boost your revenue and conversion rates.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                variants={fadeIn}
              >
                <Button
                  size="lg"
                  className="rounded-full min-w-52 bg-gradient-to-r from-brand to-brand-darker text-white font-medium shadow-lg transition-all"
                >
                  <Link href="/sign-in">
                    Get Started Free
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full min-w-52 border-brand hover:bg-brand hover:text-white font-medium text-violet-500 transition-all"
                  onClick={() => setShowDemo(true)}
                >
                  Watch Demo
                </Button>
              </motion.div>
              <motion.div
                className="mt-12 text-sm flex items-center justify-center gap-8"
                variants={fadeIn}
              >
                <span className="flex items-center text-brand underline decoration-brand leading-loose underline-offset-4 decoration-wavy">
                  No credit card required
                </span>
              </motion.div>
            </motion.div>
          </section>

          {/* Problem and Solution Statement Section */}
          <section
            id="problem"
            className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-16 items-center"
            aria-labelledby="problem-heading solution-heading"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-50 rounded-2xl transform rotate-2"></div>
              <div className="space-y-6 relative">
                <div className="inline-block px-4 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-2">
                  The Challenge
                </div>
                <h2 id="problem-heading" className="text-3xl md:text-4xl font-bold mb-6">
                  {`Pricing Shouldn't Be Guesswork`}
                </h2>
                <p className="text-lg text-gray-600">
                  Most founders set prices based on intuition or competitors-not data. This leads to:
                </p>
                <ul className="space-y-3">
                  {problemItems.map((item: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="bg-red-100 text-red-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-2xl transform -rotate-2"></div>
              <div className="relative space-y-6">
                <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-2">
                  The Solution
                </div>
                <h2 id="solution-heading" className="text-3xl md:text-4xl font-bold mb-6">
                  AI-Driven Pricing Decisions Made Easy!
                </h2>
                <p className="text-lg text-gray-600">
                  TierWise transforms gut feelings into strategic pricing with:
                </p>
                <ul className="space-y-3">
                  {solutionItems.map((item: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </section>

          {/* Client Logos Section */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <p className="text-center text-sm text-gray-500 mb-8">TRUSTED BY INNOVATIVE COMPANIES</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
                {clientLogos.map((client: ClientLogo, i: number) => (
                  <div key={i} className="h-8 grayscale hover:grayscale-0 transition-all">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      width={120}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Features Section */}
          <section
            id="features"
            className="py-24"
            aria-labelledby="features-heading"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-block mb-6 px-6 py-2 text-pretty bg-gradient-to-r from-brand to-brand-darker text-white rounded-full text-xs md:text-sm">
                  Powerful Features
                </div>
                <h2 id="features-heading" className="text-3xl md:text-4xl text-brand font-bold mb-4">
                  Everything You Need For Perfect Pricing
                </h2>
                <p className="text-md text-balance sm:text-lg text-muted-foreground">
                  TierWise provides all the tools you need to build, test, and optimize your pricing strategy.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature: Feature, index: number) => (
                  <motion.div
                    key={feature.title}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-brand/70 h-full transform shadow-brand/10 transition-all duration-200 group-hover:shadow-xl">
                      <div className="text-4xl mb-5 w-16 h-16 flex items-center justify-center rounded-2xl">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:to-brand-darker text-brand transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Revenue Simulator Section */}
          <RevenueSimulator />

          {/* How It Works Section - Improved Layout */}
          <section
            id="how-it-works"
            className="max-w-6xl mx-auto px-4 py-24"
            aria-labelledby="how-it-works-heading"
          >
            <div className="text-center mb-16">
              <div className="inline-block mb-6 px-6 py-2 text-pretty bg-gradient-to-r from-brand to-brand-darker text-white rounded-full text-xs md:text-sm">
                Simple Process
              </div>
              <h2 id="how-it-works-heading" className="text-3xl md:text-4xl text-balance text-brand font-bold mb-4">
                Start Optimizing in Minutes
              </h2>
              <p className="text-sm sm:text-lg text-muted-foreground text-balance">
                We've simplified the complex process of pricing optimization into four easy steps.
              </p>
            </div>

            {/* Fancy Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step: Step, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-brand/20 h-full">
                    {/* Decorative top gradient bar */}
                    <div className="h-2 bg-gradient-to-r from-brand to-brand-darker"></div>

                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xl">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">{step.icon}</span>
                            <h3 className="text-xl font-bold text-brand">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                      <div className="absolute transform rotate-45 bg-brand/10 w-16 h-16 -top-8 -right-8"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section
            id="testimonials"
            className="py-24 bg-gradient-to-r from-brand/30 to-white"
            aria-labelledby="testimonials-heading"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-block mb-6 px-6 py-2 text-pretty bg-gradient-to-r from-brand to-brand-darker text-white rounded-full text-xs md:text-sm">
                  Customer Stories
                </div>
                <h2 id="testimonials-heading" className="text-3xl text-brand text-balance md:text-4xl font-bold mb-4">
                  Trusted by Innovative Companies
                </h2>
                <p className="text-sm sm:text-lg text-muted-foreground text-balance">
                  Hear from founders and product leaders who transformed their pricing strategy with TierWise.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {testimonials.map((testimonial: Testimonial, index: number) => (
                  <motion.div
                    key={testimonial.name}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white hover:rotate-3 transition-transform rounded-xl border-brand/10 p-8 shadow-lg h-full relative border">
                      <div className="absolute -top-4 -left-4">
                        <div className="rounded-full h-10 w-10 bg-brand text-white text-lg flex items-center justify-center">
                          "
                        </div>
                      </div>
                      <p className="italic mb-6 pt-2 text-primary/60">{testimonial.quote}</p>
                      <div className="flex items-center">
                        {testimonial.image && (
                          <div className="mr-4">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-brand-darker">
                            {testimonial.linkedIn ? (
                              <a href={testimonial.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                                {testimonial.name}
                                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                              </a>
                            ) : (
                              testimonial.name
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section - Optimized for Conversion */}
          <section
            id="pricing"
            className="py-24 relative overflow-hidden"
            aria-labelledby="pricing-heading"
          >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-block mb-6 px-6 py-2 text-pretty bg-gradient-to-r from-brand to-brand-darker text-white rounded-full text-xs md:text-sm">
                  Transparent Pricing
                </div>
                <h2 id="pricing-heading" className="text-3xl md:text-5xl text-brand font-bold mb-4">
                  Unlock Your Full Revenue Potential
                </h2>
                <p className="text-md text-balance sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Start optimizing your pricing strategy today. Upgrade anytime as your business grows.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Free</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-extrabold text-gray-900">$0</span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>
                    <p className="text-gray-600 mb-6">Perfect for individuals just getting started with pricing optimization.</p>

                    <Button className="w-full rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 mb-6">
                      <Link href="/sign-up">Get Started</Link>
                    </Button>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">1 Project</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Up to 3 Pricing Tiers</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Basic Revenue Simulator</span>
                      </div>

                    </div>
                  </div>
                </motion.div>

                {/* Pro Plan - Enhanced for conversion */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative bg-gradient-to-br from-brand/5 to-brand/10 border-2 border-brand rounded-2xl shadow-2xl overflow-hidden transform md:scale-105 z-10"
                >
                  {/* Popular badge */}
                  <div className="absolute top-4 right-2">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-4 py-1  shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <h3 className="text-2xl font-bold text-brand">Pro</h3>
                      <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">RECOMMENDED</span>
                    </div>

                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-extrabold text-gray-900">$19.99</span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>

                    <div className="mb-6">
                      <div className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        <span className="font-bold">SAVE 20%</span> with annual billing
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        $191.90/year (billed annually)
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">Unlock <span className="font-semibold">all premium features</span> to maximize your revenue potential.</p>

                    <Button className="w-full rounded-full bg-gradient-to-r from-brand to-brand-darker text-white hover:shadow-lg hover:scale-105 transition-all mb-6 py-6 text-lg font-bold">
                      <Link href="/sign-up?plan=pro">Upgrade to Pro</Link>
                    </Button>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-brand mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 font-medium">Unlimited Projects</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-brand mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 font-medium">Unlimited Pricing Tiers</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-brand mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="text-gray-700 font-medium">AI-Powered Recommendations</span>
                          <span className="ml-2 bg-brand/10 text-brand text-xs px-2 py-0.5 rounded-full">PRO</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-brand mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="text-gray-700 font-medium">Advanced Analytics Dashboard</span>
                          <span className="ml-2 bg-brand/10 text-brand text-xs px-2 py-0.5 rounded-full">PRO</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-brand mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 font-medium">Competitor Benchmarking</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-brand mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 font-medium">Export to HTML/CSS/JSON</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-brand mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 font-medium">Priority Support</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlight accent */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand/20 rounded-full blur-xl"></div>


                </motion.div>
              </div>

              {/* Money-back guarantee */}
              <div className="text-center mt-16">
                <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-bold">30-day money-back guarantee. No questions asked.</span>
                </div>
              </div>

              {/* FAQ teaser */}
              <div className="mt-16 text-center">
                <p className="text-gray-600">Have questions about our pricing? Check our <a href="#faq" className="text-brand font-medium hover:underline">FAQ section</a> or contact us.</p>
              </div>

              {/* Enterprise CTA */}
              <div className="mt-16 bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Need a custom solution?</h3>
                    <p className="text-gray-600">Contact us for enterprise pricing and custom features.</p>
                  </div>
                  <Button className="rounded-full bg-white border border-brand text-brand hover:bg-brand hover:text-white transition-colors">
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>


          {/* FAQ Section */}
          <section
            id="faq"
            className="max-w-4xl mx-auto px-4 py-24"
            aria-labelledby="faq-heading"
          >
            <div className="text-center mb-16">
              <h2 id="faq-heading" className="text-3xl text-balance text-brand md:text-4xl font-bold mb-4">
                Questions? We've Got Answers
              </h2>
              <p className="text-sm sm:text-lg text-balance text-muted-foreground">
                Find answers to the most commonly asked questions about TierWise.
              </p>
            </div>
            <div className="bg-white shadow-xl border-brand rounded-2xl overflow-hidden border">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq: FAQ, index: number) => (
                  <AccordionItem key={faq.question} value={`item-${index}`} className="border-b last:border-0 border-brand-darker/40">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <AccordionTrigger className="text-sm sm:text-lg text-brand font-medium py-6 px-8">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-8 pb-6 text-muted-foreground text-balance">
                        {faq.answer}
                      </AccordionContent>
                    </motion.div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Final CTA Section */}
          <section
            className="relative overflow-hidden"
            aria-labelledby="cta-heading"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-darker" />
            <div className="absolute inset-0 opacity-10 bg-pattern-grid"></div>
            <div className="max-w-3xl mx-auto px-4 py-24 relative z-10 text-center">
              <h2 id="cta-heading" className="text-3xl md:text-5xl text-white font-bold mb-6">
                Ready to Transform Your Pricing Strategy?
              </h2>
              <p className="text-lg mb-10 text-white text-balance opacity-80">
                Join hundreds of founders who increased their revenue by 15-25% with TierWise's data-driven pricing recommendations.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="rounded-full min-w-52 bg-gradient-to-r from-white/20 to-white/10 border border-white text-white font-medium shadow-lg transition-all"
                >
                  <Link href="/sign-in">
                    Get Started for Free
                  </Link>
                </Button>
              </motion.div>
              <p className="mt-6 text-sm text-white opacity-60">No credit card required</p>
            </div>
          </section>
        </main>

        {/* Minimalist Footer */}
        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Image src="/logo-full.png" width={100} height={4} alt="TierWise Logo" />
              </div>
              <div className="text-sm text-gray-500">© 2025 TierWise, Inc. All rights reserved.</div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-brand">Terms</a>
                <a href="#" className="text-gray-400 hover:text-brand">Privacy</a>
                <a href="https://www.producthunt.com/posts/tierwise" target="_blank" rel="noopener noreferrer" className="text-brand font-medium">Product Hunt</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Demo Modal */}
        <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />

        {/* Custom styles for animations and background */}
        <style jsx global>{`
          body {
            color: ${BRAND.darkText};
            background: #ffffff;
          }
          .bg-dots-pattern {
            background-image: radial-gradient(circle, ${BRAND.primary}22 1px, transparent 1px);
            background-size: 24px 24px;
          }
          .bg-pattern-grid {
            background-image: radial-gradient(circle, ${BRAND.primary}11 1px, transparent 1px);
            background-size: 20px 20px;
          }
          .animate-blob {
            animation: blob 10s infinite ease-in-out;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -30px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(30px, 30px) scale(1.05); }
          }
        `}</style>
      </div>
    </>
  );
};

export default LandingPage;
