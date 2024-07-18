
const mongoose = require( 'mongoose' );

const RequestModel = require( '../models/requests.model' );

const getSingleRequest = async ( req, res ) => {

  try {
    
    const requestId = req.params.id;
    
    const request = await RequestModel.findById( requestId );
    
    res.status( 200 ).send( request );

  } catch ( error ) {
    
    res.status( 500 ).send( 'Some error occurred while retrieving the request' );

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

        requests,

        page,

        limit,

        total: Math.ceil( total / limit )

      } );

  } catch ( error ) {

    res.status( 500 ).send( 'Some error occurred while retrieving the requests' );

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

    res.status( 201 ).send( 'Request created' );

  } catch ( error ) {

    res.status( 500 ).send( 'Some error occurred while creating the request' );

  }

}

const updateRequest = async ( req, res ) => {

  try {
  
    const requestId = new mongoose.Types.ObjectId( req.params.requestId );

    const userId = new mongoose.Types.ObjectId( req.params.userId );

    const request = await RequestModel.findById( requestId );

    const numberOfRequestsSubmitted = request.users.length;

    const isAdmin = req.user.admin;

    const isRequester = userId.equals( request.users[ 0 ] );

    if ( ( ! isAdmin && ! isRequester ) || ( ! isAdmin && isRequester && numberOfRequestsSubmitted > 1 ) ) return res.status( 403 ).send( 'Forbidden Action' );

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

    res.status( 200 ).end();

  } catch ( error ) {

    res.status( 500 ).send( 'Some error occurred while updating the request' );

  }

}

const deleteRequest = async ( req, res ) => {

  try {
  
    const requestId = new mongoose.Types.ObjectId( req.params.requestId );

    const userId = new mongoose.Types.ObjectId( req.params.userId );

    const request = await RequestModel.findById( requestId );

    const numberOfRequestsSubmitted = request.users.length;

    // console.log(req?.user, 'USER REQUEST');

    const isAdmin = req.user.admin;

    const isRequester = userId.equals( request.users[ 0 ] );

    if ( ( ! isAdmin && ! isRequester ) || ( ! isAdmin && isRequester && numberOfRequestsSubmitted > 1 ) ) return res.status( 403 ).send( 'Forbidden Action' );

    await RequestModel.deleteOne( { 
      
      _id: requestId
    
    } );

    res.status( 200 ).end();

  } catch ( error ) {

    res.status( 500 ).send( 'Some error occurred while deleting the request' );

  }

}

module.exports = {

  getSingleRequest,
  
  getRequests,

  createRequest,

  updateRequest,

  deleteRequest

}