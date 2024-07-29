
const router = require( 'express' ).Router();

const { updateUserRequest } = require( '../controllers/users-requests.controller' );

const {  param } = require( 'express-validator' );

const { validator } = require( '../middleware/validator' );

router.patch( 
  
  '/:requestId/users/:userId', 
  
  param( 'requestId' ).notEmpty().escape(),  
  
  param( 'userId' ).notEmpty().escape(), 
  
  validator,
  
  updateUserRequest 

);

module.exports = router;
