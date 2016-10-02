import shuffle from 'lodash.shuffle';
import { ACTOR_NAME } from './questionTypes';
import * as hintTypes from './hintTypes';

function getAnswers(item, actors) {
    return shuffle(actors)
        .filter(actor => actor !== item.actor_1)
        .slice(0, 3)
        .concat(item.actor_1);
}

function getHints(item) {
    const hints = [];
    if (item.main_actor.known_for[2]) {
        hints.push({
            type: hintTypes.MOVIE_TITLE,
            value: item.main_actor.known_for[2],
        })
    }
    if (item.poster_url) {
        hints.push({
            type: hintTypes.MOVIE_POSTER,
            value: item.poster_url,
        })
    }
    if (item.main_actor.known_for[0]) {
        hints.push({
            type: hintTypes.MOVIE_TITLE,
            value: item.main_actor.known_for[0],
        })
    }
    if (item.main_actor.profile_url) {
        hints.push({
            type: hintTypes.ACTOR_IMAGE,
            value: item.main_actor.profile_url,
        })
    }
    return hints;
}

export default function getQuestion(actors, questionBase, item) {
    return Object.assign({}, questionBase, {
        type: ACTOR_NAME,
        answers: shuffle(getAnswers(item, actors)),
        hints: shuffle(getHints(item))
    })
}
