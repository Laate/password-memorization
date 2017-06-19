import React from 'react'


export default class StartView extends React.Component {

    render() {
        return (
            <div>
                <p>Welcome to chunk memo</p>
                <p>Click the button to begin</p>
                <button onClick={() => this.props.start()}>Start</button>
            </div>
        );
    }

}



