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
        const style = {
            'width': `${(this.state.remainingTime / this.props.time) * 100}%`
        };

        return (
            <div>
                <div className="chunks">
                    <div className="chunk left">{this.props.chunk.left}</div>
                    <div className="space"></div>
                    <div className="chunk right">{this.props.chunk.right}</div>
                </div>
                <div className="progressbar">
                    <div className="progress" style={style}></div>
                </div>
            </div>
        );
    }

}



