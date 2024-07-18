
const bcrypt = require( 'bcrypt' );

const crypto = require( 'crypto' ); 

const router = require( 'express' ).Router();

const UserModel = require( '../models/users.model' );

const TokenModel = require('../models/token.model');

const { sendPasswordRecoveryEmail } = require( '../services/sendEmail.service' );

const SALT_ROUNDS = 10;

router.post( '/', async ( req, res, next ) => {

  const user = await UserModel.findOne( { email: req.body.email } ).exec();

  if ( ! user ) return res.status( 400 ).send( 'Email not found' );

  const token = await TokenModel.findOne( { userId: user._id } ).exec();

  if ( token ) token.deleteOne( { _id: token._id } );

  const resetToken = crypto.randomBytes( 32 ).toString( 'hex' );

  const resetTokenHash = await bcrypt.hash( resetToken, SALT_ROUNDS );

  const newToken = await TokenModel.create( { 
    
    userId: user._id,
    
    token: resetTokenHash
  
  } );
    
  await sendPasswordRecoveryEmail( user._id, user.email, user.username, resetToken );
  
  res.status( 200 ).send( 'Email sent' );

} );

router.patch( '/', async ( req, res, next ) => {

  const { userId, resetToken, newPassword } = req.body;

  const token = await TokenModel.findOne( { userId } ).exec();

  if ( ! token ) return res.status( 400 ).send( 'No request have been made by user' );

  const match = await bcrypt.compare( resetToken, token?.token );

  if ( match ) {

    const newPasswordHash = await bcrypt.hash( newPassword, SALT_ROUNDS );

    const updatedPasswordResult = await UserModel.updateOne( { _id: userId }, { password: newPasswordHash } );

  }

  res.status( 200 ).send( 'Password reset was successful' );

} );

module.exports = router;