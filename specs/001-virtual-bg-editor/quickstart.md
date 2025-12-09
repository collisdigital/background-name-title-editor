# Quickstart: Virtual Background Editor

This guide provides instructions for setting up and running the Virtual Background Editor project.

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

## Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd background-name-title-editor
    ```

2.  **Install dependencies**:
    Navigate to the `frontend` directory and install the required npm packages.
    ```bash
    cd frontend
    npm install
    ```

## Running the Development Server

Once the dependencies are installed, you can start the Vite development server:

```bash
npm run dev
```

This will start the application on a local development server, typically at `http://localhost:5173`. The application will automatically reload if you make changes to the source files.

## Building for Production

To create a production build of the application, run the following command:

```bash
npm run build
```

This will generate a `dist` directory in the `frontend` folder containing the optimized and minified static assets for the application.

## Running Tests

### Unit and Component Tests

To run the unit and component tests with Vitest, use the following command:

```bash
npm run test
```

### End-to-End Tests

To run the end-to-end tests with Playwright, use the following command:

```bash
npm run test:e2e
```
