
const router = require( 'express' ).Router();

const { body } = require('express-validator');

const { sendEmailToken, resetPassword } = require( '../controllers/password-reset.controller' );

const { validator } = require( '../middleware/validator' );

router.post( 
  
  '/', 
  
  body( 'email' ).trim().notEmpty().isEmail().escape(), 
  
  validator, 
  
  sendEmailToken 

);

router.patch( 
  
  '/', 
  
  body( 'userId' ).trim().notEmpty().escape(), 
  
  body( 'resetToken' ).trim().notEmpty().escape(), 
  
  body( 'newPassword' ).trim().notEmpty().escape(), 
  
  validator,
  
  resetPassword 

);

module.exports = router;
