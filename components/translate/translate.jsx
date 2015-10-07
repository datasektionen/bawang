// # Translate for isomorphic react applications.
// Introduces two new elements, <Translate> and <Lang lang="sv">. Lang should be put inside Translate.
// Uses a cookies, global/window variable and an event window.addListener("language-change").
// Don't forget to call client_setup and server_setup

var React = require("react");
var Dataswitch = require("../dataswitch/dataswitch.jsx");


function client_setup() {
    var cookies = document.cookie.split(";");
    for(var cookie in cookies) {
        var parts = cookies[cookie].split("=");
        if(parts[0] == "language") {
            window.language = parts[1];
        }
    }
}

function server_setup(lang) {
    global.language = lang;
}
    

class Lang extends React.Component {
    render() {
        return <span>{this.props.children}</span>;
    }
}

class Translate extends React.Component {
    componentDidMount() {
        var that = this;
        window.addEventListener("language-change", function(event) {
            that.forceUpdate();
        });
    }
    render() {
        var language = global ? global.language : window.language;
        for(var child in this.props.children) {
            if(this.props.children[child].props.lang == language) {
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
            value={global ? global.language : window.language}
            />;
    }
    change(value) {
        window.language = value;
        document.cookie = "language=" + value;
        window.dispatchEvent(new Event("language-change"));
    }
}


export default {
    Translate: Translate,
    Lang: Lang,
    client_setup: client_setup,
    server_setup: server_setup,
    LanguageSwitcher: LanguageSwitcher
}
