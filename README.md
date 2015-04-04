Bawang
======

En ny site till Datasektionen. Som Purjo, fast klyftigare.
PSD-skiss finns på Slack under #bawang.

Bawang byggs som ett skal till Datasektionens olika microservices och kommunicerar genom HTTP REST API:er.
Alla microservices måste följa [JSON API-standarden](http://jsonapi.org/).

Utveckling och körning
----------------------

Bawang är en frontend-site, och kan därför köras på valfri webserver.

För utveckling av Bawang, se till att du har [Node.js](http://nodejs.org/) installerat.
Grunt är det automatiseringsverktyg som Bawang utvecklas med.
Kör `npm install grunt-cli -g` i en terminal för att göra `grunt` till ett globalt kommando.

För att sätta upp utvecklingsmiljön, gå till projektmappen och:
1. Kör `npm install` för att installera Grunt-plugins samt Bower.
2. Kör `grunt` för att kompilera SASS- och Coffeescript-filer.
3. Kör `node server.js` för att starta en enkel utvecklingsserver.
4. Öppna [http://localhost:3000](http://localhost:3000) i en webbläsare.

Det går med fördel att lägga ihop 1., 2., 3. och 4. i en Run Configuration i WebStorm.
Skapa två External Tools för NPM och Grunt som körs Before Launch, och öppna webbläsare After Launch.

Bawang bygger på [AngularJS 1.3](https://angularjs.org/), [CoffeeScript](http://coffeescript.org/) och SASS/[node-sass](https://github.com/sass/node-sass).