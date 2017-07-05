import React from 'react'
import './InputView.css'
import ChunkView from './ChunkView'
import InputView from './InputView'


export default class LearnView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChunk: true
        }
    }

    hideChunk = () => {
        this.setState({showChunk: false})
    };

    complete = () => {
        this.setState({showChunk: true});
        this.props.onComplete()
    };

    reset = () => {
        this.setState({showChunk: true})
    };


    render() {
        return this.state.showChunk ?
            <ChunkView chunk={this.props.chunk}
                       onComplete={this.hideChunk}
                       time={this.props.time}
                       delay={this.props.delay}/>
            :
            <InputView chunk={this.props.chunk}
                       onComplete={this.complete}
                       onFail={this.reset}/>
    }
}