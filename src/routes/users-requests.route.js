
const router = require( 'express' ).Router();

const { addUserRequest, removeUserRequest } = require( '../controllers/users-requests.controller' );

router.patch( '/:requestId/users/:userId', addUserRequest );

router.delete( '/:requestId/users/:userId', removeUserRequest );

module.exports = router;