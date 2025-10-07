const axios = require('axios');

const BASE_URL = 'https://apis.codante.io/olympic-games/disciplines';

async function fetchDisciplines() {
    try {
        const response = await axios.get(BASE_URL);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching disciplines:', error);
        throw new Error('Unable to fetch disciplines.');
    }
}

module.exports = { fetchDisciplines };
