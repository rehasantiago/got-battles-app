const express = require('express');

const battles = require('../connections/index')

const router = express.Router();

router.get('/', (req, res) => {
    if(req.query.king){
        const king = req.query.king;
        delete req.query.king;
        battles.collection('battles').find({...req.query, $or: [
            { attacker_king: king},
            { defender_king: king}
        ]}, async function(err, cursor){
            if(err){
                return res.status(400).json(err);
            } else {
                const results = await cursor.toArray()
                return res.status(200).json(results);
            }
        })
    } else {
        battles.collection('battles').find(req.query,async function(err, cursor){
            if(err){
                return res.status(400).json(err);
            } else {
                const results = await cursor.toArray()
                return res.status(200).json(results);
            }
        })
    }

})

module.exports = router;
