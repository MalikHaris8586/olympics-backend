const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const { createAthlete, getAthletes, getAthleteById, updateAthlete, deleteAthlete } = require('../services/athleteService');

// Create an athlete (protected)
router.post('/athletes', auth, async (req, res) => {
    try {
        const athlete = await createAthlete(req.body, req.user.id);
        res.status(201).send({ message: 'Athlete created successfully!', athlete });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all athletes for the authenticated user (protected)
router.get('/athletes', auth, async (req, res) => {
    try {
        const { name, country } = req.query;
        const athletes = await getAthletes(req.user.id, { name, country });
        res.send(athletes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get an athlete by ID for the authenticated user (protected)
router.get('/athletes/:id', auth, async (req, res) => {
    try {
        const athlete = await getAthleteById(req.params.id, req.user.id);
        if (!athlete) {
            return res.status(404).send();
        }
        res.send(athlete);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update an athlete by ID for the authenticated user (protected)
router.patch('/athletes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const athlete = await updateAthlete(req.params.id, updates, req.user.id, req.body);

        if (!athlete) {
            return res.status(404).send({ error: 'Athlete not found.' });
        }
        res.send({ message: 'Athlete updated successfully!', athlete });
    } catch (error) {
        if (error.message === 'Invalid updates!') {
            return res.status(400).send({ error: error.message });
        }
        res.status(500).send({ error: error.message });
    }
});

// Delete an athlete by ID for the authenticated user (protected)
router.delete('/athletes/:id', auth, async (req, res) => {
    try {
        const athlete = await deleteAthlete(req.params.id, req.user.id);
        if (!athlete) {
            return res.status(404).send({ error: 'Athlete not found.' });
        }
        res.send({ message: 'Athlete deleted successfully!', athlete });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
