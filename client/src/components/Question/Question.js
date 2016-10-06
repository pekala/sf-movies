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

const AnswerRow = ({ answers, onClick }) =>
    <div className="Question--answers-row">
        {answers.map(answer =>
            <div key={answer} className="Question--answer-wrapper">
                <button onClick={() => onClick(answer)} className="Question--answer">
                    <Textfit mode="single" max={25}>
                        {answer}
                    </Textfit>
                </button>
            </div>
        )}
    </div>;

const HintRow = ({ hints, questionType, onClick }) =>
    <div className="Question--hints-row">
        {hints.map(hint =>
            <div key={hint.value} className="Question--hint-wrapper">
                <Hint {...hint} questionType={questionType} onClick={onClick} />
            </div>
        )}
    </div>;

const Question = ({
    answers,
    hints,
    location,
    onAnswerClicked,
    onHintClicked,
    points,
    timeLeft,
    type,
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
            <HintRow hints={hints.slice(0, 2)} questionType={type} onClick={onHintClicked} />
            <HintRow hints={hints.slice(2, 4)} questionType={type} onClick={onHintClicked} />
        </div>
        <div className="Question--answers">
            <AnswerRow answers={answers.slice(0, 2)} onClick={onAnswerClicked} />
            <AnswerRow answers={answers.slice(2, 4)} onClick={onAnswerClicked} />
        </div>
    </div>;

Question.propTypes = {
    answers: PropTypes.arrayOf(PropTypes.string),
    hints: PropTypes.array,
    location: PropTypes.object.isRequired,
    onAnswerClicked: PropTypes.func.isRequired,
    onHintClicked: PropTypes.func.isRequired,
    points: PropTypes.number,
    timeLeft: PropTypes.number,
    type: PropTypes.oneOf(Object.keys(types).map(key => types[key])),
}

export default Question;
