
const router = require( 'express' ).Router();

const passport = require( 'passport' );

const { logoutUser, localLogin, localSignup, socialMediaAuthentication, authFailure } = require( '../controllers/auth.controller' );

router.post( 
  
  '/login', 
  
  passport.authenticate( 'local-login', { session: true, failureRedirect: '/authentication-failed' } ), 
  
  localLogin 

);

router.post( 
  
  '/signup/password', 
  
  passport.authenticate( 'local-signup', { failureRedirect: '/authentication-failed' } ), 
  
  localSignup 

);

// Google Authentication
router.get( 
  
  '/auth/google', 
  
  passport.authenticate( 'google', { scope: [ 'profile', 'email' ] } ) 

);

router.get( 
  
  '/auth/google/callback', 
  
  passport.authenticate( 'google', { failureRedirect: '/authentication-failed' } ), 
  
  socialMediaAuthentication 

);

// Facebook Authentication
router.get( 
  
  '/auth/facebook', 
  
  passport.authenticate( 'facebook', { authType: 'reauthenticate', scope: [ 'user_friends', 'manage_pages' ] } ) 

);

router.get( 
  
  '/auth/facebook/callback', 
  
  passport.authenticate( 'facebook', { failureRedirect: '/authentication-failed' } ), 
  
  socialMediaAuthentication 

);

router.get( '/authentication-failed', authFailure );

router.get( '/logout', logoutUser );

module.exports = router;