
const cors = require( 'cors' );

const http = require( 'http' );

const express = require( 'express' );

const passport = require( 'passport' );

const bodyParser = require('body-parser');

const session = require( 'express-session' );

const helmet = require( 'helmet' );

const mongodb = require( './src/database/index' );

const config = require( './src/config/index' );

const { localLogin, localSignup, googleAuthentication, facebookAuthentication } = require( './src/config/passport-strategies' );

const app = express();

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

app.use( helmet() );

app.use( cors( {

  origin: config.CLIENT_URL,

  credentials: true

} ) );

app.use( bodyParser.json() );

app.use( bodyParser.urlencoded( { extended: true } ) );

// app.use( cookieSession( {

//   name: 'scr-session',

//   keys: [ process.env.SESSION_SECRET ],

//   maxAge: 3 * 60 * 1000 // 3 minutes

// } ) );

app.set( 'trust proxy', 1 ); // trust first proxy;

app.use( session( {

  secret: process.env.SESSION_SECRET_KEY,

  name: 'scrAppSessionId',

  resave: false,

  saveUninitialized: false,

  cookie: { secure: true }

} ) );

app.use( passport.initialize() );

app.use( passport.session() );

app.disable( 'x-powered-by' );

app.use( '/', require( './src/routes/index' ) );

app.use( ( err, req, res, next ) => {

  res.status( 500 ).send( 'Internal Server Error!' );

} );

const server = http.createServer( app );

mongodb.connectDb( ( error ) => {

  if ( error ) console.log( 'Cannot connect to the database' );

  else server.listen( config.PORT, () => console.log( `server running on PORT ${ config.PORT }` ) );

} );
