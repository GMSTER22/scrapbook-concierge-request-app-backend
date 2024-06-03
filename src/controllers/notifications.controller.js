
const mongoose = require( 'mongoose' );

const RequestModel = require( '../models/requests.model' );

const { sendEmailToUsers } = require( '../services/sendEmail.service' );

// const RequestModel = require( '../models/requests.model' );

const notifyUsers = async ( req, res ) => {

  const { requestIds } = req.body;

  console.log( 'RequestIds', requestIds );

  const requests = await RequestModel
  
    .find( { 
    
      _id: { $in: requestIds } 
    
    } )

    .populate( 'users' );

  // requests.forEach( request => console.log(request.users) );

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

  console.log( uniqueUsersToNotify, 'Unique Users To Notify' );

  res.status( 200 ).send( 'Emails Sent' );

}

module.exports = { notifyUsers }