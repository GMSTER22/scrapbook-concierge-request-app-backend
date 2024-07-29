
const formatValidatorErrorMessage = ( errors ) => {

  const uniqueErrors = Array.from( new Set( errors.map( error => error.path ) ) );
  
  let errorsLength = uniqueErrors.length;
  
  if ( errorsLength === 1 ) return `${ uniqueErrors[ 0 ] } is invalid`;

  return Array.from( uniqueErrors )
  
    .map( ( error, index ) => {

      if ( index === 0 ) return error;

      else if ( index > 0 && index < errorsLength - 1 ) return `, ${ error }`;

      else return ` and ${ error } are invalid`;

    } )
    
    .join( '' );

} 

module.exports = { formatValidatorErrorMessage }