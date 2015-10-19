import React from "react";
import ReactDOM from "react-dom";
import merge from "merge";
import Databaren from "../databaren/databaren.jsx";
import {Translate, Lang, client_setup} from "../translate/translate.jsx";
import {Datanews} from "../datanews/datanews.jsx";
import styles from "./styles.js"

export default class Bawang extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.initialState;
    }
    componentDidMount() {
        if(process.browser) {
            var that = this;
            window.addEventListener("language-change", function(event) {
                that.setState({language: event.detail.language});
            });
        }
    }
    render() {
        var statefixer = "window._state = " + JSON.stringify(this.props.initialState);
        return (
            <html lang={this.state.language}>
                <head>
                    <script dangerouslySetInnerHTML={{__html: statefixer}}></script>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="/node_modules/normalize.css/normalize.css" type="text/css" />
                    <link href='https://fonts.googleapis.com/css?family=Lato:400,700,900,300' rel='stylesheet' type='text/css' />
                    <title>Konlig Datasektionen vid KTH</title>
                </head>
                <body style={styles.body}>
                    <Databaren language={this.state.language} />
                    <section style={styles.content}>
                        <img style={styles.delta} alt="Datasektionens Logotyp sköld deltat" src="./static/bawang/sköld.svg" />
                        <h1 style={styles.heading}>
                            Konglig Data
                            <span style={styles.sektionen}>
                                sektionen
                                <span style={styles.vidkth}>
                                    <Translate language={this.state.language}>
                                        <Lang lang="sv">
                                            vid KTH
                                        </Lang>
                                        <Lang lang="en">
                                            at KTH
                                        </Lang>
                                    </Translate>
                                </span>
                            </span>
                        </h1>
                        <div style={styles.bottom}>
                            <div style={merge({textAlign: "right"}, styles.overlay, styles.left)}>
                                <article style={merge({fontWeight: 900}, styles.article)}>
                                    <Translate  language={this.state.language}>
                                        <Lang lang="sv">
                                            Datasektionen är en ideel studentsektion under Tekniska Högskolans Studentkår som finns till för att alla som läser Datateknik på KTH ska få en så bra och givande studietid som möjligt.
                                        </Lang>
                                        <Lang lang="en">
                                            Datasektionen is a non-profit student section under THS and is there for everyone who reads Computer Engineering at KTH to get such a good and productive study time as possible.
                                        </Lang>
                                    </Translate>
                                </article>
                                <article style={styles.article}>
                                    <Translate style={styles.vidkth} language={this.state.language}>
                                        <Lang lang="sv">
                                            På Datasektionen finns det många sätt att roa sig. Förutom studier i intressanta ämnen och episka fester anordnas det även qulturella tillställningar, hackerkvällar, sektionsmöten och mycket mer.
                                        </Lang>
                                        <Lang lang="en">
                                            There are many ways to entertain yourself at Datasektionen. In addition to studies in interesting topics and epic parties we organize hacker evenings, pubs, section meetings and much more much more.
                                        </Lang>
                                    </Translate>
                                </article>
                                <img style={styles.bgimg} src="/static/bawang/left.jpg" />
                            </div>
                            <div style={merge({}, styles.overlay, styles.right)}>
                                <article style={styles.article}>
                                    <Datanews events={this.state.events} />
                                </article>
                                <img style={styles.bgimg} src="/static/bawang/right_croped.jpg" />
                            </div>
                        </div>
                    </section>
                    <script src="bundle.js"></script>
                </body>
            </html>
        );
    }
}

if(process.browser) {
    ReactDOM.render(<Bawang initialState={window._state} />, document);
}
