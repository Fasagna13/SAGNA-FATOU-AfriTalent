

// On crée le bouton dark mode en JavaScript et on l'ajoute dans la navbar
const darkModeToggle = document.createElement('button');
darkModeToggle.id = 'dark-mode-toggle';
darkModeToggle.textContent = '🌙';
darkModeToggle.style.cssText = `
  background: transparent;
  border: 1px solid white;
  color: white;
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 1rem;
`;

// On l'insère dans la navbar
const navbarNav = document.querySelector('.navbar-nav') || document.querySelector('.navbar');
if (navbarNav) navbarNav.appendChild(darkModeToggle);

// On vérifie si l'utilisateur avait déjà choisi le dark mode
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️';
}

// Au clic sur le bouton, on bascule le mode
darkModeToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');

  // On sauvegarde le choix dans localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    darkModeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    darkModeToggle.textContent = '🌙';
  }
});

/* ============================================
   2. NAVBAR DYNAMIQUE AU SCROLL
   La navbar change de style quand on scroll vers le bas
   ============================================ */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    // Quand on scroll : ombre plus forte + padding réduit (effet shrink)
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    navbar.style.padding = '0.3rem 2rem';
  } else {
    // En haut de page : style normal
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    navbar.style.padding = '1rem 2rem';
  }
});

/* ============================================
   3. BOUTON RETOUR EN HAUT
   Apparaît quand on scroll vers le bas, remonte en douceur
   ============================================ */

// On crée le bouton dynamiquement en JavaScript
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '⬆';
backToTopBtn.id = 'back-to-top';

// Style du bouton
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #76bff0eb;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.3rem;
  cursor: pointer;
  display: none;
  z-index: 999;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: opacity 0.3s ease;
`;

// On ajoute le bouton à la page
document.body.appendChild(backToTopBtn);

// On affiche ou cache le bouton selon la position du scroll
window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Au clic, on remonte en douceur
backToTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* ============================================
   ANNÉE DYNAMIQUE DANS LE FOOTER
   ============================================ */
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}