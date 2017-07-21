import React from 'react'
import './Node.css'


export default class Node extends React.Component {
    constructor(props) {
        super(props);

        this.state = {showText: false};
    }

    componentWillUnmount() {
        clearTimeout(this.textTimer);
    }

    handleClick = () => {
        if (this.props.isActive && this.props.isLeaf && !this.state.showText) {
            this.setState({showText: true});
            this.textTimer = setTimeout(() => {
                this.setState({showText: false})
            }, 2000)
        }
    };

    getColor = () => {
        if (this.props.isActive) {
            return "white"
        } else if (this.props.isCompleted) {
            return "#4FBC2D"
        } else {
            return "#226CA7"
        }
    };

    render() {
        const radius = this.props.radius + (this.props.isActive ? 4 : 0);

        return (
            <g transform={`translate(${this.props.x}, ${this.props.y})`}>
                <circle className="node" fill={this.getColor()} r={radius} onClick={this.handleClick}/>
                {(this.props.isLeaf && this.props.isActive) ? <text y={0}
                                                                    dy=".35em"
                                                                    className="questionMark noselect"
                                                                    onClick={this.handleClick}>?</text> : null}
                {this.state.showText && <text y={radius + 14}
                                              dy=".35em"
                                              className="nodeText noselect">{this.props.text}</text>}
            </g>
        );
    }

}