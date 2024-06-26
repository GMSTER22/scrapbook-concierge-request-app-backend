
const mongoose = require( 'mongoose' );

const RequestModel = require( '../models/requests.model' );

const getSingleRequest = async ( req, res ) => {
  
  const requestId = req.params.id;
  
  const request = await RequestModel.findById( requestId );
  
  res.status( 200 ).send( request );
  
}

const getRequests = async ( req, res ) => {

  let total;

  let requests;

  const page = parseInt( req.query.page ) || 1;

  const limit = parseInt( req.query.limit ) || 15;

  const startIndex = ( page - 1 ) * limit;

  const released = req.query.released;

  const userId = req.query.id;

  if ( released ) {

    total = await RequestModel.countDocuments( {

      released: released

    } );

    requests = await RequestModel.find( { released } ).skip( startIndex ).limit( limit );
    
  } else if ( userId ) {

    total = await RequestModel.countDocuments( {

      'users.0': new mongoose.Types.ObjectId( userId )
  
    } );
  
    requests = await RequestModel
    
      .find( {
  
        'users.0': new mongoose.Types.ObjectId( userId )
  
      } )
  
      .skip( startIndex )
      
      .limit( limit );

  } else {
    
    total = await RequestModel.estimatedDocumentCount();

    requests = await RequestModel.find().skip( startIndex ).limit( limit );

  }

  res
  
    .status( 200 )
    
    .json( {

      requests,

      page,

      limit,

      total: Math.ceil( total / limit )

    } );

}

const createRequest = async ( req, res ) => {

  const userId = req.params.id;

  const requestTitle = req.body.title;

  const request = await RequestModel.create( {

    title: requestTitle,

    users: [ new mongoose.Types.ObjectId( userId ) ]

  } );

  res.status( 201 ).send( 'Request created' );

}

const updateRequest = async ( req, res ) => {
  
  const requestId = new mongoose.Types.ObjectId( req.params.requestId );

  const userId = new mongoose.Types.ObjectId( req.params.userId );

  const request = await RequestModel.findById( requestId );

  const numberOfRequestsSubmitted = request.users.length;

  const isAdmin = req.user.admin;

  const isRequester = userId.equals( request.users[ 0 ] );

  if ( ( ! isAdmin && ! isRequester ) || ( ! isAdmin && isRequester && numberOfRequestsSubmitted > 1 ) ) return res.status( 403 ).send( 'Forbidden Action' );

  await RequestModel.findByIdAndUpdate(

    requestId,

    {

      updatedAt: new Date().toISOString(),
      
      title: req.body.title,

      url: req.body.url,

      released: req.body.released,

      releaseDate: req.body.released && new Date().toISOString()
    
    },

    { new: true }

  );

  res.status( 200 ).end();

}

const deleteRequest = async ( req, res ) => {
  
  const requestId = new mongoose.Types.ObjectId( req.params.requestId );

  const userId = new mongoose.Types.ObjectId( req.params.userId );

  const request = await RequestModel.findById( requestId );

  const numberOfRequestsSubmitted = request.users.length;

  console.log(req?.user, 'USER REQUEST');

  const isAdmin = req.user.admin;

  const isRequester = userId.equals( request.users[ 0 ] );

  if ( ( ! isAdmin && ! isRequester ) || ( ! isAdmin && isRequester && numberOfRequestsSubmitted > 1 ) ) return res.status( 403 ).send( 'Forbidden Action' );

  await RequestModel.deleteOne( { 
    
    _id: requestId
  
  } );

  res.status( 200 ).end();

}

module.exports = {

  getSingleRequest,
  
  getRequests,

  createRequest,

  updateRequest,

  deleteRequest

}