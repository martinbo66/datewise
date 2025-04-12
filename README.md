# DateWise

DateWise is a modern web application that allows users to generate dates based on natural language descriptions. Simply enter phrases like "every Wednesday in May" or "the first Monday of each month in 2025" and see the matching dates displayed in both list and calendar views.

## Features

- Natural language date pattern interpretation
- Calendar visualization of generated dates
- Clean, responsive UI built with Next.js and Tailwind CSS
- AI-powered date generation using Google's Gemini AI model via GenKit

## Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **UI Components**: Radix UI with custom styling
- **AI Integration**: GenKit with Google AI (Gemini 2.0)
- **Date Handling**: date-fns

## Prerequisites

- Node.js (v18 or newer)
- Google AI API key for Gemini model

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Google AI API key:
   ```
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:9002](http://localhost:9002) in your browser

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Run GenKit development server
- `npm run genkit:watch` - Run GenKit in watch mode

## Project Structure

- `/src/app` - Next.js application pages
- `/src/components` - React components
- `/src/ai` - AI integration with GenKit
- `/src/services` - Service layer including date generation

## How It Works

DateWise uses GenKit to integrate with Google's Gemini AI model. When a user enters a natural language description of dates, the application sends this to the AI model which interprets the pattern and returns a list of matching dates. These dates are then displayed in both list and calendar format.
