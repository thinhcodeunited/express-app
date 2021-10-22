const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/mydb';

mongoose.connect(DB_URI)
module.exports = { mongoose }

