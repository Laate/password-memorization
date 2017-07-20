import React from 'react'
import './App.css'


export default class SettingsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.currentSettings
    }

    set = (setting, event) => {
        const newSetting = parseFloat(event.target.value, 10);
        console.log(newSetting);
        if (!isNaN(newSetting)) {
            this.setState({[setting]: newSetting})
        } else {
            this.setState({[setting]: ""})
        }
    };


    validate = (setting, value) => {
        switch (setting) {
            case "chunkSize":
                return typeof(value) === 'number' && value > 0 && parseInt(value, 10) === value;
            case "wordLength":
                return typeof(value) === 'number' && value > 0 && value <= 100 && parseInt(value, 10) === value;
            default:
                console.error("Couldn't validate unknown setting: " + setting);
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
                <p className="subtleText">{setting}</p>
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
                {this.settingsField("chunkSize")}
                {this.settingsField("wordLength")}
                <div>
                    <button className="btn" onClick={() => this.done()}>OK</button>
                </div>
            </div>
        );
    }

}
