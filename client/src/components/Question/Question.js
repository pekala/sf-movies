import React, { PropTypes } from 'react';
import * as types from '../../questions/questionTypes';
import Hint from '../Hint';
import QuestionHeadline from './QuestionHeadline';
import './Question.css';

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
    <div className="Question">
        <div className="Question--header">
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
        <div className="Question--hints">
            {hints.map(hint =>
                <div key={hint.value} className="Question--hint-wrapper">
                    <Hint {...hint} questionType={type} />
                </div>
            )}
        </div>
        <div className="Question--anwsers">
            {answers.map(answer =>
                <div key={answer} className="Question--anwser-wrapper">
                    <button onClick={() => onAnswer(answer)} className="Question--anwser">
                        {answer}
                    </button>
                </div>
            )}
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
