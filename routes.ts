/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/explore",
  "/courses",
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-policy",
  "/disclaimer",
  "/api/uploadthing/*",
  "/api/webhook",
  "/auth/verify-email",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to the default login redirect path (/dashboard) unless specified manually
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset-password",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that strart with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
