import React from 'react'


export default class Link extends React.Component {
    constructor(props) {
        super(props);
        const {x1, y1, x2, y2} = this.props;
        this.diagonal =
              "M" + x1 + "," + y1
            + "C" + (x1 + x2) / 2 + "," + y1
            + " " + (x1 + x2) / 2 + "," + y2
            + " " + x2 + "," + y2
    }

    render() {
        return <path className="link"
                     d={this.diagonal}
                     stroke="#226CA7"
                     fill="transparent"/>
    }

}