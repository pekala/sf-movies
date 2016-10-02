import React, { PropTypes } from 'react';
import * as types from '../../questions/hintTypes';
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
}

const Hint = ({
    isRevealed,
    type,
    value,
}) =>
    <Flipper className="Hint" isFlipped={isRevealed}>
        <div className="Hint--front">
            Hint
        </div>
        <div className="Hint--back">
            <div className="Hint--label">{typeToLabel[type]}</div>
            { (type === types.MOVIE_POSTER || type === types.ACTOR_IMAGE)
                ? <div className="Hint--image" style={{ backgroundImage: `url('${value}')` }} />
                : <div className="Hint--value">{value}</div>
            }
        </div>
    </Flipper>;

Hint.propTypes = {
    isRevealed: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(Object.keys(types).map(key => types[key])).isRequired,
    value: PropTypes.string.isRequired,
}

export default Hint;
