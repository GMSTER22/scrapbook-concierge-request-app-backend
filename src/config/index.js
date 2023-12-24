
const dotenv = require( 'dotenv' );

// const passportStrategies = require( './passport-strategies' );

dotenv.config();

const databaseURI = process.env.MONGO_URI;

const sessionSecretKey = process.env.SESSION_SECRET_KEY;

const bcryptSaltRounds = process.env.BCRYPT_SALT_ROUNDS;

const PORT = process.env.PORT;

module.exports = {

  PORT,

  databaseURI,

  sessionSecretKey,

  bcryptSaltRounds,

  // passportLocalLoginStrategy: passportStrategies.localLoginStrategy,

  // passportSignupLoginStrategy: passportStrategies.localSignupStrategy

}
