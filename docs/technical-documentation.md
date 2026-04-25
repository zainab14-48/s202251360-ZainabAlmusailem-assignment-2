# Technical Documentation

## 1. Architecture Overview
This project is a static front-end portfolio application organized into three main layers:

- `index.html` provides the semantic content structure and section hierarchy.
- `css/styles.css` defines the visual system, responsive layout rules, and component styling.
- `js/script.js` controls interactive behavior, stored preferences, API data loading, project filtering, and form validation.

The application does not depend on frameworks or build tools. It is intentionally lightweight and can run directly in a browser.

## 2. Main Sections
- Hero section with introduction, metrics, and current focus panel
- About section with strengths and personal positioning
- Highlights section summarizing key strengths of the final build
- Interactive dashboard for visitor name, visit timer, live weather, and availability
- Filterable project gallery
- Workflow and skills section
- Contact section with validated form and copy-email utility

## 3. Styling Strategy
- CSS custom properties are used for theme colors, borders, shadows, and surfaces.
- The site supports light and dark themes using `body[data-theme="dark"]`.
- Layout relies on CSS Grid and Flexbox instead of frameworks.
- Cards, pills, controls, and containers reuse common visual patterns to keep the interface consistent.
- Responsive breakpoints at `1040px`, `900px`, and `720px` adapt the layout for tablets and phones.

## 4. JavaScript Features

### Theme and Visitor State
- Theme preference is stored in `localStorage`.
- Visitor name is stored in `localStorage` and reused to personalize greetings.
- The greeting changes based on the visitor's current local time.

### Live Data
- Weather data is loaded from the Open-Meteo API for Dhahran.
- The request uses `fetch()` with `AbortController` to avoid hanging requests.
- If the API fails, the page displays a friendly fallback message instead of breaking.

### Project Filtering
- Users can filter by category, level, and search term.
- Users can also sort by newest, oldest, or title.
- JavaScript updates both the visible cards and the summary/status text.

### Contact Form Validation
- Name requires at least 2 characters.
- Email must pass browser email validation.
- Message requires at least 10 characters and must contain alphabetic text.
- Topic selection is required.
- Inline error messages and a form status message provide clear feedback.

## 5. Accessibility Considerations
- Navigation uses clear anchor links to page sections.
- Form fields are paired with labels and error messages through `aria-describedby`.
- Dynamic status text uses `aria-live="polite"` where useful.
- Search and visitor-name controls include screen-reader-only labels.
- Button and link states remain visible with hover and focus styling.

## 6. Performance and Maintainability
- The project uses no large dependencies or frameworks.
- SVG placeholder graphics keep the repo lightweight.
- JavaScript logic is separated into small, focused functions.
- Reusable CSS classes reduce repeated styling patterns.

## 7. Manual Deployment and Presentation Tasks
This workspace includes the code and written documentation for the final project. The following tasks still require manual completion outside local editing:

- Push the repository to a public GitHub repository named `202251360-zainabalmusailem-assignment4`
- Deploy the site to GitHub Pages, Netlify, or Vercel
- Export presentation slides as `presentation/slides.pdf`
- Record and add `presentation/demo-video.mp4`
