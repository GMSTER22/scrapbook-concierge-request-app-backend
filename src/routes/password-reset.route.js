
const router = require( 'express' ).Router();

const { body } = require('express-validator');

const { sendEmailToken, resetPassword } = require( '../controllers/password-reset.controller' );

const { validator } = require( '../middleware/validator' );

const { strictLimiter } = require( '../config/rate-limiter' );

router.post( 
  
  '/', 

  strictLimiter,
  
  body( 'email' ).trim().notEmpty().isEmail().escape(), 
  
  validator, 
  
  sendEmailToken 

);

router.patch( 
  
  '/', 

  strictLimiter, 
  
  body( 'userId' ).trim().notEmpty().escape(), 
  
  body( 'resetToken' ).trim().notEmpty().escape(), 
  
  body( 'newPassword' ).trim().notEmpty().escape(), 
  
  validator,
  
  resetPassword 

);

module.exports = router;
