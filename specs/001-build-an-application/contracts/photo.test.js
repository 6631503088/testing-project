// Contract test for Photo actions
// These tests are expected to fail until implementation

describe('Photo Contract', () => {
    const Database = require('better-sqlite3');
    const dbPath = '../../src/photo-albums.db';

    beforeEach(() => {
        // Clean up tables before each test
        const db = new Database(dbPath);
        db.exec('DELETE FROM Photo; DELETE FROM Album;');
        db.close();
    });

    it('should add a photo to an album', () => {
        const db = new Database(dbPath);
        // Insert album first
        const albumStmt = db.prepare('INSERT INTO Album (name, date, "order") VALUES (?, ?, ?)');
        const albumInfo = albumStmt.run('Trip', '2025-09-20', 1);
        // Add photo
        const photoStmt = db.prepare('INSERT INTO Photo (album_id, file_path, thumbnail_path, created_at) VALUES (?, ?, ?, ?)');
        const photoInfo = photoStmt.run(albumInfo.lastInsertRowid, '/images/photo1.jpg', '/images/thumb1.jpg', '2025-09-22');
        expect(photoInfo.changes).toBe(1);
        const photo = db.prepare('SELECT * FROM Photo WHERE id = ?').get(photoInfo.lastInsertRowid);
        expect(photo.album_id).toBe(albumInfo.lastInsertRowid);
        expect(photo.file_path).toBe('/images/photo1.jpg');
        expect(photo.thumbnail_path).toBe('/images/thumb1.jpg');
        db.close();
    });

    it('should remove a photo from an album', () => {
        const db = new Database(dbPath);
        // Insert album and photo
        const albumStmt = db.prepare('INSERT INTO Album (name, date, "order") VALUES (?, ?, ?)');
        const albumInfo = albumStmt.run('Trip', '2025-09-20', 1);
        const photoStmt = db.prepare('INSERT INTO Photo (album_id, file_path, thumbnail_path, created_at) VALUES (?, ?, ?, ?)');
        const photoInfo = photoStmt.run(albumInfo.lastInsertRowid, '/images/photo2.jpg', '/images/thumb2.jpg', '2025-09-22');
        // Remove photo
        const removeStmt = db.prepare('DELETE FROM Photo WHERE id = ?');
        const result = removeStmt.run(photoInfo.lastInsertRowid);
        expect(result.changes).toBe(1);
        const photo = db.prepare('SELECT * FROM Photo WHERE id = ?').get(photoInfo.lastInsertRowid);
        expect(photo).toBeUndefined();
        db.close();
    });
});
