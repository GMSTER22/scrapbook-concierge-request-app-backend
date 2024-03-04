
const mongoose = require('mongoose');

const router = require( 'express' ).Router();

const passport = require( 'passport' );

router.get( '/logout', ( req, res, next ) => {

  req.logout( err => {

    if ( err ) return next( err );

    res
    
      .status( 200 )

      .clearCookie( 'scr-user' )

      .end();

  } );

  console.log( 'logged out' );

} );

// router.post( '/login', passport.authenticate( 'local-login', { session: true, failureRedirect: '/authentication-failed' } ) );

router.post( '/login', passport.authenticate( 'local-login', { session: true, failureRedirect: '/authentication-failed' } ), ( req, res ) => {

  // const { id, username, admin } = req.user;

  const cookieValue = {
    
    ...req.user,

    id: req.user.id.valueOf()

  }

  console.log( 'success auth', cookieValue, typeof cookieValue );

  res

    .status( 200 )

    .cookie( 'scr-user', JSON.stringify( cookieValue ), {

      // domain: 'localhost',

      // path: '/',
      
      expires: new Date( Date.now() + 30 * 60 * 1000 ),

      // maxAge: 10 * 1000,
      
      httpOnly: false
    
    } )

    .json( req.user );

  console.log( 'success auth', req.user );

} );

router.post( '/signup/password', passport.authenticate( 'local-signup', { failureRedirect: '/authentication-failed' } ), ( req, res ) => {

  res.status( 200 ).send( 'Signed up successfully' );

  console.log( 'Has been authenticated' );

} );

// router.get( '/authentication-success', ( req, res ) => {

//   res.cookie( 'user', req.user, { 
    
//     expires: new Date( Date.now() + 900000 ),
    
//     httpOnly: false 
  
//   } );
  
//   res.status( 200 ).json( req.user );

//   console.log( 'success auth', req.user );

// } );

router.get( '/authentication-failed', ( req, res ) => {

  res.clearCookie( 'scr-user', req.user );

  res.status( 400 ).send( 'Wrong credentials' );

} );

module.exports = router;