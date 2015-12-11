import React from "react";
import {Translate, Lang, LanguageSwitcher} from "../translate/translate.jsx";
import merge from "merge";
import {Link} from 'react-router'

export default class Databaren extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="widther">
                    <a href="/" className="button superdelta">
                        <img className="superdelta_img" alt="Home" src="/components/databaren/small_delta.svg" />
                    </a>
                    <nav className="nav">
                        <Link className="navelement" to="/">
                            <Translate>
                                <Lang lang="sv">Nyheter/Event</Lang>
                                <Lang lang="en">News/Events</Lang>
                            </Translate>
                        </Link>
                        <Link className="navelement" to="/chapter">
                            <Translate>
                                <Lang lang="sv">Sektionen</Lang>
                                <Lang lang="en">The Chapter</Lang>
                            </Translate>
                        </Link>
                        <a className="navelement" href="http://datasektionen.se/studier">
                            <Translate>
                                <Lang lang="sv">Studier</Lang>
                                <Lang lang="en">Studies</Lang>
                            </Translate>
                        </a>
                        <a className="navelement" href="http://datasektionen.se/naringsliv">
                            <Translate>
                                <Lang lang="sv">Näringsliv</Lang>
                                <Lang lang="en">Business</Lang>
                            </Translate>
                        </a>
                        <a className="navelement" href="http://datasektionen.se/sektionen/namnder">
                            <Translate>
                                <Lang lang="sv">Nämnder</Lang>
                                <Lang lang="en">Groups</Lang>
                            </Translate>
                        </a>
                        <a className="navelement" href="http://www.djobb.se/">
                            <Translate>
                                <Lang lang="sv">Jobb</Lang>
                                <Lang lang="en">Jobs</Lang>
                            </Translate>
                        </a>
                        <a className="navelement" href="http://datasektionen.se/kontakt">
                            <Translate>
                                <Lang lang="sv">Kontakt</Lang>
                                <Lang lang="en">Contact</Lang>
                            </Translate>
                        </a>
                    </nav>
                    <div className="leftside">
                        <LanguageSwitcher className="switcher" languages={["Svenska", "English"]} codes={["sv", "en"]} value={this.props.language} />
                        <button className="button login" href="http://datasektionen.se/login">
                            <span className="login_text">
                                <Translate>
                                    <Lang lang="sv">Logga in</Lang>
                                    <Lang lang="en">Login</Lang>
                                </Translate>
                            </span>
                        </button>
                    </div>
                </div>
            </header>
        );
    }
}
