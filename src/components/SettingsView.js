import React from 'react'
import './SettingsView.css'

export default class SettingsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.currentSettings
    }

    set = (setting, event) => {
        const newSetting = parseFloat(event.target.value, 10);
        if (!isNaN(newSetting)) {
            this.setState({[setting]: newSetting})
        } else {
            this.setState({[setting]: ""})
        }
    };

    validate = (setting, value) => {
        switch (setting) {
            case "time":
                return typeof(value) === 'number' && value > 0;
            case "delay":
                return typeof(value) === 'number' && value >= 0;
            case "chunkSize":
                return typeof(value) === 'number' && value > 0 && parseInt(value, 10) === value;
            case "repetitions":
                return typeof(value) === 'number' && value > 0 && parseInt(value, 10) === value;
            default:
                console.warn("Couldn't validate unknown setting type " + setting);
                return false
        }
    };

    settingsField = (setting) => {
        const settingsField =
            <div>
                <input type="number"
                       pattern="[0-9]*"
                       min="0"
                       className="input"
                       value={this.state[setting]}
                       placeholder={setting}
                       onChange={(event) => this.set(setting, event)}/>
                <p className="settingsText">{setting}</p>
            </div>;
        return settingsField
    };

    done = () => {
        const settings = this.state;
        for (let setting in settings) {
            if (settings.hasOwnProperty(setting) && !this.validate(setting, settings[setting])) {
                alert("Invalid value for " + setting);
                return;
            }
        }
        // TODO localStorage might not be available
        localStorage.setItem("settings", JSON.stringify(this.state));
        this.props.updateSettings(this.state);
    };

    render() {
        return (
            <div>
                <p>Settings</p>
                {this.settingsField("time")}
                {this.settingsField("delay")}
                {this.settingsField("chunkSize")}
                {this.settingsField("repetitions")}
                <div>
                    <button className="btn" onClick={() => this.done()}>OK</button>
                </div>
            </div>
        );
    }

}