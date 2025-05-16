import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

import { ClientSidebar, HeaderControls } from "@/components/ClientSidebar";
import OnboardingModal from "@/components/onboarding-modal";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "TierWise | AI-Powered SaaS Pricing Tier Optimization",
  description: "Create optimal pricing structures with AI recommendations, cost calculations, and industry benchmarks. The guided platform for founders to maximize revenue and growth.",
  keywords: "pricing optimization, SaaS pricing, pricing tiers, feature allocation, AI pricing tools, pricing strategy",
  openGraph: {
    title: "TierWise - Transform Your Pricing Strategy with Confidence",
    description: "A guided platform helping founders create optimal pricing structures using AI-powered recommendations and industry benchmarks",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/tierwise-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TierWise - Pricing Optimization Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TierWise | Transform Your Pricing Strategy",
    description: "Create optimal pricing tiers with AI-powered recommendations and industry benchmarks",
    images: ["/images/tierwise-twitter-image.jpg"],
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <SidebarProvider>
              <ClientSidebar />
              <SidebarInset>
                <div className="relative flex flex-1 flex-col gap-4">
                  <OnboardingModal />
                  <HeaderControls />
                  {children}
                </div>
              </SidebarInset>
            </SidebarProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
