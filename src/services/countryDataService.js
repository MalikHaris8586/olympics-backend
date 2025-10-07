const axios = require('axios');

const BASE_URL = 'https://apis.codante.io/olympic-games/countries';

async function fetchRawCountryData() {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching raw country data:', error);
        throw new Error('Unable to fetch raw country data.');
    }
}

module.exports = { fetchRawCountryData };
