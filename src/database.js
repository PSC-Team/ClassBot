const mongoose = require('mongoose');
const { mongo } = require('mongoose');
const { APP_HOST, APP_DATABASE } = require('../botconfig.json');

const MONGODB_URI = `mongodb://${APP_HOST}/${APP_DATABASE}`;

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log('Database is connected'))
  .catch((err) => console.log(err));
