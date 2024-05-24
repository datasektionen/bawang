// In the server, both of these may be set, but in the client, only RAZZLE_* environment variables can be seen.
export const TAITAN_URL = process.env.TAITAN_URL || process.env.RAZZLE_TAITAN_URL || "https://taitan.datasektionen.se";
export const FRONTEND_TAITAN_URL = process.env.RAZZLE_TAITAN_URL || "https://taitan.datasektionen.se"
