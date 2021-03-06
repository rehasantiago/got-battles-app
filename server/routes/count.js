const express = require('express');

const battles = require('../connections/index')

const router = express.Router();

router.get('/', (req, res) => {
    battles.collection('battles').countDocuments({}, function(err, count){
        if(err){
            res.status(400).json(err)
        } else {
            res.status(200).json({
                count
            })
        }
    })
})

module.exports = router;
