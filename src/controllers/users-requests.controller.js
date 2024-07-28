
const mongoose = require( 'mongoose' );

const RequestModel = require( '../models/requests.model' );

const updateUserRequest = async ( req, res ) => {

  try {

    const userId = new mongoose.Types.ObjectId( req.params.userId );
    
    const requestId = new mongoose.Types.ObjectId( req.params.requestId );

    const request = await RequestModel.findById( requestId );

    if ( ! request ) return res
    
      .status( 404 )
      
      .json( {
        
        message: 'Request not found.'
      
      } );

    const isUserRequest = request.users.includes( userId );

    const isRequester = request.users[ 0 ] === userId;

    if ( isRequester ) return res
    
      .status( 403 )
      
      .json( {
        
        message: 'Forbidden Action - Not authorized to like/dislike your own request.'
      
      } );

    let updateRequestOutcome;

    if ( isUserRequest ) {

      updateRequestOutcome = await RequestModel.findByIdAndUpdate(

        requestId,

        {
          
          $pull: { users: userId },

          $inc: { usersLength: -1 }
        
        }

      );
      
    } else {
      
      updateRequestOutcome = await RequestModel.findByIdAndUpdate(

        requestId,

        {
          
          $push: { users: userId },

          $inc: { usersLength: 1 }
        
        }

      );

    }

    res
    
      .status( 200 )
      
      .json( {
        
        message: 'Success.'
      
      } );

  } catch ( error ) {

    res
    
      .status( 500 )
      
      .json( {
        
        message: 'An Error occurred while liking the request.'
      
      } );

  }

}

module.exports = { updateUserRequest }