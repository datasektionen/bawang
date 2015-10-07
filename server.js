const PORT = 8080; 

var express = require("express");
var cookieParser = require("cookie-parser");
var React = require("react");
var babel = require("babel-core/register");
var browserify = require("browserify");
var babelify = require("babelify");
var bawang = require("./components/bawang/bawang.jsx");
var Translate = require("./components/translate/translate.jsx");

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
app.get("/", function(req, res) {
    // FIXME If needed only render to string every hour to speed upn
    if(req.cookies.language) {
        var lang = req.cookies.language;
    } else {
        // Set language cookie based on browser setting. Prefer Swedish default to English;
        var lang = req.acceptsLanguages("sv");
        if(!lang) {
            lang = "en";
        }
        res.cookie("language", lang);
    } 
    Translate.server_setup(lang);
    var string = "<!DOCTYPE html>" + React.renderToString(React.createElement(bawang));
    res.send(string);
});

console.log("Listening on", PORT);
app.listen(PORT);
