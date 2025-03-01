# Todo App with Next.js

## Introduction
This is a simple todo application built with Next.js, designed to help users manage their tasks efficiently. It features user authentication and basic CRUD operations for todos, with a responsive UI for desktop and mobile devices. The frontend integrates with a custom backend API (hosted in a separate repository) and uses MongoDB for data storage, showcasing a full-stack development workflow.

## Main Functionality
- **User Authentication:** Sign in with email/password or Google OAuth (partially implemented) to access your personalized todo list.
- **Todo Management:** Create, read, update, and delete todos with real-time updates via a clean dashboard interface.
- **Responsive Navigation:** A sticky header and sidebar (with "Postscript" note and GitHub links) adapt to screen sizes.
- **Profile Access:** View and edit user profile details from the dashboard.
- **Feedback:** Toast notifications provide instant feedback for actions like adding or completing tasks.

## Tech Stack
- **Frontend:** Next.js 15, React, Tailwind CSS, shadcn/ui components
- **Database:** MongoDB
- **Authentication:** Token-based with JWT in localStorage (minimal NextAuth usage)
- **Data Fetching:** SWR for efficient data fetching, Axios and fetch for CRUD operations
- **Icons:** lucide-react & react-icons

> **Note:** The backend is built with Node.js, Express, Mongoose (ORM), bcrypt (password hashing), cors, and dotenv. It is hosted separately at [Backend GitHub Repo](https://github.com/ArNAB-0053/todo-backend).

## Demo
- **Deployed Link:** [Vercel Deployment](https://todo-plan-act-achieve.vercel.app/)
- **Video Reference:** [Demo Video](https://video-link)

**Note:** The deployed version uses MongoDB, which may act slowly due to free-tier hosting limitations or network latency. Local testing (e.g., with http://localhost:5000) offers faster performance.

## Frontend Setup
1. **Clone the Repo:**
```bash
git clone https://github.com/ArNAB-0053/todo-frontend.git
cd todo-frontend
```

2. **Install Dependencies:**
```bash
npm install
```
 If you encounter dependency issues, try:
```bash
npm install --legacy-peer-deps
```
 or:
```bash
npm install --force
```

3. **Configure Environment:**
   * The repo includes an .env.example file showing the structure for .env.local.
   * Copy it to .env.local:
   * Edit .env.local and add your backend URL (MongoDB Atlas URI is configured in the backend repo):
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000 # Your backend URL
   ```
   * Note: See the [Backend GitHub Repo](https://github.com/ArNAB-0053/todo-backend) for MongoDB URI setup.

4. **Run the Frontend:**
   * Ensure the backend is running (refer to backend repo instructions).
   * Start the Next.js app:
   ```bash
   npm run dev
   ```
   * Open http://localhost:3000 in your browser.

You're good to go! If you're testing locally with a different IP (e.g., 192.168.x.x:5000), update NEXT_PUBLIC_API_URL in .env.local accordingly.

> **Important:** Be sure to visit the [Backend GitHub Repo](https://github.com/ArNAB-0053/todo-backend) to complete the backend setup, which is required for the frontend to function properly.
