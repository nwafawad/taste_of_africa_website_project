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
  button.textContent = isFav ? '♥' : '♡';
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

