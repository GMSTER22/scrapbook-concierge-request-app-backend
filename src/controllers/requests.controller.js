
const mongoose = require( 'mongoose' );

const RequestModel = require( '../models/requests.model' );

const getSingleRequest = async ( req, res ) => {
  
  const requestId = req.params.id;
  
  const request = await RequestModel.findById( requestId );
  
  console.log( request );
  
  res.status( 200 ).send( request );
  
}

// const getUserRequests = async ( req, res ) => {

//   const userId = new mongoose.Types.ObjectId( req.params.userId );

//   const page = parseInt( req.query.page ) || 1;

//   const limit = parseInt( req.query.limit ) || 15;

//   const startIndex = ( page - 1 ) * limit;

//   const total = await RequestModel.countDocuments( {

//     'users.0': new mongoose.Types.ObjectId( userId )

//   } );

//   console.log( "total numbers of the user requests => ", total );

//   const requests = await RequestModel
  
//     .find( {

//       'users.0': new mongoose.Types.ObjectId( userId )

//     } )

//     .skip( startIndex )
    
//     .limit( limit );

//   res
  
//     .status( 200 )
    
//     .json( {

//       requests,

//       page,

//       limit,

//       total: Math.ceil( total / limit )

//     } );

// }

// const getReleasedRequests = async ( req, res ) => {

//   // const userId = new mongoose.Types.ObjectId( req.params.userId );

//   const page = parseInt( req.query.page ) || 1;

//   const limit = parseInt( req.query.limit ) || 15;

//   const startIndex = ( page - 1 ) * limit;

//   const total = await RequestModel.countDocuments( {

//     released: true

//   } );

//   console.log( "total numbers of the released requests => ", total );

//   const requests = await RequestModel
  
//     .find( {

//       released: true

//     } )

//     .skip( startIndex )
    
//     .limit( limit );

//   res
  
//     .status( 200 )
    
//     .json( {

//       requests,

//       page,

//       limit,

//       total: Math.ceil( total / limit )

//     } );

// }

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

  console.log( requestTitle, '<==== request title' );

  console.log( req.body, '<==== request title' );

  const request = await RequestModel.create( {

    title: requestTitle,

    users: [ new mongoose.Types.ObjectId( userId ) ]

  } );

  res.status( 201 ).send( 'Request created' );

}

// http://localhost:3000/requests/65b1ce63b1f4f9aff918b21b/users/657bb93ad76068effafd9f97%20%7D
const updateRequest = async ( req, res ) => {
  
  const requestId = new mongoose.Types.ObjectId( req.params.requestId );

  const userId = new mongoose.Types.ObjectId( req.params.userId );

  const request = await RequestModel.findById( requestId );

  const numberOfRequestsSubmitted = request.users.length;

  const isAdmin = req.user.admin;

  const isRequester = userId.equals( request.users[ 0 ] );

  // console.log( 'requests submitted ==>', numberOfRequestsSubmitted );

  // console.log( 'is admin ==>', isAdmin );

  // console.log( 'is user request ==>', requestId, request.users[0], isRequester );

  if ( ( ! isAdmin && ! isRequester ) || ( ! isAdmin && isRequester && numberOfRequestsSubmitted > 1 ) ) return res.status( 403 ).send( 'Forbidden Action' );

  console.log( req.body.title, req.body.url, req.body.released, 'CHECKINNNNNNG' );

  const updateRequestOutcome = await RequestModel.findByIdAndUpdate(

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

  // console.log( updateRequestOutcome );

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

  // console.log( 'requests submitted ==>', numberOfRequestsSubmitted );

  // console.log( 'is admin ==>', isAdmin );

  // console.log( 'is user request ==>', requestId, request.users[0], isRequester );

  if ( ( ! isAdmin && ! isRequester ) || ( ! isAdmin && isRequester && numberOfRequestsSubmitted > 1 ) ) return res.status( 403 ).send( 'Forbidden Action' );

  const deleteRequestOutcome = await RequestModel.deleteOne( { 
    
    _id: requestId
  
  } );

  // console.log( deleteRequestOutcome );

  res.status( 200 ).end();

}

module.exports = {

  getSingleRequest,

  // getUserRequests,

  // getReleasedRequests,
  
  getRequests,

  createRequest,

  updateRequest,

  deleteRequest

}