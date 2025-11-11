## Full-Stack E-commerce (React + Tailwind, Node.js + Express)

### Prerequisites
- Node.js 18+

### Folders
- `backend`: Express API (port 5000)
- `frontend`: React + Vite + Tailwind UI (port 5173)

### Setup
1) Install dependencies
   - From project root:
     - `cd backend && npm install`
     - `cd ../frontend && npm install`

2) Environment variables
   - Backend: create `backend/.env` with:
     ```
     PORT=5000
     FRONTEND_ORIGIN=http://localhost:5173
     ```
   - Frontend: create `frontend/.env` with:
     ```
     VITE_API_URL=http://localhost:5000
     ```

### Run locally (two terminals)
- Terminal 1:
  ```
  cd backend
  npm run dev
  ```
  Backend runs at `http://localhost:5000`

- Terminal 2:
  ```
  cd frontend
  npm run dev
  ```
  Frontend runs at the printed URL (default `http://localhost:5173`)

### Test API connectivity
- Backend health: `GET http://localhost:5000/api/health`
- Backend products: `GET http://localhost:5000/api/products`
- Frontend page will fetch and render products from the backend.

### Production build (frontend)
```
cd frontend
npm run build
```


