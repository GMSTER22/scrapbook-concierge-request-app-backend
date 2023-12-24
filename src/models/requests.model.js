
const mongoose = require( 'mongoose' );

const RequestSchema = new mongoose.Schema( {

  createdAt: {

    type: Date,

    default: Date.now

  },

  updatedAt: {

    type: Date,

    default: null

  },

  title: {

    type: String,

    maxLength: [ 100, 'request title must be 100 characters or less' ],

    unique: true,

    trim: true,

    required: true

  },

  users: [

    {

      type: mongoose.Schema.Types.ObjectId,

      ref: 'User'

    }

  ]

} );

const RequestModel = mongoose.model( 'Request', RequestSchema );

module.exports = RequestModel;
