// ===================================
// MENU MOBILE TOGGLE
// ===================================
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}

// Chiudi menu quando si clicca fuori
document.addEventListener('click', function(e) {
    const menu = document.getElementById('menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (menu && hamburger && !menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove('open');
    }
});

// ===================================
// FADE-IN ANIMATION ON SCROLL
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// ===================================
// SMOOTH SCROLL PER I LINK INTERNI
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 6px 30px rgba(0,0,0,0.25)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// PARALLAX EFFECT HERO (se presente)
// ===================================
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// ===================================
// COUNTER ANIMATION (per statistiche)
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(counter);
        } else {
            element.textContent = Math.ceil(start);
        }
    }, 16);
}

// Attiva i counter quando sono visibili
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===================================
// FORM VALIDATION (per contatti.html)
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const messaggio = document.getElementById('messaggio').value.trim();
        const msg = document.getElementById('formMessage');

        // Reset messaggio
        msg.textContent = '';

        // Validazioni
        if (nome.length < 2) {
            showMessage('Inserisci un nome valido.', 'error');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            showMessage('Inserisci un\'email valida.', 'error');
            return;
        }

        if (telefono.length < 7) {
            showMessage('Inserisci un numero di telefono valido.', 'error');
            return;
        }

        if (messaggio.length < 10) {
            showMessage('Il messaggio è troppo breve.', 'error');
            return;
        }

        // Successo
        showMessage('✓ Messaggio inviato con successo!', 'success');
        contactForm.reset();

        // Simula invio email (qui potresti integrare un backend)
        console.log('Form inviato:', { nome, email, telefono, messaggio });
    });
}

function showMessage(text, type) {
    const msg = document.getElementById('formMessage');
    msg.textContent = text;
    msg.style.color = type === 'error' ? '#d63447' : '#28a745';
    msg.style.fontWeight = 'bold';
    msg.style.animation = 'fadeIn 0.3s ease';
}

// ===================================
// LOADING LAZY IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// CARD HOVER 3D EFFECT
// ===================================
document.querySelectorAll('.service-card, .testimonial').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
function createScrollToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'scroll-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 25px;
        background: linear-gradient(135deg, #d63447 0%, #a14040 100%);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(214, 52, 71, 0.4);
        z-index: 998;
        pointer-events: none;
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        } else {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

createScrollToTop();

// ===================================
// TYPED EFFECT (opzionale per hero)
// ===================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Esempio di utilizzo:
// const heroTitle = document.querySelector('.hero h1');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 30);
// }

// ===================================
// PARTICLES BACKGROUND (opzionale)
// ===================================
function createParticles(container) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
        `;
        container.appendChild(particle);
    }
}

// Aggiungi questo CSS per l'animazione:
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c🔥 WeN Assistenza Caldaie', 'color: #d63447; font-size: 24px; font-weight: bold;');
console.log('%cSito sviluppato con ❤️', 'color: #666; font-size: 14px;');
console.log('%cTelefono: 0422 821309', 'color: #d63447; font-size: 14px; font-weight: bold;');

// ===================================
// PERFORMANCE MONITORING
// ===================================
window.addEventListener('load', () => {
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`⚡ Pagina caricata in ${loadTime}ms`);
    }
});