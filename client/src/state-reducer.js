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
    const questions = state.questions.map(question => {
        if (question === state.question) {
            return {
                ...question,
                wasAnswered: true,
            };
        }
        return question;
    })
    const nextQuestion = shuffle(questions).filter(question => !question.wasAnswered)[0];
    return {
        question: nextQuestion,
        questions,
        result: undefined,
    }
}

const initQuestions = () => {
    const questions = getQuestions(9);
    const nextQuestion = shuffle(questions)[0];
    return {
        question: nextQuestion,
        questions,
    }
}

const handleAnswer = (state, answer) => {
    return {
        ...state,
        question: null,
        result: {
            correct: answer === state.question.answer,
            points: answer ? state.question.points : 0,
            hasTimedOut: !answer,
        },
    }
}

export default function reducer(state, action, payload) {
    switch (action) {
        case 'INIT':
            return initQuestions();
        case 'TICK':
            return handleQuestionTick(state);
        case 'ANSWER':
            return handleAnswer(state, payload);
        case 'RESULT_SHOWN':
            return changeQuestion(state);
        default:
            return state;
    }
}
