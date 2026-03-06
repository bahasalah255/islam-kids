/**
 * Ramadan Kids Corner - Educational Games
 * Mini-games alternative to classic QCM
 */

class EducationalGames {
    constructor() {
        this.score = 0;
        this.trueFalseIndex = 0;
        this.trueFalseScore = 0;
        this.wordScore = 0;
        this.locked = false;

        this.trueFalseQuestions = [
            { question: "Le Ramadan dure 29 ou 30 jours.", answer: true },
            { question: "On rompt le jeûne d'abord avec des bonbons.", answer: false },
            { question: "La générosité est importante pendant le Ramadan.", answer: true },
            { question: "Le suhoor se prend après l'iftar.", answer: false },
            { question: "Le jeûne aide à apprendre la patience.", answer: true }
        ];

        this.wordBank = [
            { word: "RAMADAN", hint: "Le mois sacré des musulmans" },
            { word: "IFTAR", hint: "Repas pour rompre le jeûne" },
            { word: "SUHOOR", hint: "Repas avant l'aube" },
            { word: "LANTERNE", hint: "Objet lumineux décoratif" },
            { word: "PARTAGE", hint: "Valeur essentielle avec la famille" }
        ];
    }

    startGame(type) {
        const arena = document.getElementById('gameArena');
        const content = document.getElementById('gameContent');
        const title = document.getElementById('gameTitle');

        if (!arena || !content || !title) {
            return;
        }

        arena.style.display = 'block';
        arena.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (type === 'memory') {
            title.textContent = '🧠 Mémoire Express';
            this.renderMemoryGame();
        } else if (type === 'trueFalse') {
            title.textContent = '⚡ Vrai / Faux Flash';
            this.trueFalseIndex = 0;
            this.trueFalseScore = 0;
            this.renderTrueFalseGame();
        } else if (type === 'word') {
            title.textContent = '🔤 Mot Mystère';
            this.wordScore = 0;
            this.renderWordGame();
        }
    }

    closeArena() {
        const arena = document.getElementById('gameArena');
        const content = document.getElementById('gameContent');
        if (!arena || !content) {
            return;
        }
        arena.style.display = 'none';
        content.innerHTML = '';
        this.updateScore('Score: 0');
    }

    updateScore(text) {
        const scoreElement = document.getElementById('gameScore');
        if (scoreElement) {
            scoreElement.textContent = text;
        }
    }

    renderMemoryGame() {
        const content = document.getElementById('gameContent');
        if (!content) {
            return;
        }

        const symbols = ['🌙', '⭐', '🕌'];
        const deck = [...symbols, ...symbols]
            .sort(() => Math.random() - 0.5)
            .map((symbol, index) => ({ id: index, symbol, revealed: false, matched: false }));

        let firstPick = null;
        let secondPick = null;
        let matches = 0;
        let attempts = 0;
        this.locked = false;

        content.innerHTML = `
            <p class="mb-3" style="color:#B0C4DE;">Trouve les 3 paires d'icônes.</p>
            <div class="memory-grid">
                ${deck.map(card => `
                    <button class="memory-card" data-id="${card.id}" aria-label="Carte mémoire">${card.symbol}</button>
                `).join('')}
            </div>
        `;

        this.updateScore('Paires: 0/3 | Tentatives: 0');

        content.querySelectorAll('.memory-card').forEach((button) => {
            button.addEventListener('click', () => {
                if (this.locked) {
                    return;
                }

                const index = Number(button.dataset.id);
                const card = deck[index];
                if (card.matched || card.revealed) {
                    return;
                }

                card.revealed = true;
                button.classList.add('revealed');

                if (firstPick === null) {
                    firstPick = index;
                    return;
                }

                secondPick = index;
                attempts += 1;
                this.locked = true;

                const firstCard = deck[firstPick];
                const secondCard = deck[secondPick];

                if (firstCard.symbol === secondCard.symbol) {
                    firstCard.matched = true;
                    secondCard.matched = true;
                    matches += 1;

                    content.querySelector(`.memory-card[data-id="${firstPick}"]`).classList.add('matched');
                    content.querySelector(`.memory-card[data-id="${secondPick}"]`).classList.add('matched');

                    firstPick = null;
                    secondPick = null;
                    this.locked = false;

                    this.updateScore(`Paires: ${matches}/3 | Tentatives: ${attempts}`);

                    if (matches === 3) {
                        this.updateScore(`Bravo ! 3/3 paires en ${attempts} tentatives`);
                    }
                    return;
                }

                this.updateScore(`Paires: ${matches}/3 | Tentatives: ${attempts}`);

                setTimeout(() => {
                    firstCard.revealed = false;
                    secondCard.revealed = false;

                    content.querySelector(`.memory-card[data-id="${firstPick}"]`).classList.remove('revealed');
                    content.querySelector(`.memory-card[data-id="${secondPick}"]`).classList.remove('revealed');

                    firstPick = null;
                    secondPick = null;
                    this.locked = false;
                }, 700);
            });
        });
    }

