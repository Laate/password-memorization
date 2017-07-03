import React from 'react';
import './App.css';
import InputView from './InputView'
import StartView from './StartView'
import ChunkView from "./ChunkView";
import FinishView from "./FinishView";
import { getChunks, getChunksSequential } from '../modules/ChunkModule'


export default class ChunkApp extends React.Component {
    constructor() {
        super();
        this.state = {viewQueue: [<StartView start={this.start}/>]};
    }

    initViewQueue = (word, settings) => {
        const viewQueue = [];
        const chunks = settings.mode === "normal" ?
                getChunks(word, settings.chunkSize) :
                getChunksSequential(word, settings.chunkSize);

        for (let i = 0; i < chunks.length; i++) {
            console.log("Chunk " + i + " = " + JSON.stringify(chunks[i]));
            const chunk = chunks[i];
            for (let j = 0; j < settings.repetitions; j++) {
                viewQueue.push(
                    <ChunkView chunk={chunk} onComplete={this.changeView} time={settings.time * 1000}
                               delay={settings.delay * 1000}/>,
                    <InputView chunk={chunk} onComplete={this.changeView}/>);
            }
        }
        viewQueue.push(<FinishView reset={this.reset}/>);

        return viewQueue
    };

    start = (word, settings) => {
        console.log("Starting with settings: " + JSON.stringify(settings));
        this.setState({viewQueue: this.initViewQueue(word, settings)});
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
