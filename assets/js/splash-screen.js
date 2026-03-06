/* ===============================================
   SPLASH SCREEN - Contrôle du Splash
   =============================================== */

function initSplashScreen() {
    // Créer le splash screen HTML
    const splashHTML = `
        <div class="splash-screen" id="splashScreen">
            <div class="splash-stars" id="splashStars"></div>
            
            <div class="splash-content">
                <!-- Mascotte dansante -->
                <div class="splash-mascot">😺</div>
                
                <!-- Bulle de dialogue -->
                <div class="splash-dialog">
                    <h2>Salam ! 👋</h2>
                    <p>Bienvenue dans le Ramadan Kids Corner !</p>
                </div>
                
                <!-- Boutons -->
                <div class="splash-buttons">
                    <button class="splash-btn splash-btn-primary" onclick="closeSplash()">
                        🚀 Commencer
                    </button>
                </div>
            </div>
        </div>
    `;

    // Injecter le splash au début du body
    document.body.insertAdjacentHTML('afterbegin', splashHTML);

    // Générer les étoiles
    generateStars();

    // Générer les confettis
    generateConfetti();

    // Fermer automatiquement après 3.5 secondes
    setTimeout(() => {
        closeSplash();
    }, 3500);
}

// Générer les étoiles
function generateStars() {
    const starsContainer = document.getElementById('splashStars');
    if (!starsContainer) return;

    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'splash-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 1.5 + 's';
        starsContainer.appendChild(star);
    }
}

// Générer les confettis
function generateConfetti() {
    const splash = document.getElementById('splashScreen');
    if (!splash) return;

    const colors = ['', 'pink', 'green', 'purple'];
    
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = `splash-confetti ${colors[Math.floor(Math.random() * colors.length)]}`;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = Math.random() * 20 - 20 + 'px';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (2.5 + Math.random() * 1) + 's';
        splash.appendChild(confetti);
    }
}

// Fermer le splash screen
function closeSplash() {
    const splash = document.getElementById('splashScreen');
    if (splash) {
        splash.style.animation = 'splashFadeOut 0.6s ease-in forwards';
        setTimeout(() => {
            splash.remove();
        }, 600);
    }
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si c'est la première visite (optionnel)
    if (!sessionStorage.getItem('splashShown')) {
        initSplashScreen();
        sessionStorage.setItem('splashShown', 'true');
    }
});
