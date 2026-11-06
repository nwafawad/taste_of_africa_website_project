// Regions dropdown
const dropdown = document.querySelector('.dropdown');
const dropdownButton = document.querySelector('.dropdown-toggle');

if (dropdownButton) {
  dropdownButton.addEventListener('click', () => {
    dropdown.classList.toggle('open');
  });
}


// Dark / light theme
const themeButton = document.querySelector('.theme-toggle');

// when the page loads, use the saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// when the button is clicked, switch theme and save it
if (themeButton) {
  themeButton.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// recipe filter
const filterButtons = document.querySelectorAll('.filter-btn');
const recipeCards = document.querySelectorAll('.dish-card[data-region]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const region = button.dataset.filter;

    // highlight the clicked button only
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    // loop over the cards
    recipeCards.forEach((card) => {
      if (region === 'all' || card.dataset.region === region) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


// favorites saved in localStorage
const favButtons = document.querySelectorAll('.fav-btn');
const favCount = document.querySelector('.fav-count');

// load saved favorites
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// make a heart look saved (red)
function showFavorite(button, isFav) {
  button.classList.toggle('is-fav', isFav);
  const icon = button.querySelector('.fav-icon') || button;
  icon.textContent = isFav ? '♥' : '♡';
  button.setAttribute('aria-pressed', isFav);
}

// update the saved counter
function updateFavCount() {
  if (favCount) {
    favCount.textContent = favorites.length + ' saved';
  }
}

favButtons.forEach((button) => {
  const id = button.closest('[data-id]').dataset.id;

  // restore saved hearts
  showFavorite(button, favorites.includes(id));

  // on click add or remove this recipe, then save the list
  button.addEventListener('click', () => {
    if (favorites.includes(id)) {
      favorites = favorites.filter((favId) => favId !== id);
    } else {
      favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    showFavorite(button, favorites.includes(id));
    updateFavCount();
  });
});

updateFavCount();

// ingredient scaler
const ingredients = document.querySelector('.ingredients');

if (ingredients) {
  const baseServings = Number(ingredients.dataset.servings); // e.g. 6
  let servings = baseServings;

  const servingsText = document.querySelectorAll('.servings-count');
  const amounts = document.querySelectorAll('[data-amount]');
// recalculate every amount for the current number of servings
  function updateIngredients() {
    servingsText.forEach((el) => {
      el.textContent = servings;
    });

    amounts.forEach((el) => {
      const newAmount = Number(el.dataset.amount) * servings / baseServings;
      const rounded = Math.round(newAmount * 10) / 10; // 1 decimal place
      el.textContent = (rounded + ' ' + el.dataset.unit).trim();
    });
  }

  document.querySelector('.servings-minus').addEventListener('click', () => {
    if (servings > 1) {
      servings--;
      updateIngredients();
    }
  });

  document.querySelector('.servings-plus').addEventListener('click', () => {
    if (servings < 20) {
      servings++;
      updateIngredients();
    }
  });
}

// Contact form validation
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#message');
  const charCount = document.querySelector('.char-count');
  const errorText = document.querySelector('.form-error');
  const thanks = document.querySelector('.form-thanks');

  // live character counter while typing
  messageInput.addEventListener('input', () => {
    const length = messageInput.value.trim().length;
    charCount.textContent = length + ' characters · more than 20 needed';
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    // check each field and show the first problem
    if (nameInput.value.trim() === '') {
      errorText.textContent = 'Please enter your name.';
      nameInput.focus();
      return;
    }

    if (!emailInput.validity.valid) {
      errorText.textContent = 'Please enter a valid email address.';
      emailInput.focus();
      return;
    }

    if (messageInput.value.trim().length <= 20) {
      errorText.textContent = 'Your message must be more than 20 characters.';
      messageInput.focus();
      return;
    }

    // hide the form and thank the user by name
    contactForm.classList.add('hidden');
    thanks.textContent = `Thank you, ${nameInput.value.trim()}! We've received your message.`;
    thanks.classList.remove('hidden');
  });
}
