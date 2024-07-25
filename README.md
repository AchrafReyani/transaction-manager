# Transaction Manager

## Project Description

Transaction Manager is a web application designed to help users manage their financial transactions. Users can create, view, edit, and delete transactions in their personal space. This project leverages Next.js, Tailwind CSS, and Supabase for authentication and database management. Feel free to [try it out!](https://transaction-manager-mu.vercel.app)

P.S. Currently only 3 users can login every hour due to the supabase restriction.

## Features

- User authentication with email magic links using Supabase
- Create, view, edit, and delete transactions
- Responsive design with Tailwind CSS
- Secure server-side handling of user data

## Technologies Used

- Next.js
- Tailwind CSS
- Supabase
- Vercel (for deployment)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (version 14 or above)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/achrafreyani/transaction-manager.git
   cd transaction-manager

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install

3. Set up environment variables:

    Create a `.env.local` file in the root directory and add your Supabase project URL and anonymous key:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

4. Navigate to \app\components\AuthForm.jsx and edit line 13 to the following:

    ```jsx
    redirectTo='https://localhost:3000/auth/callback'

4. Run the development server:
    
    ```bash
    npm run dev
    # or
    yarn dev

5. Open http://localhost:3000 in your browser to see the app.
