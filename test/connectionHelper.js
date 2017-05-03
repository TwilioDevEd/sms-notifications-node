'use strict';

const mongoose = require('mongoose');
const cfg = require('../config');
const MongoInMemory = require('mongo-in-memory');


if (!cfg.mongoUrlTest) {
  throw new Error('MONGO_URL_TEST env variable not set.');
}

const port = 8000;
const mongoServerInstance = new MongoInMemory(port);
mongoServerInstance.start((error, config) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Mongo-in-memory started successfully');
  }
});

const connect = () => {
  return mongoose.connect(cfg.mongoUrlTest);
};

const disconnect = () => {
  return mongoose.connection.close();
};

exports.connect = connect;
exports.disconnect = disconnect;
mongoose.Promise = Promise;
