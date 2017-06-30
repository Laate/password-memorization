import React from 'react'
import './ChunkView.css'


export default class ChunkView extends React.Component {

    constructor(props) {
        super(props);
        this.tickrate = 10;
        this.state = {
            remainingTime: this.props.time,
            showText: true
        }
    }

    componentWillMount() {
        this.remainingTimer = setInterval(this.tick, this.tickrate);
        document.addEventListener("keydown", this.handleKeyDown)
    }

    tick = () => {
        const remainingTime = this.state.remainingTime - this.tickrate;
        this.setState({remainingTime: remainingTime});
        if (remainingTime <= 0) {
            this.complete()
        }
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.complete()
        }
    };

    complete = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
        clearInterval(this.remainingTimer);
        // We don't want to immediately jump to inputting the word; only after a little delay
        this.setState({showText: false});
        setTimeout(this.props.onComplete, 2000)
    };

    render() {
        const style = {
            'width': `${(this.state.remainingTime / this.props.time) * 100}%`
        };

        const layout =
            <div>
                <div className="chunks">
                    <pre>
                        <div className="chunk left">{this.props.chunk.left}</div>
                        <div className="space"></div>
                        <div className="chunk right">{this.props.chunk.right}</div>
                    </pre>
                </div>
                <div className="progressbar">
                    <div className="progress" style={style}></div>
                </div>
                <div className="helpText">press enter to skip forward</div>
            </div>;

        return this.state.showText ? layout : <div>. . .</div>
    }

}



