/* 
   COMMIT 6 — Dark Mode, Navbar dynamique, Bouton retour en haut
   */

/* 
   1. DARK MODE / LIGHT MODE
   Sauvegardé dans localStorage pour persister entre les pages
   */

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

// Au clic sur le bouton, on bascule entre dark et light mode
darkModeToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');

  // On sauvegarde le choix dans localStorage pour le conserver entre les pages
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    darkModeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    darkModeToggle.textContent = '🌙';
  }
});

/*
   2. NAVBAR DYNAMIQUE AU SCROLL
   La navbar change de style quand on scroll vers le bas*/

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

/* 
   3. BOUTON RETOUR EN HAUT
   Apparaît quand on scroll vers le bas, remonte en douceur
   */

// On crée le bouton dynamiquement en JavaScript
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '⬆';
backToTopBtn.id = 'back-to-top';

// Style du bouton retour en haut
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

// Au clic, on remonte en douceur vers le haut de la page
backToTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* 
   ANNÉE DYNAMIQUE DANS LE FOOTER
   Affiche l'année courante automatiquement
 */
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* ============================================
   COMMIT 7 — Compteurs animés et animations fade-in
   ============================================ */

/* ============================================
   4. COMPTEURS ANIMÉS AU SCROLL
   Les chiffres s'animent de 0 à leur valeur cible
   On utilise IntersectionObserver pour détecter l'entrée dans le viewport
   ============================================ */

// On sélectionne tous les éléments avec la classe "counter"
const counters = document.querySelectorAll('.counter');

// Fonction qui anime un compteur de 0 jusqu'à sa valeur cible
function animerCompteur(element) {
  const cible = parseInt(element.getAttribute('data-target'));
  const duree = 2000; // durée totale de l'animation en millisecondes
  const increment = cible / (duree / 16); // incrément par frame (60fps)
  let valeurActuelle = 0;

  const timer = setInterval(function () {
    valeurActuelle += increment;
    if (valeurActuelle >= cible) {
      // On arrête quand on atteint la valeur cible
      element.textContent = '+' + cible.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = '+' + Math.floor(valeurActuelle).toLocaleString();
    }
  }, 16);
}

// IntersectionObserver : déclenche l'animation quand le compteur entre dans le viewport
const observateurCompteur = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      animerCompteur(entry.target);
      // On arrête d'observer après l'animation pour ne pas la rejouer
      observateurCompteur.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// On observe chaque compteur
counters.forEach(function (counter) {
  observateurCompteur.observe(counter);
});

/* ============================================
   5. ANIMATIONS FADE-IN AU SCROLL
   Les sections apparaissent en fondu quand elles entrent dans le viewport
   ============================================ */

// On sélectionne toutes les sections à animer
const sections = document.querySelectorAll('section');

