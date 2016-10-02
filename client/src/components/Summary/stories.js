import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Summary from './Summary';

storiesOf('Summary', module)
.add('positive', () => (
    <Summary points={3000} />
))
.add('negative', () => (
    <Summary points={-3000} />
));
