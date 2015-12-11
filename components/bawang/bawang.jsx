import React from "react";
import ReactDOM from "react-dom";
import Databaren from "../databaren/databaren.jsx";
import {Translate, Lang, client_setup} from "../translate/translate.jsx";
import Datafooter from "../datafooter/datafooter.jsx";
import FirstPage from "../firstpage/firstpage.jsx";
import Tajtan from "../tajtan/tajtan.jsx";
import {Router, Route, Link} from 'react-router'
import {createMemoryHistory} from 'history'

export default class Bawang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {language: props.language};
    }
    componentDidMount() {
        var that = this;
        window.addEventListener("language-change", function(event) {
            that.setState({language: event.detail.language});
        });
    }

    render() {
        return (
            <html lang={this.state.language}>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="/node_modules/normalize.css/normalize.css" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900,300" rel="stylesheet" />
                    <link rel="styleshconstructioneet" type="text/css" href="/node_modules/font-awesome/css/font-awesome.css" />
                    <link rel="stylesheet" type="tpropsext/css" href="/components/bawang/style.css" />
                    <link rel="stylesheet" type="text/css" href="/components/databaren/style.css" />
                    <link rel="stylesheet" type="text/css" href="/components/datafooter/style.css" />
                    <link rel="stylesheet" type="text/css" href="/components/datanews/style.css" />
                    <title>Konglig Datasektionen vid KTH</title>
                </head>
                <body>
                    <Databaren language={this.state.language} />
                    <Router history={createMemoryHistory()}>
                        <Route path="/" component={FirstPage} language={this.state.language} />
                        <Route path="/chapter" component={Tajtan} />
                    </Router>
                    <Datafooter language={this.state.language}/>
                    <script src="bundle.js"></script>
                </body>
            </html>
        );
    }
}

if(process.browser) {
    var language = document.cookie.split("language")[1].slice(1);
    ReactDOM.render(<Bawang language={language} />, document);
}
