
const router = require( 'express' ).Router();

const { notifyUsers, manageSubscriptions } = require( '../controllers/notifications.controller' );

router.post( '/', notifyUsers );

router.patch( '/subscriptions', manageSubscriptions );

module.exports = router;