import React from 'react'
import './StartView.css'
import SettingsView from './SettingsView'


export default class StartView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            word: "",
            settings: this.getSettings(),
            hideSettings: true
        };
    }

    setWord = (event) => {
        this.setState({word: event.target.value});
    };

    // TODO error checking
    getSettings = () => {
        const savedSettings = JSON.parse(localStorage.getItem("settings"));

        if (savedSettings) {
            console.log("Loaded settings from localStorage");
            return savedSettings
        } else {
            return {
                time: 3,
                delay: 2,
                chunkSize: 3,
                repetitions: 1
            }
        }
    };

    showSettings = () => {
        this.setState({hideSettings: false})
    };

    updateSettings = (newSettings) => {
        this.setState({
            settings: newSettings,
            hideSettings: true,
        })
    };

    start = () => {
        if (this.state.word.length > 0) {
            this.props.start(this.state.word, this.state.settings)
        } else {
            alert("Input the word you want to memorize")
        }
    };

    render() {
        const layout =
            <div>
                <p>Welcome</p>
                <p>The idea is to memorize progressively larger chunks until the whole word is memorized</p>
                <div className="inputDiv">
                    <input type="text"
                           className="input"
                           value={this.state.word}
                           placeholder="Word"
                           onChange={this.setWord}
                           spellCheck="false"
                           autoFocus/>
                </div>
                <div>
                    <button className="btn" onClick={() => this.showSettings()}>Settings</button>
                </div>
                <div>
                    <button className="btn" onClick={() => this.start()}>Start</button>
                </div>
            </div>;
        return this.state.hideSettings ? layout : <SettingsView currentSettings={this.state.settings}
                                                                updateSettings={this.updateSettings}/>
    }

}