// On cache toutes les sections au départ
sections.forEach(function (section) {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

// IntersectionObserver : déclenche le fade-in quand la section entre dans le viewport
const observateurSection = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observateurSection.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// On observe chaque section
sections.forEach(function (section) {
  observateurSection.observe(section);
});

/* ============================================
   COMMIT 8 — Filtrage freelances et validation formulaire
   ============================================ */

/* ============================================
   6. FILTRAGE DYNAMIQUE DES FREELANCES
   Les cartes se filtrent par catégorie sans rechargement de page
   ============================================ */

const sectionFreelances = document.querySelector('.container.text-center');

if (sectionFreelances) {
  const filtreDiv = document.createElement('div');
  filtreDiv.style.cssText = 'margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;';

  // Liste des catégories de filtres
  const categories = ['Tous', 'Développement', 'Design', 'Marketing', 'Rédaction', 'Traduction', 'Mobile'];

  categories.forEach(function (cat) {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.setAttribute('data-filtre', cat);
    btn.style.cssText = `
      padding: 0.4rem 1rem;
      border: 2px solid #76bff0eb;
      background: white;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    `;

    btn.addEventListener('click', function () {
      // On remet tous les boutons en style normal
      filtreDiv.querySelectorAll('button').forEach(function (b) {
        b.style.background = 'white';
        b.style.color = '#333';
      });

      // On met en surbrillance le bouton actif
      btn.style.background = '#76bff0eb';
      btn.style.color = 'white';

      const filtre = btn.getAttribute('data-filtre');
      const cartes = document.querySelectorAll('.card');

      cartes.forEach(function (carte) {
        const texte = carte.textContent.toLowerCase();

        if (filtre === 'Tous') {
          carte.closest('.col-md-4') && (carte.closest('.col-md-4').style.display = 'block');
        } else {
          // Mots-clés associés à chaque catégorie
          const motsClés = {
            'Développement': ['développeu', 'backend', 'frontend', 'full stack', 'react', 'node'],
            'Design': ['design', 'ui', 'ux'],
            'Marketing': ['marketing', 'community', 'réseaux sociaux'],
            'Rédaction': ['rédacteur', 'rédaction', 'seo', 'contenu'],
            'Traduction': ['traducteur', 'traduction', 'anglais'],
            'Mobile': ['mobile', 'android', 'ios']
          };

          const mots = motsClés[filtre] || [];
          const correspond = mots.some(function (mot) {
            return texte.includes(mot);
          });

          if (carte.closest('.col-md-4')) {
            carte.closest('.col-md-4').style.display = correspond ? 'block' : 'none';
          }
        }
      });
    });

    filtreDiv.appendChild(btn);
  });

  sectionFreelances.insertBefore(filtreDiv, sectionFreelances.firstChild);
}

/* ============================================
   7. VALIDATION DU FORMULAIRE DE CONTACT
   Validation complète avec messages d'erreur personnalisés
   ============================================ */

const formulaire = document.querySelector('section form');

if (formulaire) {

  // Fonction pour afficher un message d'erreur sous un champ
  function afficherErreur(input, message) {
    const erreurExistante = input.parentNode.querySelector('.erreur-msg');
    if (erreurExistante) erreurExistante.remove();

    const erreur = document.createElement('div');
    erreur.className = 'erreur-msg';
    erreur.textContent = message;
    erreur.style.cssText = 'color: red; font-size: 0.85rem; margin-top: 4px;';

    // Bordure rouge sur le champ invalide
    input.style.borderColor = 'red';
    input.parentNode.appendChild(erreur);
  }

  // Fonction pour marquer un champ comme valide
  function afficherSucces(input) {
    const erreurExistante = input.parentNode.querySelector('.erreur-msg');
    if (erreurExistante) erreurExistante.remove();
    // Bordure verte sur le champ valide
    input.style.borderColor = 'green';
  }

  const boutonEnvoyer = formulaire.querySelector('button');

  boutonEnvoyer.addEventListener('click', function (e) {
    e.preventDefault(); // On empêche l'envoi réel du formulaire

    let valide = true;

    // Récupération des champs
    const nom = formulaire.querySelectorAll('input[type="text"]')[0];
    const prenom = formulaire.querySelectorAll('input[type="text"]')[1];
    const email = formulaire.querySelector('input[type="email"]');
    const sujet = formulaire.querySelector('select');
    const message = formulaire.querySelector('textarea');

    // Validation Nom
    if (!nom.value.trim()) {
      afficherErreur(nom, 'Le nom est obligatoire.');
      valide = false;
    } else {
      afficherSucces(nom);
    }

    // Validation Prénom
    if (!prenom.value.trim()) {
      afficherErreur(prenom, 'Le prénom est obligatoire.');
      valide = false;
    } else {
      afficherSucces(prenom);
    }

    // Validation Email avec regex
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      afficherErreur(email, 'L\'email est obligatoire.');
      valide = false;
    } else if (!regexEmail.test(email.value)) {
      afficherErreur(email, 'Format d\'email invalide.');
      valide = false;
    } else {
      afficherSucces(email);
    }

    // Validation Sujet
    if (sujet.value === '-- Choisir un sujet --') {
      afficherErreur(sujet, 'Veuillez choisir un sujet.');
      valide = false;
    } else {
      afficherSucces(sujet);
    }

    // Validation Message (minimum 20 caractères)
    if (!message.value.trim()) {
      afficherErreur(message, 'Le message est obligatoire.');
      valide = false;
    } else if (message.value.trim().length < 20) {
      afficherErreur(message, 'Le message doit contenir au moins 20 caractères.');
      valide = false;
    } else {
      afficherSucces(message);
    }

    // Si tout est valide : message de succès
    if (valide) {
      const succesExistant = formulaire.querySelector('.succes-msg');
      if (succesExistant) succesExistant.remove();

      const succes = document.createElement('div');
      succes.className = 'succes-msg';
      succes.textContent = '✅ Votre message a bien été envoyé ! Nous vous répondrons sous 24h.';
      succes.style.cssText = `
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
        font-weight: 600;
      `;

      formulaire.appendChild(succes);

      // On vide le formulaire après soumission réussie
      formulaire.reset();
    }
  });
}