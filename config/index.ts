/**
 * Export all global constants & configs
 */

export const DOMAIN_URL: string | undefined =
    typeof process.env.APP_DOMAIN_URL === "undefined"
        ? "http://localhost:3000"
        : process.env.APP_DOMAIN_URL;

/**
 * Note: Using proxy middleware to avoid cors issue
 */
export const API_URL: string | undefined =
    typeof process.env.APP_API_URL === "undefined"
        ? "/api/v1/web"
        : process.env.APP_API_URL;

// http://localhost:6061 || http://vfaavtest.ddns.net || http://admin.valueforasset.com
export const API_SERVICE_DOMAIN: string | undefined =
    typeof process.env.API_SERVICE_DOMAIN === "undefined"
        ? "http://localhost:6062"
        : process.env.API_SERVICE_DOMAIN;

export const TOKEN_KEY =
    typeof process.env.TOKEN_KEY === "undefined"
        ? "__dev_env"
        : process.env.TOKEN_KEY;
