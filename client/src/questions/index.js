import data from './data';
import shuffle from 'lodash.shuffle';
import uniq from 'lodash.uniq';
import uniqueId from 'lodash.uniqueid';
import _getMovieQuestion from './movie';
import _getActorQuestion from './actor';

const actors = uniq(data.map(item => item.actor_1));
const movies = uniq(data.map(item => item.title));
const getMovieQuestion = _getMovieQuestion.bind(null, movies);
const getActorQuestion = _getActorQuestion.bind(null, actors);

const getQuestionBase = item => ({
    id: uniqueId('question_'),
    location: {
        funFact: item.fun_facts,
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
    return shuffle(data).slice(0, count).map(item => {
        if (Math.random() > 0.5 && item.main_actor) {
            return getActorQuestion(getQuestionBase(item), item);
        }
        return getMovieQuestion(getQuestionBase(item), item);
    });
}
