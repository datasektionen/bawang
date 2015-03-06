Bawang
======

En ny site till Datasektionen. Som Purjo, fast klyftigare.
Skiss finns på Slack under #bawang.

Byggs som ett skal till Datasektionens olika microservices, kommunicerar genom HTTP REST API:er.
Alla microservices måste följa [JSON API-standarden](http://jsonapi.org/).

Build and run
-------------

Bawang är bara frontend, så det bör gå att transpile:a allt i typ WebStorm och öppna main.html i en browser.
Det lättaste är dock att använda den Gruntfile som gör preppar allt och startar en lokal webserver:

1. Se till att du har [Node.js v0.10+](http://nodejs.org/) med NPM (standard) installerat.
2. Kör `npm install grunt-cli -g` för att göra kommandot `grunt` globally accessible.
3. cd:a till projektmappen och kör `npm install` för att dra in alla dependencies.
4. Kör kommandot `grunt`, servern landar på [http://localhost:3000](http://localhost:3000).

Bawang bygger på AngularJS 1.3, CoffeeScript och SASS ([node-sass](https://github.com/sass/node-sass)).