import React, { Component } from 'react';
import Question from './components/Question';
import QuestionIntro from './components/QuestionIntro';
import Result from './components/Result';
import stateReducer from './state-reducer';
import './App.css';

const GAME_TICK_MS = 1000;
const RESULT_DURATION_MS = 3000;

class App extends Component {
    constructor() {
        super();
        this.state = stateReducer(null, 'INIT');
        window.setInterval(() => {
            if (this.state.question && this.state.question.timeLeft && !this.state.showingIntro) {
                return this.setState(state => stateReducer(state, 'TICK'));
            }
            if (this.state.question && !this.state.question.timeLeft) {
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
    onReady() {
        this.setState(state => stateReducer(state, 'READY_CLICKED'));
    }
    render() {
        const { question, result, showingIntro } = this.state;
        return (
            <div className="App">
                {question && !showingIntro &&
                    <Question
                        onAnswer={answer => this.onAnswer(answer)}
                        {...question}
                    />
                }
                {question && showingIntro &&
                    <QuestionIntro onReady={() => this.onReady()} type={question.type} {...question.location} />
                }
                {!question && result &&
                    <Result {...result} />
                }
            </div>
        );
    }
}

export default App;
