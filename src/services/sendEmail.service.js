
const nodemailer = require( 'nodemailer' );

const config = require( '../config/index' );

const { getNotificationEmailTemplate, getPasswordResetEmailTemplate } = require( '../services/emailTemplates' );

const transporter = nodemailer.createTransport( {

  host: process.env.EMAIL_HOST, // 'smtp.ethereal.email'

  port: 587,

  secure: false, // Use `true` for port 465, `false` for all other ports

  auth: {

    user: process.env.EMAIL_USERNAME, // 'maddison53@ethereal.email'

    pass: process.env.EMAIL_PASSWORD // 'jn7jnAPss4f63QBp6D',
  }

} );

// async..await is not allowed in global scope, must use a wrapper
async function sendPasswordRecoveryEmail( userId, email, name, resetToken ) {

  // send mail with defined transport object
  const info = await transporter.sendMail( {

    from: `"Scrapbook Concierge Requests" <${process.env.EMAIL}>`, // sender address

    to: email, // list of receivers

    subject: 'Password Recovery', // Subject line

    //text: '', // plain text body

    html: getPasswordResetEmailTemplate( userId, name, resetToken ) // html body

  } );

}

async function sendEmailsToUsers( users ) {

  const emailPromises = users.map( ( { username, email, requests, emailOptIn } ) => {

    transporter.sendMail( {

      from: `"Scrapbook Concierge Requests" <${process.env.EMAIL}>`, // sender address

      to: email, // list of receivers

      subject: 'New Scrapbook Kits Released', // Subject line

      //text: '', // plain text body

      html: getNotificationEmailTemplate( username, email, requests ) // html body

    } );

  } )

  return await Promise.allSettled( emailPromises );

}

module.exports = { sendPasswordRecoveryEmail, sendEmailsToUsers };