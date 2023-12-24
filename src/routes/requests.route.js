
const router = require( 'express' ).Router();

const { getSingleRequest, getAllRequests, createRequest, updateRequest, deleteRequest } = require( '../controllers/requests.controller' );

router.get( '/:id', getSingleRequest );

router.get( '/', getAllRequests );

router.post( '/:id', createRequest );

router.patch( '/:requestId/users/:userId', updateRequest );

router.delete( '/:requestId/users/:userId', deleteRequest );

module.exports = router;