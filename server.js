const PORT = 8080; 
const minutes_update = 10;

var express = require("express");
var cookieParser = require("cookie-parser");
var ReactDOMServer = require("react-dom/server");
var React = require("react");
var babel = require("babel-core/register");
var browserify = require("browserify");
var babelify = require("babelify");
var Bawang = require("./components/bawang/bawang.jsx");
var Translate = require("./components/translate/translate.jsx");
var datanewsServer = require("./components/datanews/server.js");

var app = express();
app.use(cookieParser());

// Compile the js into a bundle and send to client.
// Client will later hook into the already rendered initial state.
var b = browserify();
b.add("./components/bawang/bawang.jsx");
var bundle = null;
b.transform(babelify).bundle(function(err, buf) {
    if(err) {
        console.error(err);
    }
    bundle = buf;

    // Listen when done
    app.listen(PORT);
    console.log("Listening on", PORT);
});

app.get("/bundle.js", function(req, res) {
    res.send(bundle);
});

// Static files
app.use('/node_modules', express.static('node_modules'));
app.use('/static/', express.static('components'));

var site = {};

bawangcache = React.createFactory(Bawang);
function renderSite(lang, events, news) {
    return "<!DOCTYPE html>" + ReactDOMServer.renderToString(bawangcache({
        initialState: {
            language: lang,
            events: events,
            news: news
        }
    }));
}

// Every minutes_update, render site on server.
function update() {
    datanewsServer().then(function(data) {
        try {
            site["sv"] = renderSite("sv", data[0], data[1]);
            site["en"] = renderSite("en", data[0], data[1]);
        } catch(e) {
            console.error(e);
        }
    });
}
update();
setInterval(update, 1000 * 60 * minutes_update);

// Just server the rendered site
app.get("/", function(req, res) {
    var language = Translate.server_setup(res, req);
    if(site[language]) {
        res.send(site[language]);
    } else {
        res.status(500).send("Error on server compile or not done yet");
    }
});

