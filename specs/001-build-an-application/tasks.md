# Tasks: Photo Album Organizer MVP

**Feature Branch:** 001-build-an-application
**Location:** /Users/isaacaung/Documents/Lab-Test/testing-project/specs/001-build-an-application

## Parallel Execution Guidance
- Tasks marked [P] can be executed in parallel
- Tasks without [P] must be completed sequentially

---

## Numbered, Ordered Tasks

### Setup
T001. Initialize Vite project in `src/` and configure for vanilla JS/HTML/CSS
T002. Install minimal dependencies (Vite, SQLite bindings, if needed)
T003. Set up SQLite database schema for Album and Photo entities (see data-model.md)

### Contract Tests [P]
T004. Implement contract test for Album actions (`contracts/album.test.js`) [P]
T005. Implement contract test for Photo actions (`contracts/photo.test.js`) [P]

### Models [P]
T006. Create Album model in SQLite (id, name, date, order) [P]
T007. Create Photo model in SQLite (id, album_id, file_path, thumbnail_path, created_at) [P]

### Core Functionality
T008. Implement createAlbum action (UI + DB logic)
T009. Implement reorderAlbum action (drag-and-drop UI + DB logic)
T010. Implement addPhoto action (UI + DB logic)
T011. Implement removePhoto action (UI + DB logic)

### Integration Tests [P]
T012. Write integration test for creating albums and adding photos [P]
T013. Write integration test for drag-and-drop album reordering [P]
T014. Write integration test for tile-based photo preview in album [P]

### UI Implementation
T015. Build main page UI: display albums grouped by date, enable drag-and-drop reordering
T016. Build album view: tile-based photo preview, add/remove photos
T017. Add prompt for empty album creation and warning for duplicate dates
T018. Add performance warning for large collections (1000+ albums, 10,000+ photos)

### Polish [P]
T019. Manual UI testing in browser [P]
T020. Add minimal documentation to `quickstart.md` and code comments [P]
T021. Optimize drag-and-drop and tile rendering for performance [P]

---

## Dependency Notes
- Setup tasks (T001-T003) must be completed before any other tasks
- Contract tests (T004-T005), models (T006-T007), and integration tests (T012-T014) can be run in parallel after setup
- Core functionality (T008-T011) depends on models and contract tests
- UI implementation (T015-T018) depends on core functionality
- Polish tasks (T019-T021) can be run in parallel after all features are implemented

---

## Task Agent Commands (Examples)
- To run all contract tests in parallel: `run-tasks T004 T005`
- To build models in parallel: `run-tasks T006 T007`
- To run all integration tests in parallel: `run-tasks T012 T013 T014`
- To run all polish tasks in parallel: `run-tasks T019 T020 T021`
