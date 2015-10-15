var React = require("react");
var dconst = require("../../data-constants.js");
var Radium = require('radium');
var {Translate, Lang, LanguageSwitcher} = require("../translate/translate.jsx");



class Databaren extends React.Component {
    render() {
        var styles = {
            header: {
                backgroundColor: dconst.colors.background,
                fontFamily: 'Lato, Arial',
                height: 50,
            },
            widther: {
                maxWidth: dconst.site_width,
                margin: "auto",
                position: "relative"
            },
            button: {
                backgroundColor: dconst.colors.second,
                border: "none",
                fontSize: 14,
                height: 50,
                padding: "1px 0 0 0"
            },
            superdelta: {
                width: 50,
                display: "inline-block",
                textAlign: "center",
            },
            superdelta_img: {
                marginTop: 10,
                height: 31,
                marginLeft: 1.5
            },
            nav: {
                display: "inline-block",
                marginLeft: 9,
                verticalAlign: "top",
            },
            navelement: {
                display: "inline-block",
                fontSize: 15,
                textTransform: "uppercase",
                color: dconst.colors.offwhite,
                textDecoration: "none",
                padding: "17px 11px 16px 11px"
            },
            login: {
                width: 100,
                fontFamily: "Lato, Arial",
                textTransform: "uppercase",
            },
            leftside: {
                display: "inline-block",
                position: "absolute",
                right: 0
            }
        }
        return (
            <header style={styles.header}>
                <div style={styles.widther}>
                    <a href="/" style={[styles.button, styles.superdelta]}>
                        <img style={styles.superdelta_img} alt="Home" src="/static/databaren/small_delta.svg" />
                    </a>
                    <nav style={styles.nav}>
                        <a style={styles.navelement} href="http://datasektionen.se/">
                            <Translate language={this.props.language}>
                                <Lang lang="sv">Nyheter/Event</Lang>
                                <Lang lang="en">News/Events</Lang>
                            </Translate>
                        </a>
                        <a style={styles.navelement} href="http://datasektionen.se/sektionen">
                            <Translate language={this.props.language}>
                                <Lang lang="sv">Sektionen</Lang>
                                <Lang lang="en">The Chapter</Lang>
                            </Translate>
                        </a>
                        <a style={styles.navelement} href="http://datasektionen.se/studier">
                            <Translate language={this.props.language}>
                                <Lang lang="sv">Studier</Lang>
                                <Lang lang="en">Studies</Lang>
                            </Translate>
                        </a>
                        <a style={styles.navelement} href="http://datasektionen.se/naringsliv">
                            <Translate language={this.props.language}>
                                <Lang lang="sv">Näringsliv</Lang>
                                <Lang lang="en">Business</Lang>
                            </Translate>
                        </a>
                        <a style={styles.navelement} href="http://datasektionen.se/sektionen/namnder">
                            <Translate language={this.props.language}>
                                <Lang lang="sv">Nämnder</Lang>
                                <Lang lang="en">Groups</Lang>
                            </Translate>
                        </a>
                        <a style={styles.navelement} href="http://www.djobb.se/">
                            <Translate language={this.props.language}>
                                <Lang lang="sv">Jobb</Lang>
                                <Lang lang="en">Jobs</Lang>
                            </Translate>
                        </a>
                        <a style={styles.navelement} href="http://datasektionen.se/kontakt">
                            <Translate language={this.props.language}>
                                <Lang lang="sv">Kontakt</Lang>
                                <Lang lang="en">Contact</Lang>
                            </Translate>
                        </a>
                    </nav>
                    <div style={styles.leftside}>
                        <LanguageSwitcher languages={["Svenska", "English"]} codes={["sv", "en"]} value={this.props.language} />
                        <button style={[styles.button, styles.login]} href="http://datasektionen.se/login">
                            <Translate language={this.props.language}>
                                <Lang lang="sv">Logga in</Lang>
                                <Lang lang="en">Login</Lang>
                            </Translate>
                        </button>
                    </div>
                </div>
            </header>
        );
    }
}

export default Radium(Databaren);
