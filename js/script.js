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

const availabilityStatus = document.querySelector('#availability-status');
const availabilityNote = document.querySelector('#availability-note');

const projectsGrid = document.querySelector('#projects-grid');
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const levelFilter = document.querySelector('#level-filter');
const sortSelect = document.querySelector('#project-sort');
const searchInput = document.querySelector('#project-search');
const projectStatus = document.querySelector('#project-status');
const projectSummary = document.querySelector('#project-summary');

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

const currentYearEl = document.querySelector('#current-year');
const copyEmailButton = document.querySelector('#copy-email');
const contactEmail = document.querySelector('#contact-email');

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
  greetingEl.textContent = `${getTimeGreeting()}${nameText}. Thanks for visiting this final portfolio.`;
};

const updateVisitorState = () => {
  const visitorName = getStoredValue(storageKeys.visitorName);

  if (visitorInput) {
    visitorInput.value = visitorName || '';
  }

  if (visitorMessage) {
    visitorMessage.textContent = visitorName
      ? `Welcome back, ${visitorName}. Your name is stored locally in this browser.`
      : 'Add your name to personalize this portfolio.';
  }

  updateGreeting();
};

const applyTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);

  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }
};

const initializeTheme = () => {
  const storedTheme = getStoredValue(storageKeys.theme);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const startingTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(startingTheme);
};

const updateAvailability = () => {
  if (!availabilityStatus || !availabilityNote) {
    return;
  }

  const hours = new Date().getHours();

  if (hours >= 8 && hours < 17) {
    availabilityStatus.textContent = 'Likely in study mode';
    availabilityNote.textContent =
      'This demo status estimates daytime availability for coursework and project work.';
    return;
  }

  if (hours >= 17 && hours < 22) {
    availabilityStatus.textContent = 'Likely reviewing projects';
    availabilityNote.textContent =
      'Evening hours are a good time for portfolio refinement, testing, and practice.';
    return;
  }

  availabilityStatus.textContent = 'Likely offline right now';
  availabilityNote.textContent =
    'Late hours are reserved for rest. The status updates automatically based on local time.';
};

initializeTheme();
updateVisitorState();
updateAvailability();

if (currentYearEl) {
  currentYearEl.textContent = String(new Date().getFullYear());
}

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

  const hours = Math.floor(secondsOnPage / 3600);
  const minutes = Math.floor((secondsOnPage % 3600) / 60);
  const seconds = secondsOnPage % 60;

  if (hours > 0) {
    visitTimer.textContent = `${hours}h ${minutes}m ${seconds}s`;
    return;
  }

  if (minutes > 0) {
    visitTimer.textContent = `${minutes}m ${seconds}s`;
    return;
  }

  visitTimer.textContent = `${seconds}s`;
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

    if (weatherTemp) {
      weatherTemp.textContent = `${Math.round(current.temperature_2m)}${units.temperature_2m}`;
    }

    if (weatherHumidity) {
      weatherHumidity.textContent = `${current.relative_humidity_2m}${units.relative_humidity_2m}`;
    }

    if (weatherWind) {
      weatherWind.textContent = `${Math.round(current.wind_speed_10m)} ${units.wind_speed_10m}`;
    }

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
  all: 'All project levels are included.',
  beginner: 'Beginner projects emphasize clarity, layout, and approachable flows.',
  advanced: 'Advanced projects combine multiple states, screens, or user journeys.',
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

const updateProjectSummary = (visibleProjects) => {
  if (!projectSummary) {
    return;
  }

  if (visibleProjects.length === 0) {
    projectSummary.textContent =
      'No matching projects are visible right now. Reset the controls to return to the full gallery.';
    return;
  }

  const firstProject = visibleProjects[0].dataset.title || 'the selected project';
  const visibleCount = visibleProjects.length;
  const categoryLabel =
    activeFilter === 'all'
      ? 'across UI concepts and web app ideas'
      : activeFilter === 'web'
        ? 'focused on web application workflows'
        : 'focused on interface concept work';

  projectSummary.textContent = `${visibleCount} project${visibleCount === 1 ? '' : 's'} visible, ${categoryLabel}. The first card currently in view is ${firstProject}.`;
};

const filterAndSortProjects = () => {
  if (!projectsGrid) {
    return;
  }

  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const levelValue = levelFilter ? levelFilter.value : 'all';
  const visibleProjects = [];

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
      visibleProjects.push(card);
    }
  });

  updateProjectStatus(visibleProjects.length, projectCards.length, levelValue);
  updateProjectSummary(visibleProjects);
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

const clearAllFieldErrors = () => {
  clearFieldError(nameError);
  clearFieldError(emailError);
  clearFieldError(messageError);
  clearFieldError(topicError);
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
  (nameInput ? nameInput.value.trim().length >= 2 : true)
);
attachLiveValidation(emailInput, emailError, () =>
  (emailInput ? emailInput.validity.valid : true)
);
attachLiveValidation(messageInput, messageError, () =>
  (messageInput
    ? messageInput.value.trim().length >= 10 && /[a-z]/i.test(messageInput.value)
    : true)
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

    if (formStatus && topicInput) {
      const topicLabel = topicInput.options[topicInput.selectedIndex].text;
      formStatus.textContent = `Thanks. Your ${topicLabel.toLowerCase()} message passed validation successfully.`;
      formStatus.classList.add('success');
      formStatus.classList.remove('error');
    }

    form.reset();
    clearAllFieldErrors();
  });
}

if (copyEmailButton && contactEmail && navigator.clipboard) {
  copyEmailButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(contactEmail.textContent || '');

      if (formStatus) {
        formStatus.textContent = 'Contact email copied to the clipboard.';
        formStatus.classList.add('success');
        formStatus.classList.remove('error');
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = 'Unable to copy the email right now.';
        formStatus.classList.add('error');
        formStatus.classList.remove('success');
      }
    }
  });
}
