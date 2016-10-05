import React, { PropTypes } from 'react';
import randomColor from 'randomcolor';
import classNames from 'classnames';
import { Textfit } from 'react-textfit';
import * as types from '../../questions/hintTypes';
import * as questionTypes from '../../questions/questionTypes';
import Flipper from './Flipper';
import './Hint.css';

const typeToLabel = {
    [types.ACTOR_NAME]: 'Actor name',
    [types.LOCATION_NAME]: 'Place',
    [types.MOVIE_TITLE]: 'Movie title',
    [types.PRODUCTION_COMPANY]: 'Production company',
    [types.MOVIE_POSTER]: 'Movie poster',
    [types.ACTOR_IMAGE]: 'Actor photo',
    [types.MOVIE_TAGLINE]: 'Tagline',
    [types.MOVIE_GENRES]: 'Genre',
    [types.MOVIE_YEAR]: 'Year released',
};

const getMode = type => {
    switch(type) {
        case types.MOVIE_POSTER:
        case types.ACTOR_IMAGE:
            return 'image';
        default:
            return 'text';
    }
}

const Hint = ({
    isRevealed = false,
    questionType,
    type,
    value,
}) => {
    const mode = getMode(type);
    return (
        <Flipper className="Hint" isFlipped={isRevealed}>
            <div className="Hint--front">
                Hint
            </div>
            <div className={classNames('Hint--back', {
                'Hint--back__smallText': mode === 'text' && value.length > 50,
                'Hint--back__largeText': mode === 'text' && value.length < 20,
            })}>
                <div className="Hint--label" style={{ backgroundColor: randomColor({ luminosity: 'bright', seed: type }) }}>
                    {typeToLabel[type]}
                </div>
                { mode === 'image' &&
                    <div
                        className={classNames('Hint--image', {
                            'Hint--image__blurred': questionType === questionTypes.MOVIE_TITLE && type === types.MOVIE_POSTER,
                            'Hint--image__round': type === types.ACTOR_IMAGE,
                        })}
                        style={{ backgroundImage: `url('${value}')` }}
                    />
                }
                { mode === 'text' &&
                    value
                }
            </div>
        </Flipper>
    );
};

Hint.propTypes = {
    isRevealed: PropTypes.bool,
    questionType: PropTypes.oneOf(Object.keys(questionTypes).map(key => questionTypes[key])).isRequired,
    type: PropTypes.oneOf(Object.keys(types).map(key => types[key])).isRequired,
    value: PropTypes.string.isRequired,
}

export default Hint;
