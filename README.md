# AI Image Generation Cost Calculator

This is a Next.js application designed to help users calculate the costs associated with offering AI image generation services based on different pricing tiers and usage models. It provides tools to estimate expenses, set profit margins, and determine suggested pricing for various user tiers.

## Features

-   **Model Selection:** Choose from a predefined list of popular AI image generation models with their associated costs per image, or input a custom cost.
-   **Tier Configuration:**
    -   Define multiple user tiers (e.g., FREE, PRO, PREMIUM).
    -   Customize the name and number of images allocated per user for each tier.
    -   Add default FREE tier or custom tiers.
    -   Remove tiers as needed.
    -   Reset image counts for default tiers.
-   **Cost Calculation:**
    -   Calculates the cost per tier based on the number of images and the selected cost per image.
    -   Displays the grand total cost across all tiers.
-   **Profit Margin:** Set a desired profit margin percentage to factor into pricing calculations.
-   **Extra Expenses:** Add and manage additional monthly costs (e.g., server hosting, API fees) that contribute to the total operational expenses.
-   **Suggested Pricing:**
    -   Calculates suggested monthly pricing for each paying tier based on image costs, free tier subsidization, extra expenses, and the desired profit margin.
    -   Option to toggle between monthly and annual billing, applying a configurable discount for annual plans.
-   **Profit Estimation:** Estimates the total monthly profit based on the calculated revenue needed and total costs (including image generation and extra expenses).
-   **Suggested User Counts:** Calculates the suggested number of users required for each paying tier to achieve the target profit goal, distributing the goal proportionally based on each tier's cost contribution.
-   **Summary View:** Provides a clear overview of costs per tier, total images, total image generation cost, total extra expenses, and the final total monthly cost.
-   **Theme Switcher:** Allows users to switch between light, dark, and system themes.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd aicost
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Copy `.env.example` to `.env.local` and fill in any necessary environment variables (if applicable, though this specific calculator might not require backend keys).
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) (or the specified port) in your browser.

## How to Use

1.  **Select Model/Cost:** Choose an AI model from the dropdown or select "Custom Cost" and enter the cost per image.
2.  **Configure Tiers:**
    -   Modify the default tiers (FREE, PRO, PREMIUM) or add/remove tiers.
    -   Adjust the "Images per user" for each tier.
    -   *Note: The "Number of users" input per tier has been removed from the tier card itself. User counts are now primarily used in the background for suggested user count calculations.*
3.  **Add Extra Expenses:** Input any recurring monthly costs not directly tied to image generation.
4.  **Set Profit Margin:** Define your desired profit margin percentage.
5.  **Review Summary:** Check the calculated costs per tier and the total monthly cost.
6.  **Analyze Suggested Pricing:**
    -   View the suggested monthly price for each paying tier.
    -   Toggle to "Annual Billing" to see discounted annual prices.
    -   Adjust the annual discount if needed.
7.  **Check Estimated Profit & User Counts:** See the estimated monthly profit based on your settings and the suggested number of users per paying tier needed to reach that profit goal.

## Tech Stack

-   **Framework:** Next.js (React)
-   **UI:** Shadcn/ui (using Radix UI and Tailwind CSS)
-   **State Management:** React Hooks (`useState`)
-   **Styling:** Tailwind CSS
-   **Icons:** Lucide React
-   **Theme:** next-themes

This project provides a practical tool for planning and managing the financial aspects of an AI image generation service.


Task 1 - Help me Improve this Document to be the main reference about the Saas. Be Very Detailed and if something is Missing Let TODO for me to update.(out a file ready for Notion)

Task 2 - Act like a Professional Senior Copywriter and help me create a good copy for SEO of the landing page

Task 3 - Act as a Senior Lading Page Frontend creator and Create a Landing Page using React and Shadcnui (Be Clean, Minimalist, Dark, Impactant, Engaging, Focus on SEO, keywords, tags metadata)

Task 4 - Create a Engaging name for this saas (focus on SEO, easy to find on google, engaging)

------
Im building a Saas and this is the describe ive til now.
Idea:  Pricing Plan Suggest and AI  Cost Calculator

This is application designed to help users calculate the costs associated with offering AI generation services based on different pricing tiers and usage models. It provides tools to estimate expenses, set profit margins, and determine suggested pricing for various user tiers.

## Features

