const axios = require('axios');

const BASE_URL = 'https://apis.codante.io/olympic-games/events'

async function fetchEvents(page = 1) {
    try {
        const response = await axios.get(`${BASE_URL}?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error('Unable to fetch events.');
    }
}

module.exports = { fetchEvents };


