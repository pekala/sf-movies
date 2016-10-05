import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './Summary.css';

const Summary = ({ points, onStartAgain }) =>
    <div className={classNames('Summary', {
            'Summary__positive': points > 0,
            'Summary__negative': points <= 0,
    })}>
        <div className="Summary--header">
            {points > 0
                ? 'Nice job!'
                : 'You need to train a bit...'
            }
        </div>
        <div className="Summary--points">
            You got {points} points.
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
