import React from 'react';
import './App.css';
import TreeView from './TreeView'
import SettingsView from './SettingsView'
import { getChunkTree } from '../modules/ChunkModule'




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

    showSettings = () => {
        this.setState({hideSettings: false})
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
                        <i className="settingsButton fa fa-gear fa-spin-hover" onClick={this.showSettings}></i>
                        {this.state.hideSettings ?
                            <TreeView className="tree"
                                      width={1024}
                                      height={350}
                                      data={getChunkTree("abcdefghijklmn1234567890tail", this.state.settings.chunkSize)}/> :
                            <SettingsView currentSettings={this.state.settings} updateSettings={this.updateSettings}/>}
                    </div>
                </div>
            </div>
        );
    }
}
