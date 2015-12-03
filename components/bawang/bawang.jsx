import React from "react";
import ReactDOM from "react-dom";
import merge from "merge";
import Databaren from "../databaren/databaren.jsx";
import {Translate, Lang, client_setup} from "../translate/translate.jsx";
import Datanews from "../datanews/datanews.jsx";
import Datafooter from "../datafooter/datafooter.jsx";
import styles from "./styles.js";

export default class Bawang extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.initialState;
    }
    componentDidMount() {
        var that = this;
        window.addEventListener("language-change", function(event) {
            that.setState({language: event.detail.language});
        });
    }
    render() {
        var statefixer = "window._state = " + JSON.stringify(this.props.initialState);
        return (
            <html lang={this.state.language}>
                <head>
                    <script dangerouslySetInnerHTML={{__html: statefixer}}></script>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="/node_modules/normalize.css/normalize.css" type="text/css" />
                    <link href='https://fonts.googleapis.com/css?family=Lato:400,700,900,300' rel='stylesheet' type='text/css' />
                    <link rel="stylesheet" href="/node_modules/font-awesome/css/font-awesome.css" />
                    <title>Konglig Datasektionen vid KTH</title>
                    <style dangerouslySetInnerHTML={{__html: "a { color: white; }"}}></style>
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
                                        <Lang lang="sv"> vid KTH</Lang>
                                        <Lang lang="en"> at KTH</Lang>
                                    </Translate>
                                </span>
                            </span>
                        </h1>
                        <div style={styles.bottom}>
                            <div style={styles.first}>
                                <div style={merge({}, styles.overlay, styles.left, {textAlign: "right"})}>
                                    <article style={merge({fontWeight: 900}, styles.article)}>
                                        <Translate language={this.state.language}>
                                            <Lang lang="sv">Datasektionen är en ideel studentsektion under Tekniska Högskolans Studentkår som finns till för att alla som läser Datateknik på KTH ska få en så bra och givande studietid som möjligt.</Lang>
                                            <Lang lang="en">Datasektionen is a non-profit student section under THS and is there for everyone who reads Computer Engineering at KTH to get such a good and productive study time as possible.</Lang>
                                        </Translate>
                                    </article>
                                    <article style={styles.article}>
                                        <Translate style={styles.vidkth} language={this.state.language}>
                                            <Lang lang="sv">På Datasektionen finns det många sätt att roa sig. Förutom studier i intressanta ämnen och episka fester anordnas det även qulturella tillställningar, hackerkvällar, sektionsmöten och mycket mer.</Lang>
                                            <Lang lang="en">There are many ways to entertain yourself at Datasektionen. In addition to studies in interesting topics and epic parties we organize hacker evenings, pubs, section meetings and much more much more.</Lang>
                                        </Translate>
                                    </article>
                                    <img style={styles.bgimg} src="/static/bawang/left.jpg" />
                                </div>
                                <div style={merge({}, styles.overlay, styles.right)}>
                                    <article style={styles.article}>
                                        <Datanews language={this.state.language} events={this.state.events} news={this.state.news} />
                                    </article>
                                    <img style={styles.bgimg} src="/static/bawang/right_croped.jpg" />
                                </div>
                            </div>
                            <div style={styles.rest}>
                                <div style={styles.rest}>
                                    <section>
                                        <img src="http://placekitten.com/1000/501"/>
                                        <h2>
                                            <Translate style={styles.vidkth} language={this.state.language}>
                                                <Lang lang="sv">Studier</Lang>
                                                <Lang lang="en">Studies</Lang>
                                            </Translate>
                                        </h2>
                                        <p>
                                            <Translate style={styles.vidkth} language={this.state.language}>
                                                <Lang lang="sv">Datateknikprogrammet på KTH är en av Skandinaviens mest välrenommerade tekniska utbildningar och bland de främsta datateknikutbildningarna i världen. Efter examen har du breda karriärmöjligheter inom alla de branscher där datasystem är viktiga för verksamheten. Det kan alltså handla om allt från kultur, finans, handel eller vård till mer traditionella tekniska områden inom industrin. Arbetet handlar ofta om design och utveckling av produkter, men det är också möjligt att ägna sig åt undervisning eller konsultverksamhet.</Lang>
                                                <Lang lang="en">The Computer Engineering at KTH is one of Scandinavia's most renowned technical programs and among the top computer science programs in the world. After graduation, you have broad career opportunities in all the sectors in which computer systems are important to the business. Thus it can be everything from culture, finance or commerce to more traditional technical areas of the industry. The work often involves the design and development of products, but it is also possible to engage in teaching or consulting.</Lang>
                                            </Translate>
                                        </p>
                                    </section>
                                    <section>
                                        <img src="/static/bawang/social.jpg"/>
                                        <h2>
                                            <Translate style={styles.vidkth} language={this.state.language}>
                                                <Lang lang="sv">Socialt</Lang>
                                                <Lang lang="en">Social</Lang>
                                            </Translate>
                                        </h2>
                                        <p>
                                            <Translate style={styles.vidkth} language={this.state.language}>
                                                <Lang lang="sv">Att studera behöver inte bara vara långa kvällar med tunga böcker. Datasektionen anordnar pubar, fester, spelkvällar och andra roliga aktiviteter som ger dig en chans att koppla av mellan studierna och lära känna andra studerande. Aktiviteterna arrangeras av våra medlemmar och som medlem är du självklart välkommen.</Lang>
                                                <Lang lang="en">Study need not be just long evenings with heavy books. The computer section organizes pubs, parties, game nights and other fun activities that give you a chance to relax in between your studies and get to know other students. All our activities are organized by our members.</Lang>
                                            </Translate>
                                        </p>
                                    </section>
                                    <section>
                                        <img src="http://placekitten.com/1000/501"/>
                                        <h2>
                                            <Translate style={styles.vidkth} language={this.state.language}>
                                                <Lang lang="sv">Näringsliv</Lang>
                                                <Lang lang="en">Business</Lang>
                                            </Translate>
                                        </h2>
                                        <p>
                                            <Translate style={styles.vidkth} language={this.state.language}>
                                            <Lang lang="sv">Datasektionens näringslivsgrupp arbetar aktivt för ett nära samarbete mellan sektionens medlemmar och aktörer i näringslivet, som i många fall kan bli framtida arbetsgivare. Berätta om ert företag på en lunchföreläsning, eller få personlig kontakt med studenter från Sveriges högst rankade datautbildning <a href="http://www.topuniversities.com/university-rankings/university-subject-rankings/2015/computer-science-information-systems#sorting=rank+region=+country=203+faculty=+stars=false+search=">[1]</a> på vår årliga arbetsmarknadsdag.</Lang>
                                                <Lang lang="en">The computer section's business group is working actively to create close cooperation between our members and future employers. Tell us about your company on a lunch lecture, or get personal contact with students from Sweden's highest ranked computer university <a href="http://www.topuniversities.com/university-rankings/university-subject-rankings/2015/computer-science-information-systems#sorting=rank+region=+country=203+faculty=+stars=false+search=">[1]</a> at our annual career fair.</Lang>
                                            </Translate>
                                        </p>
                                    </section>
                                    <Datafooter language={this.state.language}/>
                                </div>
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
