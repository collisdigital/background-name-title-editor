# Quickstart: Modern UI/UX Overhaul

This guide provides instructions for setting up, running, and verifying the improved UI/UX of the Virtual Background Editor.

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

## Setup

1.  **Clone the repository** (if not already done):
    ```bash
    git clone <repository-url>
    cd background-name-title-editor
    ```

2.  **Checkout the feature branch**:
    ```bash
    git checkout 002-improve-ui-ux
    ```

3.  **Install dependencies**:
    Navigate to the `frontend` directory and install the required npm packages.
    ```bash
    cd frontend
    npm install
    ```

## Running the Development Server

Start the Vite development server:

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

### Verifying Responsiveness
To verify the new responsive layout:
1. Open the URL in your browser.
2. Open Developer Tools (F12) and toggle the "Device Toolbar" (Ctrl+Shift+M or Cmd+Shift+M).
3. Select different devices (e.g., iPhone SE, iPad, Desktop) to see the layout adapt.

## Building for Production

To create a production build of the application:

```bash
cd frontend
npm run build
```

This will generate a `dist` directory containing the optimized static assets with the new modern styling.

## Running Tests

### Unit and Component Tests

```bash
cd frontend
npm run test
```
*Note: Ensure new layout tests pass.*

### End-to-End Tests

```bash
cd frontend
npm run test:e2e
```
