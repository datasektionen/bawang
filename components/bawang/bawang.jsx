import React from "react";
import ReactDOM from "react-dom";
import merge from "merge";
import Databaren from "../databaren/databaren.jsx";
import dconst from "../../data-constants.js";
import {Translate, Lang, client_setup} from "../translate/translate.jsx";
import {Datanews} from "../datanews/datanews.jsx";


export default class Bawang extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.initialState;
        console.log(this.state.events);
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
        var blur = "blur(2px)";
        var styles = {
            body: {
                fontFamily: 'Lato, Arial'
            },                
            delta: {
                height: 269,
                marginRight: 3,
                marginBottom: 31,
                zIndex: 10,
                position: "relative"
            },
            heading: {
                fontSize: 60,
                marginTop: 0,
                fontWeight: 900,
                color: dconst.colors.cerise,
                position: "relative",
                marginLeft: -81,
                marginBottom: 70,
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.34)",
                zIndex: 10,
            },
            sektionen: {
                marginLeft: 3,
                color: "white"
            },
            vidkth: {
                fontSize: 25,
                marginLeft: 12,
                position: "absolute",
                bottom: 14
            },
            content: {
                textAlign: "center",
                marginTop: 95,
                width: "100%"
            },
            bottom: {
                color: "white",
                position: "absolute",
                top: 50,
                left: 0,
                right: 0,
                fontSize: 17.5,
                letterSpacing: "0.15px",
                display: "flex",
                flexDirection: "row",
                minHeight: "calc(100% - 50px)",
            },
            overlay: {
                width: "50%",
                backgroundColor: "rgba(1, 1, 1, 0.5)",
                overflow: "hidden",
                position: "relative",
                paddingTop: 540
            },
            bgimg: {
                zIndex: -10,
                position: "absolute",
                top: 0,
                left: 0,
                WebkitFilter: blur,
                MozFilter: blur,
                OFilter: blur,
                MsFilter: blur,
                filter: blur,
                transform: "scale(1.03)",    // Get rid of white frame from blur
                height: "100%",
                minWidth: "100%"
            },
            left: {
                backgroundColor: "rgba(0, 0, 0, 0.6)",
            },
            right: {
                backgroundColor: "rgba(230, 41, 119, 0.85)",
            },
            article: {
                textAlign: "justify",
                lineHeight: "35px",
                maxWidth: dconst.site_width /2 - 50, // minus whatever with we need for margins
                display: "inline-block",
                margin: "0 50px 0 50px",
            },
        };
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
