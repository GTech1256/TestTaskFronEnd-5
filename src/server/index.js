// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
require('dotenv').config();
// const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(process.env.PORT, () => logger.info(`server started on port ${process.env.PORT} (${process.env.NODE_ENV})`));

/**
* Exports express
* @public
*/
module.exports = app;