    renderTrueFalseGame() {
        const content = document.getElementById('gameContent');
        if (!content) {
            return;
        }

        if (this.trueFalseIndex >= this.trueFalseQuestions.length) {
            content.innerHTML = `
                <div class="tf-feedback">✅ Fin du jeu ! Tu as obtenu <strong>${this.trueFalseScore}/${this.trueFalseQuestions.length}</strong>.</div>
                <button class="btn btn-primary mt-3" onclick="educationalGames.startGame('trueFalse')">Rejouer</button>
            `;
            this.updateScore(`Score final: ${this.trueFalseScore}/${this.trueFalseQuestions.length}`);
            return;
        }

        const current = this.trueFalseQuestions[this.trueFalseIndex];

        content.innerHTML = `
            <div class="tf-question">${this.trueFalseIndex + 1}. ${current.question}</div>
            <div class="tf-actions">
                <button class="btn btn-success" id="tfTrueBtn">Vrai</button>
                <button class="btn btn-danger" id="tfFalseBtn">Faux</button>
            </div>
            <div class="tf-feedback" id="tfFeedback"></div>
        `;

        this.updateScore(`Question ${this.trueFalseIndex + 1}/${this.trueFalseQuestions.length} | Score: ${this.trueFalseScore}`);

        const handleAnswer = (answer) => {
            const feedback = document.getElementById('tfFeedback');
            const isCorrect = answer === current.answer;

            if (isCorrect) {
                this.trueFalseScore += 1;
                feedback.textContent = '🎉 Bonne réponse !';
            } else {
                feedback.textContent = '❌ Oups, essaie la prochaine !';
            }

            document.getElementById('tfTrueBtn').disabled = true;
            document.getElementById('tfFalseBtn').disabled = true;

            setTimeout(() => {
                this.trueFalseIndex += 1;
                this.renderTrueFalseGame();
            }, 700);
        };

        document.getElementById('tfTrueBtn').addEventListener('click', () => handleAnswer(true));
        document.getElementById('tfFalseBtn').addEventListener('click', () => handleAnswer(false));
    }

    renderWordGame() {
        const content = document.getElementById('gameContent');
        if (!content) {
            return;
        }

        const item = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        const scrambled = item.word.split('').sort(() => Math.random() - 0.5).join('');

        content.innerHTML = `
            <div class="word-scramble">${scrambled}</div>
            <div class="word-hint">💡 Indice : ${item.hint}</div>
            <div class="word-input-row">
                <input id="wordGuess" class="form-control" placeholder="Tape ta réponse..." />
                <button id="wordCheckBtn" class="btn btn-primary">Vérifier</button>
            </div>
            <div class="word-feedback" id="wordFeedback"></div>
        `;

        this.updateScore('Trouve le mot !');

        const input = document.getElementById('wordGuess');
        const feedback = document.getElementById('wordFeedback');
        const check = () => {
            const value = (input.value || '').trim().toUpperCase();
            if (!value) {
                feedback.textContent = '✍️ Écris une réponse.';
                return;
            }

            if (value === item.word) {
                this.wordScore += 1;
                feedback.textContent = '✅ Bravo ! C\'est correct.';
                this.updateScore(`Points: ${this.wordScore}`);
                setTimeout(() => this.renderWordGame(), 900);
            } else {
                feedback.textContent = '❌ Pas encore. Réessaie !';
            }
        };

        document.getElementById('wordCheckBtn').addEventListener('click', check);
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                check();
            }
        });
    }
}

const educationalGames = new EducationalGames();
