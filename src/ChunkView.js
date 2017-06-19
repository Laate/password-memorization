import React from 'react'


export default class ChunkView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            remainingTime: this.props.time
        }
    }

    componentWillMount() {
        this.remainingTimer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.remainingTimer)
    }

    tick = () => {
        const remainingTime = this.state.remainingTime - 1000;
        console.log("tick " + remainingTime);
        if (remainingTime <= 0) {
            this.props.onComplete()
        } else {
            this.setState({ remainingTime: remainingTime })
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



