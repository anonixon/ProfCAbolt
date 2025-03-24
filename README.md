# ProfCA - Professional Career Assessment

A modern web application for career assessment and business idea generation, built with React, TypeScript, and Supabase.

## Features

- 🔐 Authentication with Supabase
- 💳 Subscription management with Stripe
- 🎯 Career assessment and recommendations
- 💡 Business idea generation
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🌙 Dark mode support

## Tech Stack

- React 18
- TypeScript 5
- Tailwind CSS
- Supabase
- Stripe
- React Router
- Axios

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/profca.git
   cd profca
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env` with your own values.

5. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/     # React components
├── contexts/      # React contexts
├── hooks/         # Custom hooks
├── lib/           # Utility functions and API clients
├── pages/         # Page components
├── types/         # TypeScript types
└── styles/        # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.