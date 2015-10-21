// Will render calendar events with correct dateformat for the language and cut the newstory to the correct length.
// Will need to be changed some when dataflödet is done. This does not support location for calendar events, does not care about news lanugage and will cut up links if that is the characters that exeeds x characters.

import React from "react";
import moment from "moment";
require("moment/locale/sv");
import styles from "./styles.js";


export default class Datanews extends React.Component {
    render() {
        moment.locale(this.props.language);
        var newstory = "";
        var words = this.props.news[0].summary.split(" ").reverse();
        while(words.length > 0 && newstory.length + words[0].length < 300)
            newstory += words.pop() + " ";
        if(words.length > 0)
            newstory += "<a href=\"" + this.props.news[0].url + "\">...</a>";

        return (
            <section>
                <ul style={styles.ul}>
                    {this.props.events.map(function(event, i) {
                        return (
                            <li style={styles.li} key={i}>
                                <h3 style={styles.heading}>{event.title}</h3>
                                <i style={styles.icon} className="fa fa-clock-o"></i>
                                <time style={styles.time}>{moment(event.start).format("LLL")}</time>
                            </li>
                        );
                    })}
                </ul>
                <div style={styles.news}>
                    <a style={styles.newsheading} href={this.props.news[0].url}>
                        <h3 style={styles.headinginside}>{this.props.news[0].title}</h3>
                    </a>
                    <p style={styles.newsstory} dangerouslySetInnerHTML={{__html: newstory}}></p>
                </div>
            </section>
        );
    }
}
