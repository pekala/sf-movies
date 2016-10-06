import React, { Component, PropTypes } from 'react';
import * as types from '../../questions/questionTypes';
import QuestionHeadline from '../Question/QuestionHeadline';
import mapStyle from './mapStyle';
import './QuestionIntro.css';
import mapBackground from './map.png';

window.googleMapsLoaded = window.googleMapsLoaded || new Promise(resolve => {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAHD6se9yIbS9jLO0aw5e10wFlHdNj93VY');
    script.onload = resolve;
    document.body.appendChild(script);
});

class QuestionIntro extends Component {
    constructor() {
        super();
        this.state = {
            mapsLoaded: false,
        };
        window.googleMapsLoaded.then(() => {
            this.setState({
                mapsLoaded: true,
            });
        })
    }
    componentDidMount() {
        this.timeout = window.setTimeout(this.props.onReady, this.props.durationSeconds * 1000);
    }
    componentWillUnmount() {
        window.setTimeout(this.timeout);
    }
    componentDidUpdate() {
        if (this.state.mapsLoaded) {
            const map = new window.google.maps.Map(this.map, {
                styles: mapStyle,
                zoom: 15,
                disableDefaultUI: true,
                center: this.props.geometry.location
            });
            const infoWindow = new window.google.maps.InfoWindow({
                content: this.props.address
            });
            const marker = new window.google.maps.Marker({
                position: this.props.geometry.location,
                map: map
            });
            infoWindow.open(map, marker);
        }
    }
    render() {
        return (
            <div className="QuestionIntro">
                <div className="QuestionIntro--header">
                    <QuestionHeadline {...this.props} />
                </div>
                <div
                    className="QuestionIntro-map-wrapper"
                    style={{ backgroundImage: `url('${mapBackground}')` }}
                >
                    <div
                        ref={c => this.map = c}
                        className="QuestionIntro--map"
                    />
                </div>
                <div className="QuestionIntro--skip">
                    <button onClick={this.props.onReady}>Skip</button>
                </div>
                {this.props.funFact &&
                    <div className="QuestionIntro--fun-fact">
                        {this.props.funFact}
                    </div>
                }
            </div>
        );
    }
}

QuestionIntro.propTypes = {
    address: PropTypes.string.isRequired,
    durationSeconds: PropTypes.string.number,
    funFact: PropTypes.string,
    geometry: PropTypes.object.isRequired,
    movieLocation: PropTypes.string.isRequired,
    movieTitle: PropTypes.string.isRequired,
    onReady: PropTypes.func.isRequired,
    type: PropTypes.oneOf(Object.keys(types).map(key => types[key])),
}

export default QuestionIntro;
