
const router = require( 'express' ).Router();

const { updateUserRequest, removeUserRequest } = require( '../controllers/users-requests.controller' );

router.patch( '/:requestId/users/:userId', updateUserRequest );

// router.delete( '/:requestId/users/:userId', removeUserRequest );

module.exports = router;