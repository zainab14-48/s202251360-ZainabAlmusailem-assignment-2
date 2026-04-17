# Technical Documentation

## Overview
This portfolio is a static web application built with HTML, CSS, and JavaScript. Assignment 3 adds external API integration, more complex application logic, state management, performance improvements, and clearer documentation.

## Project Structure
- `index.html`: Semantic page structure, navigation, portfolio sections, API display area, project controls, and contact form.
- `css/styles.css`: Theme variables, responsive layout, card styles, form styles, and media queries.
- `js/script.js`: Browser-side logic for API fetching, local state, filtering, sorting, timer updates, and validation.
- `assets/images/`: Lightweight SVG images used by the hero and project cards.
- `docs/`: AI usage report and technical documentation.

## External API Integration
The project uses the Open-Meteo Forecast API:

```text
https://api.open-meteo.com/v1/forecast
```

The request fetches current temperature, humidity, and wind speed for Dhahran, Saudi Arabia. JavaScript uses `fetch()` with an `AbortController` timeout so the interface does not wait forever if the API is slow.

Error handling steps:
- Show a loading message before the request starts.
- Check `response.ok` before reading the JSON.
- Confirm the expected `current` and `current_units` fields exist.
- Hide the weather values and show a friendly message if the request fails.

## Complex Logic
The Projects section combines several rules before deciding what to display:
- Category filter: all, web apps, or UI concepts.
- Difficulty filter: all, beginner, or advanced.
- Search filter: matches title, tags, or level.
- Sorting: newest first, oldest first, or title A-Z.

All selected rules are applied together. For example, a visitor can select “Web Apps,” choose “Advanced,” search for a keyword, and then sort the remaining results by date.

The contact form also uses multi-step validation:
- Name must contain at least 2 characters.
- Email must match browser email validation.
- Message must contain at least 10 characters.
- Message must include written text, not only numbers or symbols.
- Topic must be selected.

## State Management
The application uses `localStorage` for persistent browser state:
- `portfolio-theme`: remembers light or dark mode.
- `portfolio-visitor-name`: remembers the visitor name and updates the greeting.

The visit timer is temporary page state. It updates every second while the current tab remains open.

## Performance Choices
- No JavaScript framework is used, keeping the page lightweight.
- JavaScript is loaded with `defer` so HTML can render first.
- Images are SVG files, which are small and scale well.
- Image dimensions are declared in HTML to reduce layout shift.
- CSS uses shared variables and reusable classes to avoid repeated styling.
- External font loading was removed; system fonts improve load speed and reliability.

## Accessibility & Compatibility
- Semantic sections and headings organize the page for users and assistive technology.
- Form inputs use labels and inline error messages.
- Dynamic messages use `aria-live="polite"` where helpful.
- Buttons and links have visible focus states through browser focus plus custom outlines on inputs.
- The site uses standard browser APIs supported by modern Chrome, Edge, Firefox, and Safari.

## Testing Checklist
- Opened the page locally and confirmed there are no missing local files.
- Verified project filters, level filter, search, and sorting work together.
- Verified light/dark mode and visitor name persist after refresh.
- Verified invalid contact form submissions show field-specific messages.
- Verified API failures are handled with a user-friendly message.
