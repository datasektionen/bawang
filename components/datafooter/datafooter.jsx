import React from "react";
import {Translate, Lang, LanguageSwitcher} from "../translate/translate.jsx";
import styles from "./styles.js";


export default class Datafooter extends React.Component {
    render() {
        return (
            <footer style={styles.footer}>
                <div style={styles.column}>
                    <img style={styles.footer_delta} src="/static/datafooter/vit_delta.svg"/>
                </div>
                <div styles={styles.column}>
                    <h3>
                        <Translate language={this.props.language}>
                            <Lang lang="sv">Allmänt</Lang>
                            <Lang lang="en">General</Lang>
                        </Translate>
                    </h3>
                    <p>
                        Lovisa Runhem<br/>
                        <a href="mailto:ordf@d.kth.se">ordf@d.kth.se</a><br/>
                        <tel>0706 72 75 27</tel>
                    </p>
                    <h3>
                        <Translate language={this.props.language}>
                            <Lang lang="sv">Företagskontakt</Lang>
                            <Lang lang="en">Company Contact</Lang>
                        </Translate>
                    </h3>
                    <p>
                        David Masko<br/>
                        <a href="mailto:foretag@d.kth.se">foretag@d.kth.se</a><br/>
                        <tel>070-798 79 13</tel>
                    </p>
                </div>
                <div styles={styles.column}>
                    <h3>
                        <Translate language={this.props.language}>
                            <Lang lang="sv">Adress</Lang>
                            <Lang lang="en">Address</Lang>
                        </Translate>
                    </h3>
                    <p>
                        Konglig Datasektionen<br/>
                        Fack vid THS<br/>
                        100 44 Stockholm
                    </p>
                    <h3>
                        <Translate language={this.props.language}>
                            <Lang lang="sv">Organisationsnummer</Lang>
                            <Lang lang="en">Organisation Number</Lang>
                        </Translate>
                    </h3>
                    <p>
                        802412 - 7709
                    </p>
                </div>
                <div styles={styles.column}>
                    <a href="https://www.google.se/maps/place/Konglig+Datasektionen/@59.348956,18.0725666,16z/data=!4m2!3m1!1s0x0000000000000000:0x3dab8e996009cc1f?hl=en">
                        <img src="/static/datafooter/map.png"/>
                    </a>
                </div>
            </footer>
        );
    }
}
