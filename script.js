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
