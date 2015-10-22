# Bawang
node express react isomorphic

Warning, application may include traces of black client-server side rendering magic.
But don't be afraid, just take a look into components/bawang.jsx and you should feel right at home, except for the weird inline CSS, WOOPS.

You may ask, "why so fucking complicated just for a simple site?". To that I say, "BECAUSE WE CAN!". No but seriously, when you get the chance, try out new stuff it's kind of fun.

If you are so hipster, why not Flux? One thing at a time.


## State Magic
This application only has tree states to keep track of, the news, the events and language for the front-page. The language is chosen by the server depending on accept-header, then a cookie is set for that user. The initial state is sent and stored in window.\_state and then rendered locally.


## Setup
    npm install
    node server.js


## TODO
* Pixel push, tip overlay image on design with opacity
* more reactive-ness
* Hide year from date in events
* Refactor navigation bar for others to use. Maybe create its own repo? NPM module or something?
* http2 would be cool
