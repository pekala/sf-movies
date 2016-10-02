import React, { PropTypes } from 'react';
import * as types from '../../questions/questionTypes';
import './QuestionHeadline.css';

const typeToQuestion = {
    [types.ACTOR_NAME]: 'Guess the actor that starred in it!',
    [types.MOVIE_TITLE]: 'Which movie could it be...?',
};

const QuestionHeadline = ({ type, movieTitle, movieLocation }) =>
    <div className="QuestionHeadline">
        {type === types.ACTOR_NAME &&
            <small><strong>{movieTitle}</strong> was filmed at <strong>{movieLocation}</strong></small>
        }
        {type === types.MOVIE_TITLE &&
            <small> A movie was filmed at <strong>{movieLocation}</strong></small>
        }
        {typeToQuestion[type]}
    </div>;

QuestionHeadline.propTypes = {
    movieTitle: PropTypes.string.isRequired,
    movieLocation: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.keys(types).map(key => types[key])),
}

export default QuestionHeadline;
