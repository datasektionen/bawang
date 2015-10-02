var React = require("react");


class Databaren extends React.Component {
    render() {
        return (
            <header>
                <a href="/">
                    <img alt="Home" src="/static/databaren/small_delta.svg" />
                </a>
                <nav>
                    <a href="http://datasektionen.se/">Nyheter/Event</a>
                    <a href="http://datasektionen.se/sektionen">Sektionen</a>
                    <a href="http://datasektionen.se/studier">Studier</a>
                    <a href="http://datasektionen.se/naringsliv">Näringsliv</a>
                    <a href="http://datasektionen.se/sektionen/namnder">Nämder</a>
                    <a href="http://www.djobb.se/">Jobb</a>
                    <a href="http://datasektionen.se/kontakt">Kontakt</a>
                </nav>
                <div className="language_select">
                    <input type="radio" name="language" id="language" value="English" /> Engelska
                    <input type="radio" name="language" id="language" value="Swedish" /> Svenska
                </div>
                <button href="http://datasektionen.se/login">Login</button>
            </header>
        );
    }
}

module.exports = Databaren;
