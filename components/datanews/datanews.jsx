// Will render calendar events with correct dateformat for the language and cut the newstory to the correct length.
// Will need to be changed some when dataflödet is done. This does not support location for calendar events, does not care about news lanugage and will cut up links if that is the characters that exeeds x characters.

import React from "react";
import moment from "moment";
import request from "request";
import AsyncRender from "react-async-render";
import reactMixin from "react-mixin";
require("moment/locale/sv");


export default class Datanews extends React.Component {
    constructor(props, context) {
        super(props, context);
        // should probably only be run when not initial render, maybe a context variable on bawang with that resets on history listnes?
        this.state = {no_data: true};
        var that = this;
        this.asyncInit(function(done) {
            request("http://localhost:5000/datanews", function (error, response, body) {
                if(error) {
                    console.error(error);
                    return;
                }
                var parsed = JSON.parse(body);
                that.state = {
                    news: parsed[1],
                    events: parsed[0],
                    no_data: false
                };
                console.log(that.state);
                that.forceUpdate();
                done();
            });
        });
    }
    render() {
        if(this.state.no_data) {
            return <section>Loading...</section>;
        }
        moment.locale(this.context.language);
        var newstory = "";
        var words = this.state.news[0].summary.split(" ").reverse();
        while(words.length > 0 && newstory.length + words[0].length < 300)
            newstory += words.pop() + " ";
        if(words.length > 0)
            newstory += "<a href=\"" + this.state.news[0].url + "\">...</a>";

        return (
            <section className="thing">
                <ul>
                    {this.state.events.map(function(event, i) {
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
                    <a className="newsheading" href={this.state.news[0].url}>
                        <h3 className="headinginside">{this.state.news[0].title}</h3>
                    </a>
                    <p className="newsstory" dangerouslySetInnerHTML={{__html: newstory}}></p>
                </div>
            </section>
        );
    }
}
Datanews.contextTypes = {
    ...AsyncRender.contextTypes,
    language: React.PropTypes.string
}
reactMixin(Datanews.prototype, AsyncRender.mixin);
