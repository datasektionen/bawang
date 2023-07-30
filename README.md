BAWANG
======

Universal react application for the chapter website.

Environment variables
-------

| Name               | Default                              | Description                                                                                         |
|--------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------|
| TAITAN_URL         | https://taitan.datasektionen.se      | URL to get contents from taitan on                                                                  |
| RAZZLE_TAITAN_URL  | https://taitan.datasektionen.se      | URL to get contents from taitan on. **Set during build**. Should probably be the same as TAITAN_URL |
| RAZZLE_CALYPSO_URL | https://calypso.datasektionen.se/api | URL to get news from calypso on. **Set during build**                                               |
| PORT               | 3000                                 | Port to listen on                                                                                   |

Running
-------
Bawang runs on Node v.10.x.x. It doesn't work on later versions (v.12.20.1)

`npm start:dev` will start the whole universal server in development mode. HMR will be enabled on both server and client side!

`npm run build` will build a production ready server.

`npm run start` will start the production server.

TODO
----
- Fix frontpage styling
- Feature complete news page
- Improve translation implementation
- Add more content providers, i.e. skywhale, pandora
- Write a more helpful README
