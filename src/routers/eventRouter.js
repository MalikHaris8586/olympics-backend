const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../services/eventService');

// Create an event (protected)
router.post('/events', auth, async (req, res) => {
    try {
        const event = await createEvent(req.body, req.user.id);
        res.status(201).send({ message: 'Event created successfully!', event });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all events for the authenticated user (protected)
router.get('/events', auth, async (req, res) => {
    try {
        const events = await getEvents(req.user.id);
        res.send(events);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get an event by ID for the authenticated user (protected)
router.get('/events/:id', auth, async (req, res) => {
    try {
        const event = await getEventById(req.params.id, req.user.id);
        if (!event) {
            return res.status(404).send({ error: 'Event not found.' });
        }
        res.send(event);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update an event by ID for the authenticated user (protected)
router.patch('/events/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const event = await updateEvent(req.params.id, updates, req.user.id, req.body);

        if (!event) {
            return res.status(404).send({ error: 'Event not found.' });
        }
        res.send({ message: 'Event updated successfully!', event });
    } catch (error) {
        if (error.message === 'Invalid updates!') {
            return res.status(400).send({ error: error.message });
        }
        res.status(500).send({ error: error.message });
    }
});

// Delete an event by ID for the authenticated user (protected)
router.delete('/events/:id', auth, async (req, res) => {
    try {
        const event = await deleteEvent(req.params.id, req.user.id);
        if (!event) {
            return res.status(404).send({ error: 'Event not found.' });
        }
        res.send({ message: 'Event deleted successfully!', event });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
