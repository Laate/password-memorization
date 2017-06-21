import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InputView from './InputView'
import StartView from './StartView'
import ChunkView from "./ChunkView";
import FinishView from "./FinishView";


class ChunkApp extends React.Component {
    constructor() {
        super();

        const viewQueue = this.initViewQueue();
        this.state = {
            viewQueue: viewQueue,
            remainingTime: 3000
        };
    }

    initViewQueue() {
        // Example flow for the password "123456abcdef"
        // TODO make generalized and remove hardcoding
        const viewQueue = [<StartView start={this.changeView}/>];
        const chunks = ["123", "456", "123456", "abc", "def", "abcdef", "123456", "abcdef", "123456abcdef"];
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            viewQueue.push(
                <ChunkView chunk={chunk} onComplete={this.changeView} time={3000}/>,
                <InputView chunk={chunk} onComplete={this.changeView}/>
            );
        }
        viewQueue.push(<FinishView/>);

        return viewQueue
    }

    changeView = () => {
        const newQueue = this.state.viewQueue.slice(1);
        this.setState({
            viewQueue: newQueue
        })
    };

    render() {
        return (
            <div className="outer">
                <div className="middle">
                    <div className="layout">
                        {this.state.viewQueue[0]}
                    </div>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <ChunkApp/>,
    document.getElementById('root')
);
