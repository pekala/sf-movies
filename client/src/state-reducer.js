import shuffle from 'lodash.shuffle';
import getQuestions from './questions';

const handleQuestionTick = state => {
    let hints = state.question.hints;
    let points = state.question.points;
    if (state.question.timeLeft % 5 === 0) {
        points /= 2;
        let hintToUnlock = shuffle(hints).find(hint => !hint.isRevealed);
        hints = hints.map(hint => {
            if (hint === hintToUnlock) {
                return {
                    ...hint,
                    isRevealed: true,
                }
            }
            return hint;
        })
    }

    return {
        ...state,
        question: {
            ...state.question,
            hints,
            points,
            timeLeft: state.question.timeLeft - 1,
        }
    };
}

const changeQuestion = state => {
    const nextQuestion = shuffle(state.questions).filter(question => !question.wasAnswered)[0];
    if (!nextQuestion) {
        return {
            ...state,
            question: null,
            gameEnded: true,
            result: undefined,
        };
    }
    return {
        ...state,
        question: nextQuestion,
        showingIntro: true,
        result: undefined,
    }
}

const initState = () => {
    const state = {
        questions: getQuestions(1),
        points: 0
    };
    return changeQuestion(state);
}

const showQuestion = state => {
    return {
        ...state,
        showingIntro: false,
    }
}

const handleAnswer = (state, answer) => {
    const questions = state.questions.map(question => {
        if (question.id === state.question.id) {
            return {
                ...question,
                wasAnswered: true,
            };
        }
        return question;
    })
    const points = answer ? state.question.points : 0;
    const wasCorrect = answer === state.question.answer;
    return {
        ...state,
        question: null,
        questions,
        points: state.points + points * (wasCorrect ? 1 : -1),
        result: {
            correct: wasCorrect,
            points,
            hasTimedOut: !answer,
        },
    }
}

export default function reducer(state, action, payload) {
    switch (action) {
        case 'INIT':
            return initState();
        case 'TICK':
            return handleQuestionTick(state);
        case 'ANSWER':
            return handleAnswer(state, payload);
        case 'RESULT_SHOWN':
            return changeQuestion(state);
        case 'READY_CLICKED':
            return showQuestion(state);
        default:
            return state;
    }
}
