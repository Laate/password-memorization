import React from 'react'
import './ChunkView.css'


export default class ChunkView extends React.Component {

    constructor(props) {
        super(props);
        this.tickrate = 10;
        this.state = {
            remainingTime: this.props.time
        }
    }

    componentWillMount() {
        this.remainingTimer = setInterval(this.tick, this.tickrate);
    }

    componentWillUnmount() {
        clearInterval(this.remainingTimer)
    }

    tick = () => {
        const remainingTime = this.state.remainingTime - this.tickrate;
        this.setState({remainingTime: remainingTime});
        if (remainingTime <= 0) {
            this.props.onComplete()
        }
    };

    render() {
        return (
            <div>
                <div>
                    <progress max="100" value={(this.state.remainingTime / this.props.time) * 100}></progress>
                </div>
                {this.props.chunk}
            </div>
        );
    }

}



