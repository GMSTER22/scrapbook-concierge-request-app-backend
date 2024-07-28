
const router = require( 'express' ).Router();

const { sendEmailToken, resetPassword } = require( '../controllers/password-reset.controller' );

router.post( '/', sendEmailToken );

router.patch( '/', resetPassword );

module.exports = router;
