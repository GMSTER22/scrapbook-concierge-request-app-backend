
const router = require( 'express' ).Router();

const passport = require( 'passport' );

const { body } = require('express-validator');

const { localLogin, localSignup, socialMediaAuthentication, authFailure, logoutUser } = require( '../controllers/auth.controller' );

const { validator } = require( '../middleware/validator' );

const { moderateLimiter, strictLimiter } = require( '../config/rate-limiter' );

router.post( 
  
  '/login', 

  moderateLimiter,

  body( 'email' ).trim().notEmpty().isEmail().escape(), 

  body( 'password' ).trim().notEmpty().isLength( { min: 6 } ).escape(), 

  validator, 
  
  passport.authenticate( 'local-login', { session: false, failureRedirect: '/authentication-failed' } ), 
  
  localLogin 

);

router.post( 
  
  '/signup/password',

  strictLimiter,
  
  body( 'email' ).trim().notEmpty().isEmail().escape(), 

  body( 'password' ).trim().notEmpty().isLength( { min: 6 } ).escape(), 

  validator, 
  
  passport.authenticate( 'local-signup', { session: false, failureRedirect: '/authentication-failed' } ), 
  
  localSignup 

);

// Google Authentication
router.get( 
  
  '/auth/google', 

  moderateLimiter,
  
  passport.authenticate( 'google', { scope: [ 'profile', 'email' ] } ) 

);

router.get( 
  
  '/auth/google/callback', 
  
  passport.authenticate( 'google', { session: false, failureRedirect: '/authentication-failed' } ), 
  
  socialMediaAuthentication 

);

// Facebook Authentication
router.get( 
  
  '/auth/facebook', 

  moderateLimiter,
  
  passport.authenticate( 'facebook', { scope: [ 'email' ] } ) 

);

router.get( 
  
  '/auth/facebook/callback', 
  
  passport.authenticate( 'facebook', { session: false, failureRedirect: '/authentication-failed' } ), 
  
  socialMediaAuthentication 

);

router.get( '/authentication-failed', authFailure );

// router.get( '/logout', logoutUser );

module.exports = router;