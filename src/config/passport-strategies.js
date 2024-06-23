
const config = require( '../config/index' );

const bcrypt = require( 'bcrypt' );

const UserModel = require( '../models/users.model' );

const LocalStrategy = require( 'passport-local' ).Strategy;

const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

const FacebookStrategy = require( 'passport-facebook' ).Strategy;

const SALT_ROUNDS = 10;

const localLogin = new LocalStrategy( {

    usernameField: 'email',

    passwordField: 'password',

    passReqToCallback: true

  }, 

  async ( req, email, password, done ) => {

    const sanitizedEmail = email.trim();

    const sanitizedPassword = password.trim();

    const user = await UserModel.findOne( { email: sanitizedEmail } ).exec();

    if ( ! user ) return done( null, false );

    bcrypt.compare( sanitizedPassword, user?.password, ( err, result ) => {

      if ( err ) return done( null, false );

      if ( result ) done( null, {

        id: user._id,

        username: user.username,

        admin: user.admin

      } );

      else done( null, false );

    } );

  }

);

const localSignup = new LocalStrategy( {

    usernameField: 'email',

    passwordField: 'password',

    passReqToCallback: true

  },

  async ( req, email, password, done ) => {

    const sanitizedEmail = email.trim();

    const sanitizedPassword = password.trim();

    const sanitizedUsername = req.body.username.trim();

    const user = await UserModel.findOne( { email: sanitizedEmail } ).exec();

    if ( user ) return done( null, false );

    bcrypt.hash( sanitizedPassword, SALT_ROUNDS, async ( err, hash ) => {

      if ( err ) done( null, false );

      const newUser = await UserModel.create( { 
        
        username: sanitizedUsername,
        
        email: sanitizedEmail,
        
        password: hash
      
      } );

      return done( null, { id: newUser._id }, { message: `${ newUser.username } has been registered.` } );

    } );

  }

);

const googleAuthentication = new GoogleStrategy( {

    clientID: process.env.GOOGLE_CLIENT_ID,

    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    
    callbackURL: `${ config.SERVER_URL }/auth/google/callback`

  }, 
  
  async ( accessToken, refreshToken, profile, done ) => {

    const user = await UserModel.findOne( { googleId: profile.id } ).exec();

    if ( user ) {

      return done( 
        
        null, 
        
        {

          id: user.id,
    
          username: user.username,

          email: user.email,
    
          admin: user.admin
    
        } 
      
      );

    } else {

      const newUser = await UserModel.create( { 

        googleId: profile.id,
        
        username: profile.name.givenName,
        
        email: profile.emails[ 0 ].value
      
      } );

      return done( null, newUser );

    }

  }  
  
);

const facebookAuthentication = new FacebookStrategy( {

    clientID: process.env.FACEBOOK_APP_ID,

    clientSecret: process.env.FACEBOOK_APP_SECRET,
    
    callbackURL: `${ config.SERVER_URL }/auth/facebook/callback`,

    profileFields: [ 'id', 'displayName', 'email' ]

  }, 
  
  async ( accessToken, refreshToken, profile, done ) => {

    const user = await UserModel.findOne( { facebookId: profile.id } ).exec();

    if ( user ) {

      return done( 
        
        null, 
        
        {

          id: user.id,
    
          username: user.username,

          email: user.email,
    
          admin: user.admin
    
        } 
      
      );

    } else {

      const newUser = await UserModel.create( { 

        facebookId: profile.id,
        
        username: profile.displayName,
        
        email: profile.email
      
      } );

      return done( null, newUser );

    }

  }  
  
);

module.exports = {

  localLogin,

  localSignup,

  googleAuthentication,

  facebookAuthentication

}