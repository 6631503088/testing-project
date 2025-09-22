# Phase 0 Research: Photo Album Organizer

## Unknowns from Technical Context
- Should empty albums be allowed or prompt user to add photos?
- Should duplicate albums for the same date be merged, prevented, or allowed?
- Is there a performance or storage limit for large photo collections?

## Research Tasks & Findings

### 1. Empty Albums
- **Decision:** Allow creation of empty albums, but prompt user to add photos immediately after creation.
- **Rationale:** Users may want to create albums in advance and add photos later. Prompting improves UX.
- **Alternatives considered:** Preventing empty albums (rejected: less flexible for users).

### 2. Duplicate Albums for Same Date
- **Decision:** Prevent duplicate albums for the same date by default, but allow user to override with a warning.
- **Rationale:** Avoid confusion and clutter. Override allows for edge cases (e.g., multiple events on same date).
- **Alternatives considered:** Merge duplicates (rejected: may lose user intent); Allow all duplicates (rejected: clutter).

### 3. Performance/Storage Limits
- **Decision:** Target smooth performance for up to 1000 albums and 10,000 photos. Warn user if exceeded.
- **Rationale:** Most personal collections fit within these limits. Warning helps manage expectations.
- **Alternatives considered:** No limit (rejected: possible performance degradation); Strict limit (rejected: too restrictive).

### 4. SQLite for Local Metadata
- **Decision:** Use SQLite for storing photo metadata locally. No cloud or remote storage.
- **Rationale:** Privacy, simplicity, and offline capability.
- **Alternatives considered:** IndexedDB, localStorage (rejected: less robust for structured data).

### 5. Drag-and-Drop UI
- **Decision:** Use native HTML5 drag-and-drop API for album reordering.
- **Rationale:** Minimal dependencies, good browser support.
- **Alternatives considered:** Third-party libraries (rejected: unnecessary for simple use case).

## Summary
All major unknowns resolved. Ready for Phase 1 design.
