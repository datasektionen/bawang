var React = require("react");
var dcolors = require("../../data-colors.js");
var Dataswitch = require("../dataswitch/dataswitch.jsx");
var Radium = require('radium');

class Databaren extends React.Component {
    render() {
        var styles = {
            header: {
                backgroundColor: dcolors.background,
                height: 50,
            },
            button: {
                backgroundColor: dcolors.second,
                border: "none",
                height: 50,
                padding: 0
            },
            superdelta: {
                //marginLeft: 50,
                width: 50,
                display: "inline-block",
                textAlign: "center"
            },
            superdelta_img: {
                marginTop: 10,
                height: 31,
                marginLeft: 1.5
            },
            nav: {
                display: "inline-block",
                marginLeft: 12.5,
                verticalAlign: "top",
            },
            navelement: {
                display: "inline-block",
                fontSize: 15,
                textTransform: "uppercase",
                color: dcolors.offwhite,
                textDecoration: "none",
                paddingRight: 12.5,
                paddingLeft: 12.5,
                paddingTop: 17,
                paddingBottom: 16
            },
            login: {
                //marginRight: 50,
                width: 100,
                fontSize: 15,
                fontFamily: "Lato, Arial"
            },
            leftside: {
                display: "inline-block",
                position: "absolute",
                right: 0
            }
        }
        return (
            <header style={styles.header}>
                <a href="/" style={[styles.button, styles.superdelta]}>
                    <img style={styles.superdelta_img} alt="Home" src="/static/databaren/small_delta.svg" />
                </a>
                <nav style={styles.nav}>
                    <a style={styles.navelement} href="http://datasektionen.se/">
                        Nyheter/Event
                    </a>
                    <a style={styles.navelement} href="http://datasektionen.se/sektionen">
                        Sektionen
                    </a>
                    <a style={styles.navelement} href="http://datasektionen.se/studier">
                        Studier
                    </a>
                    <a style={styles.navelement} href="http://datasektionen.se/naringsliv">
                        Näringsliv
                    </a>
                    <a style={styles.navelement} href="http://datasektionen.se/sektionen/namnder">
                        Nämder
                    </a>
                    <a style={styles.navelement} href="http://www.djobb.se/">
                        Jobb
                    </a>
                    <a style={styles.navelement} href="http://datasektionen.se/kontakt">
                        Kontakt
                    </a>
                </nav>
                <div style={styles.leftside}>
                    <Dataswitch alternatives={["English", "Swedish"]} value="English" />
                    <button style={[styles.button, styles.login]} href="http://datasektionen.se/login">Login</button>
                </div>
            </header>
        );
    }
}

module.exports = Radium(Databaren);
