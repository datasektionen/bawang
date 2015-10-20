import React from "react";
import Linkify from "react-linkify"


export default class Datanews extends React.Component {
    render() {
        return (
            <section>
                <ul>
                    {this.props.events.map(function(event, i) {
                        return (
                            <li key={i}>
                                <h3>{event.title}</h3>
                                <span>icon</span>
                                <time>{event.start.getDate()} {event.start.getMonth()} {event.start.getHours()}:{event.start.getMinutes()}</time>
                            </li>
                        );
                    })}
                </ul>
                <article>
                    <a href={this.props.news[0].url}>
                        <h3>{this.props.news[0].title}</h3>
                    </a>
                    <p>
                        <Linkify>{this.props.news[0].summary}</Linkify>
                    </p>
                </article>
            </section>
        );
    }
}
