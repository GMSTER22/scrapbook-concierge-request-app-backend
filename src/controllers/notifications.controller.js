
const RequestModel = require( '../models/requests.model' );

const UserModel = require( '../models/users.model' );

const { matchedData } = require('express-validator');

const { sendEmailsToUsers } = require( '../services/sendEmail.service' );

const notifyUsers = async ( req, res ) => {

  try {

    // const { requestIds } = req.body;

    const { requestIds } = matchedData( req );

    if ( ! requestIds?.length ) return res
      
        .status( 400 )
        
        .json( {
        
          message: 'No request submitted.'
      
        } );

    const requests = await RequestModel
    
      .find( { 
      
        _id: { $in: requestIds } 
      
      } )

      .populate( 'users' );

    const uniqueUsersToNotify = {};

    requests.forEach( request => {

      request.users.forEach( user => {

        if ( uniqueUsersToNotify.hasOwnProperty( user._id ) ) {

          uniqueUsersToNotify[ user._id ].requests.push( {

            title: request.title,

            url: request.url,

            releaseDate: request.releaseDate

          } );

        } else {

          uniqueUsersToNotify[ user._id ] = {

            id: user._id,

            username: user.username,

            email: user.email,

            emailOptIn: user.emailOptIn,

            requests: [

              {

                title: request.title,

                url: request.url,

                releaseDate: request.releaseDate

              }

            ]

          }

        }

      } );

    } );

    // Object.values( uniqueUsersToNotify ).forEach( user => console.log( user.id, user.email, user.requests.map( kit => kit.title ).join( ', ' ) ) )

    console.log( Object.values( uniqueUsersToNotify ) );

    const optInUsers = Object.values( uniqueUsersToNotify ).filter( user => user.emailOptIn );

    console.log( 'optInUsers', optInUsers );

    // return;

    const result = await sendEmailsToUsers( optInUsers );

    console.log( result, "emails outcomes" );

    res
    
      .status( 200 )
      
      .json( {
      
        message: 'Emails Sent to users.'
    
      } );

  } catch ( error ) {

    console.warn( error );

    res
    
      .status( 500 )
      
      .json( {
        
        message: 'An Error occurred while emailing users.'
      
      } );

  }

}

const manageSubscriptions = async ( req, res ) => {

  try {

    const { email, emailOptIn } = req.body;
    
    const user = await UserModel.findOneAndUpdate( { email }, { emailOptIn }, { returnDocument: 'after' } );

    res
    
      .status( 201 )
      
      .json( {
        
        message: 'Success.',
        
        emailOptIn
      
      } );

  } catch ( error ) {

    res
    
      .status( 500 )
      
      .json( {
        
        message: 'An Error occurred while changing the subscription status.'
      
      } );

  }

}

module.exports = { notifyUsers, manageSubscriptions };