# Tasks: User Uploaded Backgrounds

**Input**: Design documents from `/specs/003-user-backgrounds/`

## Phase 1: Core Implementation

**Purpose**: Enable users to upload and use their own images.

- [X] T001 [US1] Create file input and "Add New" button in `frontend/src/components/ImageSelector.tsx`.
- [X] T002 [US1] Implement `handleFileUpload` in `frontend/src/components/ImageSelector.tsx` to process selected files.
- [X] T003 [US1] Refactor `frontend/src/config/backgrounds.ts` to export helper functions (`createPlaceholders`, `createLogoConfig`).
- [X] T004 [US1] Update `ImageSelector` to use helper functions for generating config for new images.
- [X] T005 [US1] Add unit tests for file upload in `frontend/tests/component/ImageSelector.test.tsx`.

## Phase 2: Feature Flagging

**Purpose**: Hide the feature behind a debug flag until it is fully polished.

- [X] T006 [US1] Implement URL parameter check for `debug=true` in `frontend/src/components/ImageSelector.tsx`.
- [X] T007 [US1] Conditionally render the "Add New" button and file input based on the debug flag.
- [X] T008 [US1] Update tests to verify debug mode behavior.
