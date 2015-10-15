// # Translate for isomorphic react applications.
// Introduces two new elements, <Translate> and <Lang lang="sv">. Lang should be put inside Translate.
// Uses a cookies, global/window variable and an event window.addListener("language-change").

import React from "react";
import Dataswitch from "../dataswitch/dataswitch.jsx";


export function client_setup() {
    var cookies = document.cookie.split(";");
    for(var cookie in cookies) {
        var parts = cookies[cookie].split("=");
        if(parts[0] == "language") {
            var language = parts[1];
        }
    }
    return language;
}

// Identifices the what language to send to the client, looking at cookies and accept-header
// Takes express res and req
export function server_setup(res, req) {
    if(req.cookies.language) {
        var lang = req.cookies.language;
    } else {
        // Set language cookie based on browser setting. Prefer Swedish default to English;
        var lang = req.acceptsLanguages(["sv", "en"]);
        if(!lang) {
            lang = "en";
        }
        res.cookie("language", lang, {
            maxAge: 9000000000
        });
    } 
    return lang;
}

// Put inside <Translate>
// Set property lang="en" to filter it out
export var Lang = (props) => <span>{props.children}</span>; 

export class Translate extends React.Component {
    render() {
        for(var child in this.props.children) {
            if(this.props.children[child].props.lang == this.props.language) {
                var text = this.props.children[child];
            }
        }
        return <span>{text}</span>;
    }
}

export class LanguageSwitcher extends React.Component {
    render() {
        return <Dataswitch
            onChange={this.change}
            alternatives={this.props.languages}
            values={this.props.codes}
            value={this.props.value}
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
