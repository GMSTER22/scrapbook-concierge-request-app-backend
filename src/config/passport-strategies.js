
const bcrypt = require( 'bcrypt' );

const UserModel = require( '../models/users.model' );

const LocalStrategy = require( 'passport-local' ).Strategy;

const SALT_ROUNDS = 10;

const localLoginStrategy = new LocalStrategy( {

    usernameField: 'email',

    passwordField: 'password',

    passReqToCallback: true

  }, 

  async ( req, email, password, done ) => {

    const sanitizedEmail = email.trim();

    const sanitizedPassword = password.trim();

    const user = await UserModel.findOne( { email: sanitizedEmail } ).exec();

    console.log( user, 'USER DATA' );

    console.log( password, user?.password, 'CHECKING PASSWORD' );

    if ( ! user ) return done( null, false );

    bcrypt.compare( sanitizedPassword, user?.password, ( err, result ) => {

      if ( err ) return done( null, false );

      console.log( result, 'comp. result' );

      if ( result ) done( null, {

        id: user._id,

        username: user.username,

        admin: user.admin

      } );

      else done( null, false );
      
      console.log( 'strategy login ===>', result );

    } );

  }

);

const localSignupStrategy = new LocalStrategy( {

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

module.exports = {

  localLoginStrategy,

  localSignupStrategy,

}