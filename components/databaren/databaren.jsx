var React = require("react");
var dcolors = require("../../data-colors.js");
var Radium = require('radium');
var {Translate, Lang, LanguageSwitcher} = require("../translate/translate.jsx");


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
                        <Translate>
                            <Lang lang="sv">Nyheter/Event</Lang>
                            <Lang lang="en">News/Events</Lang>
                        </Translate>
                    </a>
                    <a style={styles.navelement} href="http://datasektionen.se/sektionen">
                        <Translate>
                            <Lang lang="sv">Sektionen</Lang>
                            <Lang lang="en">The Chapter</Lang>
                        </Translate>
                    </a>
                    <a style={styles.navelement} href="http://datasektionen.se/studier">
                        <Translate>
                            <Lang lang="sv">Studier</Lang>
                            <Lang lang="en">Studies</Lang>
                        </Translate>
                    </a>
                    <a style={styles.navelement} href="http://datasektionen.se/naringsliv">
                        <Translate>
                            <Lang lang="sv">Näringsliv</Lang>
                            <Lang lang="en">Business</Lang>
                        </Translate>
                    </a>
                    <a style={styles.navelement} href="http://datasektionen.se/sektionen/namnder">
                        <Translate>
                            <Lang lang="sv">Nämnder</Lang>
                            <Lang lang="en">Groups</Lang>
                        </Translate>
                    </a>
                    <a style={styles.navelement} href="http://www.djobb.se/">
                        <Translate>
                            <Lang lang="sv">Jobb</Lang>
                            <Lang lang="en">Jobs</Lang>
                        </Translate>
                    </a>
                    <a style={styles.navelement} href="http://datasektionen.se/kontakt">
                        <Translate>
                            <Lang lang="sv">Kontakt</Lang>
                            <Lang lang="en">Contact</Lang>
                        </Translate>
                    </a>
                </nav>
                <div style={styles.leftside}>
                    <LanguageSwitcher languages={["Svenska", "English"]} codes={["sv", "en"]} />
                    <button style={[styles.button, styles.login]} href="http://datasektionen.se/login">
                        <Translate>
                            <Lang lang="sv">Logga in</Lang>
                            <Lang lang="en">Login</Lang>
                        </Translate>
                    </button>
                </div>
            </header>
        );
    }
}

export default Radium(Databaren);
