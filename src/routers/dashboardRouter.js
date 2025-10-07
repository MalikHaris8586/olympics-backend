const express = require('express');
const router = new express.Router();
const { getDashboardData } = require('../services/dashboardService');

router.get('/dashboard', async (req, res) => {
    try {
        const data = await getDashboardData();
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
