# BAWANG

Universal react application for the chapter website.

NOTE: when building with podman, you may need to specify `--ulimit nofile=65535:65535`.

## Environment variables

| Name               | Default                              | Description                                                                                               |
|--------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------------|
| TAITAN_URL         | https://taitan.datasektionen.se      | URL to taitan from the backend.                                                                           |
| RAZZLE_TAITAN_URL  | https://taitan.datasektionen.se      | URL to taitan from the frontend. **Set during both build and run**.                                       |
| RAZZLE_CALYPSO_URL | https://calypso.datasektionen.se/api | URL to get news from calypso on. **Set during both build and run**.                                       |
| TAITAN_CACHE_TTL   | 3600                                 | Time to keep content from taitan cached in seconds. Tip: Set to 0 if using local taitan & bawang-content. |
| CALYPSO_CACHE_TTL  | 30                                   | Time to keep news from calypso cached in seconds. Tip: Set to 0 if using local calypso.                   |
| PORT               | 3000                                 | Port to listen on                                                                                         |
| NODE_OPTIONS       | -                                    | Set to --openssl-legacy-provider if using a non-ancient version of node                                   |

## Running

- `npm run start:dev` will start the whole universal server in development mode. HMR will be enabled on both server and client side!
- `npm run build` will build a production ready server.
- `npm start` will start the production server.
