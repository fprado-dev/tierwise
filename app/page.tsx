"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Define types for various content sections
interface Feature {
  title: string;
  icon: string;
  description?: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

const LandingPage: React.FC = () => {
  // Animation variants
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

  // Content data
  const features: Feature[] = [
    { title: 'Guided Tier Builder', icon: '✨', description: 'Create optimal pricing tiers with our interactive step-by-step guide' },
    { title: 'AI Recommendations', icon: '🧠', description: 'Leverage machine learning to find your perfect price points' },
    { title: 'Cost Calculator', icon: '💰', description: 'Calculate precise costs and margins across all your pricing tiers' },
    { title: 'Revenue Simulator', icon: '📈', description: 'Project revenue impact with interactive what-if scenarios' },
    { title: 'Usage-Based Models', icon: '⚖️', description: 'Build sophisticated pay-as-you-go pricing that scales perfectly' },
    { title: 'Market Intelligence', icon: '🔍', description: 'Access competitor pricing data from your industry vertical' }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Alice Johnson',
      role: 'Founder',
      company: 'TechStart',
      quote: 'TierWise transformed our SaaS pricing strategy completely. We saw a 27% revenue increase within just two months of implementation.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Bob Smith',
      role: 'CEO',
      company: 'InnovateX',
      quote: 'The AI recommendations were spot on for our market. Implementation was seamless and our conversion rates improved immediately.',
      image: 'https://randomuser.me/api/portraits/men/35.jpg'
    },
    {
      name: 'Carol Lee',
      role: 'Product Manager',
      company: 'SoftSolutions',
      quote: 'As a product manager, TierWise gave me data-backed confidence when presenting pricing changes to stakeholders.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  ];

  const pricingPlans: PricingPlan[] = [
    {
      name: 'Starter',
      price: '$29/mo',
      description: 'Perfect for early-stage startups',
      features: ['Guided tier builder', 'Basic AI recommendations', 'Cost calculator', 'Email support', '1 user license']
    },
    {
      name: 'Professional',
      price: '$79/mo',
      description: 'For growing businesses',
      features: ['Everything in Starter', 'Advanced AI engine', 'Revenue simulations', 'Competitor insights', 'Export capabilities', '3 user licenses'],
      isPopular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For established organizations',
      features: ['Everything in Professional', 'Custom pricing models', 'API access', 'Dedicated account manager', 'White labeling', 'Unlimited users']
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 overflow-x-hidden font-sans">
      {/* Navigation */}
      <div className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
        <div className="container max-w-7xl flex h-16 items-center justify-between mx-auto px-4">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              TierWise
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="#features" passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Features
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50" href="#how-it-works" passHref>
                    How It Works
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50" href="#pricing" passHref>
                    Pricing
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white group">Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-blue-600 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                            href="#"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              Documentation
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Comprehensive guides to optimize your pricing strategy.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link href="#case-studies" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600">
                            <div className="text-sm font-medium leading-none">Case Studies</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              See how other companies increased revenue with TierWise.
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="#blog" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600">
                            <div className="text-sm font-medium leading-none">Blog</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Pricing strategies and industry insights.
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="hover:text-blue-600">Login</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">Sign Up</Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="#features" className="text-lg font-medium px-2 py-2 hover:text-blue-600 transition-colors">
                    Features
                  </Link>
                  <Link href="#how-it-works" className="text-lg font-medium px-2 py-2 hover:text-blue-600 transition-colors">
                    How It Works
                  </Link>
                  <Link href="#pricing" className="text-lg font-medium px-2 py-2 hover:text-blue-600 transition-colors">
                    Pricing
                  </Link>
                  <Link href="#resources" className="text-lg font-medium px-2 py-2 hover:text-blue-600 transition-colors">
                    Resources
                  </Link>
                  <div className="flex flex-col gap-2 mt-6">
                    <Button variant="outline" className="w-full">Login</Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen bg-white">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50 opacity-60 -z-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1500px] h-[450px] bg-gradient-to-b from-blue-50 to-transparent opacity-60 blur-3xl -z-10"></div>

        <motion.div
          className="text-center py-32 max-w-4xl mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div
            className="inline-block mb-6 px-6 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
            variants={fadeIn}
          >
            The AI-Powered Pricing Platform
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 leading-tight"
            variants={fadeIn}
          >
            Transform Your <br className="hidden sm:block" /> Pricing Strategy
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
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
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-medium border-gray-300"
            >
              See How It Works
            </Button>
          </motion.div>
          <motion.div
            className="mt-12 text-sm text-gray-500 flex items-center justify-center gap-8"
            variants={fadeIn}
          >
            <div className="flex items-center">
              <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
              No credit card required
            </div>
            <div className="flex items-center">
              <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
              14-day free trial
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative blobs */}
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-48 right-48 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </section>

      {/* Problem Statement Section */}
      <motion.section
        id="problem"
        className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-2">The Challenge</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pricing Shouldn't Be Guesswork</h2>
          <p className="text-lg text-gray-600">
            Most founders set prices based on intuition or competitors-not data. This leads to:
          </p>
          <ul className="space-y-3">
            {[
              "Undervalued products leaving money on the table",
              "Pricing that doesn't match customer value perception",
              "Inability to articulate pricing strategy to investors",
              "Missed revenue opportunities from proper tier structuring"
            ].map((item, i) => (
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
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-50 rounded-2xl transform rotate-2"></div>
          <div className="relative bg-white p-6 rounded-xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-lg font-medium">Pricing Model</div>
                <div className="text-sm text-gray-500">Without data insights</div>
              </div>
              <div className="text-red-500">?</div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="h-12 bg-gray-100 rounded flex items-center px-4 justify-between">
                <span className="text-sm">Basic Plan</span>
                <span className="text-sm">$9.99/mo?</span>
              </div>
              <div className="h-12 bg-gray-100 rounded flex items-center px-4 justify-between">
                <span className="text-sm">Pro Plan</span>
                <span className="text-sm">$29.99/mo?</span>
              </div>
              <div className="h-12 bg-gray-100 rounded flex items-center px-4 justify-between">
                <span className="text-sm">Enterprise</span>
                <span className="text-sm">Call us?</span>
              </div>
            </div>
            <div className="text-center text-sm bg-red-50 text-red-600 p-3 rounded-lg">
              Pricing confusion leads to 20-30% revenue loss
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Solution Section */}
      <motion.section
        id="solution"
        className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <motion.div
          className="order-2 md:order-1 relative"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-2xl transform -rotate-1"></div>
          <div className="relative bg-white p-6 rounded-xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-lg font-medium">TierWise AI Analysis</div>
                <div className="text-sm text-gray-500">Data-driven pricing</div>
              </div>
              <div className="text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="h-12 bg-blue-50 border border-blue-100 rounded flex items-center px-4 justify-between">
                <span className="text-sm font-medium">Starter Plan</span>
                <span className="text-sm font-medium text-blue-700">$19.99/mo</span>
              </div>
              <div className="h-12 bg-indigo-50 border border-indigo-100 rounded flex items-center px-4 justify-between">
                <span className="text-sm font-medium">Pro Plan</span>
                <span className="text-sm font-medium text-indigo-700">$49.99/mo</span>
              </div>
              <div className="h-12 bg-purple-50 border border-purple-100 rounded flex items-center px-4 justify-between">
                <span className="text-sm font-medium">Enterprise</span>
                <span className="text-sm font-medium text-purple-700">Custom</span>
              </div>
            </div>
            <div className="text-center text-sm bg-green-50 text-green-600 p-3 rounded-lg">
              Projected revenue increase: 24.5%
            </div>
          </div>
        </motion.div>
        <div className="order-1 md:order-2 space-y-6">
          <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-2">The Solution</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Data-Driven Pricing Decisions</h2>
          <p className="text-lg text-gray-600">
            TierWise transforms gut feelings into strategic pricing with:
          </p>
          <ul className="space-y-3">
            {[
              "AI-driven analysis of your market, costs, and customers",
              "Value-based tier structures that maximize conversion",
              "Pricing simulation tools that predict revenue impact",
              "Competitor benchmarks from your specific industry"
            ].map((item, i) => (
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
      </motion.section>

      {/* Key Features Section */}
      <motion.section
        id="features"
        className="py-24 bg-gradient-to-b from-white to-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-3">Powerful Features</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need For Perfect Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              TierWise provides all the tools you need to build, test, and optimize your pricing strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="bg-white rounded-xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 h-full transform transition-all duration-200 group-hover:shadow-xl group-hover:border-blue-100">
                  <div className="text-4xl mb-5 bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 flex items-center justify-center rounded-2xl text-blue-600">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        id="how-it-works"
        className="max-w-6xl mx-auto px-4 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium mb-3">Simple Process</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Optimizing in Minutes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've simplified the complex process of pricing optimization into four easy steps.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-12 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-600 to-emerald-500 hidden md:block"></div>

          {[
            {
              title: "Create your pricing profile",
              description: "Enter basic information about your product, costs, and business goals."
            },
            {
              title: "Build pricing tiers with our guided wizard",
              description: "Our step-by-step process helps you define features and price points for each tier."
            },
            {
              title: "Review AI-powered recommendations",
              description: "Get data-driven insights and optimization suggestions based on industry benchmarks."
            },
            {
              title: "Implement and measure results",
              description: "Export your pricing to your website or sales tools and track performance in real-time."
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0 shadow-lg shadow-blue-200 z-10">
                {index + 1}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg shadow-gray-100/50 border border-gray-100 flex-grow">
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="bg-gradient-to-br from-indigo-50 to-blue-50 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">Customer Stories</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Innovative Companies</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from founders and product leaders who transformed their pricing strategy with TierWise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={fadeIn}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white rounded-xl p-8 shadow-lg h-full relative">
                  <div className="absolute -top-4 -left-4">
                    <div className="bg-blue-600 text-white text-2xl w-8 h-8 rounded-full flex items-center justify-center">
                      "
                    </div>
                  </div>
                  <p className="italic text-gray-700 mb-6 pt-2">{testimonial.quote}</p>
                  <div className="flex items-center">
                    {testimonial.image && (
                      <div className="mr-4">
                        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button className="bg-white border border-blue-200 hover:bg-blue-50 text-blue-600 px-6 py-2 rounded-lg shadow-sm">
              Read More Customer Stories
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Pricing Plans Section */}
      <motion.section
        id="pricing"
        className="max-w-7xl mx-auto px-4 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium mb-3">Pricing</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your business needs and scale as you grow.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-full">
            <Button variant="ghost" className="rounded-full px-6 bg-white shadow-sm">Monthly</Button>
            <Button variant="ghost" className="rounded-full px-6">Annual (20% off)</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={fadeIn}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative ${plan.isPopular ? 'z-10' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 inset-x-0 flex justify-center">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium px-6 py-1.5 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`
                  h-full bg-white rounded-2xl shadow-xl border 
                  ${plan.isPopular
                    ? 'border-blue-200 shadow-blue-200/30'
                    : 'border-gray-100'
                  }
                `}
              >
                <div className="p-8 border-b border-gray-100">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price.split('/')[0]}</span>
                    {plan.price.includes('/') && (
                      <span className="text-gray-500 ml-2">/month</span>
                    )}
                  </div>
                </div>

                <div className="p-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full mt-8 py-6 rounded-xl ${plan.isPopular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50'
                      }`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600 max-w-2xl mx-auto">
          <p>All plans include a 14-day free trial. No credit card required to get started.</p>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        className="max-w-4xl mx-auto px-4 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-amber-50 text-amber-600 rounded-full text-sm font-medium mb-3">FAQ</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions? We've Got Answers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to the most commonly asked questions about TierWise.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`} className="border-b border-gray-100 last:border-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionTrigger className="text-lg font-medium py-6 px-8 hover:bg-gray-50">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </motion.div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <Button className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-lg">
            Contact Our Support Team
          </Button>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700"></div>
        <div className="absolute inset-0 opacity-10 bg-pattern-grid"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500 opacity-20 blur-3xl transform -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-400 opacity-20 blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-4 py-24 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Transform Your Pricing Strategy?</h2>
          <p className="text-lg md:text-xl mb-10 text-indigo-100 max-w-3xl mx-auto">
            Join hundreds of founders who increased their revenue by 15-25% with TierWise's data-driven pricing recommendations.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="px-8 py-6 bg-white text-blue-600 font-bold text-lg rounded-xl shadow-xl shadow-indigo-900/30 hover:shadow-indigo-900/40"
            >
              Start Your Free Trial
            </Button>
          </motion.div>
          <p className="mt-6 text-indigo-200 text-sm">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-600 py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="text-2xl font-bold text-gray-800 mb-4">TierWise</div>
              <p className="mb-4 text-gray-500 max-w-xs">
                The AI-powered platform that helps you optimize your pricing strategy and boost your revenue.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-600" aria-label="Twitter">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600" aria-label="LinkedIn">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">&copy; 2025 TierWise, Inc. All rights reserved.</div>
            <div className="text-sm text-gray-500 flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-600">Privacy</a>
              <a href="#" className="hover:text-blue-600">Terms</a>
              <a href="#" className="hover:text-blue-600">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(30px, 30px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 10s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .bg-grid-slate-100 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23e2e8f0'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        .bg-pattern-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
