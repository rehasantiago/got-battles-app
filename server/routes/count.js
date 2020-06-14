const express = require('express');

const battles = require('../connections/index')

const router = express.Router();

router.get('/', (req, res) => {
    battles.collection('battles').count({}, function(err, count){
        if(err){
            res.status(400).json(err)
        } else {
            console.log(count)
        }
    })
})

module.exports = router;
