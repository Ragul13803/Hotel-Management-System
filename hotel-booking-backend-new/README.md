# Hotel Management (Express + MongoDB)

Backend: Node.js/Express with MongoDB (Mongoose).
Frontend: Minimal static admin page in `frontend/`.

## Features
- 8 rooms seeded (all AC)
- Complementary breakfasts
- Condition: seasonal days price may vary
- APIs:
  - GET `/api/rooms/summary` – total, available, booked
  - GET `/api/rooms` – list rooms
  - GET `/api/rooms/:roomId` – by Mongo `_id` or numeric room number
  - POST `/api/rooms/book` – book first available room
  - PUT `/api/rooms/:roomId` – update booking
  - DELETE `/api/rooms/:roomId/checkout` – checkout

## Setup
1. Install Node.js (v18+ recommended)
2. Install MongoDB and make sure it is running locally, or use a MongoDB Atlas URI
3. Copy `.env.example` to `.env` and set values

```bash
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/hotel_management
```

4. Install dependencies

```bash
npm install
```

5. Start the server

```bash
npm start
```

Open http://localhost:3000 to access the admin page.

## Notes
- Rooms are numbered 1..8, all AC. Seeding runs once if DB is empty.
- You can reference rooms by numeric number in the routes (e.g., `/api/rooms/3`).
- Validate date inputs in the UI; backend accepts ISO dates.

## Project Structure

```
backend/
  server.js        # Express server, APIs, static serving ../frontend
frontend/
  index.html       # Minimal admin UI
.env               # Create from .env.example
package.json       # Scripts point to backend/server.js
```
