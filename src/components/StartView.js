import React from 'react'
import './StartView.css'


export default class StartView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "",
            time: ""
        };
    }

    setWord = (event) => {
        this.setState({word: event.target.value});
    };

    setTime = (event) => {
        this.setState({time: event.target.value})
    };

    start = () => {
        if (this.state.word.length > 0 && !isNaN(this.state.time) && this.state.time >= 0) {
            this.props.start(this.state.word, this.state.time)
        } else {
            alert("Invalid settings")
        }
    };

    render() {
        return (
            <div>
                <p>Welcome</p>
                <p>The idea is to memorize progressively larger chunks until the whole word is memorized</p>
                <div className="inputDiv">
                    <input type="text" className="input" value={this.state.word} placeholder="Word" onChange={this.setWord} autoFocus/>
                </div>
                <div className="inputDiv">
                    <input type="number" pattern="[0-9]*" className="input" value={this.state.time} placeholder="Delay" onChange={this.setTime}/>
                </div>
                <div>
                    <button className="startButton" onClick={() => this.start()}>Start</button>
                </div>
            </div>
        );
    }

}



