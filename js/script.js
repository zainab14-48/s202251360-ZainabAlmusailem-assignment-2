// Assignment 3 interactions: API data, state management, filtering/sorting, and validation.
const storageKeys = {
  theme: 'portfolio-theme',
  visitorName: 'portfolio-visitor-name',
};

const greetingEl = document.querySelector('#greeting');
const themeToggle = document.querySelector('#theme-toggle');
const visitorForm = document.querySelector('#visitor-form');
const visitorInput = document.querySelector('#visitor-name');
const visitorMessage = document.querySelector('#visitor-message');
const clearNameButton = document.querySelector('#clear-name');
const visitTimer = document.querySelector('#visit-timer');

const weatherStatus = document.querySelector('#weather-status');
const weatherData = document.querySelector('#weather-data');
const weatherTemp = document.querySelector('#weather-temp');
const weatherHumidity = document.querySelector('#weather-humidity');
const weatherWind = document.querySelector('#weather-wind');
const refreshWeatherButton = document.querySelector('#refresh-weather');

const projectsGrid = document.querySelector('#projects-grid');
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const levelFilter = document.querySelector('#level-filter');
const sortSelect = document.querySelector('#project-sort');
const searchInput = document.querySelector('#project-search');
const projectStatus = document.querySelector('#project-status');

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const topicInput = document.querySelector('#topic');
const nameError = document.querySelector('#name-error');
const emailError = document.querySelector('#email-error');
const messageError = document.querySelector('#message-error');
const topicError = document.querySelector('#topic-error');

const getStoredValue = (key) => localStorage.getItem(key);
const setStoredValue = (key, value) => localStorage.setItem(key, value);
const removeStoredValue = (key) => localStorage.removeItem(key);

const getTimeGreeting = () => {
  const hours = new Date().getHours();

  if (hours < 12) {
    return 'Good morning';
  }

  if (hours < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
};

const updateGreeting = () => {
  if (!greetingEl) {
    return;
  }

  const visitorName = getStoredValue(storageKeys.visitorName);
  const nameText = visitorName ? `, ${visitorName}` : '';
  greetingEl.textContent = `${getTimeGreeting()}${nameText}! Thanks for stopping by.`;
};

const updateVisitorState = () => {
  const visitorName = getStoredValue(storageKeys.visitorName);

  if (visitorInput) {
    visitorInput.value = visitorName || '';
  }

  if (visitorMessage) {
    visitorMessage.textContent = visitorName
      ? `Welcome back, ${visitorName}. Your name was saved in this browser.`
      : 'Add your name to personalize this portfolio.';
  }

  updateGreeting();
};

const applyTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);

  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    themeToggle.setAttribute('aria-pressed', theme === 'dark');
  }
};

const initializeTheme = () => {
  const storedTheme = getStoredValue(storageKeys.theme);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const startingTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(startingTheme);
};

initializeTheme();
updateVisitorState();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme =
      document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    setStoredValue(storageKeys.theme, nextTheme);
  });
}

if (visitorForm) {
  visitorForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nextName = visitorInput ? visitorInput.value.trim() : '';

    if (nextName.length < 2) {
      if (visitorMessage) {
        visitorMessage.textContent = 'Please enter at least 2 characters.';
      }
      return;
    }

    setStoredValue(storageKeys.visitorName, nextName);
    updateVisitorState();
  });
}

if (clearNameButton) {
  clearNameButton.addEventListener('click', () => {
    removeStoredValue(storageKeys.visitorName);
    updateVisitorState();
  });
}

let secondsOnPage = 0;
const updateVisitTimer = () => {
  if (!visitTimer) {
    return;
  }

  const minutes = Math.floor(secondsOnPage / 60);
  const seconds = secondsOnPage % 60;
  visitTimer.textContent =
    minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
};

updateVisitTimer();
window.setInterval(() => {
  secondsOnPage += 1;
  updateVisitTimer();
}, 1000);

const setWeatherLoading = () => {
  if (weatherStatus) {
    weatherStatus.textContent = 'Loading current weather...';
  }

  if (weatherData) {
    weatherData.hidden = true;
  }
};

const showWeatherError = () => {
  if (weatherStatus) {
    weatherStatus.textContent =
      'Weather data is unavailable right now. Please try again later.';
  }

  if (weatherData) {
    weatherData.hidden = true;
  }
};

const fetchWeather = async () => {
  if (!weatherStatus || !weatherData) {
    return;
  }

  setWeatherLoading();
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=26.2361&longitude=50.0393&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto',
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;
    const units = data.current_units;

    if (!current || !units) {
      throw new Error('Weather API response is missing current conditions.');
    }

    weatherTemp.textContent = `${Math.round(current.temperature_2m)}${units.temperature_2m}`;
    weatherHumidity.textContent = `${current.relative_humidity_2m}${units.relative_humidity_2m}`;
    weatherWind.textContent = `${Math.round(current.wind_speed_10m)} ${units.wind_speed_10m}`;
    weatherData.hidden = false;
    weatherStatus.textContent = `Updated for Dhahran at ${current.time.replace('T', ' ')}.`;
  } catch (error) {
    showWeatherError();
  } finally {
    window.clearTimeout(timeoutId);
  }
};

