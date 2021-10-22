const router = require('express').Router();
const { User, Trade, Village } = require('../../models');

router.get('/', async (req, res) => {
    res.json('Hi');
})

router.get('/createVillage', async (req, res) => {
    res.json('village creation is WIP');
})

module.exports = router;