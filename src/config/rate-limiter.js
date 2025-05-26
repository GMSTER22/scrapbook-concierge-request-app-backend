
const { rateLimit } = require('express-rate-limit');

const moderateLimiter  = rateLimit( {

  windowMs: 10 * 60 * 1000, // 10 minutes

  limit: 50, // Limit each IP to 50 requests per `window` (here, per 10 minutes)

  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers

  legacyHeaders: false, // Disable the `X-RateLimit-*` headers

  message: { "message": "Too many requests, please try again later."} // The response body to send back when a client is rate limited.

} );

const strictLimiter = rateLimit( {

  windowMs: 10 * 60 * 1000, // 10 minutes

  limit: 3, // Limit each IP to 100 requests per `window` (here, per 10 minutes)

  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers

  legacyHeaders: false, // Disable the `X-RateLimit-*` headers

  message: { "message": "Too many requests, please try again later."} // The response body to send back when a client is rate limited.

} );

module.exports = { strictLimiter, moderateLimiter };
