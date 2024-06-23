
const mongoose = require( 'mongoose' );

const RequestModel = require( '../models/requests.model' );

const updateUserRequest = async ( req, res ) => {

  const userId = new mongoose.Types.ObjectId( req.params.userId );
  
  const requestId = new mongoose.Types.ObjectId( req.params.requestId );

  const request = await RequestModel.findById( requestId );

  const isUserRequest = request.users.includes( userId );

  const isRequester = request.users[ 0 ] === userId;

  if ( isRequester ) return res.status( 403 ).send( 'Forbidden Action - Not authorized to like/dislike your own request.' );

  let updateRequestOutcome;

  if ( isUserRequest ) {

    updateRequestOutcome = await RequestModel.findByIdAndUpdate(

      requestId,

      { $pull: { users: userId } }

    );
    
  } else {
    
    updateRequestOutcome = await RequestModel.findByIdAndUpdate(

      requestId,

      { $push: { users: userId } }

    ); 

  }

  res.status( 200 ).send( `user ${ userId } request updated successfully` );

}

module.exports = { updateUserRequest }