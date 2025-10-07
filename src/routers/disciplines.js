const express = require('express');
const router = new express.Router();
const { fetchDisciplines } = require('../services/disciplineService');

router.get('/disciplines', async (req, res) => {
    try {
        const disciplines = await fetchDisciplines();
        res.send(disciplines);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
