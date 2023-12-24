
const router = require( 'express' ).Router();

const passport = require( 'passport' );

router.get( '/logout', ( req, res, next ) => {

  req.logout( err => {

    if ( err ) return next( err );

    res.status( 200 ).send( 'Logged out successfully' );

  } );

  console.log( 'logged out' );

} );

router.post( '/login', passport.authenticate( 'local-login', { session: true, failureRedirect: '/authentication-failed' } ), ( req, res ) => {

  res.status( 200 ).send( req.user );

  console.log( 'Has been authenticated' );

} );

router.post( '/signup/password', passport.authenticate( 'local-signup', { failureRedirect: '/authentication-failed' } ), ( req, res ) => {

  res.status( 200 ).send( 'Signed up successfully' );

  console.log( 'Has been authenticated' );

} );

router.get( '/authentication-failed', ( req, res ) => {

  res.status( 400 ).send( 'Wrong credentials' );

} );

module.exports = router;