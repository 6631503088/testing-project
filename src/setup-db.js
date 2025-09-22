// SQLite schema setup for MVP
const Database = require('better-sqlite3');
const db = new Database('photo-albums.db');

db.exec(`
CREATE TABLE IF NOT EXISTS Album (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  "order" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Photo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  album_id INTEGER NOT NULL,
  file_path TEXT NOT NULL,
  thumbnail_path TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(album_id) REFERENCES Album(id)
);
`);

console.log('SQLite schema created.');
db.close();
