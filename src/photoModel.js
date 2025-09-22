// photoModel.js - Photo DB logic for MVP
const Database = require('better-sqlite3');
const dbPath = __dirname + '/photo-albums.db';

function addPhoto(album_id, file_path, thumbnail_path, created_at) {
    const db = new Database(dbPath);
    const stmt = db.prepare('INSERT INTO Photo (album_id, file_path, thumbnail_path, created_at) VALUES (?, ?, ?, ?)');
    const info = stmt.run(album_id, file_path, thumbnail_path, created_at);
    const photo = db.prepare('SELECT * FROM Photo WHERE id = ?').get(info.lastInsertRowid);
    db.close();
    return photo;
}

function removePhoto(id) {
    const db = new Database(dbPath);
    const stmt = db.prepare('DELETE FROM Photo WHERE id = ?');
    const info = stmt.run(id);
    db.close();
    return info.changes > 0;
}

module.exports = { addPhoto, removePhoto };
