import Datanews from "../datanews/datanews.jsx";
import {Translate, Lang, client_setup} from "../translate/translate.jsx";
import React from "react";


export default class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        // TODO set initial state from endpoints
        this.state = {
            events: [],
            news: [
                {
                    summary: "sdf"
                }
            ]
        };
    }
    render() {
        return (
            <section className="content">
                <img className="delta" alt="Datasektionens Logotyp sköld deltat" src="/components/bawang/skold.png" />
                <h1 className="heading">
                    Konglig Data
                    <span className="sektionen">
                        sektionen
                        <span className="vidkth">
                            <Translate language={this.props.language}>
                                <Lang lang="sv"> vid KTH</Lang>
                                <Lang lang="en"> at KTH</Lang>
                            </Translate>
                        </span>
                    </span>
                </h1>
                <div className="bottom">
                    <div className="first">
                        <div className="overlay">
                            <article className="article" style={{fontWeight: 900}}>
                                <Translate language={this.props.language}>
                                    <Lang lang="sv">Datasektionen är en ideel studentsektion under Tekniska Högskolans Studentkår som finns till för att alla som läser Datateknik på KTH ska få en så bra och givande studietid som möjligt.</Lang>
                                    <Lang lang="en">Datasektionen is a non-profit student section under THS and is there for everyone who reads Computer Engineering at KTH to get such a good and productive study time as possible.</Lang>
                                </Translate>
                            </article>
                            <article className="article">
                                <Translate className="vidkth" language={this.props.language}>
                                    <Lang lang="sv">På Datasektionen finns det många sätt att roa sig. Förutom studier i intressanta ämnen och episka fester anordnas det även qulturella tillställningar, hackerkvällar, sektionsmöten och mycket mer.</Lang>
                                    <Lang lang="en">There are many ways to entertain yourself at Datasektionen. In addition to studies in interesting topics and epic parties we organize hacker evenings, pubs, section meetings and much more much more.</Lang>
                                </Translate>
                            </article>
                            <img className="bgimg" src="/components/bawang/left.jpg" />
                        </div>
                        <div className="overlay right">
                            <article className="article">
                                <Datanews language={this.props.language} news={this.state.news} events={this.state.events}  />
                            </article>
                            <img className="bgimg" src="/components/bawang/right_croped.jpg" />
                        </div>
                    </div>
                    <div className="rest">
                        <div>
                            <section className="blib-sec">
                                <img className="blib-back" src="/components/bawang/studies.jpg"/>
                                <div className="blib-overlay"></div>
                                <h2 className="blib-head">
                                    <Translate className="vidkth" language={this.props.language}>
                                        <Lang lang="sv">Studier</Lang>
                                        <Lang lang="en">Studies</Lang>
                                    </Translate>
                                </h2>
                                <p className="blib-par">
                                    <Translate className="vidkth" language={this.props.language}>
                                        <Lang lang="sv">Datateknikprogrammet på KTH är en av Skandinaviens mest välrenommerade tekniska utbildningar och bland de främsta datateknikutbildningarna i världen. Efter examen har du breda karriärmöjligheter inom alla de branscher där datasystem är viktiga för verksamheten. Det kan alltså handla om allt från kultur, finans, handel eller vård till mer traditionella tekniska områden inom industrin. Arbetet handlar ofta om design och utveckling av produkter, men det är också möjligt att ägna sig åt undervisning eller konsultverksamhet.</Lang>
                                        <Lang lang="en">The Computer Engineering at KTH is one of Scandinavia&#39;s most renowned technical programs and among the top computer science programs in the world. After graduation, you have broad career opportunities in all the sectors in which computer systems are important to the business. Thus it can be everything from culture, finance or commerce to more traditional technical areas of the industry. The work often involves the design and development of products, but it is also possible to engage in teaching or consulting.</Lang>
                                    </Translate>
                                </p>
                            </section>
                            <section className="blib-sec">
                                <img className="blib-back" src="/components/bawang/socialt.jpg"/>
                                <div className="blib-overlay"></div>
                                <h2 className="blib-head">
                                    <Translate className="vidkth" language={this.props.language}>
                                        <Lang lang="sv">Socialt</Lang>
                                        <Lang lang="en">Social</Lang>
                                    </Translate>
                                </h2>
                                <p className="blib-par">
                                    <Translate className="vidkth" language={this.props.language}>
                                        <Lang lang="sv">Att studera behöver inte bara vara långa kvällar med tunga böcker. Datasektionen anordnar pubar, fester, spelkvällar och andra roliga aktiviteter som ger dig en chans att koppla av mellan studierna och lära känna andra studerande. Aktiviteterna arrangeras av våra medlemmar och som medlem är du självklart välkommen.</Lang>
                                        <Lang lang="en">Study need not be just long evenings with heavy books. The computer section organizes pubs, parties, game nights and other fun activities that give you a chance to relax in between your studies and get to know other students. All our activities are organized by our members.</Lang>
                                    </Translate>
                                </p>
                            </section>
                            <section className="blib-sec">
                                <img className="blib-back" src="/components/bawang/business.jpg"/>
                                <div className="blib-overlay"></div>
                                <h2 className="blib-head">
                                    <Translate className="vidkth" language={this.props.language}>
                                        <Lang lang="sv">Näringsliv</Lang>
                                        <Lang lang="en">Business</Lang>
                                    </Translate>
                                </h2>
                                <p className="blib-par">
                                    <Translate className="vidkth" language={this.props.language}>
                                    <Lang lang="sv">Datasektionens näringslivsgrupp arbetar aktivt för ett nära samarbete mellan sektionens medlemmar och aktörer i näringslivet, som i många fall kan bli framtida arbetsgivare. Berätta om ert företag på en lunchföreläsning, eller få personlig kontakt med studenter från Sveriges högst rankade datautbildning <a href="http://www.topuniversities.com/university-rankings/university-subject-rankings/2015/computer-science-information-systems#sorting=rank+region=+country=203+faculty=+stars=false+search=">[1]</a> på vår årliga arbetsmarknadsdag.</Lang>
                                        <Lang lang="en">The computer section's business group is working actively to create close cooperation between our members and future employers. Tell us about your company on a lunch lecture, or get personal contact with students from Sweden's highest ranked computer university <a href="http://www.topuniversities.com/university-rankings/university-subject-rankings/2015/computer-science-information-systems#sorting=rank+region=+country=203+faculty=+stars=false+search=">[1]</a> at our annual career fair.</Lang>
                                    </Translate>
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
