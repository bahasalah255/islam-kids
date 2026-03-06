/* ===============================================
   IMMERSIVE SOUND SYSTEM
   Background music + interactive sound effects
   =============================================== */

class ImmersiveSound {
    constructor() {
        this.audioContext = null;
        this.backgroundOscillator = null;
        this.isPlaying = false;
        this.isMuted = localStorage.getItem('soundMuted') === 'true';
        this.volume = 0.15; // 15% pour pas que ce soit trop fort
        this.init();
    }

    init() {
        // Initialiser l'AudioContext à la première interaction
        document.addEventListener('click', () => this.initAudioContext(), { once: true });
        
        // Restaurer l'état mute
        this.updateMuteButton();
        
        // Écouter les clics sur le bouton mute
        const muteBtn = document.getElementById('muteBtn');
        if (muteBtn) {
            muteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMute();
            });
        }

        // Ajouter les écouteurs pour les effets sonores
        this.attachSoundEffects();

        console.log('🎵 Immersive Sound System initialized');
    }

    initAudioContext() {
        if (this.audioContext) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            if (!this.isMuted) {
                this.startBackgroundMusic();
            }
        } catch (e) {
            console.warn('⚠️ AudioContext not supported:', e);
        }
    }

    // ===============================================
    // BACKGROUND MUSIC - Mélodie orientale douce
    // ===============================================

    startBackgroundMusic() {
        if (this.isPlaying || !this.audioContext || this.isMuted) return;

        try {
            this.isPlaying = true;
            this.playBackgroundMelody();
        } catch (e) {
            console.error('❌ Error starting background music:', e);
        }
    }

    playBackgroundMelody() {
        if (!this.audioContext || this.isMuted) return;

        const ctx = this.audioContext;
        const now = ctx.currentTime;
        const noteDuration = 0.6; // Chaque note dure 0.6s
        const restDuration = 0.2; // Repos entre les notes

        // Mélodie orientale simple (notes en Hz)
        // Utilise une gamme pentatonique arabesque
        const melody = [
            { freq: 329.63, duration: noteDuration },      // E4
            { freq: 392.00, duration: noteDuration },      // G4
            { freq: 440.00, duration: noteDuration },      // A4
            { freq: 493.88, duration: noteDuration },      // B4
            { freq: 440.00, duration: noteDuration },      // A4
            { freq: 392.00, duration: noteDuration },      // G4
            { freq: 329.63, duration: noteDuration },      // E4
            { freq: 293.66, duration: noteDuration * 2 },  // D4 (double)
        ];

        const totalLoopDuration = melody.reduce((sum, note) => sum + note.duration + restDuration, 0);
        const startTime = now;

        const playMelodyLoop = () => {
            if (!this.isPlaying || !this.audioContext) return;

            let currentTime = now;

            melody.forEach((note) => {
                if (this.audioContext && this.isPlaying) {
                    this.playNote(note.freq, currentTime, note.duration, 0.1);
                }
                currentTime += note.duration + restDuration;
            });

            // Boucler après que le délai soit écoulé
            if (this.isPlaying) {
                setTimeout(() => playMelodyLoop(), totalLoopDuration * 1000);
            }
        };

        playMelodyLoop();
    }

    playNote(frequency, startTime, duration, volume = 0.1) {
        try {
            const ctx = this.audioContext;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine'; // Onde sinusoïdale pour un son doux
            osc.frequency.setValueAtTime(frequency, startTime);

            gain.gain.setValueAtTime(volume * this.volume, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration - 0.05);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + duration);
        } catch (e) {
            // Silencieusement ignorer si erreur
        }
    }

    stopBackgroundMusic() {
        this.isPlaying = false;
        if (this.backgroundOscillator) {
            try {
                this.backgroundOscillator.stop();
            } catch (e) {}
            this.backgroundOscillator = null;
        }
    }

    // ===============================================
    // SOUND EFFECTS
    // ===============================================

    playPopSound() {
        if (!this.audioContext || this.isMuted) return;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);

            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.1);
        } catch (e) {}
    }

    playTingSound() {
        if (!this.audioContext || this.isMuted) return;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.15);
        } catch (e) {}
    }

    playCheersSound() {
        if (!this.audioContext || this.isMuted) return;

        try {
            // 3 "pop" rapides pour applaudissements
            this.playPopSound();
            setTimeout(() => this.playPopSound(), 150);
            setTimeout(() => this.playPopSound(), 300);
            setTimeout(() => this.playTingSound(), 450);
        } catch (e) {}
    }

    playSuccessSound() {
        if (!this.audioContext || this.isMuted) return;

        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            
            // Petite mélodie de victoire
            const notes = [
                { freq: 523.25, duration: 0.15 }, // C5
                { freq: 659.25, duration: 0.15 }, // E5
                { freq: 783.99, duration: 0.3 },  // G5
            ];

            let time = now;
            notes.forEach((note) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.frequency.setValueAtTime(note.freq, time);
                gain.gain.setValueAtTime(0.15, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + note.duration);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(time);
                osc.stop(time + note.duration);

                time += note.duration + 0.05;
            });
        } catch (e) {}
    }

    // ===============================================
    // MUTE/UNMUTE
    // ===============================================

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('soundMuted', this.isMuted);

        if (this.isMuted) {
            this.stopBackgroundMusic();
            console.log('🔇 Sound muted');
        } else {
            if (this.audioContext) {
                this.startBackgroundMusic();
            }
            console.log('🔊 Sound unmuted');
        }

        this.updateMuteButton();
    }

    updateMuteButton() {
        const muteBtn = document.getElementById('muteBtn');
        if (!muteBtn) return;

        if (this.isMuted) {
            muteBtn.textContent = '🔇';
            muteBtn.classList.remove('sound-enabled');
            muteBtn.classList.add('sound-muted');
        } else {
            muteBtn.textContent = '🔊';
            muteBtn.classList.remove('sound-muted');
            muteBtn.classList.add('sound-enabled');
        }
    }

    // ===============================================
    // ATTACH SOUND EFFECTS TO ELEMENTS
    // ===============================================

    attachSoundEffects() {
        // Pop au clic sur les boutons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn, button, .nav-bubble-link, .activity-card, .quiz-card, .story-item');
            if (btn && e.target.id !== 'muteBtn') {
                this.playPopSound();
            }
        });

        // Ting au survol sur les cartes
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.activity-card, .quiz-card, .info-card, .story-item');
            if (card) {
                this.playTingSound();
            }
        }, true);

        // Success sound sur les quizz réussis (écouté par mystery-word.js)
        window.addEventListener('gameWon', () => {
            this.playSuccessSound();
        });

        // Cheers au complétion
        window.addEventListener('quizCompleted', () => {
            this.playCheersSound();
        });
    }
}

// Initialiser le système au chargement
document.addEventListener('DOMContentLoaded', () => {
    window.soundSystem = new ImmersiveSound();
});

// Fonction utilitaire pour déclencher les sons depuis d'autres scripts
window.playSound = {
    pop: () => window.soundSystem?.playPopSound(),
    ting: () => window.soundSystem?.playTingSound(),
    cheers: () => window.soundSystem?.playCheersSound(),
    success: () => window.soundSystem?.playSuccessSound(),
};
