// Greeting, theme toggle, filtering, and form feedback are the required interactive features.
const greetingEl = document.querySelector('#greeting');
const themeToggle = document.querySelector('#theme-toggle');
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const nameError = document.querySelector('#name-error');
const emailError = document.querySelector('#email-error');
const messageError = document.querySelector('#message-error');

const projectCards = Array.from(document.querySelectorAll('.project-card'));
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const searchInput = document.querySelector('#project-search');
const projectStatus = document.querySelector('#project-status');

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

let activeFilter = 'all';

const updateProjectStatus = (visibleCount, hasQuery) => {
  if (!projectStatus) {
    return;
  }

  if (visibleCount === 0) {
    projectStatus.textContent =
      'No projects found. Try a different search or filter.';
    return;
  }

  if (hasQuery) {
    projectStatus.textContent = `Showing ${visibleCount} project${
      visibleCount === 1 ? '' : 's'
    }.`;
  } else {
    projectStatus.textContent = 'Showing all projects.';
  }
};

const filterProjects = () => {
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const category = card.dataset.category || '';
    const title = card.dataset.title || '';
    const tags = card.dataset.tags || '';
    const matchesFilter = activeFilter === 'all' || category === activeFilter;
    const matchesSearch =
      !searchTerm || `${title} ${tags}`.toLowerCase().includes(searchTerm);

    const isVisible = matchesFilter && matchesSearch;
    card.classList.toggle('is-hidden', !isVisible);

    if (isVisible) {
      visibleCount += 1;
    }
  });

  const hasQuery = searchTerm.length > 0 || activeFilter !== 'all';
  updateProjectStatus(visibleCount, hasQuery);
};

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach((btn) =>
        btn.classList.toggle('active', btn === button)
      );
      filterProjects();
    });
  });
}

if (searchInput) {
  searchInput.addEventListener('input', filterProjects);
}

filterProjects();

const showFieldError = (errorEl, message) => {
  if (errorEl) {
    errorEl.textContent = message;
  }
};

const clearFieldError = (errorEl) => {
  if (errorEl) {
    errorEl.textContent = '';
  }
};

const validateForm = () => {
  let isValid = true;

  if (nameInput && nameInput.value.trim().length < 2) {
    showFieldError(nameError, 'Please enter at least 2 characters.');
    isValid = false;
  } else {
    clearFieldError(nameError);
  }

  if (emailInput && !emailInput.validity.valid) {
    showFieldError(emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearFieldError(emailError);
  }

  if (messageInput && messageInput.value.trim().length < 10) {
    showFieldError(messageError, 'Message should be at least 10 characters.');
    isValid = false;
  } else {
    clearFieldError(messageError);
  }

  return isValid;
};

const attachLiveValidation = (inputEl, errorEl, validator) => {
  if (!inputEl) {
    return;
  }

  inputEl.addEventListener('input', () => {
    if (validator()) {
      clearFieldError(errorEl);
    }
  });
};

attachLiveValidation(nameInput, nameError, () =>
  nameInput ? nameInput.value.trim().length >= 2 : true
);
attachLiveValidation(emailInput, emailError, () =>
  emailInput ? emailInput.validity.valid : true
);
attachLiveValidation(messageInput, messageError, () =>
  messageInput ? messageInput.value.trim().length >= 10 : true
);

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      if (formStatus) {
        formStatus.textContent = 'Please fix the highlighted fields.';
        formStatus.classList.add('error');
        formStatus.classList.remove('success');
      }
      return;
    }

    if (formStatus) {
      formStatus.textContent = 'Thanks! Your message is ready to be sent.';
      formStatus.classList.add('success');
      formStatus.classList.remove('error');
    }
    form.reset();
  });
}
