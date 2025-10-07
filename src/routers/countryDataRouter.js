const express = require('express');
const router = new express.Router();
const { fetchRawCountryData } = require('../services/countryDataService');

router.get('/raw-countries', async (req, res) => {
    try {
        const rawData = await fetchRawCountryData();
        res.send(rawData);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
