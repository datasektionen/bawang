const PORT = 5000; 
const CACHED_SITES = ['/', '/chapter'];

const minutes_update = 10;

var express = require("express");
var cookieParser = require("cookie-parser");
var ReactDOMServer = require("react-dom/server");
var React = require("react");
var babel = require("babel-core/register");
var browserify = require("browserify");
var babelify = require("babelify");
var Bawang = require("./components/bawang/bawang.jsx");
var TranslateServer = require("./components/translate/server.js");
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
app.use('/components/', express.static('components'));

var paths = {}; // paths: {sv: string, en: string}

bawangcache = React.createFactory(Bawang);
function renderSite(path, lang) {
    return "<!DOCTYPE html>" + ReactDOMServer.renderToString(bawangcache({
        language: lang,
        path: path
    }));
}

// Every minutes_update, render site on server.
function update() {
    CACHED_SITES.forEach(function(site) {
        paths[site] = {
            sv: renderSite(site, "sv"),
            en: renderSite(site, "en")
        };
    });
}
update();
setInterval(update, 1000 * 60 * minutes_update);

app.get("/update_cache", function(req, res) {
    update();
    res.send("done");
});

// Just server the rendered site
app.get("/*", function(req, res) {
    var language = TranslateServer.server_setup(res, req);
    if(paths[req.path] && paths[req.path][language]) {
        res.send(paths[req.path][language]);
        return;
    }
    if(CACHED_SITES.indexOf(req.path) != -1) {
        res.status(500).send("Error on server compile or not done yet.");
        return;
    }
    res.status(404).send("404");
});
