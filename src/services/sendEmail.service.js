
const nodemailer = require( 'nodemailer' );

const transporter = nodemailer.createTransport( {

  host: process.env.EMAIL_HOST, // 'smtp.ethereal.email'

  port: 2525,

  //secure: false, // Use `true` for port 465, `false` for all other ports

  auth: {

    user: process.env.EMAIL_USERNAME, // 'maddison53@ethereal.email'

    pass: process.env.EMAIL_PASSWORD // 'jn7jnAPss4f63QBp6D',
  }

} );

// async..await is not allowed in global scope, must use a wrapper
async function sendPasswordRecoveryEmail( userId, email, name, resetToken ) {

  // send mail with defined transport object
  const info = await transporter.sendMail( {

    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address

    to: email, // list of receivers

    subject: 'SCR Password Recovery', // Subject line

    //text: '', // plain text body

    html: `

    <html>
      <head>
        <meta charset="utf-8">
        <style>

        </style>
      </head>
      <body>
        <table>
          <tr>
            <td style="width:600px;max-width:600px;">
              <p>Hi ${ name },</p>
              <p>You requested to reset your password.</p>
              <p> Please, click the link below to reset your password</p>
              <a href="http:localhost:1234/password-reset?token=${ resetToken }&id=${ userId }">Reset Password</a>
            </td>
          </tr>
        </table>
      </body>
    </html>

    `, // html body

  } );

  console.log( 'Message sent: %s', info.messageId );
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

}

async function sendEmailsToUsers( users ) {

  const emailPromises = users.map( ( { username, email, requests } ) => {

    transporter.sendMail( {

      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address

      to: email, // list of receivers

      subject: 'New Scrapbook(s) Released', // Subject line

      //text: '', // plain text body

      html: `

      <html>
        <head>
          <meta charset="utf-8">
          <style>

          </style>
        </head>
        <body>
          <table>
            <tr>
              <td style="width:600px;max-width:600px;">
                <p>Hi ${ username },</p>
                <p>We are happy to announce that some of the scrapbooks you've been waiting for are now released:</p>
                <ul>
                  ${ requests.map( ( { title, url } ) => {

                    `<li><a href="${url}">${title}</a></li>`

                  } ) }
                </ul>
              </td>
            </tr>
          </table>
        </body>
      </html>

      ` // html body

    } );

  } )

  const result = await Promise.all( emailPromises );

  console.log( result, "emails outcome" );

}

// main().catch( console.error );

module.exports = { sendPasswordRecoveryEmail, sendEmailsToUsers };