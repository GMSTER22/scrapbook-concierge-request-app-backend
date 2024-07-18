
const RequestModel = require( '../models/requests.model' );

const UserModel = require( '../models/users.model' );

const { sendEmailToUsers } = require( '../services/sendEmail.service' );

const notifyUsers = async ( req, res ) => {

  try {

    const { requestIds } = req.body;

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

    await sendEmailToUsers( users.values() );

    // console.log( uniqueUsersToNotify, 'Unique Users To Notify' );

    res.status( 200 ).send( 'Emails Sent' );

} catch ( error ) {

  res.status( 500 ).send( 'Some error occurred while emailing the user' );

}

}

const manageSubscriptions = async ( req, res ) => {

  try {

    const { email, emailOptIn } = req.body;

    const user = await UserModel.findOneAndUpdate( { email }, { emailOptIn }, { returnDocument: 'after' } );

    // console.log( req.body, user );

    res.status( 201 ).json( { emailOptIn } );

  } catch ( error ) {

    res.status( 500 ).send( 'Some error occurred while changing the subscription status' );

  }

}

module.exports = { notifyUsers, manageSubscriptions };