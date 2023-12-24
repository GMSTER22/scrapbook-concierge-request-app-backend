// getting-started.js
const mongoose = require( 'mongoose' );

const config = require( '../config/index' );

const connectDb = async callback => {

  try {
    
    await mongoose.connect( config.databaseURI, { useNewUrlParser: true, useUnifiedTopology: true } );

    callback( null );

  } catch ( error ) {
    
    callback( error );

    console.log(error, 'error connecting to server');

  }

}

module.exports = {
  connectDb
};