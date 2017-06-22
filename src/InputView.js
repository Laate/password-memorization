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

    /* NOTE: due to way the chunks are shown with space between them it's not completely clear whether the input should
     * also contain whitespace or not. A solution is to just strip all whitespace from the input. The problem being that,
     * if the word being memorized contains whitespace, we will ignore it also.
     * TODO handle whitespace in a reasonable manner */
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.strip(this.state.value) === this.strip(this.props.chunk.left + this.props.chunk.right)) {
            this.props.onComplete()
        } else {
            alert("Wrong, try again.\nExpected: " + (this.props.chunk.left + this.props.chunk.right))
        }
    };

    // Removes *all* whitespace from a string
    strip(string) {
     return string.replace(/\s/g,"")
    }

    render() {
        return (
            <div>
                <div className="text">What was the text?</div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" className="input" value={this.state.value} onChange={this.handleChange} autoFocus/>
                    </label>
                    <input type="submit" className="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}