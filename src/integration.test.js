// Integration tests for Photo Album Organizer MVP
const Database = require('better-sqlite3');
const { createAlbum, reorderAlbum } = require('./albumModel.js');
const { addPhoto, removePhoto } = require('./photoModel.js');
const dbPath = __dirname + '/photo-albums.db';

describe('Integration: Album and Photo', () => {
    beforeEach(() => {
        const db = new Database(dbPath);
        db.exec('DELETE FROM Photo; DELETE FROM Album;');
        db.close();
    });

    it('should create albums and add photos', () => {
        const album = createAlbum('Test', '2025-09-22', 1);
        expect(album.name).toBe('Test');
        const photo = addPhoto(album.id, '/images/a.jpg', '/images/a_thumb.jpg', '2025-09-22');
        expect(photo.album_id).toBe(album.id);
        expect(photo.file_path).toBe('/images/a.jpg');
    });

    it('should reorder albums by drag-and-drop', () => {
        const a1 = createAlbum('A1', '2025-09-21', 1);
        const a2 = createAlbum('A2', '2025-09-22', 2);
        const updated = reorderAlbum(a1.id, 2);
        expect(updated.order).toBe(2);
    });

    it('should show photos in tile preview in album', () => {
        const album = createAlbum('Tiles', '2025-09-23', 1);
        addPhoto(album.id, '/images/tile1.jpg', '/images/tile1_thumb.jpg', '2025-09-23');
        addPhoto(album.id, '/images/tile2.jpg', '/images/tile2_thumb.jpg', '2025-09-23');
        const db = new Database(dbPath);
        const photos = db.prepare('SELECT * FROM Photo WHERE album_id = ?').all(album.id);
        expect(photos.length).toBe(2);
        expect(photos[0].file_path).toContain('tile');
        db.close();
    });
});
