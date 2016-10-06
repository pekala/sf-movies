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
        onAnswerClicked={action('answer')}
        onHintClicked={action('hint')}
        timeLeft={20}
        location={{
            movieTitle: 'Some movie',
            movieLocation: 'Some place',
        }}
        hints={[
            { id: 'someId1', isRevealed: true, type: hintTypes.MOVIE_TITLE, value: 'Milk' },
            { id: 'someId2', isRevealed: false, type: hintTypes.MOVIE_TITLE, value: 'The Assassination of Richard Nixon' },
            { id: 'someId3', isRevealed: true, type: hintTypes.MOVIE_POSTER, value: 'https://image.tmdb.org/t/p/w780/sFYmJJSVXqfqPI79tx4UG4IR5Jb.jpg' },
            { id: 'someId4', isRevealed: true, type: hintTypes.ACTOR_IMAGE, value: 'http://media.thinkceleb.com/wp-content/uploads/2016/05/moviepilot1.jpeg' },
        ]}
        answers={['Benny Hill', 'Sean Penn', 'Tom Hanks', 'Charlie Sheen']}
    />
))
.add('movie', () => (
    <Question
        type={types.MOVIE_TITLE}
        points={2000}
        onAnswerClicked={action('answer')}
        onHintClicked={action('hint')}
        timeLeft={2}
        location={{
            movieTitle: 'Some movie',
            movieLocation: 'Some place',
        }}
        hints={[
            { id: 'someId1', isRevealed: true, type: hintTypes.MOVIE_GENRES, value: 'Comedy Drama Horror Long Genre' },
            { id: 'someId2', isRevealed: true, type: hintTypes.MOVIE_TAGLINE, value: 'One man is copying the most notorious killers in history one at a time. Together, two women must stop him from killing again. Or they\'re next.' },
            { id: 'someId3', isRevealed: true, type: hintTypes.MOVIE_POSTER, value: 'https://image.tmdb.org/t/p/w780/sFYmJJSVXqfqPI79tx4UG4IR5Jb.jpg' },
            { id: 'someId4', isRevealed: true, type: hintTypes.ACTOR_IMAGE, value: 'http://media.thinkceleb.com/wp-content/uploads/2016/05/moviepilot1.jpeg' },
        ]}
        answers={['Forrest Gump', 'Really Long Movie Title: Part 2 Something', 'Life of Brian', 'Thin Red Line']}
    />
));
