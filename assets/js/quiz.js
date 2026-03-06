/**
 * Ramadan Kids Corner - Quiz System
 * Interactive Quiz with JSON data and scoring
 */

class QuizManager {
    constructor() {
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalQuestions = 0;
        this.answers = [];
        this.quizData = null;
        this.timerInterval = null;
        this.timeLeft = 0;
    }

    /**
     * Load quiz from JSON file or embedded data
     */
    async loadQuiz(quizFile) {
        try {
            console.log('🔍 Tentative de chargement du quiz:', quizFile);
            console.log('📦 QUIZ_DATA défini?', typeof QUIZ_DATA !== 'undefined');
            
            // Try to load from embedded data first (for offline use)
            if (typeof QUIZ_DATA !== 'undefined' && QUIZ_DATA[quizFile]) {
                console.log('✅ Quiz trouvé dans les données embarquées !');
                this.quizData = QUIZ_DATA[quizFile];
                this.totalQuestions = this.quizData.questions.length;
                this.currentQuestionIndex = 0;
                this.score = 0;
                this.answers = [];
                console.log('📊 Quiz chargé:', this.quizData.title, '| Questions:', this.totalQuestions);
                return this.quizData;
            }
            
            console.log('⚠️ QUIZ_DATA non disponible, tentative de chargement via fetch...');
            // Fallback to fetch if QUIZ_DATA is not available
            const response = await fetch(`assets/data/${quizFile}`);
            if (!response.ok) {
                throw new Error('Impossible de charger le quiz');
            }
            this.quizData = await response.json();
            this.totalQuestions = this.quizData.questions.length;
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.answers = [];
            return this.quizData;
        } catch (error) {
            console.error('❌ Erreur de chargement:', error);
            this.showError('Impossible de charger le quiz. Assure-toi que les fichiers sont bien présents !');
            return null;
        }
    }

    /**
     * Start the quiz
     */
    startQuiz() {
        if (!this.quizData) {
            this.showError('Aucun quiz chargé !');
            return;
        }

        // Hide quiz selection, show quiz container
        document.getElementById('quizSelection').style.display = 'none';
        document.getElementById('quizContainer').style.display = 'block';

        // Display first question
        this.displayQuestion();
    }

    /**
     * Display current question
     */
    displayQuestion() {
        const quizType = this.quizData.type || 'default';
        
        // Update progress
        this.updateProgress();
        
        // Display question based on quiz type
        switch(quizType) {
            case 'cards':
                this.displayCardsQuestion();
                break;
            case 'gradient':
                this.displayGradientQuestion();
                break;
            default:
                this.displayDefaultQuestion();
        }
        
        // Restore previous answer if exists
        if (this.answers[this.currentQuestionIndex] !== undefined) {
            this.selectAnswer(this.answers[this.currentQuestionIndex], true);
        }
    }

