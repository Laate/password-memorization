import React from 'react'
import PropTypes from 'prop-types'
import './App.css'


const settingsViewProps = {
    currentSettings: PropTypes.shape({
        chunkSize: PropTypes.number,
        wordLength: PropTypes.number
    }).isRequired,
    updateSettings: PropTypes.func.isRequired
};

export default class SettingsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { settings: this.props.currentSettings }
    }

    // Assumes that settings have numeric values
    set = (setting, event) => {
        const newValue = parseFloat(event.target.value, 10);
        const newSettings = { ...this.state.settings };
        if (isNaN(newValue)) {
            newSettings[setting] = ""
        } else {
            newSettings[setting] = newValue
        }
        this.setState({ settings: newSettings })
    };

    isValid = (setting, value) => {
        switch (setting) {
            case "chunkSize":
                return typeof(value) === 'number' && value > 0 && value <= 100 && parseInt(value, 10) === value;
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
                       min="1"
                       max="100"
                       className="input"
                       value={this.state.settings[setting]}
                       placeholder={setting}
                       onChange={(event) => this.set(setting, event)}/>
                <p className="subtleText">{setting}</p>
            </div>;
        return settingsField
    };

    done = () => {
        const settings = this.state.settings;
        for (let setting in settings) {
            if (settings.hasOwnProperty(setting) && !this.isValid(setting, settings[setting])) {
                alert("Invalid value for " + setting);
                return;
            }
        }
        this.props.updateSettings(settings);
    };

    render() {
        return (
            <div>
                <p>Settings</p>
                {this.settingsField("chunkSize")}
                <text className="subtleText">NOTE: changing wordLength will generate a new word</text>
                {this.settingsField("wordLength")}
                <div>
                    <button className="btn" onClick={() => this.done()}>Apply</button>
                </div>
            </div>
        );
    }
}

SettingsView.propTypes = settingsViewProps;
