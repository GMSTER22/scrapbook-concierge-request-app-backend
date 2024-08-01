
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
        
        expiresIn: 3 * 60 * 60 // Expressed in seconds
      
      }, ( err, token ) => {
  
        if ( err ) res
        
          .status( 500 )
          
          .json( {
            
            message: 'An Error occurred while generating token.'
          
          } );
  
        else res
        
          .status( 200 )
          
          .json( {
            
            message: 'Success',
            
            token
          
          } ); 
  
      } 
    
    );

  } catch ( error ) {
    
    res
    
      .status( 500 )
      
      .json( {
        
        message: 'An error occurred while logging user. Try again later.'
      
      } );

  }

}

const localSignup = ( req, res ) => {

  res
  
    .status( 200 )
    
    .json( {
      
      message: 'Signed up successfully.'
    
    } );

}

const socialMediaAuthentication = ( req, res ) => {

  try {
    
    jwt.sign( req.user, config.privateKey, {
        
        algorithm: 'RS256', 
        
        expiresIn: 3 * 60 * 60 // Expressed in seconds
      
      }, ( err, token ) => {
  
        if ( err ) res
        
          .status( 500 )
          
          .json( {
            
            message: 'An Error occurred while generating token.'
          
          } );
  
        else res.status( 200 ).redirect( `${config.CLIENT_URL}/login?token=${token}` );
  
      } 
    
    );

  } catch ( error ) {
    
    res
    
      .status( 500 )
      
      .json( {
        
        message: 'Login failed. Try again later.'
      
      } );

  }

};

const authFailure = ( req, res ) => {

  res
  
    .status( 400 )
    
    .json( {
      
      message:'Wrong credentials.'
    
    } );

}

module.exports = {

  logoutUser,

  localLogin,

  localSignup,

  socialMediaAuthentication,

  authFailure

}