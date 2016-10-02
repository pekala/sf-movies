import React, { Component } from 'react';
import Question from './components/Question';
import Result from './components/Result';
import stateReducer from './state-reducer';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = stateReducer(null, 'INIT');
        window.setInterval(() => {
            if (this.state.question) {
                this.setState(state => stateReducer(state, 'TICK'));
            }
        }, 1000);
    }
    onAnswer(answer) {
        this.setState(state => stateReducer(state, 'ANSWER', answer));
        window.setTimeout(() => {
            this.setState(state => stateReducer(state, 'RESULT_SHOWN'));
        }, 4000);
    }
    render() {
        const { question, result } = this.state;
        return (
            <div className="App">
                {question &&
                    <Question
                        onAnswer={answer => this.onAnswer(answer)}
                        {...question}
                    />
                }
                {!question && result &&
                    <Result {...result} />
                }
            </div>
        );
    }
}

export default App;
