import React, { Component } from 'react';
import Question from './components/Question';
import stateReducer from './state-reducer';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = stateReducer(null, 'INIT');
        window.setInterval(() => {
            this.setState(state => stateReducer(state, 'TICK'));
        }, 1000);
    }
    render() {
        return (
            <div className="App">
                <Question {...this.state.question} />
            </div>
        );
    }
}

export default App;
