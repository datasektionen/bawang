// Will render calendar events with correct dateformat for the language and cut the newstory to the correct length.
// Will need to be changed some when dataflödet is done. This does not support location for calendar events, does not care about news lanugage and will cut up links if that is the characters that exeeds x characters.

import React from "react";
import moment from "moment";
require("moment/locale/sv");


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
            <section className="thing">
                <ul>
                    {this.props.events.map(function(event, i) {
                        return (
                            <li key={i}>
                                <h3 className="heading">{event.title}</h3>
                                <i className="icon" className="fa fa-clock-o"></i>
                                <time className="time">{moment(event.start).format("LLL")}</time>
                            </li>
                        );
                    })}
                </ul>
                <div className="news">
                    <a className="newsheading" href={this.props.news[0].url}>
                        <h3 className="headinginside">{this.props.news[0].title}</h3>
                    </a>
                    <p className="newsstory" dangerouslySetInnerHTML={{__html: newstory}}></p>
                </div>
            </section>
        );
    }
}
