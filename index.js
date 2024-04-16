
const cors = require( 'cors' );

const http = require( 'http' );

const bcrypt = require( 'bcrypt' );

// const mongoose = require('mongoose');

const express = require( 'express' );

const passport = require( 'passport' );

const bodyParser = require('body-parser');

const session = require( 'express-session' );

// const cookieSession = require( 'cookie-session' );

const LocalStrategy = require( 'passport-local' ).Strategy;

const mongodb = require( './src/database/index' );

const UserModel = require( './src/models/users.model' );

const RequestModel = require( './src/models/requests.model' );

const config = require( './src/config/index' );

const { localLogin, localSignup, googleAuthentication, facebookAuthentication } = require( './src/config/passport-strategies' );




const SALT_ROUNDS = config.bcryptSaltRounds;

const PORT = config.PORT || 5000;

const app = express();

// passport.use( 'local-login', new LocalStrategy( {

//     usernameField: 'email',

//     passwordField: 'password',

//     passReqToCallback: true

//   }, 
  
//   async ( req, email, password, done ) => {

//     const sanitizedEmail = email.trim();

//     const sanitizedPassword = password.trim();

//     const user = await UserModel.findOne( { email: sanitizedEmail } ).exec();

//     // console.log( password, user.password );

//     if ( ! user ) return done( null, false, { message: 'Invalid email and/or password' } );

//     bcrypt.compare( sanitizedPassword, user.password, ( err, result ) => {

//       if ( err ) return done( null, false, { message: 'Invalid email and/or password' } );

//       console.log(result);

//       if ( result ) done( null, {

//         id: user._id,

//         username: user.username,

//         admin: user.admin

//       }, { message: 'Successfully logged in.' } );   

//     } );

//   } 
  
// ));

// passport.use( 'local-signup', new LocalStrategy( {

//     usernameField: 'email',

//     passwordField: 'password',

//     passReqToCallback: true

//   }, 
  
//   async ( req, email, password, done ) => {

//     const sanitizedEmail = email.trim();

//     const sanitizedPassword = password.trim();

//     const sanitizedUsername = req.body.username.trim();

//     const user = await UserModel.findOne( { email: sanitizedEmail } ).exec();

//     if ( user ) return done( null, false, { message: 'Email already taken.' } );

//     console.log('MAIN REST first ====>', sanitizedUsername, sanitizedEmail);

//     bcrypt.hash( sanitizedPassword, SALT_ROUNDS, async ( err, hash ) => {

//       if ( err ) done( null, false );

//       console.log('MAIN REST second ====>', SALT_ROUNDS, sanitizedUsername, sanitizedEmail, sanitizedPassword, hash);

//       return;

//       const newUser = await UserModel.create( { 
        
//         username: sanitizedUsername,
        
//         email: sanitizedEmail,
        
//         password: hash
      
//       } );

//       return done( null, { id: newUser._id }, { message: `${ newUser.username } has been registered.` } );

//     } );

//   } 
  
// ) );

passport.use( 'local-login', localLogin );

passport.use( 'local-signup', localSignup );

passport.use( googleAuthentication );

passport.use( facebookAuthentication );

passport.serializeUser( ( user, done ) =>  {

  console.log( 'serialized ===>', user );

  done( null, user );

} );

passport.deserializeUser( ( user, done ) => {

  console.log( "desirialized ===> ", user );

  done( null, user );

} );

app.use( cors( {

  origin: 'http://localhost:1234',

  credentials: true

} ) );

app.use( bodyParser.json() );

app.use( bodyParser.urlencoded( { extended: true } ) );

// app.use( cookieSession( {

//   name: 'scr-session',

//   keys: [ process.env.SESSION_SECRET ],

//   maxAge: 3 * 60 * 1000 // 3 minutes

// } ) );

app.use( session( {

  secret: process.env.SESSION_SECRET_KEY,

  resave: false,

  saveUninitialized: false

} ) );

app.use( passport.initialize() );

app.use( passport.session() );

app.use( '/', require( './src/routes/index' ) );

app.use( ( err, req, res, next ) => {

  res.status( 500 ).send( 'Internal Server Error!' );

} );

const server = http.createServer( app );

mongodb.connectDb( ( error ) => {

  if ( error ) console.log( 'Cannot connect to the database' );

  else server.listen( config.PORT, () => console.log( `server running on PORT ${ config.PORT }` ) );

} );
