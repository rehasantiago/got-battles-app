const mongoose = require('mongoose')
const db = require('../config/keys').mongoGotBattles
const battles = mongoose.createConnection(db, { useNewUrlParser:true,useUnifiedTopology: true })

module.exports = battles
