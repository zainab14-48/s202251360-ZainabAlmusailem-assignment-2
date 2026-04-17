# 202251360-zainabalmusailem-assignment3

## Project Description
This is a responsive personal portfolio built for Assignment 3. It extends the earlier portfolio with live external API data, advanced project filtering and sorting, saved user preferences, a visit timer, and stronger contact form validation.

## Features
- Live Dhahran weather from the Open-Meteo API with user-friendly error handling.
- Project category filtering, difficulty filtering, text search, and date/title sorting.
- Light/dark mode stored in `localStorage`.
- Visitor name personalization stored in `localStorage`.
- Visit timer that updates while the page is open.
- Contact form validation for name, email, message quality, and selected topic.
- Responsive layout using semantic HTML, CSS Grid, Flexbox, and accessible labels/status messages.

## Setup Instructions
1. Clone or download the repository.
2. Open `index.html` in a modern browser.

Optional local server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Folder Structure
```text
202251360-zainabalmusailem-assignment3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## API Used
The portfolio uses the free Open-Meteo Forecast API to show current weather conditions for Dhahran, Saudi Arabia. If the request fails or times out, the page displays a clear message instead of breaking.

## AI Usage Summary
AI assistance was used to plan Assignment 3 improvements, organize JavaScript logic, review documentation wording, and identify simple performance improvements. All generated suggestions were reviewed, edited, and tested before inclusion. Full details are available in `docs/ai-usage-report.md`.

## Live Deployment
Add the GitHub Pages, Netlify, or Vercel link here after deployment.
