import shuffle from 'lodash.shuffle';
import uniqueId from 'lodash.uniqueid';
import { MOVIE_TITLE } from './questionTypes';
import * as hintTypes from './hintTypes';

function getAnswers(item, movies) {
    return shuffle(movies)
        .filter(movie => movie !== item.title)
        .slice(0, 3)
        .concat(item.title);
}

function getHints(item) {
    const hints = [];
    if (item.actor_1) {
        hints.push({
            type: hintTypes.ACTOR_NAME,
            value: item.actor_1,
        })
    }
    if (item.poster_url) {
        hints.push({
            type: hintTypes.MOVIE_POSTER,
            value: item.poster_url,
        })
    }
    if (item.tagline) {
        hints.push({
            type: hintTypes.MOVIE_TAGLINE,
            value: item.tagline,
        })
    }
    if (item.genres && item.genres.length) {
        hints.push({
            type: hintTypes.MOVIE_GENRES,
            value: item.genres.join(' '),
        })
    }
    if (item.release_year) {
        hints.push({
            type: hintTypes.MOVIE_YEAR,
            value: item.release_year,
        })
    }

    return hints.map(hint => ({ ...hint, id: uniqueId('hint_') }));
}

export default function getQuestion(movies, questionBase, item) {
    return {
        ...questionBase,
        answer: item.title,
        answers: shuffle(getAnswers(item, movies)),
        hints: shuffle(getHints(item)).slice(0, 4),
        type: MOVIE_TITLE,
    };
}
