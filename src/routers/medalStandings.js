const express = require('express');
const router = new express.Router();
const { getMedalStandings, getCardData, getTop10Countries, getTop5Comparison } = require('../services/olympicService');

router.get('/medal-standings', async (req, res) => {
    try {
        const standings = await getMedalStandings();
        res.send(standings);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/medal-standings/cards', async (req, res) => {
    try {
        const cardData = await getCardData();
        res.send(cardData);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/medal-standings/top-10-countries', async (req, res) => {
    try {
        const top10 = await getTop10Countries();
        res.send(top10);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/medal-standings/top-5-comparison', async (req, res) => {
    try {
        const top5Comparison = await getTop5Comparison();
        res.send(top5Comparison);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
