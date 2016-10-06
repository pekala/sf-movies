import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './Result.css';

const correctMessages = [
    'Spot on! 🎯',
    'Woot Woot! 🎉',
    'Great job! 🙌',
    'Perfect! 🏅',
    'You nailed it! 🔨',
];

const incorrectMessages = [
    'Try harder next time!',
    'Not even close...',
    'Wait... what?',
    'Huh...?',
    'Sorry, incorrect.',
];

const timeoutMessages = [
    '⏲ You need to be faster!',
    'Next time, pick something...',
    'Are you a 🐤? Pick something!',
    `Not enough hints, ha? ¯\\_(ツ)_/¯`,
];

const getRandom = messages => messages[Math.floor(Math.random() * messages.length)];

const Question = ({
    answer,
    correct,
    hasTimedOut,
    points,
}) =>
    <div className={classNames('Result', { 'Result__incorrect': !correct })}>
        <div className="Result--header">
            {correct
                ? getRandom(correctMessages)
                : hasTimedOut
                    ? getRandom(timeoutMessages)
                    : getRandom(incorrectMessages)
            }
        </div>
        {!correct &&
            <div className="Result--answer">
                It was actually <strong>{answer}</strong>.
            </div>
        }
        {!hasTimedOut &&
            <div className="Result--points">
                You {correct ? 'get' : 'lose'} {points} 💰.
            </div>
        }
    </div>;

Question.propTypes = {
    answer: PropTypes.string.isRequired,
    correct: PropTypes.bool.isRequired,
    hasTimedOut: PropTypes.bool.isRequired,
    points: PropTypes.number.isRequired,
}

export default Question;
