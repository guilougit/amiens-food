/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/partenaires",
];

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
    "/connexion",
    "/compte",
    "/payment"
];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/compte";