const Event = require('../models/event');

const createEvent = async (eventData, ownerId) => {
    const event = new Event({
        ...eventData,
        owner: ownerId
    });
    await event.save();
    return event;
};

const getEvents = async (ownerId) => {
    const events = await Event.find({ owner: ownerId });
    return events;
};

const getEventById = async (id, ownerId) => {
    const event = await Event.findOne({ _id: id, owner: ownerId });
    return event;
};

const updateEvent = async (id, updates, ownerId, body) => {
    const event = await Event.findOne({ _id: id, owner: ownerId });

    if (!event) {
        return null;
    }

    const allowedUpdates = ['eventName', 'sport', 'venue', 'date', 'time', 'status', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new Error('Invalid updates!');
    }

    updates.forEach((update) => event[update] = body[update]);
    await event.save();
    return event;
};

const deleteEvent = async (id, ownerId) => {
    const event = await Event.findOneAndDelete({ _id: id, owner: ownerId });
    return event;
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