    /**
     * Display question with default button style
     */
    displayDefaultQuestion() {
        const question = this.quizData.questions[this.currentQuestionIndex];
        const questionContainer = document.getElementById('questionContainer');

        const questionHTML = `
            <div class="question-card animate-in">
                <div class="question-header">
                    <span class="question-number">Question ${this.currentQuestionIndex + 1}/${this.totalQuestions}</span>
                    <span class="question-points">${question.points} points</span>
                </div>
                
                <h3 class="question-title">${question.question}</h3>
                
                <div class="options-container">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" data-index="${index}" onclick="quizManager.selectAnswer(${index})">
                            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                            <span class="option-text">${option}</span>
                            <i class="bi bi-circle option-icon"></i>
                        </button>
                    `).join('')}
                </div>
                
                <div class="question-actions">
                    ${this.currentQuestionIndex > 0 ? 
                        '<button class="btn btn-secondary" onclick="quizManager.previousQuestion()"><i class="bi bi-arrow-left me-2"></i>Précédent</button>' : 
                        '<span></span>'}
                    <button class="btn btn-primary" id="nextBtn" onclick="quizManager.nextQuestion()" disabled>
                        ${this.currentQuestionIndex < this.totalQuestions - 1 ? 
                            'Suivant <i class="bi bi-arrow-right ms-2"></i>' : 
                            'Terminer <i class="bi bi-check-circle ms-2"></i>'}
                    </button>
                </div>
            </div>
        `;

        questionContainer.innerHTML = questionHTML;
    }

    /**
     * Display question with card-based style (Quiz Histoire)
     */
    displayCardsQuestion() {
        const question = this.quizData.questions[this.currentQuestionIndex];
        const questionContainer = document.getElementById('questionContainer');

        const colors = ['#F9C74F', '#F9844A', '#43AA8B', '#7B5EA7'];

        const questionHTML = `
            <div class="question-card-style animate-in">
                <div class="question-header-cards">
                    <div class="question-badge">
                        <i class="bi bi-book-fill me-2"></i>
                        Question ${this.currentQuestionIndex + 1}/${this.totalQuestions}
                    </div>
                    <div class="question-points-badge">${question.points} pts</div>
                </div>
                
                <h3 class="question-title-cards">${question.question}</h3>
                
                <div class="cards-grid">
                    ${question.options.map((option, index) => `
                        <div class="option-card" data-index="${index}" onclick="quizManager.selectAnswer(${index})" style="--card-color: ${colors[index]}">
                            <div class="option-card-inner">
                                <div class="option-card-number">${String.fromCharCode(65 + index)}</div>
                                <div class="option-card-text">${option}</div>
                                <div class="option-card-check">
                                    <i class="bi bi-check-circle-fill"></i>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="question-actions">
                    ${this.currentQuestionIndex > 0 ? 
                        '<button class="btn btn-secondary" onclick="quizManager.previousQuestion()"><i class="bi bi-arrow-left me-2"></i>Précédent</button>' : 
                        '<span></span>'}
                    <button class="btn btn-warning" id="nextBtn" onclick="quizManager.nextQuestion()" disabled>
                        ${this.currentQuestionIndex < this.totalQuestions - 1 ? 
                            'Suivant <i class="bi bi-arrow-right ms-2"></i>' : 
                            'Terminer <i class="bi bi-check-circle ms-2"></i>'}
                    </button>
                </div>
            </div>
        `;

        questionContainer.innerHTML = questionHTML;
    }

    /**
     * Display question with gradient style (Quiz Culture)
     */
    displayGradientQuestion() {
        const question = this.quizData.questions[this.currentQuestionIndex];
        const questionContainer = document.getElementById('questionContainer');

        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        ];

        const questionHTML = `
            <div class="question-gradient-style animate-in">
                <div class="gradient-question-header">
                    <span class="gradient-icon">🌍</span>
                    <h4>Question ${this.currentQuestionIndex + 1}/${this.totalQuestions}</h4>
                    <span class="gradient-points">+${question.points}</span>
                </div>
                
                <div class="gradient-question-box">
                    <h3 class="gradient-question-title">${question.question}</h3>
                </div>
                
                <div class="gradient-options">
                    ${question.options.map((option, index) => `
                        <div class="gradient-option" data-index="${index}" onclick="quizManager.selectAnswer(${index})" style="--gradient: ${gradients[index]}">
                            <div class="gradient-option-content">
                                <span class="gradient-option-letter">${String.fromCharCode(65 + index)}</span>
                                <span class="gradient-option-text">${option}</span>
                                <span class="gradient-option-check">
                                    <i class="bi bi-check-lg"></i>
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="question-actions">
                    ${this.currentQuestionIndex > 0 ? 
                        '<button class="btn btn-secondary" onclick="quizManager.previousQuestion()"><i class="bi bi-arrow-left me-2"></i>Précédent</button>' : 
                        '<span></span>'}
                    <button class="btn btn-success" id="nextBtn" onclick="quizManager.nextQuestion()" disabled>
                        ${this.currentQuestionIndex < this.totalQuestions - 1 ? 
                            'Suivant <i class="bi bi-arrow-right ms-2"></i>' : 
                            'Terminer <i class="bi bi-check-circle ms-2"></i>'}
                    </button>
                </div>
            </div>
        `;

        questionContainer.innerHTML = questionHTML;
    }

    /**
     * Select an answer
     */
    selectAnswer(index, isRestore = false) {
        const quizType = this.quizData.type || 'default';
        
        if (quizType === 'cards') {
            this.selectAnswerCards(index, isRestore);
        } else if (quizType === 'gradient') {
            this.selectAnswerGradient(index, isRestore);
        } else {
            this.selectAnswerDefault(index, isRestore);
        }
    }

    /**
     * Select answer for default style
     */
    selectAnswerDefault(index, isRestore = false) {
        const buttons = document.querySelectorAll('.option-btn');
        
        // Remove previous selection
        buttons.forEach(btn => {
            btn.classList.remove('selected');
            const icon = btn.querySelector('.option-icon');
            icon.className = 'bi bi-circle option-icon';
        });

        // Add new selection
        buttons[index].classList.add('selected');
        const selectedIcon = buttons[index].querySelector('.option-icon');
        selectedIcon.className = 'bi bi-check-circle-fill option-icon';

        // Store answer
        this.answers[this.currentQuestionIndex] = index;

        // Enable next button
        document.getElementById('nextBtn').disabled = false;

        // Add pulse animation
        if (!isRestore) {
            buttons[index].style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                buttons[index].style.animation = '';
            }, 300);
        }
    }

    /**
     * Select answer for cards style
     */
    selectAnswerCards(index, isRestore = false) {
        const cards = document.querySelectorAll('.option-card');
        
        // Remove previous selection
        cards.forEach(card => {
            card.classList.remove('selected');
        });

        // Add new selection
        cards[index].classList.add('selected');

        // Store answer
        this.answers[this.currentQuestionIndex] = index;

        // Enable next button
        document.getElementById('nextBtn').disabled = false;

        // Add animation
        if (!isRestore) {
            cards[index].style.animation = 'cardSelect 0.4s ease';
            setTimeout(() => {
                cards[index].style.animation = '';
            }, 400);
        }
    }

    /**
     * Select answer for gradient style
     */
    selectAnswerGradient(index, isRestore = false) {
        const options = document.querySelectorAll('.gradient-option');
        
        // Remove previous selection
        options.forEach(opt => {
            opt.classList.remove('selected');
        });

        // Add new selection
        options[index].classList.add('selected');

        // Store answer
        this.answers[this.currentQuestionIndex] = index;

        // Enable next button
        document.getElementById('nextBtn').disabled = false;

        // Add animation
        if (!isRestore) {
            options[index].style.animation = 'gradientPulse 0.5s ease';
            setTimeout(() => {
                options[index].style.animation = '';
            }, 500);
        }
    }

    /**
     * Go to next question
     */
    nextQuestion() {
        if (this.answers[this.currentQuestionIndex] === undefined) {
            this.showMessage('Choisis une réponse avant de continuer !', 'warning');
            return;
        }

        if (this.currentQuestionIndex < this.totalQuestions - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.finishQuiz();
        }
    }

    /**
     * Go to previous question
     */
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    /**
     * Update progress bar
     */
    updateProgress() {
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        const progress = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${this.currentQuestionIndex + 1}/${this.totalQuestions}`;
    }

    /**
     * Finish quiz and show results
     */
    finishQuiz() {
        // Calculate score
        this.score = 0;
        this.answers.forEach((answer, index) => {
            const question = this.quizData.questions[index];
            if (answer === question.correctAnswer) {
                this.score += question.points;
            }
        });

        // Show results
        this.displayResults();
    }

    /**
     * Display quiz results
     */
    displayResults() {
        const questionContainer = document.getElementById('questionContainer');
        const totalPoints = this.quizData.questions.reduce((sum, q) => sum + q.points, 0);
        const percentage = Math.round((this.score / totalPoints) * 100);

        // Determine performance level
        let performanceEmoji = '';
        let performanceTitle = '';
        let performanceMessage = '';

        if (percentage >= 90) {
            performanceEmoji = '🌟';
            performanceTitle = 'Extraordinaire !';
            performanceMessage = 'Tu es un vrai champion du Ramadan ! Continue comme ça !';
        } else if (percentage >= 70) {
            performanceEmoji = '⭐';
            performanceTitle = 'Très bien !';
            performanceMessage = 'Bravo ! Tu connais bien le Ramadan !';
        } else if (percentage >= 50) {
            performanceEmoji = '👍';
            performanceTitle = 'Bien joué !';
            performanceMessage = 'C\'est un bon début ! Continue d\'apprendre !';
        } else {
            performanceEmoji = '📚';
            performanceTitle = 'Continue d\'apprendre !';
            performanceMessage = 'N\'abandonne pas ! Lis nos histoires et recommence !';
        }

        // Build results HTML
        const resultsHTML = `
            <div class="results-container animate-in">
                <div class="results-header">
                    <div class="results-emoji">${performanceEmoji}</div>
                    <h2 class="results-title">${performanceTitle}</h2>
                    <p class="results-message">${performanceMessage}</p>
                </div>
                
                <div class="score-display">
                    <div class="score-circle">
                        <svg width="200" height="200">
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#E0E0E0" stroke-width="12"/>
                            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--color-purple)" 
                                    stroke-width="12" stroke-dasharray="${2 * Math.PI * 90}" 
                                    stroke-dashoffset="${2 * Math.PI * 90 * (1 - percentage / 100)}"
                                    transform="rotate(-90 100 100)"/>
                        </svg>
                        <div class="score-text">
                            <div class="score-percentage">${percentage}%</div>
                            <div class="score-points">${this.score}/${totalPoints} points</div>
                        </div>
                    </div>
                </div>

                <div class="results-stats">
                    <div class="stat-item">
                        <i class="bi bi-check-circle-fill text-success"></i>
                        <span>${this.getCorrectAnswersCount()} Bonnes réponses</span>
                    </div>
                    <div class="stat-item">
                        <i class="bi bi-x-circle-fill text-danger"></i>
                        <span>${this.totalQuestions - this.getCorrectAnswersCount()} Mauvaises réponses</span>
                    </div>
                    <div class="stat-item">
                        <i class="bi bi-trophy-fill" style="color: var(--color-gold);"></i>
                        <span>${this.score} Points gagnés</span>
                    </div>
                </div>

                <div class="results-actions">
                    <button class="btn btn-primary btn-lg" onclick="quizManager.reviewAnswers()">
                        <i class="bi bi-eye me-2"></i> Voir les réponses
                    </button>
                    <button class="btn btn-success btn-lg" onclick="quizManager.restartQuiz()">
                        <i class="bi bi-arrow-clockwise me-2"></i> Recommencer
                    </button>
                    <button class="btn btn-secondary btn-lg" onclick="quizManager.backToSelection()">
                        <i class="bi bi-grid me-2"></i> Autres quiz
                    </button>
                </div>
            </div>
        `;

        questionContainer.innerHTML = resultsHTML;

        // Animate score circle
        setTimeout(() => {
            const circle = document.querySelector('.score-circle circle:last-child');
            circle.style.transition = 'stroke-dashoffset 1.5s ease';
        }, 100);
    }

    /**
     * Review answers with explanations
     */
    reviewAnswers() {
        const questionContainer = document.getElementById('questionContainer');
        
        const reviewHTML = `
            <div class="review-container">
                <div class="review-header">
                    <h2><i class="bi bi-clipboard-check me-2"></i> Révision des Réponses</h2>
                    <button class="btn btn-secondary" onclick="quizManager.displayResults()">
                        <i class="bi bi-arrow-left me-2"></i> Retour aux résultats
                    </button>
                </div>
                
                <div class="review-questions">
                    ${this.quizData.questions.map((question, index) => {
                        const userAnswer = this.answers[index];
                        const isCorrect = userAnswer === question.correctAnswer;
                        
                        return `
                            <div class="review-question ${isCorrect ? 'correct' : 'incorrect'}">
                                <div class="review-question-header">
                                    <span class="review-question-number">Question ${index + 1}</span>
                                    ${isCorrect ? 
                                        '<span class="badge badge-green"><i class="bi bi-check-circle me-1"></i>Correct</span>' : 
                                        '<span class="badge badge-orange"><i class="bi bi-x-circle me-1"></i>Incorrect</span>'}
                                </div>
                                
                                <h4 class="review-question-title">${question.question}</h4>
                                
                                <div class="review-options">
                                    ${question.options.map((option, optIndex) => {
                                        let className = 'review-option';
                                        let icon = '';
                                        
                                        if (optIndex === question.correctAnswer) {
                                            className += ' correct-answer';
                                            icon = '<i class="bi bi-check-circle-fill text-success"></i>';
                                        } else if (optIndex === userAnswer && !isCorrect) {
                                            className += ' wrong-answer';
                                            icon = '<i class="bi bi-x-circle-fill text-danger"></i>';
                                        }
                                        
                                        return `
                                            <div class="${className}">
                                                <span>${String.fromCharCode(65 + optIndex)}. ${option}</span>
                                                ${icon}
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                                
                                <div class="review-explanation">
                                    <i class="bi bi-lightbulb-fill me-2"></i>
                                    <strong>Explication :</strong> ${question.explanation}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="review-actions">
                    <button class="btn btn-success btn-lg" onclick="quizManager.restartQuiz()">
                        <i class="bi bi-arrow-clockwise me-2"></i> Recommencer ce quiz
                    </button>
                    <button class="btn btn-primary btn-lg" onclick="quizManager.backToSelection()">
                        <i class="bi bi-grid me-2"></i> Choisir un autre quiz
                    </button>
                </div>
            </div>
        `;
        
        questionContainer.innerHTML = reviewHTML;
    }

    /**
     * Get number of correct answers
     */
    getCorrectAnswersCount() {
        return this.answers.filter((answer, index) => 
            answer === this.quizData.questions[index].correctAnswer
        ).length;
    }

    /**
     * Restart current quiz
     */
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.startQuiz();
    }

    /**
     * Back to quiz selection
     */
    backToSelection() {
        document.getElementById('quizContainer').style.display = 'none';
        document.getElementById('quizSelection').style.display = 'block';
        
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.quizData = null;
    }

    /**
     * Show error message
     */
    showError(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        container.insertBefore(alert, container.firstChild);
        
        setTimeout(() => alert.remove(), 5000);
    }

    /**
     * Show info message
     */
    showMessage(message, type = 'info') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        container.insertBefore(alert, container.firstChild);
        
        setTimeout(() => alert.remove(), 3000);
    }
}

// Initialize quiz manager
const quizManager = new QuizManager();

// Quiz selection function
async function selectQuiz(quizFile) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';
    
    const quizData = await quizManager.loadQuiz(quizFile);
    
    loadingOverlay.style.display = 'none';
    
    if (quizData) {
        // Update quiz header
        document.getElementById('quizTitle').textContent = quizData.title;
        document.getElementById('quizDescription').textContent = quizData.description;
        
        // Start quiz
        quizManager.startQuiz();
    }
}
