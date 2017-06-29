import React from 'react'
import './InputView.css'


export default class InputView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.value === this.props.chunk.left + this.props.chunk.right) {
            this.props.onComplete()
        } else {
            alert("Wrong, try again.\nDEBUG: expected " + (this.props.chunk.left + this.props.chunk.right))
        }
    };

    render() {
        return (
            <div>
                <div className="text">What was the text?</div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" className="input" value={this.state.value} onChange={this.handleChange} autoFocus/>
                    </label>
                    <div className="submit">press enter to submit</div>
                </form>
            </div>
        );
    }
}