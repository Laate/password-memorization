import React from 'react'
import './InputView.css'


export default class InputView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            tries: 0
        };
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.value === this.props.chunk.left + this.props.chunk.right) {
            this.props.onComplete()
        } else {
            const tries = this.state.tries + 1;
            if (tries > 2) {
                this.props.onFail()
            } else {
                this.setState({tries: tries});
                alert(`Wrong, try again.\n${tries}/3 tries\nDEBUG: expected ${this.props.chunk.left + this.props.chunk.right}`)
            }
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