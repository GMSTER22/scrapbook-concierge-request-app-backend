
const mongoose = require( 'mongoose' );

const RequestModel = require( '../models/requests.model' );

const getSingleRequest = async ( req, res ) => {

  try {
    
    const requestId = req.params.id;
    
    const request = await RequestModel.findById( requestId );
    
    res
    
      .status( 200 )
      
      .json( {
        
        message: 'Success', 
        
        ...request
      
      } );

  } catch ( error ) {
    
    res
    
      .status( 500 )
      
      .json( {
        
        message: 'An Error occurred while retrieving the request.\n Try again later.'
      
      } );

  }  
  
}

const getRequests = async ( req, res ) => {

  try {

    let total;

    let requests;

    const page = parseInt( req.query.page ) || 1;

    const limit = parseInt( req.query.limit ) || 15;

    const startIndex = ( page - 1 ) * limit;

    const released = req.query.released;

    const userId = req.query.id;

    const sortBy = req.query.sort_by ?? 'users';

    const orderBy = req.query.order_by ?? 'asc';

    if ( released ) {

      total = await RequestModel.countDocuments( {

        released: released

      } );

      requests = await RequestModel
      
        .find( { released } )
        
        .skip( startIndex )
        
        .limit( limit )

        .sort( { [sortBy]: orderBy } );
      
    } else if ( userId ) {

      total = await RequestModel.countDocuments( {

        'users.0': new mongoose.Types.ObjectId( userId )
    
      } );
    
      requests = await RequestModel
      
        .find( {
    
          'users.0': new mongoose.Types.ObjectId( userId )
    
        } )
    
        .skip( startIndex )
        
        .limit( limit )

        .sort( { [sortBy]: orderBy } );

    } else {
      
      total = await RequestModel.estimatedDocumentCount();

      requests = await RequestModel
      
        .find()
        
        .skip( startIndex )
        
        .limit( limit )
        
        .sort( { [sortBy]: orderBy } );

    }

    res
    
      .status( 200 )
      
      .json( {

        message: 'Success',

        requests,

        page,

        limit,

        total: Math.ceil( total / limit )

      } );

  } catch ( error ) {

    res
    
      .status( 500 )
      
      .json( {
        
        message: 'An error occurred while retrieving the requests.\n Try again later.'
      
      } );

  }

}

const createRequest = async ( req, res ) => {

  try {

    const userId = req.params.id;

    const requestTitle = req.body.title;

    const request = await RequestModel.create( {

      title: requestTitle,

      users: [ new mongoose.Types.ObjectId( userId ) ]

    } );

    res
    
      .status( 201 )
      
      .json( { message: 'Request created successfully.' } );

  } catch ( error ) {

    res
      
      .status( 500 )
      
      .json( {
        
        message: 'An error occurred while creating the request.\n Try again later.'
      
      } );

  }

}

const updateRequest = async ( req, res ) => {

  try {
  
    const requestId = new mongoose.Types.ObjectId( req.params.requestId );

    const userId = new mongoose.Types.ObjectId( req.params.userId );

    const request = await RequestModel.findById( requestId );

    if ( ! request ) return res.status( 404 ).send( 'Request not found.' );

    const numberOfRequestsSubmitted = request.users.length;

    const isAdmin = req.user.admin;

    const isRequester = userId.equals( request.users[ 0 ] );

    if ( ! isAdmin && ! isRequester )  return res
    
      .status( 403 )
      
      .json( {
        
        message: 'Forbidden Action - You don\'t have permission to update someone else request.'
      
      } );

    if ( ! isAdmin && isRequester && numberOfRequestsSubmitted > 1 ) return res
    
      .status( 403 )
      
      .json( {
        
        message: 'Forbidden Action - You don\'t have permission to update request others already liked.'
      
      } );

    const newRequest = {

      updatedAt: new Date().toISOString(),
      
      title: req.body.title,

      url: req.body.url,

      released: req.body.released
    
    };

    if ( req.body.released === 'true' ) newRequest.releaseDate = new Date().toISOString();

    await RequestModel.findByIdAndUpdate(

      requestId,

      newRequest,

      // { new: true }

    );

    res.status( 200 ).json( {
      
      message: 'Updated request successfully.'
    
    } );

  } catch ( error ) {

    res.status( 500 ).json( {
      
      message: 'An Error occurred while updating the request.\n Try again later.'
    
    } );

  }

}

const deleteRequest = async ( req, res ) => {

  try {
  
    const requestId = new mongoose.Types.ObjectId( req.params.requestId );

    const userId = new mongoose.Types.ObjectId( req.params.userId );

    const request = await RequestModel.findById( requestId );

    if ( ! request ) return res.status( 404 ).send( 'Request not found' );

    const numberOfRequestsSubmitted = request.users.length;

    const isAdmin = req.user.admin;

    const isRequester = userId.equals( request.users[ 0 ] );

    if ( ! isAdmin && ! isRequester )  return res
    
      .status( 403 )
      
      .json( {
        
        message: 'Forbidden Action - You don\'t have permission to update someone else request.'
      
      } );

    if ( ! isAdmin && isRequester && numberOfRequestsSubmitted > 1 ) return res
    
      .status( 403 )
      
      .json( {
        
        message: 'Forbidden Action - You don\'t have permission to update request others already liked.'
      
      } );

    await RequestModel.deleteOne( { 
      
      _id: requestId
    
    } );

    res
    
      .status( 200 )
      
      .json( {

        message: "Deleted request successfully."

      } );

  } catch ( error ) {

    res
    
      .status( 500 )
      
      .json( {
        
        message: 'An Error occurred while deleting the request.'
      
      } );

  }

}

module.exports = {

  getSingleRequest,
  
  getRequests,

  createRequest,

  updateRequest,

  deleteRequest

}