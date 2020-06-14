const mongoose = require('mongoose')
const db = require('../config/key').mongoGotBattles
const battles = mongoose.createConnection(db, { useNewUrlParser:true,useUnifiedTopology: true })

module.exports = battles
