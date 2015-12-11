// # Translate for isomorphic react applications.
// Introduces two new elements, <Translate> and <Lang lang="sv">. Lang should be put inside Translate.
// Uses a cookie, event window.addListener("language-change").

import React from "react";
import Dataswitch from "../dataswitch/dataswitch.jsx";



export function get_lang() {
    return document.cookie.split("language")[1].slice(1);
}

// Put inside <Translate>
// Set property lang="en" to filter it out
export var Lang = (props) => <span>{props.children}</span>; 

export class Translate extends React.Component {
    render() {
        for(var child in this.props.children) {
            if(this.props.children[child].props.lang == this.context.language) {
                var text = this.props.children[child];
            }
        }
        return <span>{text}</span>;
    }
}
Translate.contextTypes = {
    language: React.PropTypes.string
}

export class LanguageSwitcher extends React.Component {
    render() {
        return <Dataswitch
            onChange={this.change}
            alternatives={this.props.languages}
            values={this.props.codes}
            value={this.context.language}
            />;
    }
    change(value) {
        document.cookie = "language=" + value;
        var event = new Event("language-change");
        event.detail = {
            language: value
        };
        window.dispatchEvent(event);
    }
}
LanguageSwitcher.contextTypes = {
    language: React.PropTypes.string
}

export class TranslateContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {language: props.startlang};
    }
    componentDidMount() {
        var that = this;
        window.addEventListener("language-change", function(event) {
            that.setState({language: event.detail.language});
        });
    }
    getChildContext() {
        return {
            language: this.state.language
        }
    }
    render() {
        return <div>{this.props.children}</div>;
    }
}
TranslateContainer.childContextTypes = {
    language: React.PropTypes.string
};
