# Tasks: Modern UI/UX Overhaul

**Feature**: Modern UI/UX Overhaul (`002-improve-ui-ux`)
**Status**: Pending
**Spec**: [specs/002-improve-ui-ux/spec.md](./spec.md)

## Dependencies

- **Phase 1**: Setup (Blocking)
- **Phase 2**: Foundational (Blocking)
- **Phase 3**: User Story 1 (Responsive Layout)
- **Phase 4**: User Story 2 (Modern Visual Style)
- **Phase 5**: Polish & Cross-Cutting

## Phase 1: Setup
*Goal: Ensure clean baseline state.*

- [x] T001 Verify project baseline by running tests in `frontend/`

## Phase 2: Foundational
*Goal: Establish the core layout structure required for responsiveness.*

- [x] T002 Refactor `frontend/src/pages/HomePage.tsx` layout structure to support responsive switching (mobile stack, desktop split)

## Phase 3: User Story 1 - Responsive Layout (P1)
*Goal: Interface adapts to screen size without horizontal scrolling.*
*Independent Test: Resize browser to 375px; controls should stack vertically.*

### Implementation
- [x] T003 [P] [US1] Update `frontend/src/components/PreviewCanvas.tsx` to ensure full-width responsiveness within new layout (include unit tests)
- [x] T004 [US1] Update `frontend/src/hooks/useImageProcessor.ts` to tune ResizeObserver for mobile orientation changes (include unit tests)
- [x] T005 [US1] Verify mobile layout constraints in `frontend/src/pages/HomePage.tsx` (remove fixed widths)

### Parallel Execution Examples
- T003 (Canvas) and T005 (Page constraints) can be worked on simultaneously.

## Phase 4: User Story 2 - Modern Visual Style (P1)
*Goal: Professional, consistent, and clean appearance.*
*Independent Test: Visual inspection of inputs/buttons against modern design standard.*

### Implementation
- [x] T006 [P] [US2] Update `frontend/src/components/TextInput.tsx` with modern styling (padding, borders, focus rings) and ensure 44x44px min hit target
- [x] T007 [P] [US2] Update `frontend/src/components/ImageSelector.tsx` with responsive grid and clear selection states (high-contrast borders/scale) and ensure 44x44px min hit target
- [x] T008 [US2] Enhance `frontend/src/pages/HomePage.tsx` visual container (backgrounds, shadows, spacing, typography)
- [x] T009 [US2] Style "Download" button in `frontend/src/pages/HomePage.tsx` (primary action styling) and ensure 44x44px min hit target

### Parallel Execution Examples
- T006 (Inputs) and T007 (Selector) are completely independent components.

## Phase 5: Polish & Cross-Cutting
*Goal: Final quality checks and regression testing.*

- [x] T010 Verify and fix Dark Mode contrast in `frontend/src/index.css` and components
- [x] T011 Run and update E2E tests `frontend/tests/e2e/` to match new UI selectors/layout
