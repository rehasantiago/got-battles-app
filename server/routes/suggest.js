const express = require('express');

const battles = require('../connections/index')

const router = express.Router();

router.get('/', (req, res) => {
    const key = req.query.key;
    battles.collection('battles').find({location: { $regex: '.*' + key + '.*'}},async function(err, cursor){
        if(err){
            res.status(400).json(err)
        } else {
            const results = await cursor.toArray()
            return res.status(200).json(results);
        }
    })
})

module.exports = router;
