# Collaborative Task List (Next.js)

This is a collaborative task list application built with Next.js, allowing multiple users to manage tasks in real-time.

## Features

- **User Authentication:** Secure user registration and login using NextAuth.js.
- **Task Management:**
  - Create, edit, and delete tasks.
  - Assign tasks to users.
  - Filter and search tasks by various criteria.
  - Real-time updates of task list could not complete due to time constraints (using Liveblocks or other library in future).
- **Modern UI:**
  - Clean and intuitive user interface using Shadcn UI components and Tailwind CSS.
- **Efficient Data Handling:**
  - Prisma ORM for seamless interaction with MongoDB.
  - Redux Toolkit (RTK Query) for efficient data fetching, caching, and state management.
- **Robust Architecture:**
  - Clear separation of concerns using React Server Components (RSC) and Client Components.
  - Next.js server actions for handling form submissions and data mutations.
- **Type Safety:** Developed using TypeScript for improved code quality and maintainability.

## Technologies Used

- **Frontend:**
  - Next.js 14+
  - React
  - TypeScript
  - Redux Toolkit (RTK Query)
  - Shadcn UI
  - Tailwind CSS
- **Backend:**
  - Next.js API Routes
  - Prisma ORM
  - MongoDB 

- **Authentication:** NextAuth.js 
- **Real-Time Updates (Future Implementation):** Liveblocks (or similar library)

## Demo
- Live : [Taskify](https://taskify-kohl.vercel.app/)
- Preview : 
[Loom](https://www.loom.com/share/b3f22bdb2db84eebacc0457d5a13a048?sid=7c6f25bb-1b8c-4785-b82c-b1c802f18181)
  
## Getting Started locally

1. **Clone the Repository:**
   ```bash
   git clone [invalid URL removed]
   cd collaborative-task-list
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Create and update .env file:**
   ```bash
   <!-- Add these lines to .env -->
      DATABASE_URL=<your-mongodb-url>
      NEXTAUTH_SECRET="<your-secret-key>"
   ```

3. **Prisma setting:**
   ```bash
   npx prisma generate
   ```


4. **Start Development Server:**
   ```bash
   npm run dev
   ```

