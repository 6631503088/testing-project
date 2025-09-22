// Contract test for Album actions
// These tests are expected to fail until implementation

describe('Album Contract', () => {
    const Database = require('better-sqlite3');
    const dbPath = '../../src/photo-albums.db';

    beforeEach(() => {
        // Clean up tables before each test
        const db = new Database(dbPath);
        db.exec('DELETE FROM Photo; DELETE FROM Album;');
        db.close();
    });

    it('should create an album with name and date', () => {
        const db = new Database(dbPath);
        const stmt = db.prepare('INSERT INTO Album (name, date, "order") VALUES (?, ?, ?)');
        const info = stmt.run('Vacation', '2025-09-22', 1);
        expect(info.changes).toBe(1);
        const album = db.prepare('SELECT * FROM Album WHERE id = ?').get(info.lastInsertRowid);
        expect(album.name).toBe('Vacation');
        expect(album.date).toBe('2025-09-22');
        expect(album.order).toBe(1);
        db.close();
    });

    it('should reorder an album', () => {
        const db = new Database(dbPath);
        // Insert album
        const stmt = db.prepare('INSERT INTO Album (name, date, "order") VALUES (?, ?, ?)');
        const info = stmt.run('Birthday', '2025-09-21', 2);
        // Reorder
        const update = db.prepare('UPDATE Album SET "order" = ? WHERE id = ?');
        const result = update.run(5, info.lastInsertRowid);
        expect(result.changes).toBe(1);
        const album = db.prepare('SELECT * FROM Album WHERE id = ?').get(info.lastInsertRowid);
        expect(album.order).toBe(5);
        db.close();
    });
});
