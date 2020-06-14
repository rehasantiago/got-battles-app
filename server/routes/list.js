const express = require('express');

const battles = require('../connections/index')

const router = express.Router();

router.get('/', (req, res) => {
    battles.collection('battles').distinct('location', function(err, results){
        if(err){
            res.status(400).json(err)
        } else {
            console.log(results)
        }
    })
})

module.exports = router;
