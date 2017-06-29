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

    initViewQueue = (word) => {
        const viewQueue = [];
        const chunks = getChunks(word);

        for (let i = 0; i < chunks.length; i++) {
            console.log("chunk " + i + " = " + JSON.stringify(chunks[i]));
            const chunk = chunks[i];
            viewQueue.push(
                <ChunkView chunk={chunk} onComplete={this.changeView} time={3000}/>,
                <InputView chunk={chunk} onComplete={this.changeView}/>);
        }
        viewQueue.push(<FinishView/>);

        return viewQueue
    };

    start = (word) => {
        this.setState({viewQueue: this.initViewQueue(word)});
    };

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
