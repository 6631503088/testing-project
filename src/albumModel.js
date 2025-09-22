// albumModel.js - Album DB logic for MVP
const Database = require('better-sqlite3');
const dbPath = __dirname + '/photo-albums.db';

function createAlbum(name, date, order) {
    const db = new Database(dbPath);
    const stmt = db.prepare('INSERT INTO Album (name, date, "order") VALUES (?, ?, ?)');
    const info = stmt.run(name, date, order);
    const album = db.prepare('SELECT * FROM Album WHERE id = ?').get(info.lastInsertRowid);
    db.close();
    return album;
}

function reorderAlbum(id, newOrder) {
    const db = new Database(dbPath);
    const stmt = db.prepare('UPDATE Album SET "order" = ? WHERE id = ?');
    const info = stmt.run(newOrder, id);
    const album = db.prepare('SELECT * FROM Album WHERE id = ?').get(id);
    db.close();
    return album;
}

module.exports = { createAlbum, reorderAlbum };
