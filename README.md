# Countdown Timer Application

A full-stack MERN application that allows users to create and manage countdown timers for important events.

## Features

- Create countdown timers with title, target date, and description
- View all timers in a list
- Real-time countdown updates
- Delete timers
- Responsive Material-UI design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm run install-all
   ```

3. Create a `.env` file in the backend directory with the following content:

   ```
   MONGODB_URI=mongodb://localhost:27017/countdown-timer
   PORT=5000
   ```

4. Start MongoDB service on your machine

## Running the Application

1. Start both frontend and backend servers:
   ```bash
   npm start
   ```

This will start:

- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

## Technologies Used

- Frontend:

  - React.js
  - Material-UI
  - Axios
  - date-fns

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## API Endpoints

- GET /api/timers - Get all timers
- POST /api/timers - Create a new timer
- DELETE /api/timers/:id - Delete a timer
