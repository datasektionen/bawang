#!/usr/local/bin/node
/**
* Launches a small static site server for development.
*/

// Set up dependencies
var http = require('http');
var fs = require('fs');

var app = function (req, res) {

    // If a request does not match any, serve the main page
    var code = 200;
    body = fs.readFileSync('bawang/templates/main.html');

    // If request URI begins with /assets or /bawang, serve static file
    if (req.url.indexOf('/assets/') == 0 || req.url.indexOf('/bawang/') == 0) {
        try {
            body = fs.readFileSync(__dirname.concat(req.url));
        } catch (e) {
            code = 404;
            body = JSON.stringify(e);
        }
    }

    // Respond to request
    res.writeHead(code);
    res.end(body);

    // Console logging
    var now = new Date().toLocaleString();
    console.log('[' + code + '] ' + now.substr(0, now.length - 15) + ': ' + req.url);
}

// Launch server
http.createServer(app).listen(3000);

// Tell the user we are up and running
console.log('Listening on port 3000.');