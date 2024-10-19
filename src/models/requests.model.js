
const mongoose = require( 'mongoose' );

const RequestSchema = new mongoose.Schema( {

  createdAt: {

    type: Date,

    default: () => new Date()

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

  url: {

    type: String,

    default: null

  },

  released: {

    type: Boolean,

    default: false

  },

  releaseDate: {

    type: Date,

    default: null

  },

  users: [

    {

      type: mongoose.Schema.Types.ObjectId,

      ref: 'User'

    }

  ],

  usersLength: {

    type: Number,

    default: 1

  }

} );

const RequestModel = mongoose.model( 'Request', RequestSchema );

module.exports = RequestModel;
