const express = require('express');

const battles = require('../connections/index')

const router = express.Router();

router.get('/', (req, res) => {
    const location = req.params.location ? req.params.location : '';
    const king = req.params.king ? req.params.king : '';
    const type = req.params.type ? req.params.type : '';
    battles.collection('battles').find({
        $and: [
            {$or: [{attacker_king: king}, {defender_king: king}]},
            {location: location},
            {battle_type: type}
        ]
    }).then(results => {
        //put a condition of no results found
        console.log(results)
    }).catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
})

module.exports = router;
