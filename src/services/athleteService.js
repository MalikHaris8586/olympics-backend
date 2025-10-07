const Athlete = require('../models/athlete');

const createAthlete = async (athleteData, ownerId) => {
    const athlete = new Athlete({
        ...athleteData,
        owner: ownerId
    });
    await athlete.save();
    return athlete;
};

const getAthleteById = async (id, ownerId) => {
    const athlete = await Athlete.findOne({ _id: id, owner: ownerId });
    return athlete;
};

const getAthletes = async (ownerId, filters = {}) => {
    const match = { owner: ownerId };

    if (filters.name) {
        match.fullName = { $regex: filters.name, $options: 'i' };
    }

    if (filters.country) {
        match.country = { $regex: filters.country, $options: 'i' };
    }

    const athletes = await Athlete.find(match);
    return athletes;
};

const updateAthlete = async (id, updates, ownerId) => {
    const athlete = await Athlete.findOne({ _id: id, owner: ownerId });

    if (!athlete) {
        return null;
    }

    const allowedUpdates = ['fullName', 'country', 'sport', 'age', 'goldMedals', 'silverMedals', 'bronzeMedals'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new Error('Invalid updates!');
    }

    updates.forEach((update) => athlete[update] = updates[update]);
    await athlete.save();
    return athlete;
};

const deleteAthlete = async (id, ownerId) => {
    const athlete = await Athlete.findOneAndDelete({ _id: id, owner: ownerId });
    return athlete;
};

module.exports = {
    createAthlete,
    getAthleteById,
    getAthletes,
    updateAthlete,
    deleteAthlete
};
