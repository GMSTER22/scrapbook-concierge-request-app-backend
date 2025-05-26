
const router = require( 'express' ).Router();

const { body } = require('express-validator');

const { notifyUsers, manageSubscriptions } = require( '../controllers/notifications.controller' );

const { validator } = require( '../middleware/validator' );

const { strictLimiter } = require( '../config/rate-limiter' );

router.post( 
  
  '/', 
  
  body( 'requestIds' ).isArray(), 

  validator, 
  
  notifyUsers 

);

router.patch( 
  
  '/subscriptions', 

  strictLimiter, 
  
  body( 'email' ).trim().notEmpty().isEmail().escape(),  

  body( 'emailOptIn' ).notEmpty().isBoolean().escape(), 
  
  validator, 
  
  manageSubscriptions 

);

module.exports = router;