import React from "react";
import {Translate, Lang, LanguageSwitcher} from "../translate/translate.jsx";
import merge from "merge";
import styles from "./styles.js";


export default class Databaren extends React.Component {
    render() {
        return (
            <header style={styles.header}>
                <div style={styles.widther}>
                    <a href="/" style={merge({}, styles.button, styles.superdelta)}>
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
                        <button style={merge({}, styles.button, styles.login)} href="http://datasektionen.se/login">
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
