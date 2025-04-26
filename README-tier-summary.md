# Tier Summary Feature Implementation

## Overview

This feature allows users to save and retrieve tier summary data when they click the "Summary" button in the TierCard component. The implementation includes:

1. A new Supabase table `tier_summaries` to store calculation parameters and results
2. Server-side services for saving and retrieving tier summary data
3. A custom React hook for managing tier summary data
4. Updates to the TierCard component to save and load summary data

## Database Schema

The `tier_summaries` table has the following structure:

```sql
create table public.tier_summaries (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  tier_id uuid not null,
  project_id uuid not null,
  user_id uuid not null,
  input_tokens integer not null default 1000000,
  output_tokens integer not null default 1000000,
  image_count integer not null default 100,
  video_seconds integer not null default 45,
  text_margin_percentage integer not null default 0,
  image_margin_percentage integer not null default 0,
  video_margin_percentage integer not null default 0,
  text_use_expensive_model boolean not null default true,
  image_use_expensive_model boolean not null default true,
  video_use_expensive_model boolean not null default true,
  operational_overhead_percentage integer not null default 20,
  constraint tier_summaries_pkey primary key (id),
  constraint tier_summaries_tier_id_fkey foreign key (tier_id) references tiers (id) on delete cascade,
  constraint tier_summaries_project_id_fkey foreign key (project_id) references projects (id) on delete cascade,
  constraint tier_summaries_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade,
  constraint tier_summaries_tier_id_unique unique (tier_id)
);
```

## Implementation Details

### 1. Database Migration

A SQL migration file has been created at `/migrations/tier_summaries_table.sql`. To apply this migration:

1. Connect to your Supabase project
2. Open the SQL Editor
3. Copy and paste the contents of the migration file
4. Run the SQL commands

### 2. Type Definitions

The `TierSummary` type has been added to `/lib/tier.types.ts` to define the structure of tier summary data.

### 3. Server-side Services

The `/lib/supabase/tier_summary.services.ts` file contains server-side functions for:
- `saveTierSummary`: Saves or updates tier summary data
- `getTierSummary`: Retrieves tier summary data for a specific tier

### 4. Client-side Hook

The `/hooks/useTierSummary.ts` hook provides a convenient interface for components to interact with tier summary data:
- `summary`: The current tier summary data
- `saveSummary`: Function to save tier summary data
- `isLoading`: Loading state for retrieving summary data
- `isSaving`: Loading state for saving summary data

### 5. TierCard Component Updates

The TierCard component has been updated to:
- Load saved summary data when the component mounts
- Save summary data when the user clicks the Summary button
- Display the saved data in the Summary section

## Usage

The feature works automatically when users interact with the TierCard component. When a user clicks the Summary button, the current calculation parameters and results are saved to the database. When the component mounts, any previously saved data is loaded and applied to the calculator hooks.

## Testing

To test the feature:
1. Apply the database migration
2. Start the application
3. Create a tier and add models to it
4. Configure the calculation parameters in the Models Config section
5. Click the Summary button to view and save the summary
6. Refresh the page or navigate away and back to verify that the saved data is loaded correctly