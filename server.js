const PORT = 8080; 

var express = require("express");
var React = require("react");
var babel = require("babel-core/register");
var bawang = require("./components/bawang.jsx");
var browserify = require("browserify");
var reactify = require("reactify");

var app = express();

// Compile the app into a bundle and send to client. Client will laiter hook into the already rendered initial state.
var b = browserify();
b.add("./components/bawang.jsx");
var bundle = null;
b.bundle(function(err, buf) {
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

// Render the result of the entire application at initial state into a string and send to client.
app.get("/", function(req, res) {
    // TODO Fix default language based on browser language
    // FIXME If needed only render to string every hour to speed up
    var string = "<!DOCTYPE html>" + React.renderToString(React.createElement(bawang));
    res.send(string);
});


app.listen(PORT);
