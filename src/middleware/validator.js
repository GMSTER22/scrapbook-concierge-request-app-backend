
const { validationResult } = require('express-validator');

const { formatValidatorErrorMessage } = require( '../utils/index' );

const validator = ( req, res, next ) => {

  const result = validationResult( req );

  if ( ! result.isEmpty() ) {

    const errors = result.array();

    const message = formatValidatorErrorMessage( errors );
    
    return res
  
      .status( 400 )
      
      .json( { message } );

  }

  next();

}


module.exports = { validator };