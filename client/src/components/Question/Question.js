import React, { PropTypes } from 'react';
import { Textfit } from 'react-textfit';
import * as types from '../../questions/questionTypes';
import Hint from '../Hint';
import QuestionHeadline, { typeToQuestion } from './QuestionHeadline';
import './Question.css';

const typeToColor = {
    [types.ACTOR_NAME]: '#f68dbb',
    [types.MOVIE_TITLE]: '#0ac2d2',
};

const WrappedAnswer = ({ answer, onClick }) =>
    <div className="Question--answer-wrapper">
        <button onClick={() => onClick(answer)} className="Question--answer">
            <Textfit mode="single" max={25}>
                {answer}
            </Textfit>
        </button>
    </div>;

const WrappedHint = ({ hint, questionType }) =>
    <div className="Question--hint-wrapper">
        <Hint {...hint} questionType={questionType} />
    </div>;

const Question = ({
    answers,
    hints,
    location,
    onAnswer,
    points,
    timeLeft,
    type,
    wasAnswered,
    wasAnsweredCorrectly,
}) =>
    <div className="Question" style={{ backgroundColor: typeToColor[type] }}>
        <div className="Question--header">
            <div className="Question--header-row">
                <div className="Question--headline">
                    <QuestionHeadline type={type} {...location} />
                </div>
                <div className="Question--stats">
                    <div className="Question--timer">
                        {timeLeft}s
                    </div>
                    <div className="Question--points">
                        {points} points
                    </div>
                </div>
            </div>
            <div className="Question--header-row">
                <div className="Question--question">{typeToQuestion[type]}</div>
            </div>
        </div>
        <div className="Question--hints">
            <div className="Question--hints-row">
                {hints.slice(0, 2).map(hint =>
                    <WrappedHint key={hint.value} hint={hint} questionType={type} />
                )}
            </div>
            <div className="Question--hints-row">
                {hints.slice(2, 4).map(hint =>
                    <WrappedHint key={hint.value} hint={hint} questionType={type} />
                )}
            </div>
        </div>
        <div className="Question--answers">
            <div className="Question--answers-row">
                {answers.slice(0, 2).map(answer =>
                    <WrappedAnswer key={answer} onClick={onAnswer} answer={answer} />
                )}
            </div>
            <div className="Question--answers-row">
                {answers.slice(2, 4).map(answer =>
                    <WrappedAnswer key={answer} onClick={onAnswer} answer={answer} />
                )}
            </div>
        </div>
    </div>;

Question.propTypes = {
    answers: PropTypes.arrayOf(PropTypes.string),
    hints: PropTypes.array,
    location: PropTypes.object.isRequired,
    onAnswer: PropTypes.func.isRequired,
    points: PropTypes.number,
    timeLeft: PropTypes.number,
    type: PropTypes.oneOf(Object.keys(types).map(key => types[key])),
    wasAnswered: PropTypes.bool,
    wasAnsweredCorrectly: PropTypes.bool,
}

export default Question;
