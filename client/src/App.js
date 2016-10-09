import React, { Component } from 'react';
import ReactCSSTransitionReplace from 'react-addons-css-transition-group';
import Question from './components/Question';
import QuestionIntro from './components/QuestionIntro';
import Result from './components/Result';
import Summary from './components/Summary';
import Intro from './components/Intro';
import stateReducer from './state-reducer';
import './App.css';

const GAME_TICK_MS = 1000;
const RESULT_DURATION_MS = 3000;

class App extends Component {
    constructor() {
        super();
        this.state = {};
    }
    onStart() {
        this.setState(state => stateReducer(state, 'START'));
        window.setInterval(() => {
            const { question, showingIntro } = this.state;
            if (question && question.timeLeft && !showingIntro) {
                return this.setState(state => stateReducer(state, 'TICK'));
            }
            if (question && !question.timeLeft) {
                return this.onAnswer(null);
            }
        }, GAME_TICK_MS);
    }
    onAnswer(answer) {
        this.setState(state => stateReducer(state, 'ANSWER', answer));
        window.setTimeout(() => {
            this.setState(state => stateReducer(state, 'RESULT_SHOWN'));
        }, RESULT_DURATION_MS);
    }
    onHintRequested(hintId) {
        this.setState(state => stateReducer(state, 'HINT_REQUESTED', hintId));
    }
    startAgain() {
        this.setState(state => stateReducer(state, 'RESTART'));
    }
    onReady() {
        this.setState(state => stateReducer(state, 'READY_CLICKED'));
    }
    render() {
        const { question, result, showingIntro, points, gameEnded } = this.state;
        let visibleComponent;
        if (question && !showingIntro) {
            visibleComponent = (
                <Question
                    key="question"
                    onAnswerClicked={answer => this.onAnswer(answer)}
                    onHintClicked={hintId => this.onHintRequested(hintId)}
                    {...question}
                />
            );
        } else if (question && showingIntro) {
            visibleComponent = (
                <QuestionIntro
                    key="questionIntro"
                    onReady={() => this.onReady()}
                    type={question.type}
                    durationSeconds={question.location.funFact ? 10 : 5}
                    {...question.location}
                />
            );
        } else if (!question && result && !gameEnded) {
            visibleComponent = <Result key="result" {...result} />;
        } else if (!question && gameEnded) {
            visibleComponent = <Summary key="summary" points={points} onStartAgain={() => this.startAgain()} />;
        } else if (!question && !gameEnded && !result) {
            visibleComponent = <Intro key="intro" onStart={() => this.onStart()} />;
        }
        return (
            <div className="App">
                <ReactCSSTransitionReplace
                    component="div"
                    transitionName="page"
                    transitionEnterTimeout={650}
                    transitionLeaveTimeout={650}
                >
                    {visibleComponent}
                </ReactCSSTransitionReplace>
            </div>
        );
    }
}

export default App;
