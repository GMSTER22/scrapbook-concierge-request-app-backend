
const router = require( 'express' ).Router();

const { updateUserRequest } = require( '../controllers/users-requests.controller' );

router.patch( '/:requestId/users/:userId', updateUserRequest );

module.exports = router;