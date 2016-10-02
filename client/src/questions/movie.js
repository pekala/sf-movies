import shuffle from 'lodash.shuffle';
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
    return hints;
}

export default function getQuestion(movies, questionBase, item) {
    return Object.assign({}, questionBase, {
        type: MOVIE_TITLE,
        answers: shuffle(getAnswers(item, movies)),
        hints: shuffle(getHints(item))
    })
}
