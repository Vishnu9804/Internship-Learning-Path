export const calculateScore = (userAnswers) => {
    if (!userAnswers || !Array.isArray(userAnswers)) {
        return 0;
    }

    return userAnswers.reduce((score, answer) => {
        if (!answer || typeof answer.selected === 'undefined' || typeof answer.correct === 'undefined') {
            return score;
        }
        return score + (answer.selected === answer.correct ? 1 : 0);
    }, 0);
};

export const isCorrect = (selected, correct) => {
    return selected === correct;
};

export const isQuizOver = (currentIndex, totalQuestions) => {
    return currentIndex >= totalQuestions;
};

export const isStartOfQuiz = (currentIndex) => {
    return currentIndex <= 0;
};