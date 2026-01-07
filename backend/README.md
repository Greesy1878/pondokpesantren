# Backend (FastAPI) for TunasQuran

This small FastAPI app exposes a gallery endpoint that mirrors the frontend `galleryImages` data and serves static images from the frontend `public/images` folder when present.

Run locally (from repository root):

```bash
pip install -r backend/requirements.txt
uvicorn backend.server:app --reload --host 0.0.0.0 --port 8000
```

Endpoints:
- `GET /api/gallery` — returns JSON array of gallery images (objects with `url`, `category`, `title`).

Notes:
- Static files: the server attempts to mount `frontend/public/images` at `/images` if the directory exists.
- Environment: `backend/server.py` reads `.env` in the `backend` folder for MongoDB and CORS settings. If you don't need Mongo, set `MONGO_URL` to a valid URL or adjust the file.
