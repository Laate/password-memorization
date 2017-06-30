import React from 'react';
import './App.css';
import InputView from './InputView'
import StartView from './StartView'
import ChunkView from "./ChunkView";
import FinishView from "./FinishView";
import { getChunks } from '../modules/ChunkModule'


export default class ChunkApp extends React.Component {
    constructor() {
        super();
        this.state = {viewQueue: [<StartView start={this.start}/>]};
    }

    initViewQueue = (word, time) => {
        const viewQueue = [];
        const chunks = getChunks(word);

        for (let i = 0; i < chunks.length; i++) {
            console.log("chunk " + i + " = " + JSON.stringify(chunks[i]));
            const chunk = chunks[i];
            viewQueue.push(
                <ChunkView chunk={chunk} onComplete={this.changeView} time={time*1000}/>,
                <InputView chunk={chunk} onComplete={this.changeView}/>);
        }
        viewQueue.push(<FinishView reset={this.reset}/>);

        return viewQueue
    };

    start = (word, time) => {
        this.setState({viewQueue: this.initViewQueue(word, time)});
    };

    changeView = () => {
        const newQueue = this.state.viewQueue.slice(1);
        this.setState({
            viewQueue: newQueue
        })
    };

    reset = () => {
        this.setState({
            viewQueue: [<StartView start={this.start}/>]
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
