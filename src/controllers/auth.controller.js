
const config = require( '../config/index' );

const logoutUser = ( req, res, next ) => {

  req.logout( err => {

    if ( err ) return next( err );

    res
    
      .status( 200 )

      .clearCookie( 'scr-user' )

      .end();

  } );

  console.log( 'logged out' );

}

const localLogin = ( req, res ) => {

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

      httpOnly: true,

      secure: true, // Ensures the cookie is sent only over HTTPS

      sameSite: 'None', // Allows cross-site cookies
      
      // expires: new Date( Date.now() + 120 * 60 * 1000 ),

      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    
    } )

    .json( req.user );

}

const localSignup = ( req, res ) => {

  res.status( 200 ).send( 'Signed up successfully' );

}

const socialMediaAuthentication = ( req, res ) => {

  const cookieValue = {
    
    ...req.user,

    id: req.user.id.valueOf()

  }

  res

    .status( 200 )

    .cookie( 'scr-user', JSON.stringify( cookieValue ), {

      // domain: 'localhost',

      // path: '/',

      httpOnly: true,

      secure: true, // Ensures the cookie is sent only over HTTPS

      sameSite: 'None', // Allows cross-site cookies
      
      // expires: new Date( Date.now() + 120 * 60 * 1000 ),

      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    
    } )
    
    .redirect( config.CLIENT_URL );

};

const authFailure = ( req, res ) => {

  res.clearCookie( 'scr-user' );

  res.clearCookie( 'scrAppSessionId' );

  res.status( 400 ).send( 'Wrong credentials' );

}

module.exports = {

  logoutUser,

  localLogin,

  localSignup,

  socialMediaAuthentication,

  authFailure

}