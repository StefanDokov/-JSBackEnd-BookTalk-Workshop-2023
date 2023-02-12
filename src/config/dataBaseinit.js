const mongoose = require('mongoose');
const config = require('./index');

async function initDatabase() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.connectionString);
    
    console.log('dataBase connected...');

}

module.exports = initDatabase;