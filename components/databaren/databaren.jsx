var React = require("react");
var dcolors = require("../../data-colors.js");
var Dataswitch = require("../dataswitch/dataswitch.jsx");


class Databaren extends React.Component {
    render() {
        var styles = {
            header: {
                backgroundColor: dcolors.background
            },
            button: {
                backgroundColor: dcolors.second,
                border: "none"
            },
            nav: {
                display: "inline-block"
            },
            navelement: {
                textTransform: "uppercase",
                color: "white",
                textDecoration: "none"
            }
        }
        return (
            <header style={styles.header}>
                <a href="/" style={styles.button}>
                    <img alt="Home" src="/static/databaren/small_delta.svg" />
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
                <Dataswitch alternatives={["English", "Swedish"]} />
                <button style={styles.button} href="http://datasektionen.se/login">Login</button>
            </header>
        );
    }
}

module.exports = Databaren;
