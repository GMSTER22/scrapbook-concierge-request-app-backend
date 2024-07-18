
const config = require( '../config/index' );

const jwt = require( 'jsonwebtoken' );

const ensureAuth = ( req, res, next ) => {

  const authHeader = req.headers[ 'authorization' ];

  const token = authHeader && authHeader.split( ' ' )[ 1 ];

  if ( token ) {

    jwt.verify( token, config.publicKey, function( err, user ) {

      if ( err ) res.status( 401 ).send( 'Unauthenticated' );

      else {

        req.user = user;

        next();

      }

    } );

  } else {

    res.status( 401 ).send( 'Unauthenticated' );

  }

}

module.exports = ensureAuth;