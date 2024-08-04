// In the server, both of these may be set, but in the client, only RAZZLE_* environment variables can be seen.
export const TAITAN_URL = process.env.TAITAN_URL || process.env.RAZZLE_TAITAN_URL || "https://taitan.datasektionen.se";
export const FRONTEND_TAITAN_URL = process.env.RAZZLE_TAITAN_URL || "https://taitan.datasektionen.se"

export const CALYPSO_URL = process.env.CALYPSO_URL || process.env.RAZZLE_CALYPSO_URL || "https://calypso.datasektionen.se/api";
export const FRONTEND_CALYPSO_URL = process.env.RAZZLE_CALYPSO_URL || "https://calypso.datasektionen.se/api";
