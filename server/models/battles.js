const mongoose = require('mongoose');

const battles = require('../connections/index')

const Schema = mongoose.Schema;

//do this at last
const BattleSchema =  new Schema({
    name:{
        type: String,
        required: true
    },
})

module.exports = User = battles.model("battles", BattleSchema)
