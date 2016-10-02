import data from '../../../preprocessing/processed-data';
import shuffle from 'lodash.shuffle';
import getMovieQuestion from './movie';
import getActorQuestion from './actor';

const actors = data.map(item => item.actor_1);
const movies = data.map(item => item.title);

const getMovieQuestionBound = getMovieQuestion.bind(null, movies);
const getActorQuestionBound = getActorQuestion.bind(null, actors);

const getQuestionBase = item => ({
    location: {
        movieTitle: item.title,
        movieLocation: item.locations,
        address: item.full_address,
        geometry: item.geometry,
    },
    points: 2000,
    timeLeft: 24,
    wasAnswered: false,
    wasAnsweredCorrectly: null,
});

export default function getQuestions(count) {
    return shuffle(data).slice(0, count + 1).map(item => {
        if (Math.random() > 0.5) {
            return getMovieQuestionBound(getQuestionBase(item), item);
        }
        return getActorQuestionBound(getQuestionBase(item), item);
    });
}
