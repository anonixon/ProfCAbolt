# ProfCA - Professional Career Assessment Platform

A modern web application for professional career assessment and guidance, built with React, Vite, and Tailwind CSS.

## Features

- User authentication and authorization
- Career assessment questionnaires
- AI-powered career recommendations
- Premium subscription tiers
- Admin dashboard
- Responsive design
- Dark mode support

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Supabase
- Stripe
- Radix UI
- React Router
- React Query

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anonixon/ProfCAbolt.git
cd ProfCAbolt
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Fill in your environment variables in `.env`

### Development

Start the development server:
```bash
npm run dev
```

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Deployment on Bolt.new

1. Push your code to GitHub
2. Connect your repository to Bolt.new
3. Configure your environment variables in Bolt.new dashboard
4. Deploy your application

### Environment Variables

Required environment variables for deployment:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `VITE_STRIPE_BASIC_PRICE_ID`: Stripe price ID for basic tier
- `VITE_STRIPE_PRO_PRICE_ID`: Stripe price ID for pro tier
- `VITE_STRIPE_ELITE_PRICE_ID`: Stripe price ID for elite tier
- `VITE_SITE_URL`: Your site URL
- `VITE_AI_API_KEY`: Your AI API key
- `VITE_AI_API_URL`: Your AI API URL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.