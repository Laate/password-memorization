import React from 'react'


export default class Link extends React.Component {

    diagonal = (source, target) => {
        return "M" + source.x + "," + source.y
            + "C" + (source.x + target.x) / 2 + "," + source.y
            + " " + (source.x + target.x) / 2 + "," + target.y
            + " " + target.x + "," + target.y };

    render() {
        return <path className="link"
                     d={this.diagonal(this.props.source, this.props.target)}
                     stroke="#226CA7"
                     fill="transparent"/>
    }

}