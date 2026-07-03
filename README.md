# Soth Sokhomal Portfolio

A personal portfolio built with React, Vite, and Tailwind CSS.

## Run Locally

**Prerequisites:** Node.js

### Frontend
1. Open a terminal in the project root
2. Install dependencies:
   `npm install`
3. Start the frontend dev server:
   `npm run dev`
4. Open `http://localhost:3000`

### Backend
1. Open a terminal in `/server`
2. Install dependencies:
   `npm install`
3. Copy `.env.example` to `.env`
4. Add your MongoDB connection string to `.env` as `MONGODB_URI`
5. Start the backend server:
   `npm run dev`
6. The backend runs on `http://localhost:5000`

### Frontend Backend Integration
- The frontend fetches projects from the backend at `GET /api/projects`
- The contact form submits to `POST /api/messages`
- If backend is unavailable, the projects section falls back to local static project data
- Set `VITE_API_BASE_URL="http://localhost:5000/api"` in the root `.env` file for local development

### API Endpoints
- `GET /api/projects` — retrieve all projects
- `GET /api/projects/:id` — retrieve one project
- `POST /api/projects` — add a new project
- `PUT /api/projects/:id` — update a project
- `DELETE /api/projects/:id` — delete a project
- `GET /api/messages` — retrieve contact messages
- `POST /api/messages` — submit a contact message

### Notes
- Database credentials are stored in `.env`
- `.env` is ignored by `.gitignore`
- Keep your MongoDB connection secret and do not commit `.env`
