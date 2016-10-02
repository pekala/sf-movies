import React, { PropTypes } from 'react';
import * as types from '../../questions/questionTypes';
import './Question.css';
import Hint from '../Hint';

const typeToHeadline = {
    [types.ACTOR_NAME]: location =>
        <div>
            <small>
                <strong>{location.movieTitle}</strong> was filmed at <strong>{location.movieLocation}</strong>.
            </small>
            Guess the actor that starred in it!
        </div>,
    [types.LOCATION_NAME]: location => `Guess the place!`,
    [types.MOVIE_TITLE]: location =>
        <div>
            <small>
                A movie was filmed at <strong>{location.movieLocation}</strong>.
            </small>
            Which movie could it be...?
        </div>,
}

const Question = ({
    answers,
    hints,
    location,
    points,
    timeLeft,
    type,
    wasAnswered,
    wasAnsweredCorrectly,
}) =>
    <div className="Question">
        <div className="Question--header">
            <div className="Question--headline">
                {typeToHeadline[type](location)}
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
                    <button className="Question--anwser">{answer}</button>
                </div>
            )}
        </div>
    </div>;

Question.propTypes = {
    answers: PropTypes.arrayOf(PropTypes.string),
    hints: PropTypes.array,
    location: PropTypes.shape({
        movieTitle: PropTypes.string.isRequired,
        movieLocation: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        geometry: PropTypes.object.isRequired,
    }).isRequired,
    points: PropTypes.number,
    timeLeft: PropTypes.number,
    type: PropTypes.oneOf(Object.keys(types).map(key => types[key])),
    wasAnswered: PropTypes.bool,
    wasAnsweredCorrectly: PropTypes.bool,
}

export default Question;
