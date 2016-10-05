import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './Result.css';

const correctMessages = [
    'Nice!',
    'Woot Woot!',
    'Great job!',
    'Perfect!',
    'You nailed it!',
];

const incorrectMessages = [
    'Try harder next time!',
    'Not even close...',
    'Wait... what?',
    'Huh...?',
    'Sorry, incorrect.',
];

const timeoutMessages = [
    'You need to be faster!',
    'Next time, pick something...',
    'Are you a chicken? Pick something!',
    'Not enough hints, ha?',
];

const getRandom = messages => messages[Math.floor(Math.random() * messages.length)];

const Question = ({ correct, points, hasTimedOut }) =>
    <div className={classNames('Result', { 'Result__incorrect': !correct })}>
        <div className="Result--header">
            {correct
                ? getRandom(correctMessages)
                : hasTimedOut
                    ? getRandom(timeoutMessages)
                    : getRandom(incorrectMessages)
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
