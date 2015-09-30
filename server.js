const PORT = 8080; 

var express = require("express");
var React = require("react");
var babel = require("babel-core/register");
var bawang = require("./components/bawang.jsx");
var browserify = require("browserify");
var reactify = require("reactify");

var b = browserify();
b.add("./components/bawang.jsx");
var bundle = null;
b.bundle(function(err, buf) {
    if(err) {
        console.error(err);
    }
    bundle = buf;
});

var app = express();
app.use('/node_modules', express.static('node_modules'));

app.get("/", function(req, res) {
    // TODO Fix default language based on browser language
    // FIXME If needed only render to string every hour to speed up
    var string = "<!DOCTYPE html>" + React.renderToString(React.createElement(bawang));
    res.send(string);
});

app.get("/bundle.js", function(req, res) {
    res.send(bundle);
});

app.listen(PORT);
