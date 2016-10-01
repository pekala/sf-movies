import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Question from './Question';
import * as types from './types';
import * as hintTypes from '../Hint/types';

storiesOf('Question', module)
.add('default', () => (
    <Question
        type={types.ACTOR_NAME}
        points={300}
        timeLeft={20}
        hints={[
            { isRevealed: true, type: hintTypes.MOVIE_TITLE, value: 'Milk' },
            { isRevealed: false, type: hintTypes.MOVIE_TITLE, value: 'The Assassination of Richard Nixon' },
            { isRevealed: false, type: hintTypes.MOVIE_POSTER, value: 'https://image.tmdb.org/t/p/w780/sFYmJJSVXqfqPI79tx4UG4IR5Jb.jpg' },
            { isRevealed: true, type: hintTypes.ACTOR_IMAGE, value: 'http://media.thinkceleb.com/wp-content/uploads/2016/05/moviepilot1.jpeg' },
        ]}
        answers={['Benny Hill', 'Sean Penn', 'Tom Hanks', 'Charlie Sheen']}
    />
));
