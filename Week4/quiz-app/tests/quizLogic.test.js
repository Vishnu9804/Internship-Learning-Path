import { calculateScore, isCorrect, isQuizOver, isStartOfQuiz } from '../src/utils/quizLogic';

describe('Quiz Logic Utilities - Industry Level', () => {
    
    // --- Group 1: Score Calculation ---
    describe('calculateScore()', () => {
        test('should correctly sum correct answers', () => {
            const mockAnswers = [
                { selected: 1, correct: 1 }, // Pass
                { selected: 0, correct: 1 }, // Fail
                { selected: 2, correct: 2 }  // Pass
            ];
            expect(calculateScore(mockAnswers)).toBe(2);
        });

        test('should return 0 for empty answers array', () => {
            expect(calculateScore([])).toBe(0);
        });

        test('should return 0 if input is null or undefined', () => {
            expect(calculateScore(null)).toBe(0);
            expect(calculateScore(undefined)).toBe(0);
        });

        test('should ignore answers with missing properties', () => {
            const badData = [
                { selected: 1, correct: 1 }, 
                { nothing: 'here' },         
                { selected: 2 }              
            ];
            expect(calculateScore(badData)).toBe(1);
        });
    });

    // --- Group 2: Answer Validation ---
    describe('isCorrect()', () => {
        test('should return true for matching values', () => {
            expect(isCorrect(1, 1)).toBe(true);
            expect(isCorrect('A', 'A')).toBe(true);
        });

        test('should return false for non-matching values', () => {
            expect(isCorrect(0, 1)).toBe(false);
            expect(isCorrect('A', 'B')).toBe(false);
        });

        test('should be strict type check', () => {
            expect(isCorrect('1', 1)).toBe(false); // String vs Number
        });
    });

    // --- Group 3: Navigation State (End) ---
    describe('isQuizOver()', () => {
        test('should return true when index equals total questions', () => {
            expect(isQuizOver(10, 10)).toBe(true);
        });

        test('should return true when index exceeds total questions (safety check)', () => {
            expect(isQuizOver(11, 10)).toBe(true);
        });

        test('should return false when index is less than total', () => {
            expect(isQuizOver(5, 10)).toBe(false);
        });
    });

    // --- Group 4: Navigation State (Start) ---
    describe('isStartOfQuiz()', () => {
        test('should return true if index is 0', () => {
            expect(isStartOfQuiz(0)).toBe(true);
        });

        test('should return true if index is negative (safety check)', () => {
            expect(isStartOfQuiz(-1)).toBe(true);
        });

        test('should return false if index is greater than 0', () => {
            expect(isStartOfQuiz(1)).toBe(false);
        });
    });
});