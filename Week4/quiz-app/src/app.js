import { questions } from './data/questions.js';
import { calculateScore, isQuizOver } from './utils/quizLogic.js';

// --- State Variables ---
let state = {
    currentQuestionIndex: 0,
    timer: null,
    timeLeft: 60,
    userAnswers: [] 
};

// --- DOM Elements ---
const dom = {
    startScreen: document.getElementById('start-screen'),
    quizScreen: document.getElementById('quiz-screen'),
    resultScreen: document.getElementById('result-screen'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    timeDisplay: document.getElementById('time'),
    finalScoreDisplay: document.getElementById('final-score'),
    reviewContainer: document.getElementById('review-container'),
    paletteContainer: document.getElementById('question-palette'),
    btnStart: document.querySelector('#start-screen .btn'), 
    btnNext: document.getElementById('next-btn'),
    btnPrev: document.getElementById('previous-btn'),
    btnExit: document.getElementById('exit-btn'),
    btnRestart: document.querySelector('#result-screen .btn')
};

// --- Initialization ---
const init = () => {
    // Make buttons work
    dom.btnStart.addEventListener('click', startQuiz);
    dom.btnNext.addEventListener('click', nextQuestion);
    dom.btnPrev.addEventListener('click', previousQuestion);
    dom.btnExit.addEventListener('click', endQuiz);
    dom.btnRestart.addEventListener('click', restartQuiz);

    // Tab switching detection
    document.addEventListener("visibilitychange", () => {
        // If timer is running and user switches tab
        if (state.timer && document.hidden) {
            alert("You switched tabs! This is not allowed. Your quiz submitted automatically.");
            endQuiz(); 
        }
    });

    // Full-screen exit detection
    document.addEventListener('fullscreenchange', () => {
        // If timer is running and user exits full screen
        if (state.timer && !document.fullscreenElement) {
            alert("You exited full screen! This is not allowed. Your quiz submitted automatically.");
            endQuiz();
        }
    });
};

const startQuiz = () => {
    // Attempt to enter full-screen mode
    document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Full-screen denied: ${err.message}`);
    });

    // Switch screens
    dom.startScreen.classList.add('hidden');
    dom.quizScreen.classList.remove('hidden');
    dom.resultScreen.classList.add('hidden');

    // Reset everything for new game
    state = {
        currentQuestionIndex: 0,
        timeLeft: 60,
        userAnswers: [],
        timer: setInterval(updateTimer, 1000)
    };
    
    // Show the first question
    loadQuestion();
};

const updateTimer = () => {
    // Lower time by 1 second
    state.timeLeft--;
    dom.timeDisplay.textContent = state.timeLeft;
    
    // Stop if time runs out
    if (state.timeLeft <= 0) {
        endQuiz();
    }
};

const loadQuestion = () => {
    // Clear old buttons
    dom.optionsContainer.innerHTML = '';
    
    // Get current question data
    const currentQ = questions[state.currentQuestionIndex];
    dom.questionText.textContent = `${state.currentQuestionIndex + 1}. ${currentQ.question}`;

    // Hide/Show buttons based on question number
    const isFirst = state.currentQuestionIndex === 0;
    const isLast = state.currentQuestionIndex === questions.length - 1;
    
    dom.btnPrev.classList.toggle('hidden', isFirst);
    dom.btnNext.classList.toggle('hidden', isLast);
    dom.btnExit.classList.toggle('hidden', false); 

    // Check if user already answered this
    const existingAnswer = state.userAnswers.find(a => a.currentIndex === state.currentQuestionIndex);
    const selectedIdx = existingAnswer ? existingAnswer.selected : null;

    // Create buttons for each option
    currentQ.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        
        // Highlight if selected
        btn.className = `option-btn ${selectedIdx === index ? 'selected' : ''}`;
        
        // When clicked, save answer
        btn.addEventListener('click', () => handleSelect(index));
        dom.optionsContainer.appendChild(btn);
    });

    // Update the circles at the top
    updatePalette();
};

const handleSelect = (selectedIndex) => {
    const currentQ = questions[state.currentQuestionIndex];
    
    // Check if answer already exists
    const existingIndex = state.userAnswers.findIndex(a => a.currentIndex === state.currentQuestionIndex);

    // Create answer object
    const answerObject = {
        currentIndex: state.currentQuestionIndex,
        question: currentQ.question,
        selected: selectedIndex,
        correct: currentQ.answer,
        options: currentQ.options
    };

    // Update old answer or add new one
    if (existingIndex > -1) {
        state.userAnswers[existingIndex] = answerObject;
    } else {
        state.userAnswers.push(answerObject);
    }

    // Refresh to show selection
    loadQuestion(); 
};

const nextQuestion = () => {
    // Go to next question if not last
    if (!isQuizOver(state.currentQuestionIndex + 1, questions.length)) {
        state.currentQuestionIndex++;
        loadQuestion();
    }
};

const previousQuestion = () => {
    // Go back if not first
    if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
        loadQuestion();
    }
};

const endQuiz = () => {
    // Stop the timer
    clearInterval(state.timer);
    state.timer = null;

    // Exit full screen mode
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
    }

    // Show result screen
    dom.quizScreen.classList.add('hidden');
    dom.resultScreen.classList.remove('hidden');
    
    // Calculate final score
    const finalScore = calculateScore(state.userAnswers);
    dom.finalScoreDisplay.textContent = finalScore;
    
    // Show detailed review
    renderReview();
};

const renderReview = () => {
    dom.reviewContainer.innerHTML = '';
    
    // Sort answers by question order
    const sortedAnswers = [...state.userAnswers].sort((a,b) => a.currentIndex - b.currentIndex);

    // Loop through answers to show review
    sortedAnswers.forEach((item, i) => {
        const isCorrect = item.selected === item.correct;
        const div = document.createElement('div');
        div.className = `review-item ${isCorrect ? 'correct' : 'wrong'}`;

        const myAnswer = item.options[item.selected];
        const rightAnswer = item.options[item.correct];

        // Show if correct or wrong
        div.innerHTML = `
            <strong>${item.currentIndex + 1}. ${item.question}</strong>
            <p>Your Answer: <span class="${isCorrect ? 'txt-green' : 'txt-red'}">${myAnswer}</span></p>
            ${!isCorrect ? `<p>Correct Answer: <span class="txt-green">${rightAnswer}</span></p>` : ''}
        `;
        dom.reviewContainer.appendChild(div);
    });
};

const updatePalette = () => {
    dom.paletteContainer.innerHTML = '';
    
    // Draw circles for question numbers
    questions.forEach((_, index) => {
        const circle = document.createElement('div');
        circle.innerText = index + 1;
        circle.className = 'palette-item';

        // Change color if answered
        const isAnswered = state.userAnswers.some(a => a.currentIndex === index);
        if (isAnswered) circle.classList.add('answered');
        
        // Highlight current question
        if (index === state.currentQuestionIndex) circle.classList.add('active');

        dom.paletteContainer.appendChild(circle);
    });
};

const restartQuiz = () => {
    // Go back to start
    dom.resultScreen.classList.add('hidden');
    dom.startScreen.classList.remove('hidden');
};

// Start the app when page loads
document.addEventListener('DOMContentLoaded', init);