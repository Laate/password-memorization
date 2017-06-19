import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InputView from './InputView'
import StartView from './StartView'
import ChunkModule from './ChunkModule'
import ChunkView from "./ChunkView";
import FinishView from "./FinishView";


class ChunkApp extends React.Component {
    constructor() {
        super();
        this.chunkModule = new ChunkModule();
        const firstChunk = this.chunkModule.next();
        this.state = {
            chunk: firstChunk,
            viewQueue: [
                <StartView start={this.changeView}/>,
                <ChunkView chunk={firstChunk} onComplete={this.changeView} time={6000}/>,
                <InputView chunk={firstChunk} onComplete={this.changeView}/>,
                <FinishView/>
            ],
            remainingTime: 3000
        };
    }

    changeView = () => {
        const newQueue = this.state.viewQueue.slice(1);
        this.setState({
            viewQueue: newQueue
        })
    };

    render() {
        return (
            <div className="layout">
                {this.state.viewQueue[0]}
                {this.chunkModule.texts}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <ChunkApp/>,
    document.getElementById('root')
);
