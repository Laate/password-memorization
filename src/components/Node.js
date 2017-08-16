import React from 'react'
import PropTypes from 'prop-types'
import './Node.css'


const nodeProps = {
    text: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isLeaf: PropTypes.bool.isRequired,
    isSeen: PropTypes.bool.isRequired
};

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
        const showText = this.props.isActive && this.props.isLeaf && !this.props.isSeen;

        return (
            <g transform={`translate(${this.props.x}, ${this.props.y})`}>
                <circle className="node" fill={this.getColor()} r={radius}/>
                {showText && <text y={radius + 14}
                                   dy=".35em"
                                   className="nodeText noselect">{this.props.text}</text>}
            </g>
        );
    }
}

Node.propTypes = nodeProps;
