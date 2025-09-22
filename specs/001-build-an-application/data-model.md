# Phase 1: Data Model for Photo Album Organizer

## Entities

### Album
- **Attributes:**
  - id: integer (primary key)
  - name: string
  - date: date
  - order: integer (for UI ordering)

### Photo
- **Attributes:**
  - id: integer (primary key)
  - album_id: integer (foreign key to Album)
  - file_path: string (local path)
  - thumbnail_path: string (local path)
  - created_at: date

## Relationships
- One Album has many Photos
- Photo belongs to one Album

## Validation Rules
- Album name must be unique for a given date (unless user overrides)
- Album date required
- Photo must have valid file path
- Album order must be unique per album

## State Transitions
- Album can be created empty, but user is prompted to add photos
- Albums can be reordered by drag-and-drop (order attribute updates)
- Photos can be added/removed from albums
