
const dotenv = require( 'dotenv' );

dotenv.config();

const CLIENT_URL = process.env.ENV === 'production' ? 

  'https://www.scrapbookconciergerequests.com' 

  : 'http://localhost:1234';


const SERVER_URL = process.env.ENV === 'production' ? 

  'https://scrapbook-concierge-request-app-backend.onrender.com'

  : 'http://localhost:3000' ;

const databaseURI = process.env.MONGO_URI;

const sessionSecretKey = process.env.SESSION_SECRET_KEY;

const bcryptSaltRounds = process.env.BCRYPT_SALT_ROUNDS;

const PORT = process.env.PORT;

const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

const publicKey = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');

module.exports = {

  CLIENT_URL,

  SERVER_URL,

  PORT,

  databaseURI,

  sessionSecretKey,

  bcryptSaltRounds,

  privateKey,

  publicKey

}
