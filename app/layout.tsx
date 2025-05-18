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
      <head>
        <meta name="apple-mobile-web-app-title" content="TierWise Pro" />
      </head>
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
