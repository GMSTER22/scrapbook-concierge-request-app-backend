
const config = require( '../config/index' );

const bcrypt = require( 'bcrypt' );

const UserModel = require( '../models/users.model' );

const LocalStrategy = require( 'passport-local' ).Strategy;

const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

const FacebookStrategy = require( 'passport-facebook' ).Strategy;

const SALT_ROUNDS = config.bcryptSaltRounds;

const localLogin = new LocalStrategy( {

    usernameField: 'email',

    passwordField: 'password',

    passReqToCallback: true

  }, 

  async ( req, email, password, done ) => {

    try {

      const sanitizedEmail = email.trim();

      const sanitizedPassword = password.trim();

      const user = await UserModel.findOne( { email: sanitizedEmail } ).exec();

      if ( ! user ) return done( null, false );

      // if ( user.googleId || user.facebookId ) return done( null, false );
      
      if ( user.googleId || user.facebookId )  throw new Error( 'Wrong auth', { cause: 'User previously signed up with a different authentication method.' } );

      bcrypt.compare( sanitizedPassword, user?.password, ( err, result ) => {

        if ( err ) return done( err );

        if ( result ) return done( null, {

          id: user._id,

          username: user.username,

          admin: user.admin

        } );

        else return done( null, false );

      } );

    } catch ( error ) {
     
      return done( error );

    }

  }

);

const localSignup = new LocalStrategy( {

    usernameField: 'email',

    passwordField: 'password',

    passReqToCallback: true

  },

  async ( req, email, password, done ) => {

    try {

      const sanitizedEmail = email.trim();

      const sanitizedPassword = password.trim();

      const sanitizedUsername = req.body.username.trim();

      const user = await UserModel.findOne( { email: sanitizedEmail } ).exec();

      if ( user ) return done( null, false );

      bcrypt.hash( sanitizedPassword, SALT_ROUNDS, async ( err, hash ) => {

        if ( err ) return done( err );

        const newUser = await UserModel.create( { 
          
          username: sanitizedUsername,
          
          email: sanitizedEmail,
          
          password: hash
        
        } );

        return done( null, { id: newUser._id } );

        // return done( null, { id: newUser._id }, { message: `${ newUser.username } has been registered.` } );

      } );

    } catch ( error ) {
      
      return done( error );

    }

  }

);

const googleAuthentication = new GoogleStrategy( {

    clientID: process.env.GOOGLE_CLIENT_ID,

    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    
    callbackURL: `${ config.SERVER_URL }/auth/google/callback`

  }, 
  
  async ( accessToken, refreshToken, profile, done ) => {

    try {

      const user = await UserModel.findOne( { googleId: profile.id } ).exec();

      if ( ! user ) {

        const newUser = await UserModel.create( { 

          googleId: profile.id,
          
          username: profile.name.givenName,
          
          email: profile.emails[ 0 ].value
        
        } );

        return done( 
          
          null, 
          
          {

            id: newUser._id,

            username: newUser.username,

            admin: newUser.admin

          } 
        
        );

      } else if ( ! user.googleId ) {

        throw new Error( 'Wrong auth', { cause: 'User previously signed up with a different authentication method.' } );

      } else {

        return done( 
          
          null, 
          
          {

            id: user._id,
      
            username: user.username,
      
            admin: user.admin
      
          } 
        
        );

      }

    } catch ( error ) {
      
      return done( error );

    }

  }  
  
);

const facebookAuthentication = new FacebookStrategy( {

    clientID: process.env.FACEBOOK_APP_ID,

    clientSecret: process.env.FACEBOOK_APP_SECRET,
    
    callbackURL: `${ config.SERVER_URL }/auth/facebook/callback`,

    profileFields: [ 'id', 'displayName', 'emails' ]

  }, 
  
  async ( accessToken, refreshToken, profile, done ) => {

    try {

      // const user = await UserModel.findOne( { facebookId: profile.id } ).exec();
      const user = await UserModel.findOne( { email: profile.emails[ 0 ].value } ).exec();

      if ( ! user ) {

        const newUser = await UserModel.create( { 

          facebookId: profile.id,
          
          username: profile.displayName,
          
          email: profile.emails[ 0 ].value
        
        } );

        return done( null, newUser );

      } else if ( ! user.facebookId ) {

        throw new Error( 'Wrong auth', { cause: 'User previously signed up with a different authentication method.' } );

      } else {

        return done( 
          
          null, 
          
          {

            id: user._id,
      
            username: user.username,
      
            admin: user.admin
      
          } 
        
        );

      }

      // const user = await UserModel.findOne( { facebookId: profile.id } ).exec();

      // console.log( profile, 'profile' );

      // console.log( user, 'user data' );

      // if ( user ) {

      //   return done( 
          
      //     null, 
          
      //     {

      //       id: user._id,
      
      //       username: user.username,

      //       email: user.email,
      
      //       admin: user.admin
      
      //     } 
        
      //   );

      // } else {

      //   const newUser = await UserModel.create( { 

      //     facebookId: profile.id,
          
      //     username: profile.displayName,
          
      //     email: profile.emails[ 0 ].value
        
      //   } );

      //   return done( null, newUser );

      // }

    } catch ( error ) {

      // console.log( error );
     
      done( error );

    }

  }  
  
);

module.exports = {

  localLogin,

  localSignup,

  googleAuthentication,

  facebookAuthentication

}