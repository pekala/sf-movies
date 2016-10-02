import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './Result.css';

const Question = ({ correct, points }) =>
    <div className={classNames('Result', { 'Result__incorrect': !correct })}>
        <div className="Result--header">
            {correct ? 'Nice!' : 'Try harder next time!'}
        </div>
        <div className="Result--points">
            You {correct ? 'get' : 'lose'} {points} points.
        </div>
    </div>;

Question.propTypes = {
    correct: PropTypes.bool.isRequired,
    points: PropTypes.number.isRequired,
}

export default Question;
