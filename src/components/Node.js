import React from 'react'


export default class Node extends React.Component {

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
            <g className="node" transform={`translate(${this.props.x}, ${this.props.y})`}>
                <circle fill={this.getColor()} r={radius} onClick={this.props.handleClick}/>
                <text y={radius + 9} dy=".35em" textAnchor="middle" fill="white" fontSize="large">{this.props.text}</text>
            </g>
        );
    }

}