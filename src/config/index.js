
const dotenv = require( 'dotenv' );

dotenv.config();

const CLIENT_URL = 'https://www.scrapbookconciergerequests.com';
// const CLIENT_URL = 'http://localhost:1234';

const SERVER_URL = 'https://scrapbook-concierge-request-app-backend.onrender.com';
// const SERVER_URL = 'http://localhost:3000';

const databaseURI = process.env.MONGO_URI;

const sessionSecretKey = process.env.SESSION_SECRET_KEY;

const bcryptSaltRounds = process.env.BCRYPT_SALT_ROUNDS;

const PORT = process.env.PORT;

module.exports = {

  CLIENT_URL,

  SERVER_URL,

  PORT,

  databaseURI,

  sessionSecretKey,

  bcryptSaltRounds

}
