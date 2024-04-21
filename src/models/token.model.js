
const mongoose = require( 'mongoose' );

const TokenSchema = new mongoose.Schema( {

  userId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: 'User'

  },

  createdAt: {

    type: Date,

    default: Date.now,

    expires: 900 // 15 minutes

  },

  token: {

    type: String,

    required: true

  },

  // requests: [

  //   {

  //     type: mongoose.Schema.Types.ObjectId,

  //     ref: 'Request'

  //   }

  // ]

} );

const TokenModel = mongoose.model( 'Token', TokenSchema );

module.exports = TokenModel;
