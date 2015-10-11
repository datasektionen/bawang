var React = require("react");
var Databaren = require("../databaren/databaren.jsx");
var Radium = require("Radium");
var Translate = require("../translate/translate.jsx");
var dcolors = require("../../data-colors.js");


class Bawang extends React.Component {
    render() {
        var blur = "blur(2px)";
        var styles = {
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
                backgroundColor: "rgba(193, 9, 85, 0.7)",
            },
            content: {
                textAlign: "center",
                position: "absolute",
                top: 145,
                width: "100%",
            },
            delta: {
                height: 269,
                marginRight: 3,
            },
            heading: {
                marginTop: 29,
                fontSize: 60,
                fontWeight: 900,
                color: dcolors.cerise,
                position: "relative",
                marginLeft: -81
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
            }
        };
        return (
            <html lang={global? global.language : window.language}>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="/node_modules/normalize.css/normalize.css" type="text/css" />
                    <link href='https://fonts.googleapis.com/css?family=Lato:400,700,900,300' rel='stylesheet' type='text/css' />
                    <title>Konlig Datasektionen vid KTH</title>
                    <Radium.Style rules={{
                        '*': {
                            'fontFamily': 'Lato, Arial'
                        }
                    }}/>
                </head>
                <body>
                    <Databaren />
                    <div>
                        <div style={[styles.overlay, styles.left]}>
                            <img style={styles.bgimg} src="/static/bawang/left.jpg" />
                        </div>
                        <div style={[styles.overlay, styles.right]}>
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
                        <div>
                            <article>
                                Datasektionen är en ideel studentsektion under Tekniska Högskolans Studentkår som finns till för att alla som läser Datateknik på KTH ska få en så bra och givande studietid som möjligt.
                            </article>
                            <article>
                                På Konglig Datasektionen finns det många sätt att roa sig. Förutom studier i intressanta ämnen och episka fester anordnas det även qulturella tillställningar, hackerkvällar, sektionsmöten och mycket mer.
                            </article>
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
    Translate.client_setup();
    React.render(<Bawang />, document);
}

export default Radium(Bawang);
