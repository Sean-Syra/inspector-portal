# Inspector Portal Starter (React + Node + Microsoft Graph + MySQL)

This repo is a starter scaffold that demonstrates:
- Using Azure AD application (client credentials) to call Microsoft Graph with application permissions (Calendars.ReadWrite.All)
- Querying free/busy (getSchedule) and creating events on inspectors' calendars
- Persisting appointments into MySQL

## What's included
- backend/: Node + Express + MSAL + Graph client + MySQL helper
- frontend/: React (TypeScript) minimal admin UI to pick inspector, view availability, and schedule

## Quick start
1. Setup Azure AD app and grant application permissions:
   - Calendars.Read.All and/or Calendars.ReadWrite.All
   - Grant admin consent
2. Copy backend/.env.example -> backend/.env and fill values
3. Copy frontend/.env.example -> frontend/.env if you need to override API URL
4. Install & run:
   - Backend:
     ```
     cd backend
     npm install
     npm run dev
     ```
   - Frontend:
     ```
     cd frontend
     npm install
     npm start
     ```

Notes:
- The backend stores Azure credentials and uses client credentials flow. Protect access to the backend and rotate secrets regularly.
- This starter uses placeholder inspector list in the frontend; implement /api/inspectors in the backend to fetch from MySQL.


## CI

A GitHub Actions workflow was added at `.github/workflows/ci.yml` to install dependencies and build the frontend on push to `main`.
