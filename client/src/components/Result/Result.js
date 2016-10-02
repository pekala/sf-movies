import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './Result.css';

const Question = ({ correct, points, hasTimedOut }) =>
    <div className={classNames('Result', { 'Result__incorrect': !correct })}>
        <div className="Result--header">
            {correct
                ? 'Nice!'
                : hasTimedOut
                    ? 'You need to be faster!'
                    : 'Try harder next time!'
            }
        </div>
        {!hasTimedOut &&
            <div className="Result--points">
                You {correct ? 'get' : 'lose'} {points} points.
            </div>
        }
    </div>;

Question.propTypes = {
    correct: PropTypes.bool.isRequired,
    points: PropTypes.number.isRequired,
    hasTimedOut: PropTypes.bool.isRequired,
}

export default Question;
