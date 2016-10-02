import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Result from './Result';

storiesOf('Result', module)
.add('correct', () => (
    <Result correct points={1000} />
))
.add('incorrect', () => (
    <Result points={250} />
));
