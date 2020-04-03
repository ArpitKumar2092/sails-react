/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

 middleware: {

  // Define a custom HTTP middleware fn with the key `foobar`:
  foobar: function (req,res,next) { /*...*/ next(); },

  // Define another couple of custom HTTP middleware fns with keys `passportInit` and `passportSession`
  // (notice that this time we're using an existing middleware library from npm)
  passportInit    : require('passport').initialize(),
  passportSession : require('passport').session(),

  // Override the conventional cookie parser:
  cookieParser: function (req, res, next) { /*...*/ next(); },


  // Now configure the order/arrangement of our HTTP middleware
  order: [
    'startRequestTimer',
    'cookieParser',
    'session',
    'passportInit',            // <==== passport HTTP middleware should run after "session"
    'passportSession',         // <==== (see https://github.com/jaredhanson/passport#middleware)
    'bodyParser',
    'compress',
    'foobar',                  // <==== we can put this stuff wherever we want
    'methodOverride',
    'poweredBy',
    '$custom',
    'router',
    'www',
    'favicon',
    '404',
    '500'
  ]
},

customMiddleware: function(app){
   //Intended for other middleware that doesn't follow 'app.use(middleware)' convention
   require('other-middleware').initialize(app);
}


  /***************************************************************************
  *                                                                          *
  * The number of milliseconds to cache static assets in production.         *
  * These are any flat files like images, scripts, styleshseets, etc.        *
  * that are served by the static middleware.  By default, these files       *
  * are served from `.tmp/public`, a hidden folder compiled by Grunt.        *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