-   **Model:** Choose from a predefined list of popular AI image generation models with their associated costs per image/ per tokens/ per seconds, or input a custom cost. 
   -  Add/Edit Custom Models (Text, Video, Image,  Audio or Hardware)
  - Search and Filter Models
   - 250+ Default Models to use (update all week)
-   **Tier:**
    -   Define multiple user tiers (e.g., FREE, PRO, PREMIUM).
    -   Customize the name and number of images allocated per user for each tier.
    -   Add default FREE tier or custom tiers.
    -   Remove tiers as needed.
 

- Manage Tiers inside our projects
-   **Cost Calculation:**
    -   Calculates the cost per tier based on the number of images and the selected cost per image.
    -   Displays the grand total cost across all tiers.
-   **Profit Margin:** Set a desired profit margin percentage to factor into pricing calculations.
-   **Extra Expenses:** Add and manage additional monthly costs (e.g., server hosting, API fees) that contribute to the total operational expenses.
-   **Suggested Pricing:**
    -   Calculates suggested monthly pricing for each paying tier based on image costs, free tier subsidization, extra expenses, and the desired profit margin.
    -   Option to toggle between monthly and annual billing, applying a configurable discount for annual plans.
-   **Profit Estimation:** Estimates the total monthly profit based on the calculated revenue needed and total costs (including image generation and extra expenses).
-   **What if?** Calculates and simulates the suggested number of users required for each paying tier to achieve the target profit goal, distributing the goal proportionally based on each tier's cost contribution.
-   **Summary View:** Provides a clear overview of costs per tier, total images, total image generation cost, total extra expenses, and the final total monthly cost.
-   **Theme Switcher:** Allows users to switch between light, dark, and system themes.

How to Use (this can change over time)
1.  **Select Model/Create Model Cost:** Choose an AI model from the dropdown or select "Custom Cost" and enter the cost per image.
2.  **Configure Tiers:**
    -   Modify the default tiers (FREE, PRO, PREMIUM) or add/remove tiers.
    -   Adjust the "Images per user" for each tier.
    -   *Note: The "Number of users" input per tier has been removed from the tier card itself. User counts are now primarily used in the background for suggested user count calculations.*
3.  **Add Extra Expenses:** Input any recurring monthly costs not directly tied to image generation.
4.  **Set Profit Margin:** Define your desired profit margin percentage.
5.  **Review Summary:** Check the calculated costs per tier and the total monthly cost.
6.  **Analyze Suggested Pricing:**
    -   View the suggested monthly price for each paying tier.
    -   Toggle to "Annual Billing" to see discounted annual prices.
    -   Adjust the annual discount if needed.
7.  **Check Estimated Profit & User Counts:** See the estimated monthly profit based on your settings and the suggested number of users per paying tier needed to reach that profit goal.

## New Features soon:
- Alertas de mudanças de preços dos provedores de IA
- Comparativo de custo-benefício entre modelos similares
- Análise Avançada de Custos
    - Calculadora de custo real baseada em padrões típicos de uso (nem todos os usuários utilizam 100% da cota)
    - Análise de custos marginais por usuário adicional
    - Projeção de custos considerando tendências de inflação dos serviços de IA
- Otimização de Receita
    - Recomendações automáticas de preços baseadas em margens-alvo
    - Simulação de estratégias de desconto (anual vs. mensal)
    - Análise de ponto de equilíbrio para cada tier
- Ferramentas de Benchmark
    - Dados comparativos de preços de mercado para serviços similares
    - Análise competitiva de ofertas de IA no mercado
    - Recomendações de posicionamento de preço (premium, valor, econômico)
- Projeções Financeiras
    - Dashboards visuais mostrando projeções de receita e lucro
    - Análise de fluxo de caixa baseada em diferentes taxas de crescimento
    - Cálculo de valor do tempo de vida do cliente (LTV)
- Planejamento de Cenários
    - Ferramentas de simulação "e se..." para testar diferentes estruturas de preço
    - Modelagem do impacto de mudanças nos custos dos modelos de IA
    - Análise de sensibilidade para métricas-chave


### segmentos de clientes:

- Startups de IA que precisam definir sua estratégia de preços inicial
- Empresas SaaS que estão incorporando recursos de IA em seus produtos
- Agências de desenvolvimento que criam soluções personalizadas com IA
- Consultores de negócios especializados em tecnologia e transformação digital