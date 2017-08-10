import React from 'react';
import './App.css';
import TreeView from './TreeView'
import SettingsView from './SettingsView'
import { chunkTree, randomWord } from '../modules/ChunkModule'




export default class ChunkApp extends React.Component {
    constructor() {
        super();

        this.state = {
            settings: this.getSettings(),
            hideSettings: true
        };
    }

    getSettings = () => {
        const savedSettings = JSON.parse(localStorage.getItem("settings"));
        const defaultSettings = Object.freeze({
            chunkSize: 3,
            wordLength: 28
        });

        // Comparing keys to validate the settings isn't foolproof since the fields can theoretically contain
        // nonsensical values, but the values are checked when saving.
        if (savedSettings &&
            JSON.stringify(Object.keys(savedSettings)) === JSON.stringify(Object.keys(defaultSettings))) {
            console.log("Loaded settings from localStorage");
            return savedSettings
        } else {
            console.log("Loaded default settings");
            return defaultSettings
        }
    };

    getWord = () => {
        const savedWord = localStorage.getItem("word");
        if (savedWord && savedWord.length === this.state.settings.wordLength) {
            return savedWord
        } else {
            const randWord = randomWord(this.state.settings.wordLength);
            localStorage.setItem("word", randWord);
            localStorage.setItem("memorisedCount", 0);
            return randWord
        }
    };

    toggleSettings = () => {
        this.setState({hideSettings: !this.state.hideSettings})
    };

    updateSettings = (newSettings) => {
        this.setState({
            settings: newSettings,
            hideSettings: true
        })
    };

    render() {
        return (
            <div className="outer">
                <div className="middle">
                    <div className="layout">
                        <i className="settingsButton fa fa-gear fa-spin-hover" onClick={this.toggleSettings}></i>
                        {this.state.hideSettings ?
                            <TreeView className="tree"
                                      width={1024}
                                      height={350}
                                      data={chunkTree(this.getWord(), this.state.settings.chunkSize)}/> :
                            <SettingsView currentSettings={this.state.settings} updateSettings={this.updateSettings}/>}
                    </div>
                </div>
            </div>
        );
    }
}
