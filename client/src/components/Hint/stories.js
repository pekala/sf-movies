import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Hint from './Hint';
import * as types from './types';

storiesOf('Hint', module)
.add('movie title', () => (
    <Hint type={types.MOVIE_TITLE} value="Forrest Gump" />
))
.add('movie poster', () => (
    <Hint type={types.MOVIE_POSTER} value="https://image.tmdb.org/t/p/w780/sFYmJJSVXqfqPI79tx4UG4IR5Jb.jpg" />
));
