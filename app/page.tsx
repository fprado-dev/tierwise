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
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import React from 'react';

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

const features: Feature[] = [
  { title: 'Guided Tier Builder', icon: '✨', description: 'Create optimal pricing tiers with our interactive step-by-step guide' },
  { title: 'Cost Calculator', icon: '💰', description: 'Calculate precise costs and margins across all your pricing tiers' },
  { title: 'Revenue Simulator', icon: '📈', description: 'Project revenue impact with interactive what-if scenarios' },
];

const testimonials: Testimonial[] = [
  {
    name: 'Filipe Prado',
    role: 'Founder',
    company: 'Aillustra',
    quote: 'TierWise transformed our SaaS pricing strategy completely. We saw a 27% revenue increase within just two months of implementation.',
    image: 'https://randomuser.me/api/portraits/men/44.jpg'
  },
  {
    name: 'Gerald Franklin',
    role: 'CEO',
    company: 'Interactive World',
    quote: 'The AI recommendations were spot on for our market. Implementation was seamless and our conversion rates improved immediately.',
    image: 'https://randomuser.me/api/portraits/men/35.jpg'
  },
  {
    name: 'Gabriela Marinho',
    role: 'Product Manager',
    company: 'GMed',
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

const LandingPage: React.FC = () => {
  return (
    <div
      className="min-h-screen overflow-x-hidden"

    >
      {/* Navigation */}
      <div
        className="sticky top-0 z-40 w-full backdrop-blur-md border-b shadow-sm"
      >
        <div className="container max-w-7xl flex h-16 items-center justify-between mx-auto px-4">
          {/* Logo */}
          <div className="flex ">
            {/* SVG logo */}
            <Image src="/icon-logo.svg" width={50} height={10} className="h-12 " alt="TierWise Logo" />

          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    className="group inline-flex h-10 w-max items-center hover:border-b hover:border-primary/40 hover:-translate-y-1 text-primary/80 justify-center px-4 py-2 text-sm font-medium transition-transform"

                    href="#features" passHref>

                    Features
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    className="group inline-flex h-10 w-max items-center hover:border-b hover:border-primary/40 hover:-translate-y-1 text-primary/80 justify-center px-4 py-2 text-sm font-medium transition-transform"

                    href="#how-it-works" passHref>

                    How It Works
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    className="group inline-flex h-10 w-max items-center hover:border-b hover:border-primary/40 hover:-translate-y-1 text-primary/80 justify-center px-4 py-2 text-sm font-medium transition-transform"

                    href="#pricing" passHref>

                    Pricing
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              className="rounded-full px-6 bg-gradient-to-r from-violet-500  to-purple-800 hover:opacity-90 hover:scale-105 transition-all"

            >
              <Link href="/sign-in" passHref>
                Login
              </Link>
            </Button>
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
                  <Link href="#features" className="text-lg font-medium px-2 py-2" style={{ color: BRAND.primary }}>
                    Features
                  </Link>
                  <Link href="#how-it-works" className="text-lg font-medium px-2 py-2" style={{ color: BRAND.primary }}>
                    How It Works
                  </Link>
                  <Link href="#pricing" className="text-lg font-medium px-2 py-2" style={{ color: BRAND.primary }}>
                    Pricing
                  </Link>
                  <Link href="#resources" className="text-lg font-medium px-2 py-2" style={{ color: BRAND.primary }}>
                    Resources
                  </Link>
                  <div className="flex flex-col gap-2 mt-6">
                    <Button variant="outline" className="w-full" style={{ color: BRAND.primary, borderColor: BRAND.primary }}>
                      Login
                    </Button>
                    <Button className="w-full" style={{ background: BRAND.primary, color: "#fff" }}>
                      Sign Up
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-transparent flex items-start justify-start">
        <motion.div
          className="text-center pt-32 max-w-4xl mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div
            className="inline-block mb-6 px-6 py-2 text-pretty bg-gradient-to-r from-violet-500  to-purple-800 text-white rounded-full text-sm "
            variants={fadeIn}
          >
            The AI-driven Pricing Platform
          </motion.div>
          <motion.h1
            className="text-4xl text-balance md:text-6xl lg:text-8xl font-bold bg-clip-text bg-gradient-to-r from-violet-500 via-purple-400 to-purple-800 text-transparent"
            variants={fadeIn}
          >
            Transform Your Pricing Strategy
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl my-8 max-w-2xl mx-auto text-muted-foreground/70"
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
              className="rounded-full px-8 py-6 bg-violet-500 hover:bg-violet-800 font-medium shadow-lg transition-all"

            >
              <Link href={"/sign-in"}>
                Get Started Free
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 border-violet-500 hover:bg-violet-600 hover:text-white font-medium text-violet-500 transition-all"

            >
              Watch Demo
            </Button>
          </motion.div>
          <motion.div
            className="mt-12 text-sm flex items-center justify-center gap-8"
            variants={fadeIn}

          >
            <div className="flex items-center text-muted-foreground">
              <span className="rounded-full w-2 h-2 mr-2 bg-violet-300" ></span>
              No credit card required
            </div>
          </motion.div>
        </motion.div>
      </section>




      {/* Problem and Solution Statement Section */}
      <motion.section
        id="problem"
        className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative p-8"
        >

          <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-50 rounded-2xl transform rotate-2"></div>
          <div className="space-y-6 relative">
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
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative p-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-2xl transform -rotate-2"></div>

          <div className="relative space-y-6">
            <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-2">The Solution</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ai-Driven Pricing Decisions easy!</h2>
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
        </motion.div>
      </motion.section>


      {/* Key Features Section */}
      <motion.section
        id="features"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-3"
              style={{ background: BRAND.accent + "22", color: BRAND.primary }}>
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND.primary }}>
              Everything You Need For Perfect Pricing
            </h2>
            <p className="text-lg" style={{ color: BRAND.darkText, opacity: 0.85 }}>
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
                <div className="bg-white rounded-xl p-8 shadow-lg border h-full transform transition-all duration-200 group-hover:shadow-xl"
                  style={{ borderColor: BRAND.mutedText }}>
                  <div className="text-4xl mb-5 w-16 h-16 flex items-center justify-center rounded-2xl"
                    style={{
                      background: BRAND.accent + "11",
                      color: BRAND.primary
                    }}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[${BRAND.primary}] transition-colors"
                    style={{ color: BRAND.primary }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: BRAND.darkText, opacity: 0.8 }}>{feature.description}</p>
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
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-3"
            style={{ background: BRAND.accent + "22", color: BRAND.primary }}>
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND.primary }}>
            Start Optimizing in Minutes
          </h2>
          <p className="text-lg" style={{ color: BRAND.darkText, opacity: 0.85 }}>
            We've simplified the complex process of pricing optimization into four easy steps.
          </p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-12 top-2 bottom-2 w-0.5"
          />
          {[
            {
              title: "Create your pricing profile",
              description: "Create your project to easy management."
            },
            {
              title: "Build pricing tiers with our guided wizard",
              description: "Our step-by-step process helps you define features and price points for each tier."
            },
            {
              title: "Cost Calculator And Summary",
              description: "Calculate the cost of each tier and get a summary of your pricing strategy."
            },
            {
              title: "Revenue Simulator",
              description: "Test your pricing strategy with our revenue simulator to see how it will impact your revenue."
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
              <div className="bg-white p-6 rounded-xl shadow-lg border flex-grow"
                style={{ borderColor: BRAND.mutedText }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: BRAND.primary }}>{step.title}</h3>
                <p style={{ color: BRAND.darkText, opacity: 0.8 }}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>;

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="py-24"
        style={{
          background: `linear-gradient(135deg, ${BRAND.primary}10, #fff 100%)`
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-3"
              style={{ background: BRAND.accent + "22", color: BRAND.primary }}>
              Customer Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND.primary }}>
              Trusted by Innovative Companies
            </h2>
            <p className="text-lg" style={{ color: BRAND.darkText, opacity: 0.85 }}>
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
                <div className="bg-white rounded-xl p-8 shadow-lg h-full relative border"
                  style={{ borderColor: BRAND.mutedText }}>
                  <div className="absolute -top-4 -left-4">
                    <div className="rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent2})`,
                        color: "#fff", width: 32, height: 32, fontSize: 24
                      }}>
                      "
                    </div>
                  </div>
                  <p className="italic mb-6 pt-2" style={{ color: BRAND.darkText, opacity: 0.9 }}>{testimonial.quote}</p>
                  <div className="flex items-center">
                    {testimonial.image && (
                      <div className="mr-4">
                        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold" style={{ color: BRAND.primary }}>{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground" >
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND.primary }}>
            Questions? We've Got Answers
          </h2>
          <p className="text-lg" style={{ color: BRAND.darkText, opacity: 0.85 }}>
            Find answers to the most commonly asked questions about TierWise.
          </p>
        </div>
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border"
          style={{ borderColor: BRAND.mutedText }}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`} className="border-b last:border-0"
                style={{ borderColor: BRAND.mutedText }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionTrigger className="text-lg font-medium py-6 px-8"
                    style={{ color: BRAND.primary }}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6"
                    style={{ color: BRAND.darkText, opacity: 0.8 }}>
                    {faq.answer}
                  </AccordionContent>
                </motion.div>
              </AccordionItem>
            ))}
          </Accordion>
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
        <div className="absolute inset-0 bg-gradient-to-br bg-violet-600 to-violet-800"
          style={{ backgroundImage: "url('/images/gradient-bg.svg')" }}
        />
        <div className="absolute inset-0 opacity-10 bg-pattern-grid"></div>
        <div className="max-w-5xl mx-auto px-4 py-24 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#fff" }}>
            Ready to Transform Your Pricing Strategy?
          </h2>
          <p className="text-lg md:text-xl mb-10" style={{ color: "#fff", opacity: 0.8 }}>
            Join hundreds of founders who increased their revenue by 15-25% with TierWise's data-driven pricing recommendations.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="px-8 py-6 font-bold text-lg rounded-xl shadow-xl"
              style={{
                background: "#fff",
                color: BRAND.primary,
                boxShadow: `0 8px 32px 0 ${BRAND.primary}22`
              }}
            >
              Start Your Free Trial
            </Button>
          </motion.div>
          <p className="mt-6 text-sm" style={{ color: "#fff", opacity: 0.6 }}>No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer
      >
        <div className="max-w-7xl mx-auto w-full  px-4 flex justify-between p-4 text-muted-foreground">
          <div className="text-sm">&copy; 2025 TierWise, Inc. All rights reserved.</div>
          <div className="text-sm flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[${BRAND.primary}]">Privacy</a>
            <a href="#" className="hover:text-[${BRAND.primary}]">Terms</a>
            <a href="#" className="hover:text-[${BRAND.primary}]">Cookie Policy</a>
          </div>
        </div>
      </footer>

      {/* Custom styles for animations */}
      <style jsx global>{`
        body {
          color: ${BRAND.darkText};
          background: linear-gradient(to bottom, #fff 0%, ${BRAND.mutedText} 100%);
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
    </div >
  );
};

export default LandingPage;
