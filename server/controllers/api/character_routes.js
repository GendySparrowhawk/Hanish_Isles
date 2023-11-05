const router = require('express').Router();

const { Character } = require('../../models');
const { isAuthenticated, authenticate }  = require('../helpers');

router.get('/characters', async (req, res) => {
    const characters = Character.find()
    .populate('user');

    res.json(characters);
});


module.exports = router;