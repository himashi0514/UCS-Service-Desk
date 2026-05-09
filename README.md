# UCS Mini Service Desk
A lightweight, fully functional support ticket management system built with React. This project was developed as a practical assessment to demonstrate core frontend architecture, state management, and semantic UI design.

**Live Deployment (View the live app here)** : [https://ucs-service-desk.vercel.app/]

## Features
**Dashboard Summary:** Real-time calculation of open, in-progress, resolved, and high-priority tickets.
**Ticket Creation:** A clean form to generate new tickets with automatic ID generation and timestamping.
**Ticket Directory:** A comprehensive list view featuring dynamic filtering (by status and priority) and live text search.
**Ticket Management:** Dynamic routing to individual ticket views where users can update statuses and log time-stamped activity notes.
**Persistent Storage:** All data is seamlessly saved to the browser's `localStorage` via a custom React Context provider.

## Technology Stack
**Core:** React (initialized via Vite)
**Routing:** `react-router-dom`
**Styling:** Tailwind CSS (Utility-first architecture)
**Icons:** `lucide-react`
**Data Management:** React Context API & LocalStorage

## Local Setup Instructions
If you would like to run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   git clone [https://github.com/himashi0514/UCS-Service-Desk.git]

2. **Navigate into the directory:** `cd ucs-service-desk`

3. **Install dependencies:** `npm install`

4. **Start the development server:** `npm run dev`

5. **Open your browser:** Navigate to `http://localhost:5173`