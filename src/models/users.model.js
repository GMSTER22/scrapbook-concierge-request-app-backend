
const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema( {

  createdAt: {

    type: Date,

    default: Date.now()

  },

  updatedAt: {

    type: Date,

    default: null

  },

  username: {

    type: String,

    trim: true,

    lowercase: true

  },

  email: {

    type: String,

    unique: true,

    required: true,

    trim: true,

    lowercase: true,

    validate: {

      validator: ( v ) => {
        
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        return emailRegex.test( v );
      
      },

      message: props => 'Please fill a valid email address'

    }

  },

  password: {

    type: String,

    minLength: [ 6, 'password must be at least 6 characters long' ],

    unique: true,

    trim: true,
    
    required: function() {

      return ! this.googleId && ! this.facebookId;

    }

  },

  admin: {

    type: Boolean,

    default: false

  },

  googleId: {

    type: String,

    sparse: true,

    default: null

  },

  facebookId: {

    type: String,

    sparse: true,

    default: null

  },

  emailOptIn: {

    type: Boolean,

    default: true

  }

} );

const UserModel = mongoose.model( 'User', UserSchema );

module.exports = UserModel;
