
const config = require( '../config/index' );

const jwt = require( 'jsonwebtoken' );

const logoutUser = ( req, res, next ) => {

  req.logout( err => {

    if ( err ) return next( err );

    // res
    
    //   .status( 200 )

    //   .clearCookie( 'scr-user' )

    //   .end();

  } );

}

const localLogin = ( req, res ) => {

  try {
    
    jwt.sign( req.user, config.privateKey, {
        
        algorithm: 'RS256', 
        
        expiresIn: 60 * 60 // Expressed in seconds
      
      }, ( err, token ) => {
  
        if ( err ) res.status( 500 ).send( 'Error generating token' );
  
        else res.status( 200 ).json( token );   
  
      } 
    
    );

  } catch ( error ) {
    
    res.status( 500 ).send( 'Failed to generate Login token' );

  }

}

const localSignup = ( req, res ) => {

  res.status( 200 ).send( 'Signed up successfully' );

}

const socialMediaAuthentication = ( req, res ) => {

  try {
    
    jwt.sign( req.user, config.privateKey, {
        
        algorithm: 'RS256', 
        
        expiresIn: 60 * 60 // Expressed in seconds
      
      }, ( err, token ) => {
  
        if ( err ) res.status( 500 ).send( 'Error generating token' );
  
        else res.status( 200 ).redirect( `${config.CLIENT_URL}/login?token=${token}` );
  
      } 
    
    );

  } catch ( error ) {
    
    res.status( 500 ).send( 'Failed to generate Login token' );

  }

};

const authFailure = ( req, res ) => {

  res.status( 400 ).send( 'Wrong credentials' );

}

module.exports = {

  logoutUser,

  localLogin,

  localSignup,

  socialMediaAuthentication,

  authFailure

}