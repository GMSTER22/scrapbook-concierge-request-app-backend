
const router = require('express').Router();

const ensureAuth = require( '../middleware/auth' );

const authRouter = require( './auth.route' );

const usersRouter = require( './users.route' );

const requestsRouter = require( './requests.route' );

const usersRequestsRouter = require( './users-requests.route' );

router.get( '/', ( req, res ) => {

  res.status( 200 ).send( 'Hello World' );

} );

router.use( '/', authRouter );

router.use( '/users', usersRouter );

// router.use( '/requests', ensureAuth, requestsRouter );
router.use( '/requests', requestsRouter );

// router.use( '/users-requests', ensureAuth, usersRequestsRouter );
router.use( '/user-requests', usersRequestsRouter );

module.exports = router;
