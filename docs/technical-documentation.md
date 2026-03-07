# Technical Documentation

## Project Structure
- `index.html`: Main HTML structure with semantic sections and interactive controls.
- `css/styles.css`: Styling, layout, theme variables, transitions, and responsive rules.
- `js/script.js`: JavaScript for greeting, theme toggle, project filtering/search, and form validation.
- `assets/images/`: SVG placeholders for profile and project previews.

## Layout & Styling
- **Responsive layout** uses CSS Grid for the hero, projects, and contact sections.
- **Flexbox** is used for navigation, filter controls, buttons, and skill chips.
- **CSS variables** define colors and spacing for light/dark themes.
- **Transitions** add subtle hover movement for cards and buttons.

## JavaScript Interactivity
- **Greeting message** updates based on the user’s local time.
- **Theme toggle** switches between light and dark modes and stores the preference in localStorage.
- **Project filtering** supports category buttons and live search, showing empty-state feedback.
- **Contact form validation** checks required fields and displays inline error or success messages.

## Error Handling & Feedback
- Inline error messages appear for invalid name, email, or message fields.
- A status message confirms success or prompts corrections.
- The projects area displays a “No projects found” message when filters return zero results.

## Accessibility Notes
- All form inputs are paired with labels and `aria-describedby` links.
- Images include descriptive `alt` text.
- Status messages use `aria-live="polite"` for screen readers.

## Browser Compatibility
- Tested in modern Chromium-based browsers and Safari.
- Uses standard CSS and JavaScript (no external frameworks).
