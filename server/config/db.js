const mongoose = require('mongoose');
const config = require('./default');
// console.log(config.DATABASE_URL)
const ConnectDB = () => {
    try {
      mongoose.connect(config.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
        .then(() => console.log('Mongodb connected...'))
        .catch(err => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };
  
  module.exports = ConnectDB