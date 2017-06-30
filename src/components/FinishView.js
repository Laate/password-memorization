import React from 'react'
import './FinishView.css'


export default class FinishView extends React.Component {

    render() {
        return (
            <div>
                <p>Completed the memorization</p>
                <div>
                    <button className="resetButton" onClick={() => this.props.reset()}>Reset</button>
                </div>
            </div>
        );
    }

}