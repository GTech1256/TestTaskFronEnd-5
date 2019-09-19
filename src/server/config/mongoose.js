const mongoose = require('mongoose');
const logger = require('./logger');
const Good = require('../api/models/good.model');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}
/* set migrations */
mongoose.connection.on('open', async () => {
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed semper sem. Integer tempor condimentum varius. Ut ut eros tincidunt, imperdiet nunc id, aliquet magna. Donec dignissim tortor erat, id semper sem feugiat vel. Sed dictum mattis accumsan. Aliquam commodo dolor augue. Sed tincidunt leo non lacinia mattis. Maecenas dapibus, odio sed finibus bibendum, nibh purus tempus nisl, sollicitudin tempor enim dui id libero. Suspendisse semper, felis eu vehicula commodo, justo diam laoreet ipsum, quis dictum ex risus luctus dui. Pellentesque sit amet commodo ligula. Aenean quis elementum massa. Suspendisse pulvinar justo eu ligula iaculis porta. Pellentesque ut elit iaculis diam suscipit ultricies.';
  const migrationsNames = [
    lorem.substring(0, 10),
    lorem.substring(10, 20),
    lorem.substring(20, 30),
    lorem.substring(30, 40),
    lorem.substring(40, 50),
    lorem.substring(50, 60),
  ];
  console.log('-=MIGRATIONS STARTED=-');

  // eslint-disable-next-line no-restricted-syntax
  for (const migrationName of migrationsNames) {
    // eslint-disable-next-line no-await-in-loop
    const migrationGood = await Good.findOne({ name: migrationName });
    // console.log(migrationGood);
    if (!migrationGood) {
      // eslint-disable-next-line no-await-in-loop
      await Good.create({
        name: migrationName,
        quantity: Math.round(Math.random() * 999),
        price: {
          currency: Math.random() > 0.5 ? 'RUB' : 'USD',
          value: Math.random() * 100,
        },
      });
    }
  }

  console.log('-=MIGRATIONS ENDED=-');
});


function getUrlForMongooseConnection() {
  console.log(process.env.NODE_ENV);
  let prefixOfENV = process.env.NODE_ENV.toUpperCase();

  switch (prefixOfENV) {
    case 'DEVELOPMENT':
      prefixOfENV = 'DEV';
      break;
    case 'PRODUCTION':
      prefixOfENV = 'PROD';
      break;
    case 'TEST':
      prefixOfENV = 'TEST';
      break;
    default:
      prefixOfENV = 'DEV';
      break;
  }

  const { env } = process;

  const authString = process.env.NODE_ENV === 'production'
    ? `${env[`${prefixOfENV}_DB_USERNAME`]}:${env[`${prefixOfENV}_DB_PASSWORD`]}@`
    : '';


  const connectionUrl = `mongodb://${authString}${env[`${prefixOfENV}_DB_HOSTNAME`]}:${
    env[`${prefixOfENV}_DB_PORT`]
  }/${env[`${prefixOfENV}_DB_NAME`]}`;

  console.log(
    'url for connect:',
    connectionUrl,
  );
  return connectionUrl;
}

exports.getUrlForMongooseConnection = getUrlForMongooseConnection;

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = () => {
  mongoose.connect(getUrlForMongooseConnection(), {
    keepAlive: 1,
    useNewUrlParser: true,
  });
  return mongoose.connection;
};
