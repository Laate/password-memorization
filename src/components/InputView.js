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
        const expected = this.props.mode === "normal" ?
            this.props.chunk.left + this.props.chunk.right :
            this.props.chunk;

        if (this.state.value === expected) {
            this.props.onComplete()
        } else {
            const tries = this.state.tries + 1;
            if (tries > 2) {
                this.props.onFail()
            } else {
                this.setState({tries: tries});
                alert(`Wrong, try again.\n${tries}/3 tries`)
            }
        }
    };

    render() {
        const style = this.props.mode === "sequential" ? {
            'width': `${this.props.chunk.length}em`
        } : null;

        return (
            <div>
                <div className="text">What was the text?</div>
                <form onSubmit={this.handleSubmit}>
                    {this.props.mode === "sequential" && <text className="seenText">{this.props.seen} </text>}
                    <label>
                        <input type="text"
                               className="input"
                               style={style}
                               value={this.state.value}
                               onChange={this.handleChange}
                               autoFocus/>
                    </label>
                    <div className="submit">press enter to submit</div>
                </form>
            </div>
        );
    }
}