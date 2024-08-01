
const router = require('express').Router();

const ensureAuth = require( '../middleware/auth' );

const authRouter = require( './auth.route' );

const requestsRouter = require( './requests.route' );

const usersRequestsRouter = require( './users-requests.route' );

const passwordResetRouter = require( './password-reset.route' );

const notificationsRouter = require( './notifications.route' );

router.get( '/', ( req, res ) => {

  res.status( 200 ).send( 'Hello World' );

} );

router.use( '/', authRouter );

// router.use( '/requests', requestsRouter );
router.use( '/requests', ensureAuth, requestsRouter );

// router.use( '/users-requests', ensureAuth, usersRequestsRouter );
router.use( '/user-requests', ensureAuth, usersRequestsRouter );

router.use( '/password-reset', passwordResetRouter );

router.use( '/notifications', notificationsRouter );

module.exports = router;
