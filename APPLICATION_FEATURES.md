# Application Documentation: AI Cost and Revenue Management Platform

## 1. Application Overview

This application appears to be a comprehensive platform designed for managing and analyzing costs associated with AI models, managing projects, simulating revenue, and handling different service tiers. It leverages Next.js for the frontend framework, Supabase for backend services (likely authentication and database), and various UI libraries for a modern user experience.

The primary purpose seems to be to help users understand, predict, and manage the financial aspects of using AI models within their projects.

## 2. Core Features

Based on the project structure, the following core features have been identified:

### 2.1. Authentication & User Management

-   **User Sign-up & Sign-in:** The `(auth-pages)/sign-up` and `(auth-pages)/sign-in` directories, along with `auth/callback/route.ts`, indicate a robust authentication system, likely integrated with Supabase.
-   **Account Management:** The `app/account/page.tsx` suggests a dedicated section for users to manage their account details.

### 2.2. Project Management

-   **Project Creation, Listing, Editing, and Deletion:** The `app/projects/` directory, with components like `project-list.tsx`, `project-card.tsx`, `project-create-sheet.tsx`, and `project-edit-sheet.tsx`, clearly points to full CRUD (Create, Read, Update, Delete) functionality for projects.
-   **Data Handling:** Hooks like `use-project-mutations.ts` and `use-project-queries.ts` manage data fetching and updates for projects.

### 2.3. AI Model Management & Cost Calculation

-   **Model Representation:** The `app/models/` directory with `model-card.tsx`, `model-filter.tsx`, and `model-form.tsx` suggests features for displaying, filtering, and possibly configuring AI models.
-   **AI Cost Calculators:** Custom hooks found in `app/hooks/` such as `useImageModelCalculator.ts`, `useTextModelCalculator.ts`, and `useVideoModelCalculator.ts` are central to the application's purpose, allowing users to calculate costs associated with different types of AI models.
-   **Model Selection for Tiers/Projects:** The `app/tiers/components/model-selection-sheet.tsx` implies that users can select specific AI models, likely for associating them with service tiers or projects.

### 2.4. Tier Management

-   **Tier Creation & Configuration:** The `app/tiers/` directory, especially components like `tier-creation-sheet.tsx` and `tier-edit-sheet.tsx`, indicates functionality for defining and managing different service tiers or subscription plans.
-   **Tier Display:** Components like `TierCard.tsx` and `FlippableCard.tsx` are likely used to present these tiers to users.
-   **Integrated AI Cost Calculation:** The `ai-cost-calculator.tsx` within the tiers components suggests that cost calculations are integrated into the tier definition process.

### 2.5. Revenue Simulation

-   **Revenue Projection:** The `app/revenue-simulator/` directory, with components like `ChartRevenue.tsx` and `ProjectedUsers.tsx`, points to a feature that allows users to simulate and visualize potential revenue, possibly based on selected tiers and user numbers.

### 2.6. Usage Summary & Breakdown

-   **Model Usage Insights:** The `app/summary/page.tsx` and `ModelBreakdownSheet.tsx` suggest a feature for users to view a summary or breakdown of their AI model usage and associated costs.

### 2.7. Subscription & Upgrade Management

-   **Upgrade Path:** The `app/upgrade/page.tsx` indicates a dedicated section or process for users to upgrade their subscription or service tier.

### 2.8. Analytics (Potential Feature)

-   **Data Analysis:** The presence of an `app/analytics/` directory suggests an intention for analytics features. However, the `components` subfolder is currently empty, so the specific nature of these analytics is not yet defined by UI components.

### 2.9. Sales (Potential Feature)

-   **Sales-Related Functionality:** Similar to analytics, an `app/sales/` directory exists, hinting at potential sales-focused features. The `components` subfolder is also empty, indicating this area might be under development or planned for the future.

## 3. Technology Stack Highlights

-   **Frontend:** Next.js (React framework)
-   **Backend/BaaS:** Supabase (Authentication, Database)
-   **UI Components:** Radix UI, Lucide Icons, Shadcn/UI (implied by naming conventions and utility libraries like `clsx`, `tailwind-merge`, `tailwindcss-animate`)
-   **State Management/Data Fetching:** TanStack Query (`@tanstack/react-query`)
-   **Styling:** Tailwind CSS
-   **Drag and Drop:** @dnd-kit
-   **Charting:** Recharts
-   **Internationalization:** next-intl

This documentation provides a high-level overview based on the current structure. Further details would require in-depth code analysis of each component and page.