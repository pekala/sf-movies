import React, { PropTypes } from 'react';
import { Textfit } from 'react-textfit';
import Skyline from '../Skyline';
import './Intro.css';

const Intro = ({ onStart }) =>
    <Skyline>
        <div className="Intro--title">
            <Textfit mode="single">San Francisco</Textfit>
            <Textfit mode="single">Movie Quiz</Textfit>
        </div>
        <div className="Intro--button">
            <button onClick={onStart}>Let's do it!</button>
        </div>
        <div className="Intro--explanation">
            <p>You have 25 seconds to guess the movie or actor based on 4 hints and location.</p>
            <p>Every 5 seconds a random hint is revealed. Click on hints to reveal them faster.</p>
            <p>You get half the points for every hint you need. If you answer wrong, the points are substracted.</p>
        </div>
        <div className="Intro--illustrator">
            Illustration by Emir Ayouni
        </div>
    </Skyline>;

Intro.propTypes = {
    onStart: PropTypes.func.isRequired,
};

export default Intro;
