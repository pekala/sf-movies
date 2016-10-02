import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import * as types from '../../questions/questionTypes';
import * as hintTypes from '../../questions/hintTypes';
import Question from './Question';

storiesOf('Question', module)
.add('actor', () => (
    <Question
        type={types.ACTOR_NAME}
        points={300}
        timeLeft={20}
        location={{
            movieTitle: 'Some movie',
            movieLocation: 'Some place',
        }}
        hints={[
            { isRevealed: true, type: hintTypes.MOVIE_TITLE, value: 'Milk' },
            { isRevealed: false, type: hintTypes.MOVIE_TITLE, value: 'The Assassination of Richard Nixon' },
            { isRevealed: true, type: hintTypes.MOVIE_POSTER, value: 'https://image.tmdb.org/t/p/w780/sFYmJJSVXqfqPI79tx4UG4IR5Jb.jpg' },
            { isRevealed: true, type: hintTypes.ACTOR_IMAGE, value: 'http://media.thinkceleb.com/wp-content/uploads/2016/05/moviepilot1.jpeg' },
        ]}
        answers={['Benny Hill', 'Sean Penn', 'Tom Hanks', 'Charlie Sheen']}
    />
))
.add('movie', () => (
    <Question
        type={types.MOVIE_TITLE}
        points={2000}
        timeLeft={2}
        location={{
            movieTitle: 'Some movie',
            movieLocation: 'Some place',
        }}
        hints={[
            { isRevealed: true, type: hintTypes.MOVIE_GENRES, value: 'Comedy' },
            { isRevealed: false, type: hintTypes.MOVIE_TITLE, value: 'The Assassination of Richard Nixon' },
            { isRevealed: true, type: hintTypes.MOVIE_POSTER, value: 'https://image.tmdb.org/t/p/w780/sFYmJJSVXqfqPI79tx4UG4IR5Jb.jpg' },
            { isRevealed: true, type: hintTypes.ACTOR_IMAGE, value: 'http://media.thinkceleb.com/wp-content/uploads/2016/05/moviepilot1.jpeg' },
        ]}
        answers={['Forrest Gump', 'Gran Torino', 'Life of Brian', 'Thin Red Line']}
    />
));
