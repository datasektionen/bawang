var React = require("react");
var ReactDOM = require("react-dom");
var Databaren = require("../databaren/databaren.jsx");
var Translate = require("../translate/translate.jsx");
var dconst = require("../../data-constants.js");
var merge = require("merge");


class Bawang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: props.language
        }
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
            overlay: {
                width: "50%",
                height: "100vh",
                backgroundColor: "rgba(1, 1, 1, 0.5)",
                overflow: "hidden",
                position: "relative",
                display: "inline-block"
            },
            bgimg: {
                zIndex: -10,
                position: "absolute",
                bottom: 0,
                WebkitFilter: blur,
                MozFilter: blur,
                OFilter: blur,
                MsFilter: blur,
                filter: blur,
                transform: "scale(1.03)",    // Get rid of white frame from blur
                height: "100vh",
                minWidth: "100%"
            },
            left: {
                backgroundColor: "rgba(0, 0, 0, 0.6)",
            },
            right: {
                backgroundColor: "rgba(241, 29, 116, 0.75)",
            },
            content: {
                textAlign: "center",
                position: "absolute",
                top: 145,
                width: "100%"
            },
            delta: {
                height: 269,
                marginRight: 3,
                marginBottom: 31,
            },
            heading: {
                fontSize: 60,
                marginTop: 0,
                fontWeight: 900,
                color: dconst.colors.cerise,
                position: "relative",
                marginLeft: -81,
                marginBottom: 70,
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.34)"
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
            bottom: {
                maxWidth: dconst.site_width,
                margin: "auto",
                color: "white",
                position: "relative",
                fontSize: 17.5,
                letterSpacing: "0.15px"
            },
            articles: {
                width: "45.4%",
                textAlign: "justify",
                lineHeight: "35px",
            },
            article: {
                marginBottom: 24
            }
        };
        return (
            <html lang={this.state.language}>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="/node_modules/normalize.css/normalize.css" type="text/css" />
                    <link href='https://fonts.googleapis.com/css?family=Lato:400,700,900,300' rel='stylesheet' type='text/css' />
                    <title>Konlig Datasektionen vid KTH</title>
                </head>
                <body style={styles.body}>
                    <Databaren language={this.state.language} />
                    <div>
                        <div style={merge({}, styles.overlay, styles.left)}>
                            <img style={styles.bgimg} src="/static/bawang/left.jpg" />
                        </div>
                        <div style={merge({}, styles.overlay, styles.right)}>
                            <img style={styles.bgimg} src="/static/bawang/right_croped.jpg" />
                        </div>
                    </div>
                    <section style={styles.content}>
                        <img style={styles.delta} alt="Datasektionens Logotyp sköld deltat" src="./static/bawang/sköld.svg" />
                        <h1 style={styles.heading}>
                            Konglig Data
                            <span style={styles.sektionen}>
                                sektionen
                                <span style={styles.vidkth}>
                                    vid KTH
                                </span>
                            </span>
                        </h1>
                        <div style={styles.bottom}>
                            <div style={styles.articles}>
                                <article style={merge({}, {fontWeight: 900}, styles.article)}>
                                    Datasektionen är en ideel studentsektion under Tekniska Högskolans Studentkår som finns till för att alla som läser Datateknik på KTH ska få en så bra och givande studietid som möjligt.
                                </article>
                                <article style={styles.article}>
                                    På Konglig Datasektionen finns det många sätt att roa sig. Förutom studier i intressanta ämnen och episka fester anordnas det även qulturella tillställningar, hackerkvällar, sektionsmöten och mycket mer.
                                </article>
                            </div>
                        </div>
                        <data-news />
                    </section>
                    <script src="bundle.js"></script>
                </body>
            </html>
        );
    }
}

if(process.browser) {
    // If any data needs to be preloaded, hook that up here.
    var language = Translate.client_setup();
    ReactDOM.render(<Bawang language={language}/>, document);
}

export default Bawang;
