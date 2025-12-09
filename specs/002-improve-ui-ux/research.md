# Research: Modern UI/UX Overhaul

## Technical Context
*   **Framework**: React 18+
*   **Styling**: Tailwind CSS 3.x
*   **Build Tool**: Vite

## Decisions

### 1. Styling Strategy
*   **Decision**: Continue using Tailwind CSS utility classes directly in components.
*   **Rationale**: The project already has Tailwind configured. It provides a robust design system (spacing, typography, colors) out of the box, facilitating the "consistent" and "modern" look requested without writing custom CSS. Its responsive modifiers (`md:`, `lg:`) are perfect for the "responsive" requirement.
*   **Alternatives Considered**:
    *   *Custom CSS/SCSS*: Rejected due to maintenance overhead and lack of built-in responsive system.
    *   *Component Library (e.g., MUI, Chakra)*: Rejected to keep bundle size small and avoid overriding heavy default styles for a simple application.

### 2. Layout Structure
*   **Decision**: Implement a flexbox/grid-based layout in `HomePage.tsx` that switches direction based on screen size.
*   **Rationale**:
    *   **Desktop**: Side-by-side (Split View) - Controls on Left/Right, Preview on the other.
    *   **Mobile**: Stacked - Preview on top (for visibility), Controls below.
    *   This aligns with the `md:` breakpoint strategy in Tailwind.

### 3. Component Refactoring
*   **Decision**: Update existing atomic components (`TextInput`, `ImageSelector`, `PreviewCanvas`) to accept `className` props (or similar) but primarily to have "modern" defaults internally (e.g., larger padding, rounded corners, subtle shadows).
*   **Rationale**: Keeps the usage in `HomePage` clean while encapsulating the "look and feel" within the components.

### 4. Dark Mode
*   **Decision**: Utilize Tailwind's `dark:` modifier.
*   **Rationale**: The spec mentions supporting dark mode. Tailwind makes this trivial if `darkMode: 'media'` (default) or `'class'` is used. We will rely on system preference (`media` strategy) for simplicity unless a toggle is explicitly requested (not in spec).

## Unresolved Items / Risks
*   None identified. The scope is purely presentational using existing tools.
