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


const navbarNav = document.querySelector('.navbar-nav') || document.querySelector('.navbar');
if (navbarNav) navbarNav.appendChild(darkModeToggle);


if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️';
}


darkModeToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');

  e
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    darkModeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    darkModeToggle.textContent = '🌙';
  }
});


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


const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '⬆';
backToTopBtn.id = 'back-to-top';


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


document.body.appendChild(backToTopBtn);


window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});


backToTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}



const counters = document.querySelectorAll('.counter');

function animerCompteur(element) {
  const cible = parseInt(element.getAttribute('data-target'));
  const duree = 2000;
  const increment = cible / (duree / 16);
  let valeurActuelle = 0;

  const timer = setInterval(function () {
    valeurActuelle += increment;
    if (valeurActuelle >= cible) {
      element.textContent = '+' + cible.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = '+' + Math.floor(valeurActuelle).toLocaleString();
    }
  }, 16);
}

const observateurCompteur = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      animerCompteur(entry.target);
      observateurCompteur.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(function (counter) {
  observateurCompteur.observe(counter);
});



const sections = document.querySelectorAll('section');

sections.forEach(function (section) {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

const observateurSection = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observateurSection.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach(function (section) {
  observateurSection.observe(section);
});