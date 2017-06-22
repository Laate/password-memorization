import React from 'react'
import './StartView.css'


export default class StartView extends React.Component {

    render() {
        return (
            <div>
                <p>Welcome</p>
                <p>The idea is to memorize progressingly larger chunks the whole word is memorized.</p>
                <button className="startButton" onClick={() => this.props.start()}>Start</button>
            </div>
        );
    }

}



