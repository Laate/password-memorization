import React from 'react'


export default class ChunkView extends React.Component {

    constructor(props) {
        super(props);
        this.tickrate = 1000;
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
                <p>{this.state.remainingTime / 1000} seconds left</p>
                {this.props.chunk}
            </div>
        );
    }

}



