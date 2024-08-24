
const router = require( 'express' ).Router();

const { body, param, query } = require( 'express-validator' );

const { validator } = require( '../middleware/validator' );

const { getSingleRequest, getRequestsByTitle, getRequests, createRequest, updateRequest, deleteRequest } = require( '../controllers/requests.controller' );

router.get( 
  
  '/search', 
  
  query( 'title' ).trim().notEmpty().escape(), 
  
  validator, 
  
  getRequestsByTitle 

);

router.get( 
  
  '/:id', 
  
  param( 'id' ).trim().notEmpty().escape(), 
  
  validator, 
  
  getSingleRequest 

);

router.get( 
  
  '/', 
  
  query( 'page' ).optional().trim().escape(), 
  
  query( 'limit' ).optional().trim().escape(), 

  query( 'id' ).optional().trim().escape(), 

  query( 'released' ).optional().isBoolean().escape(), 

  query( 'sort_by' ).optional().trim().escape(), 

  query( 'order_by' ).optional().trim().escape(),

  validator,
  
  getRequests 

);

router.post( 
  
  '/:id', 
  
  param( 'id' ).trim().notEmpty().escape(), 

  body( 'title' ).trim().notEmpty().escape(), 
  
  validator, 
  
  createRequest

);

router.patch( 
  
  '/:requestId/users/:userId', 
  
  param( 'requestId' ).trim().notEmpty().escape(), 

  param( 'userId' ).trim().notEmpty().escape(), 
  
  validator, 
  
  updateRequest 

);

router.delete( 
  
  '/:requestId/users/:userId', 
  
  param( 'requestId' ).trim().notEmpty().escape(), 
  
  param( 'userId' ).trim().notEmpty().escape(), 
  
  validator, 
  
  deleteRequest 

);

module.exports = router;