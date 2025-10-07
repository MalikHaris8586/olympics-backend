const Athlete = require('../models/athlete');
const Event = require('../models/event');

const getDashboardData = async () => {
    // Implement logic here to fetch data for all cards
    // For now, returning dummy data
    const totalEvents = await Event.countDocuments();
    const totalSports = (await Event.distinct('sport')).length;

    const totalAthletes = await Athlete.countDocuments();
    const distinctCountries = await Athlete.distinct('country');
    const totalCountries = distinctCountries.length;

    const totalGoldMedals = await Athlete.aggregate([
        { $group: { _id: null, total: { $sum: '$goldMedals' } } }
    ]);
    const totalSilverMedals = await Athlete.aggregate([
        { $group: { _id: null, total: { $sum: '$silverMedals' } } }
    ]);
    const totalBronzeMedals = await Athlete.aggregate([
        { $group: { _id: null, total: { $sum: '$bronzeMedals' } } }
    ]);

    const medalsAwarded = (
        (totalGoldMedals.length > 0 ? totalGoldMedals[0].total : 0) +
        (totalSilverMedals.length > 0 ? totalSilverMedals[0].total : 0) +
        (totalBronzeMedals.length > 0 ? totalBronzeMedals[0].total : 0)
    );

    return {
        totalEvents,
        totalSports,
        totalAthletes,
        totalCountries,
        medalsAwarded,
        worldRecords: 23 // Dummy data for now, as there's no model for world records
    };
};

module.exports = {
    getDashboardData
};
