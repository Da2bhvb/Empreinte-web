// ========== MENU BURGER ==========
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    // Icône burger / fermeture
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

menuToggle.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Fermer le menu si clic à l'extérieur (optionnel)
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu();
    }
});

// ========== SCROLL FLUIDE ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#" || href === "") return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // hauteur du header fixe
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== MODALE PORTFOLIO ==========
const modal = document.getElementById('portfolioModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

// Données des projets (à enrichir selon vos besoins)
const projectsData = {
    1: {
        title: "Identité visuelle – Startup Tech",
        description: "Création complète de l'identité de marque : logo, charte graphique, typographie, palette de couleurs. Une identité moderne et percutante qui a permis à la startup de lever 2M€.",
        image: "https://placehold.co/600x400/2c3e50/ffffff?text=Branding"
    },
    2: {
        title: "Campagne Instagram",
        description: "Stratégie de contenu et publicités Instagram : +340% d'engagement, +120% de nouveaux abonnés en 3 mois. Création de templates et gestion daily.",
        image: "https://placehold.co/600x400/34495e/ffffff?text=Instagram+Campaign"
    },
    3: {
        title: "Refonte e-commerce",
        description: "Refonte technique et UX d'un site e-commerce. Optimisation SEO, architecture de l'information, augmentation des conversions de 150% en 6 mois.",
        image: "https://placehold.co/600x400/1abc9c/ffffff?text=E-commerce"
    }
};

// Ajouter l'événement sur chaque bouton "Voir plus"
const viewButtons = document.querySelectorAll('.btn-view');
viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.getAttribute('data-id');
        const project = projectsData[projectId];
        if (project) {
            modalBody.innerHTML = `
                <h2>${project.title}</h2>
                <img src="${project.image}" alt="${project.title}" style="width:100%; border-radius:12px; margin:1rem 0;">
                <p>${project.description}</p>
            `;
            modal.style.display = 'flex';
        }
    });
});

// Fermer la modale
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ========== CARROUSEL TÉMOIGNAGES ==========
const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;
const slides = document.querySelectorAll('.testimonial-card');
const totalSlides = slides.length;

// Créer les dots
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx === currentIndex) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}
function prevSlide() {
    goToSlide(currentIndex - 1);
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Initialisation du carrousel
if (totalSlides > 0) {
    track.style.display = 'flex';
    track.style.transition = 'transform 0.5s ease';
    slides.forEach(slide => {
        slide.style.flex = '0 0 100%';
    });
    createDots();
}

// ========== VALIDATION FORMULAIRE CONTACT ==========
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Réinitialiser le message
    formFeedback.innerHTML = '';
    formFeedback.style.color = 'red';

    if (name === '') {
        formFeedback.innerHTML = 'Veuillez entrer votre nom complet.';
        return;
    }
    if (email === '' || !/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) {
        formFeedback.innerHTML = 'Veuillez entrer un email valide.';
        return;
    }
    if (message === '') {
        formFeedback.innerHTML = 'Veuillez écrire votre message.';
        return;
    }

    // Simulation d'envoi réussi
    formFeedback.style.color = 'green';
    formFeedback.innerHTML = '✓ Message envoyé ! Nous vous répondrons sous 24h.';
    contactForm.reset();
    // Optionnel : vider après 5 secondes
    setTimeout(() => {
        if (formFeedback.innerHTML === '✓ Message envoyé ! Nous vous répondrons sous 24h.') {
            formFeedback.innerHTML = '';
        }
    }, 5000);
});

// ========== GESTION DU THÈME CLAIR/SOMBRE ==========
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Charger le thème sauvegardé ou appliquer la préférence système
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon('dark');
} else if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    updateThemeIcon('light');
} else if (prefersDarkScheme.matches) {
    document.body.classList.add('dark-mode');
    updateThemeIcon('dark');
} else {
    document.body.classList.remove('dark-mode');
    updateThemeIcon('light');
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    }
}

themeToggle.addEventListener('click', toggleTheme);

// ========== ANIMATION AU SCROLL (FADE-IN) ==========
const sections = document.querySelectorAll('.section, .hero');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, { threshold: 0.1 });

// Ajout des classes CSS pour l'animation
const style = document.createElement('style');
style.textContent = `
    .section, .hero {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .fade-in-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

sections.forEach(section => {
    observer.observe(section);
});

// ========== INITIALISATION (s'assurer que la modale est masquée) ==========
modal.style.display = 'none';