
const router = require( 'express' ).Router();

router.get( '/', ( req, res ) => {

  res.status( 200 ).send( 'Get User' );

} );

router.post( '/', async ( req, res ) => {

  res.status( 200 ).send( 'Posted User' );

} );

router.patch( '/', ( req, res ) => {

  res.status( 200 ).send( 'Patched User' );

} );



router.delete( '/', ( req, res ) => {

  res.status( 200 ).send( 'Deleted User' );

} );

module.exports = router;