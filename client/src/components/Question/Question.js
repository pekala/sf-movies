import React, { PropTypes } from 'react';
import * as types from './types';
import './Question.css';
import Hint from '../Hint';

const typeToHeadline = {
    [types.ACTOR_NAME]: `Guess the actor!`,
    [types.LOCATION_NAME]: `Guess the place!`,
    [types.MOVIE_TITLE]: `Which movie could it be...?`,
}

const Question = ({
    answers,
    hints,
    place,
    points,
    timeLeft,
    type,
    wasAnswered,
    wasAnsweredCorrectly,
}) =>
    <div className="Question">
        <div className="Question--header">
            <div className="Question--headline">
                {typeToHeadline[type]}
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
                    <Hint {...hint} />
                </div>
            )}
        </div>
        <div className="Question--anwsers">
            {answers.map(answer =>
                <div key={answer} className="Question--anwser-wrapper">
                    <button className="Question--anwser">{answer}</button>
                </div>
            )}
        </div>
    </div>;

Question.propTypes = {
    answers: PropTypes.arrayOf(PropTypes.string),
    hints: PropTypes.array,
    place: PropTypes.object,
    points: PropTypes.number,
    timeLeft: PropTypes.number,
    type: PropTypes.oneOf(Object.keys(types).map(key => types[key])),
    wasAnswered: PropTypes.bool,
    wasAnsweredCorrectly: PropTypes.bool,
}

export default Question;
