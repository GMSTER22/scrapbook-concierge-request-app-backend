
const mongoose = require( 'mongoose' );

const RequestModel = require( '../models/requests.model' );

const addUserRequest = async ( req, res ) => {

  const userId = new mongoose.Types.ObjectId( req.params.userId );
  
  const requestId = new mongoose.Types.ObjectId( req.params.requestId );

  const request = await RequestModel.findById( requestId );

  const isUserRequest = request.users.includes( userId );

  if ( isUserRequest ) return res.status( 400 ).send( `User ${ userId } already requested` );

  const updateRequestOutcome = await RequestModel.findByIdAndUpdate(

    requestId,

    { $push: { users: userId } }

  );

  console.log( updateRequestOutcome );

  res.status( 200 ).send( `user ${ userId } request updated successfully` );

}

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