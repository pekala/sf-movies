import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './Summary.css';

const getRandom = messages => messages[Math.floor(Math.random() * messages.length)];

const successMessages = [
    'Nice job! You deserve a 🏆',
    'You\'re a real movie fan',
    'Great score! Cheers to that 🍻',
];

const failureMessages = [
    'Well... it can only get better, right?',
    '🙊 🙉 🙈 Let\'s never talk about this, ok?',
    'You need to up your movie trivia game!',
];

const Summary = ({ points, onStartAgain }) =>
    <div className={classNames('Summary', {
            'Summary__positive': points > 0,
            'Summary__negative': points <= 0,
    })}>
        <div className="Summary--header">
            {points > 0
                ? getRandom(successMessages)
                : getRandom(failureMessages)
            }
        </div>
        <div className="Summary--points">
            You got {points} 💰.
        </div>
        <div className="Summary--start-again">
            <button onClick={onStartAgain}>Start again!</button>
        </div>
    </div>;

Summary.propTypes = {
    onStartAgain: PropTypes.func.isRequired,
    points: PropTypes.number.isRequired,
}

export default Summary;
