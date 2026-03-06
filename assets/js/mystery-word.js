/* ================================================
   MYSTERY WORD GAME - Mot Mystère
   Educational Game for Ramadan Kids
   ================================================ */

const misteryWordGame = {
    // Word Bank avec catégories et indices
    wordBank: [
        {
            word: "RAMADAN",
            category: "Mois Sacré",
            hint: "Le mois le plus important pour les musulmans",
            hints: ["C'est un mois du calendrier lunaire", "On jeûne pendant ce mois", "C'est le 9ème mois"]
        },
        {
            word: "JEUNE",
            category: "Adoration",
            hint: "On le fait pendant le Ramadan",
            hints: ["C'est une forme de piété", "On s'abstient de manger et de boire", "C'est l'un des 5 piliers"]
        },
        {
            word: "PRIERE",
            category: "Rituel",
            hint: "Communication avec Allah",
            hints: ["On la fait 5 fois par jour", "C'est l'un des 5 piliers de l'Islam", "On doit se tourner vers La Mecque"]
        },
        {
            word: "KAABA",
            category: "Lieu Saint",
            hint: "Bâtiment sacré à La Mecque",
            hints: ["C'est un cube noir", "Les musulmans le contournent en pèlerinage", "C'est le centre du Hajj"]
        },
        {
            word: "CORAN",
            category: "Livre Sacré",
            hint: "Livre révélé par Allah",
            hints: ["C'est le livre saint", "Divisé en 114 sourates", "Récité pendant le Ramadan"]
        },
        {
            word: "PROPHETE",
            category: "Messager",
            hint: "Messager d'Allah",
            hints: ["Muhammad est le dernier", "Ils transmettaient le message d'Allah", "Il y en a 25 nommés dans le Coran"]
        },
        {
            word: "ZAKAT",
            category: "Obligation",
            hint: "Aumône obligatoire",
            hints: ["C'est l'un des 5 piliers", "On la donne aux pauvres", "C'est 2,5% de son argent"]
        },
        {
            word: "MOSQUE",
            category: "Lieu de Culte",
            hint: "Maison de la prière",
            hints: ["On y va pour prier", "Le vendredi s'y réunit la communauté", "Elle a une minaret ou dôme"]
        },
        {
            word: "FATWA",
            category: "Avis Religieux",
            hint: "Avis juridique en Islam",
            hints: ["C'est une décision d'un savant", "Elle concerne les questions religieuses", "Elle guide les croyants"]
        },
        {
            word: "HIJRA",
            category: "Histoire",
            hint: "Migration du Prophète",
            hints: ["C'est l'année 1 en calendrier musulman", "Muhammad a quitté La Mecque", "Il s'est exilé à Médine"]
        }
    ],

    // État du jeu
    currentWord: null,
    guessedLetters: [],
    wrongGuesses: [],
    hintsUsed: 0,
    maxHints: 3,
    attempts: 0,
    maxAttempts: 6,
    score: 0,
    gameOver: false,

    // Initialiser le jeu
    init: function() {
        this.newGame();
    },

    // Commencer un nouveau mot
    newGame: function() {
        this.currentWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        this.guessedLetters = [];
        this.wrongGuesses = [];
        this.hintsUsed = 0;
        this.attempts = 0;
        this.gameOver = false;
        
        document.getElementById('mysteryResult').style.display = 'none';
        
        this.render();
        this.createKeyboard();
    },

    // Deviner une lettre
    guessLetter: function(letter) {
        if (this.gameOver || this.guessedLetters.includes(letter) || this.wrongGuesses.includes(letter)) {
            return;
        }

        const word = this.currentWord.word.toUpperCase();
        const btn = event.target;

        if (word.includes(letter)) {
            this.guessedLetters.push(letter);
            btn.disabled = true;
            btn.style.opacity = '0.6';
            this.score += 10;
        } else {
            this.wrongGuesses.push(letter);
            this.attempts++;
            btn.classList.add('wrong');
            setTimeout(() => {
                btn.disabled = true;
                btn.style.opacity = '0.3';
            }, 200);
            this.score = Math.max(0, this.score - 5);
        }

        // Vérifier si gagné/perdu
        this.checkGameState();
        this.render();
    },

    // Utiliser un indice
    useHint: function() {
        if (this.hintsUsed >= this.maxHints || this.gameOver) return;

        const word = this.currentWord.word.toUpperCase();
        const availableLetters = word.split('').filter(l => !this.guessedLetters.includes(l) && !this.wrongGuesses.includes(l));

        if (availableLetters.length > 0) {
            const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
            this.guessedLetters.push(randomLetter);
            this.hintsUsed++;
            this.score = Math.max(0, this.score - 15);
            this.checkGameState();
            this.render();
        }
    },

    // Vérifier l'état du jeu
    checkGameState: function() {
        const word = this.currentWord.word.toUpperCase();
        const isWon = word.split('').every(l => this.guessedLetters.includes(l));
        const isLost = this.attempts >= this.maxAttempts;

        if (isWon) {
            this.gameOver = true;
            this.showResult(true);
        } else if (isLost) {
            this.gameOver = true;
            this.showResult(false);
        }
    },

    // Afficher le résultat
    showResult: function(won) {
        const resultDiv = document.getElementById('mysteryResult');
        const resultIcon = document.getElementById('resultIcon');
        const resultText = document.getElementById('resultText');
        const resultMessage = document.getElementById('resultMessage');

        if (won) {
            resultIcon.textContent = '🎉';
            resultText.textContent = 'Bravo !';
            resultMessage.textContent = `Tu as deviné le mot "${this.currentWord.word}" ! Points: ${this.score}`;
                   // Déclencher le son de victoire
                   if (window.playSound) {
                       window.playSound.success();
                   }
                   // Dispatcher un événement pour les extensions
                   window.dispatchEvent(new Event('gameWon'));
        } else {
            resultIcon.textContent = '😢';
            resultText.textContent = 'Perdu !';
            resultMessage.textContent = `Le mot était "${this.currentWord.word}". Réessaye !`;
        }

        resultDiv.style.display = 'flex';
        resultDiv.classList.add('show');
    },

    // Rendre le jeu
    render: function() {
        const word = this.currentWord.word.toUpperCase();
        const wordDisplay = word.split('').map(letter => {
            if (this.guessedLetters.includes(letter)) {
                return `<div class="mystery-letter revealed">${letter}</div>`;
            } else {
                return `<div class="mystery-letter"></div>`;
            }
        }).join('');

        document.getElementById('mysteryWord').innerHTML = wordDisplay;
        document.getElementById('hintText').textContent = `💡 Catégorie: ${this.currentWord.category}`;
        document.getElementById('mysterAttempts').textContent = `${this.maxAttempts - this.attempts}/${this.maxAttempts}`;
        document.getElementById('mysteryHints').textContent = `${this.maxHints - this.hintsUsed}/${this.maxHints}`;
        document.getElementById('mysteryScore').textContent = this.score;

        // Désactiver le bouton Indice si plus d'indices disponibles
        const hintBtn = document.getElementById('hintBtn');
        if (this.hintsUsed >= this.maxHints || this.gameOver) {
            hintBtn.disabled = true;
            hintBtn.style.opacity = '0.5';
        } else {
            hintBtn.disabled = false;
            hintBtn.style.opacity = '1';
        }
    },

    // Créer le clavier
    createKeyboard: function() {
        const keyboard = document.getElementById('mysterKeyboard');
        keyboard.innerHTML = '';
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        alphabet.forEach(letter => {
            const btn = document.createElement('button');
            btn.className = 'keyboard-btn';
            btn.textContent = letter;
            btn.onclick = () => this.guessLetter(letter);
            keyboard.appendChild(btn);
        });
    }
};

// Initialiser le jeu au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('mysteryWord')) {
        misteryWordGame.init();
    }
});
