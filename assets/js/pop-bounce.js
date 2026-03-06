/* ===============================================
   POP & BOUNCE JAVASCRIPT
   Scroll trigger animations
   =============================================== */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===============================================
    // INTERSECTION OBSERVER - Scroll Animations
    // ===============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Observer une seule fois
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments qui nécessitent une animation au scroll
    const animatedElements = document.querySelectorAll(
        '.activity-card, .quiz-card, .info-card, .story-item, ' +
        '.quiz-game-card, .moral-modern, .social-link, h2, h3'
    );

    animatedElements.forEach(el => {
        el.classList.add('pop-on-scroll');
        observer.observe(el);
    });

    // ===============================================
    // ENHANCED BOUNCE ON HOVER
    // ===============================================
    
    const interactiveElements = document.querySelectorAll(
        '.activity-card, .quiz-card, .quiz-game-card, .info-card, .story-item, .btn, button'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            // Ajouter un petit bounce au hover
            this.style.animation = 'none';
            // Forcer le reflow
            void this.offsetWidth;
            this.style.animation = 'hoverBounce 0.4s ease-in-out';
        });
    });

    // ===============================================
    // POP EFFECT ON PAGE LOAD
    // ===============================================
    
    // Ajouter une légère animation même pour les éléments visibles au chargement
    const visibleElements = document.querySelectorAll(
        '.hero-section, .navbar-bubble, h1'
    );

    let delay = 0;
    visibleElements.forEach(el => {
        if (!el.style.animationDelay) {
            el.style.animationDelay = delay + 's';
            delay += 0.1;
        }
    });

    // ===============================================
    // SOUND EFFECT (Optional)
    // ===============================================
    
    // Créer un petit son "pop" au click des boutons (compatible WebAudio)
    function createPopSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);

            gain.gain.setValueAtTime(0.1, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // AudioContext pas disponible, silencieux
        }
    }

    // Ajouter le son aux boutons
    document.querySelectorAll('.btn, button').forEach(btn => {
        btn.addEventListener('click', function() {
            createPopSound();
        });
    });

    // ===============================================
    // STAGGER ANIMATION DELAY CALCULATOR
    // ===============================================
    
    function addStaggerDelays(containerSelector, childSelector) {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
            const children = container.querySelectorAll(childSelector);
            children.forEach((child, index) => {
                child.style.setProperty('--stagger-index', index);
            });
        });
    }

    // Appliquer aux différents conteneurs
    addStaggerDelays('.row', '.col-md-4');
    addStaggerDelays('.row', '.col-lg-6');
    addStaggerDelays('.activities-container', '.activity-card');

    console.log('✨ Pop & Bounce animations initialized!');
});

// ===============================================
// REINITIALIZE ANIMATIONS AFTER DYNAMIC CONTENT
// ===============================================

function reinitializePopBounceAnimations() {
    const animatedElements = document.querySelectorAll(
        '.activity-card:not(.pop-on-scroll), ' +
        '.quiz-card:not(.pop-on-scroll), ' +
        '.info-card:not(.pop-on-scroll)'
    );

    animatedElements.forEach(el => {
        el.classList.add('pop-on-scroll');
    });

    console.log('🎉 Pop & Bounce animations reinitialized!');
}
