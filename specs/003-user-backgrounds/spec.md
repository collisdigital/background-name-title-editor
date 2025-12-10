# User Uploaded Backgrounds

## Overview
Allow users to upload their own background images to the application. These images are processed entirely on the client side and are not persisted to a server.

## UX Design
- **Entry Point**: A new "Add New" button (placeholder style) is added to the start of the background image grid in `ImageSelector`.
- **Interaction**: Clicking the button opens the system file dialog.
- **File Support**: Filters for common image types (PNG, JPG, JPEG).
- **Feedback**: Upon selection, the image is immediately added to the grid (prepended to custom list, displayed before preset backgrounds) and selected.

## Technical Implementation

### Data Model
- New images utilize the existing `BackgroundImage` interface.
- `id`: Generated using `user-upload-${Date.now()}`.
- `src`: Created using `URL.createObjectURL(file)`.
- `placeholders` & `logoConfig`: Generated using exported helper functions from `backgrounds.ts` with sensible defaults (centered text, standard logo position).

### Components
- **`ImageSelector`**:
  - Manages local state `customBackgrounds` for uploaded images.
  - Combines `customBackgrounds` + `props.backgrounds` for rendering.
  - Contains a hidden `<input type="file">` triggered by the "Add New" button.
  - Handles the `change` event to process the file and update state.

### Configuration
- `frontend/src/config/backgrounds.ts` was refactored to export `createPlaceholders` and `createLogoConfig` helpers to allow code reuse for generating default configurations for new images.

## Future Considerations
- Allow users to drag/move the text placeholders for custom backgrounds (since the default positions might not align with the uploaded image's safe zones).
- Persist custom backgrounds in `localStorage` (would require converting `Blob` to Base64, watch out for storage limits).
