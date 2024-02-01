# BAWANG

Universal react application for the chapter website.

## Environment variables

| Name               | Default                              | Description                                                                                               |
|--------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------------|
| TAITAN_URL         | https://taitan.datasektionen.se      | URL to get contents from taitan on                                                                        |
| RAZZLE_TAITAN_URL  | https://taitan.datasektionen.se      | URL to get contents from taitan on. **Set during build**. Should probably be the same as TAITAN_URL       |
| RAZZLE_CALYPSO_URL | https://calypso.datasektionen.se/api | URL to get news from calypso on. **Set during build**                                                     |
| TAITAN_CACHE_TTL   | 3600                                 | Time to keep content from taitan cached in seconds. Tip: Set to 0 if using local taitan & bawang-content. |
| CALYPSO_CACHE_TTL  | 30                                   | Time to keep news from calypso cached in seconds. Tip: Set to 0 if using local calypso.                   |
| PORT               | 3000                                 | Port to listen on                                                                                         |

## Running
Bawang runs on Node v.10.x.x. It doesn't work on later versions (v.12.20.1)

- `npm run start:dev` will start the whole universal server in development mode. HMR will be enabled on both server and client side!
- `npm run build` will build a production ready server.
- `npm start` will start the production server.
