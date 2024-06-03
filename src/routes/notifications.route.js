
const router = require( 'express' ).Router();

const { notifyUsers } = require( '../controllers/notifications.controller' );

// router.get( '/:id', getSingleRequest );

// router.get( '/', getAllRequests );

router.post( '/notify-users', notifyUsers );

// router.patch( '/:requestId/users/:userId', updateRequest );

// router.delete( '/:requestId/users/:userId', deleteRequest );

module.exports = router;