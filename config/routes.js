/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  '/': 'ViewsController.home',

  '/register': 'ViewsController.register',

  '/profile/:id?': 'ViewsController.profile',

  '/edit/:id?': 'ViewsController.editProfile',

  '/recoverPassword': 'ViewsController.recoverPassword',  

  '/rankings': 'ViewsController.rankings',  

  '/points': 'ViewsController.points',  

  '/challenges/:friendlyId': 'ViewsController.challenges',  

  '/game/:id': 'ViewsController.game',  

  '/books': 'ViewsController.books',  

  '/about': 'ViewsController.about',  

  '/admin': 'ViewsController.admin',

  // Auth
  'post /auth/email': 'AuthController.loginByEmail',

  'post /auth/register': 'AuthController.register',

  'post /auth/update': 'AuthController.updateProfile',

  'post /auth/recoverPassword': 'AuthController.recoverPassword',

  'get /auth/facebook/callback': 'AuthController.fb_authenticate_callback',

  'get /auth/facebook/:register?/:team?/:captcha?': 'AuthController.fb_authenticate',

  'get /auth/logout': 'AuthController.logout',

  //Games
  'get /api/games/nextGameId/:id': 'GameController.nextGame',

  'post /api/games/success/': 'GameResultController.save'

};
