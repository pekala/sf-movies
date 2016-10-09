import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Intro from './Intro';

storiesOf('Intro', module)
.add('default', () => (
    <Intro />
));
