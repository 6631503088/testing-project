# Quickstart Guide: Photo Album Organizer

## Prerequisites
- Node.js and npm installed
- SQLite installed locally

## Setup Steps
1. Clone the repository and checkout branch `001-build-an-application`.
2. Run `npm install` to install Vite and minimal dependencies.
3. Initialize SQLite database for photo metadata:
   - Run provided setup script or use `sqlite3` CLI to create tables as per `data-model.md`.
4. Start development server:
   - Run `npm run dev` (Vite)
5. Open the app in your browser (default: http://localhost:5173)

## Usage
- Create albums grouped by date
- Drag and drop albums to reorder
- Add photos to albums; preview in tile interface
- All data and images remain local

## Notes
- No cloud upload; all images and metadata are local
- For large collections, performance is optimized for up to 1000 albums and 10,000 photos
- See `data-model.md` for schema details
