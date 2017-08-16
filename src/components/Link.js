import React from 'react'
import PropTypes from 'prop-types'


const linkProps = {
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
};

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

Link.propTypes = linkProps;
