import React from 'react'
import './StartView.css'


export default class StartView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    render() {
        return (
            <div>
                <p>Welcome</p>
                <p>The idea is to memorize progressively larger chunks until the whole word is memorized.</p>
                <div>
                    <input type="text" className="input" value={this.state.value} onChange={this.handleChange} autoFocus/>
                </div>
                <div className="helpText">Input the word you want to memorize</div>
                <div>
                    <button className="startButton" onClick={() => this.props.start(this.state.value)}>Start</button>
                </div>
            </div>
        );
    }

}



