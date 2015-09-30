# Bawang
node express reactand just code aways

Warning, application may include traces of black client-server side rendering magic.
But don't be afraid, just take a look into components/bawang.jsx and you should feel right at home.

## Setup

    npm install
    node server.js

## TODO
* Add react-translate to everything. https://www.npmjs.com/package/react-translate
* Look at cookie and browser default language when determining what language to send to client as default
* Create lightweight global stylesheet with fonts, default colors and forms.
* Implement styling
* Refactor navigation bar for others to use. Maybe create its own repo? NPM module or something?
* Implement news widget. read rss from datasektionen.se or dataflödet (whenever thats ready).
* Implement source maps for browserify/reactify thingyn. Should be easy with gulp-sourcemaps and pipe from bundle() in server.js
