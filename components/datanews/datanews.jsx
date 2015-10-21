import React from "react";
import moment from "moment";
require("moment/locale/sv");


export default class Datanews extends React.Component {
    render() {
        var styles = {
            ul: {},
            li: {},
            heading: {}
        };
        moment.locale(this.props.language);
        return (
            <section>
                <ul styles={styles.ul}>
                    {this.props.events.map(function(event, i) {
                        return (
                            <li styles={styles.ul} key={i}>
                                <h3 styles={styles.heading}>{event.title}</h3>
                                <i className="fa fa-clock-o"></i>
                                <time>{moment(event.start).format("LLL")}</time>
                            </li>
                        );
                    })}
                </ul>
                <article>
                    <a href={this.props.news[0].url}>
                        <h3>{this.props.news[0].title}</h3>
                    </a>
                    <p dangerouslySetInnerHTML={{__html: this.props.news[0].summary}}></p>
                </article>
            </section>
        );
    }
}
