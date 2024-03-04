
const mongoose = require( 'mongoose' );

const RequestModel = require( '../models/requests.model' );

const addUserRequest = async ( req, res ) => {

  const userId = new mongoose.Types.ObjectId( req.params.userId );
  
  const requestId = new mongoose.Types.ObjectId( req.params.requestId );

  const request = await RequestModel.findById( requestId );

  const isUserRequest = request.users.includes( userId );

  const isRequester = request.users[ 0 ] === userId;

  if ( isRequester ) return res.status( 403 ).send( 'Forbidden Action - Not authorized to like/dislike your own request.' );

  let updateRequestOutcome;

  let action;

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

  console.log( updateRequestOutcome );

  res.status( 200 ).send( `user ${ userId } request updated successfully` );

}

// REMOVE THIS ROUTE
const removeUserRequest = async ( req, res ) => {

  const userId = new mongoose.Types.ObjectId( req.params.userId );
  
  const requestId = new mongoose.Types.ObjectId( req.params.requestId );

  const request = await RequestModel.findById( requestId );

  const isUserRequest = request.users.includes( userId );

  if ( ! isUserRequest ) return res.status( 400 ).send( `No request from user ${ userId }` );

  const updateRequestOutcome = await RequestModel.findByIdAndUpdate(

    requestId,

    { $pull: { users: { $eq: userId } } }

  );

  console.log( updateRequestOutcome );

  res.status( 200 ).send( `user ${ userId } request removed successfully` );

}

module.exports = {

  addUserRequest,

  removeUserRequest

}