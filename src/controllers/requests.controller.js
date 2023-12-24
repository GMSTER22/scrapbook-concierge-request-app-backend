
const mongoose = require( 'mongoose' );

const RequestModel = require( '../models/requests.model' );

const getAllRequests = async ( req, res ) => {

  const requests = await RequestModel.find( {} );

  res.status( 200 ).send( requests );

  console.log( 'get all requests attempt' );

}

const getSingleRequest = async ( req, res ) => {

  const requestId = req.params.id;

  const request = await RequestModel.findById( requestId );

  console.log( request );

  res.status( 200 ).send( request );

}

const createRequest = async ( req, res ) => {

  const userId = req.params.id;

  const requestTitle = req.body.title;

  console.log( requestTitle, '<==== request title' );

  console.log( req.body, '<==== request title' );

  const request = await RequestModel.create( {

    title: requestTitle,

    users: [ new mongoose.Types.ObjectId( userId ) ]

  } );

  console.log( request );

  res.status( 201 ).send( 'request created' );

}

const updateRequest = async ( req, res ) => {

  // const userId = req.user.id;
  
  const requestTitle = req.body.title;
  
  const requestId = new mongoose.Types.ObjectId( req.params.requestId );

  const userId = new mongoose.Types.ObjectId( req.params.userId );

  const request = await RequestModel.findById( requestId );

  const numberOfRequestsSubmitted = request.users.length;

  const isAdmin = req.user.admin;

  const isUserRequest = userId.equals( request.users[ 0 ] );

  console.log( 'requests submitted ==>', numberOfRequestsSubmitted );

  console.log( 'is admin ==>', isAdmin );

  console.log( 'is user request ==>', requestId, request.users[0], isUserRequest );

  if ( ! isAdmin && ( ! isUserRequest || numberOfRequestsSubmitted > 1 ) ) return res.status( 403 ).send( 'Forbidden Action' );

  const updateRequestOutcome = await RequestModel.findByIdAndUpdate(

    requestId,

    {

      updatedAt: new Date().toISOString(),
      
      title: requestTitle
    
    }

  );

  console.log( updateRequestOutcome );

  res.status( 200 ).send( 'request updated successfully' );

}

const deleteRequest = async ( req, res ) => {
  
  const requestId = new mongoose.Types.ObjectId( req.params.requestId );

  const userId = new mongoose.Types.ObjectId( req.params.userId );

  const request = await RequestModel.findById( requestId );

  const numberOfRequestsSubmitted = request.users.length;

  const isAdmin = req.user.admin;

  const isUserRequest = userId.equals( request.users[ 0 ] );

  console.log( 'requests submitted ==>', numberOfRequestsSubmitted );

  console.log( 'is admin ==>', isAdmin );

  console.log( 'is user request ==>', requestId, request.users[0], isUserRequest );

  if ( ! isAdmin && ( ! isUserRequest || numberOfRequestsSubmitted > 1 ) ) return res.status( 403 ).send( 'Forbidden Action' );

  const deleteRequestOutcome = await RequestModel.deleteOne( { 
    
    _id: requestId
  
  } );

  console.log( deleteRequestOutcome );

  res.status( 200 ).send( `request ${ requestId } deleted successfully` );

}

module.exports = {

  getSingleRequest,
  
  getAllRequests,

  createRequest,

  updateRequest,

  deleteRequest

}