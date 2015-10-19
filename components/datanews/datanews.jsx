import React from "react";
import ical from "ical";

export function news(callback) {
    ical.fromURL(
        "http://datasektionen.se/kalender.ics",
        {},
        function(err, data) {
            if(err) {
                console.error(err);
                res.status(500).send("Could not reach datasektionen.se/klaneder.ics.");
            }
            var now = Date.now();
            var future_events = [];
            for(var k in data) {
                var thing = data[k];
                if(thing.start > now) {
                    future_events.push({
                        start: thing.start,
                        title: thing.summary
                    });
                }
            }
            future_events.sort(function(a, b) {
                return a.start - b.start;
            });
            callback(future_events.splice(0, 3));
        }
    );
}

export class Datanews extends React.Component {
    render() {
        return (
            <ul>
                {this.props.events ? this.props.events.map(function(event, i) {
                    return (
                        <li key={i}>
                            <h3>{event.title}</h3>
                            <span>icon</span>
                            <time>{event.start.getDate()} {event.start.getMonth()} {event.start.getHours()}:{event.start.getMinutes()}</time>
                        </li>
                    );
                }) : ""}
            </ul>
        );
    }
}
