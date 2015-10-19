const PORT = 8080; 

var express = require("express");
var cookieParser = require("cookie-parser");
var ReactDOMServer = require("react-dom/server");
var React = require("react");
var babel = require("babel-core/register");
var browserify = require("browserify");
var babelify = require("babelify");
var Bawang = require("./components/bawang/bawang.jsx");
var Translate = require("./components/translate/translate.jsx");
var Datanews = require("./components/datanews/datanews.jsx");

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
});

app.get("/bundle.js", function(req, res) {
    res.send(bundle);
});

// Static files
app.use('/node_modules', express.static('node_modules'));
app.use('/static/', express.static('components'));

// Render the html of the entire application at initial state into a string and send to client.
bawangcache = React.createFactory(Bawang);
app.get("/", function(req, res) {
    // FIXME Cache one English and one Swedish site and only rerender on changes.
    var language = Translate.server_setup(res, req);
    Datanews.news(function(news) {
        var string = "<!DOCTYPE html>" + ReactDOMServer.renderToString(bawangcache({
            initialState: {
                language: language,
                events: news
            }
        }));
        res.send(string);
    });
});

console.log("Listening on", PORT);
app.listen(PORT);
