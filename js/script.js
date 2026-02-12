// Greeting and theme toggle are the required interactive features.
const greetingEl = document.querySelector('#greeting');
const themeToggle = document.querySelector('#theme-toggle');
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const hours = new Date().getHours();
let greetingText = 'Good evening';

if (hours < 12) {
  greetingText = 'Good morning';
} else if (hours < 18) {
  greetingText = 'Good afternoon';
}

if (greetingEl) {
  greetingEl.textContent = `${greetingText}! Thanks for stopping by.`;
}

const storedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const startingTheme = storedTheme || (prefersDark ? 'dark' : 'light');

const applyTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    themeToggle.setAttribute('aria-pressed', theme === 'dark');
  }
};

applyTheme(startingTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme =
      document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formStatus) {
      formStatus.textContent = 'Thanks! Your message is ready to be sent.';
    }
    form.reset();
  });
}
