// # Translate for isomorphic react applications.
// Introduces two new elements, <Translate> and <Lang lang="sv">. Lang should be put inside Translate.
// Uses a cookies, global/window variable and an event window.addListener("language-change").

var React = require("react");
var Dataswitch = require("../dataswitch/dataswitch.jsx");


function client_setup() {
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
function server_setup(res, req) {
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
class Lang extends React.Component {
    render() {
        return <span>{this.props.children}</span>;
    }
}

class Translate extends React.Component {
    render() {
        for(var child in this.props.children) {
            if(this.props.children[child].props.lang == this.props.language) {
                var text = this.props.children[child];
            }
        }
        return <span>{text}</span>;
    }
}

class LanguageSwitcher extends React.Component {
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


export default {
    Translate: Translate,
    Lang: Lang,
    server_setup: server_setup,
    client_setup: client_setup,
    LanguageSwitcher: LanguageSwitcher
}
