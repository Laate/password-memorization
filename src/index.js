import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InputView from './InputView'
import StartView from './StartView'
import ChunkView from "./ChunkView";
import FinishView from "./FinishView";
import { getChunks } from './ChunkModule'


class ChunkApp extends React.Component {
    constructor() {
        super();

        const viewQueue = this.initViewQueue();
        this.state = {viewQueue: viewQueue};
    }

    initViewQueue() {
        const viewQueue = [<StartView start={this.changeView}/>];
        const chunks = getChunks("abcdef123456");

        for (let i = 0; i < chunks.length; i++) {
            console.log("chunk " + i + " = " + JSON.stringify(chunks[i]));
            const chunk = chunks[i];
            viewQueue.push(
                <ChunkView chunk={chunk} onComplete={this.changeView} time={3000}/>,
                <InputView chunk={chunk} onComplete={this.changeView}/>);
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
