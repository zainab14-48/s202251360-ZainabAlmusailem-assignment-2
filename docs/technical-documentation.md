# Technical Documentation

## Project Structure
- `index.html`: Main HTML structure with semantic sections.
- `css/styles.css`: Styling, layout, theme variables, and responsive rules.
- `js/script.js`: JavaScript for greeting message, theme toggle, and form feedback.
- `assets/images/`: SVG placeholders for profile and project previews.

## Layout & Styling
- **Responsive layout** uses CSS Grid for the hero, projects, and contact sections.
- **Flexbox** is used for navigation, buttons, and the skills chips.
- **CSS variables** define colors and spacing for light/dark themes.
- A small **fade-up animation** adds a gentle page-load transition.

## JavaScript Interactivity
- **Greeting message** updates based on the user’s local time.
- **Theme toggle** switches between light and dark modes and stores the preference in local storage.
- **Contact form** prevents default submission and shows a short confirmation message.

## Accessibility Notes
- All form inputs are paired with labels.
- Images include descriptive `alt` text.
- The form status line uses `aria-live="polite"` for screen readers.

## Browser Compatibility
- Tested in modern Chromium-based browsers and Safari.
- Uses standard CSS and JavaScript (no external frameworks).
