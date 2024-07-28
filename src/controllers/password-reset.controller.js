
const bcrypt = require( 'bcrypt' );

const crypto = require( 'crypto' );

const UserModel = require( '../models/users.model' );

const TokenModel = require('../models/token.model');

const { sendPasswordRecoveryEmail } = require( '../services/sendEmail.service' );

const config = require( '../config/index' );

const sendEmailToken = async ( req, res ) => {

  try {

    const user = await UserModel.findOne( { email: req.body.email } ).exec();

    if ( ! user ) return res
    
      .status( 400 )
      
      .json( {

        message: 'Email not found.'

      } );

    if ( ! user.password ) return res
      
      .status( 400 )

      .json( {

        message: 'User never set a password.'

      } )

    const token = await TokenModel.findOne( { userId: user._id } ).exec();

    if ( token ) token.deleteOne( { _id: token._id } );

    const resetToken = crypto.randomBytes( 32 ).toString( 'hex' );

    const resetTokenHash = await bcrypt.hash( resetToken, config.bcryptSaltRounds );

    const newToken = await TokenModel.create( { 
      
      userId: user._id,
      
      token: resetTokenHash
    
    } );
      
    await sendPasswordRecoveryEmail( user._id, user.email, user.username, resetToken );
    
    res
    
      .status( 200 )
      
      .json( {

        message: `Recovery email sent to ${ req.body.email }`

      } );

  } catch( error ) {

    console.error( error );

    res
    
      .status( 500 )
      
      .json( { message: `Failed to send recovery email to ${ req.body.email }.\n Try again later.` } );

  }

}

const resetPassword = async ( req, res ) => {

  try {

    const { userId, resetToken, newPassword } = req.body;

    const token = await TokenModel.findOne( { userId } ).exec();

    if ( ! token ) return res
    
      .status( 400 )
      
      .json( {
        
        message: 'Token expired.'
      
      } );

    const match = await bcrypt.compare( resetToken, token?.token );

    if ( match ) {

      const newPasswordHash = await bcrypt.hash( newPassword, config.bcryptSaltRounds );

      const updatedPasswordResult = await UserModel.updateOne( { _id: userId }, { password: newPasswordHash } );

    }

    res
    
      .status( 200 )
      
      .json( {
      
        message: 'Password reset was successful.'
      
      } );

  } catch ( error ) {

    res
    
      .status( 500 )
      
      .json( {
        
        message: 'An Error occurred while resetting the password.'
      
      } );

  }

}

module.exports = {

  sendEmailToken,

  resetPassword

}