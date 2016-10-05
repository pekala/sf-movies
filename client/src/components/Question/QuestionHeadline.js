import React, { PropTypes } from 'react';
import * as types from '../../questions/questionTypes';

export const typeToQuestion = {
    [types.ACTOR_NAME]: <span>Guess the <strong>actor</strong> that starred in it!</span>,
    [types.MOVIE_TITLE]: <span>Which <strong>movie</strong> could it be...?</span>,
};

const QuestionHeadline = ({ type, movieTitle, movieLocation, className }) =>
    <div className={className}>
        {type === types.ACTOR_NAME &&
            <small><strong>{movieTitle}</strong> was filmed at <strong>{movieLocation}</strong></small>
        }
        {type === types.MOVIE_TITLE &&
            <small> A movie was filmed at <strong>{movieLocation}</strong></small>
        }
    </div>;

QuestionHeadline.propTypes = {
    movieTitle: PropTypes.string.isRequired,
    movieLocation: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.keys(types).map(key => types[key])),
}

export default QuestionHeadline;
