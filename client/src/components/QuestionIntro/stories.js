import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import * as types from '../../questions/questionTypes';
import QuestionIntro from './QuestionIntro';

storiesOf('QuestionIntro', module)
.add('default', () => (
    <QuestionIntro
        movieTitle="Some movie"
        movieLocation="Some place"
        address="somestreet"
        type={types.ACTOR_NAME}
        funFact="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, eum?"
        geometry={{
            bounds: {
                northeast: {
                    lat: 37.762854,
                    lng: -122.4046649
                },
                southwest: {
                    lat: 37.7595202,
                    lng: -122.4055608
                }
            },
            location: {
                lat: 37.761398,
                lng: -122.405173
            },
            location_type: 'GEOMETRIC_CENTER',
            viewport: {
                northeast: {
                    lat: 37.762854,
                    lng: -122.4037638697085
                },
                southwest: {
                    lat: 37.7595202,
                    lng: -122.4064618302915
                }
            }
        }}
    />
));


