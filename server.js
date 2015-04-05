/**
* Launches a small static site server for development.
*/

// Set up dependencies
var http = require('http')
var fs = require('fs')

var app = function (req, res)
{
    // If no errors are encountered, HTTP status should be 200
    var code = 200
    var body = fs.readFileSync('bawang/templates/main-sv-se.html')

    // If request URI begins with /assets or /bawang, serve static file
    if (req.url.indexOf('/assets/') == 0 || req.url.indexOf('/bawang/') == 0)
    {
        try
        {
            body = fs.readFileSync(__dirname.concat(req.url))
        }
        catch (e)
        {
            code = 404
            body = JSON.stringify(e)
        }
    }
    // Serve Swedish app page
    else if (req.url.indexOf('/sv-se/') == 0)
    {
        body = fs.readFileSync('bawang/templates/main-sv-se.html')
    }
    // Serve English app page
    else if (req.url.indexOf('/en-us/') == 0)
    {
        body = fs.readFileSync('bawang/templates/main-en-us.html')
    }
    // If request URI does not begin with any
    else if (req.url.indexOf('/sv-se/') == -1 && req.url.indexOf('/en-us/') == -1)
    {
        code = 301
        res.writeHead(code, {"Location": "/sv-se/"})
        res.end()
    }

    // Respond to request
    res.writeHead(code)
    res.end(body)

    // Console logging
    var now = new Date().toLocaleString();
    console.log('[' + code + '] ' + now.substr(0, now.length - 16) + ': ' + req.url)
}

// Launch server
http.createServer(app).listen(3000)

// Tell the user we are up and running
console.log('Listening on port 3000.')