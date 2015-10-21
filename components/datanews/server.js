// Downloads news and calendar events from datasektionen.se, strips all htmltags except a and sends only what is needed.
// Everything packaged as a promise where data results of type [[event], [news]].

import ical from "ical";
import rssparser from "rssparser";
import striptags from "striptags";


export default () => Promise.all([
    new Promise((resove, reject) => ical.fromURL(
        "http://datasektionen.se/kalender.ics",
        {},
        function(err, data) {
            if(err) reject(err);
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
            future_events.sort((a, b) => a.start - b.start);
            resove(future_events.splice(0, 3));
        }
    )),
    new Promise((resolve, reject) => rssparser.parseURL(
        "http://datasektionen.se/rss",
        {},
        function(err, data) {
            if(err) reject(err);
            var one = data.items[1];
            resolve([{
                title: one.title,
                summary: striptags(one.summary, ['a']),
                url: one.url
            }]);
        })
    )]);