if (refreshWeatherButton) {
  refreshWeatherButton.addEventListener('click', fetchWeather);
}

fetchWeather();

let activeFilter = 'all';

const levelMessages = {
  all: 'All difficulty levels are included.',
  beginner: 'Beginner projects focus on clear layouts and simple workflows.',
  advanced: 'Advanced projects combine multiple screens, states, or business rules.',
};

const getSortedProjects = () => {
  const sortValue = sortSelect ? sortSelect.value : 'date-desc';

  return [...projectCards].sort((first, second) => {
    if (sortValue === 'title-asc') {
      return (first.dataset.title || '').localeCompare(second.dataset.title || '');
    }

    const firstDate = new Date(first.dataset.date || 0).getTime();
    const secondDate = new Date(second.dataset.date || 0).getTime();
    return sortValue === 'date-asc' ? firstDate - secondDate : secondDate - firstDate;
  });
};

const updateProjectStatus = (visibleCount, totalCount, levelValue) => {
  if (!projectStatus) {
    return;
  }

  if (visibleCount === 0) {
    projectStatus.textContent =
      'No projects found. Try a different category, level, or search term.';
    return;
  }

  const projectWord = visibleCount === 1 ? 'project' : 'projects';
  projectStatus.textContent = `Showing ${visibleCount} of ${totalCount} ${projectWord}. ${
    levelMessages[levelValue] || ''
  }`;
};

const filterAndSortProjects = () => {
  if (!projectsGrid) {
    return;
  }

  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const levelValue = levelFilter ? levelFilter.value : 'all';
  let visibleCount = 0;

  getSortedProjects().forEach((card) => {
    projectsGrid.appendChild(card);
    const category = card.dataset.category || '';
    const level = card.dataset.level || '';
    const title = card.dataset.title || '';
    const tags = card.dataset.tags || '';
    const matchesCategory = activeFilter === 'all' || category === activeFilter;
    const matchesLevel = levelValue === 'all' || level === levelValue;
    const matchesSearch =
      !searchTerm || `${title} ${tags} ${level}`.toLowerCase().includes(searchTerm);
    const isVisible = matchesCategory && matchesLevel && matchesSearch;

    card.classList.toggle('is-hidden', !isVisible);

    if (isVisible) {
      visibleCount += 1;
    }
  });

  updateProjectStatus(visibleCount, projectCards.length, levelValue);
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    filterAndSortProjects();
  });
});

if (levelFilter) {
  levelFilter.addEventListener('change', filterAndSortProjects);
}

if (sortSelect) {
  sortSelect.addEventListener('change', filterAndSortProjects);
}

if (searchInput) {
  searchInput.addEventListener('input', filterAndSortProjects);
}

filterAndSortProjects();

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
  const nameValue = nameInput ? nameInput.value.trim() : '';
  const messageValue = messageInput ? messageInput.value.trim() : '';
  const topicValue = topicInput ? topicInput.value : '';

  if (nameValue.length < 2) {
    showFieldError(nameError, 'Please enter at least 2 characters.');
    isValid = false;
  } else {
    clearFieldError(nameError);
  }

  if (!emailInput || !emailInput.validity.valid) {
    showFieldError(emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearFieldError(emailError);
  }

  if (messageValue.length < 10) {
    showFieldError(messageError, 'Message should be at least 10 characters.');
    isValid = false;
  } else if (!/[a-z]/i.test(messageValue)) {
    showFieldError(messageError, 'Message should include a short written note.');
    isValid = false;
  } else {
    clearFieldError(messageError);
  }

  if (!topicValue) {
    showFieldError(topicError, 'Please choose a topic.');
    isValid = false;
  } else {
    clearFieldError(topicError);
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
  messageInput
    ? messageInput.value.trim().length >= 10 && /[a-z]/i.test(messageInput.value)
    : true
);

if (topicInput) {
  topicInput.addEventListener('change', () => {
    if (topicInput.value) {
      clearFieldError(topicError);
    }
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm()) {
      if (formStatus) {
        formStatus.textContent = 'Please fix the highlighted fields.';
        formStatus.classList.add('error');
        formStatus.classList.remove('success');
      }
      return;
    }

    if (formStatus) {
      const topicLabel = topicInput.options[topicInput.selectedIndex].text;
      formStatus.textContent = `Thanks! Your ${topicLabel.toLowerCase()} message passed validation.`;
      formStatus.classList.add('success');
      formStatus.classList.remove('error');
    }

    form.reset();
  });
}
