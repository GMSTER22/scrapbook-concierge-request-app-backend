
const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema( {

  createdAt: {

    type: Date,

    default: Date.now

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

    // validate: {

    //   validator: ( v ) => {
        
    //     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //     return emailRegex.test( v );
      
    //   },

    //   message: props => `${ props.value } is not a valid email`

    // }

  },

  password: {

    type: String,

    unique: true,

    trim: true,
    
    required: () => ! this.googleId && ! this.facebookId,
    
    // validate: {

    //   validator: ( v ) => {
        
    //     const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    //     return passwordRegex.test( v );
      
    //   },

    //   message: props => `${ props.value } is not a valid email`

    // }

  },

  admin: {

    type: Boolean,

    default: false

  },

  googleId: {

    type: String,

    unique: true,

    sparse: true,

    default: null

  },

  facebookId: {

    type: String,

    unique: true,

    sparse: true,

    default: null

  },

  // requests: [

  //   {

  //     type: mongoose.Schema.Types.ObjectId,

  //     ref: 'Request'

  //   }

  // ]

} );

const UserModel = mongoose.model( 'User', UserSchema );

module.exports = UserModel;
