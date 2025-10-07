const axios = require('axios');

const getMedalStandings = async () => {
    try {
        const response = await axios.get('https://apis.codante.io/olympic-games/countries');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching medal standings:', error);
        throw new Error('Unable to fetch medal standings.');
    }
};

const getCardData = async () => {
    const standings = await getMedalStandings();

    const totalMedals = standings.reduce((sum, country) => sum + country.total_medals, 0);
    const leadingCountry = standings.reduce((prev, current) => (prev.total_medals > current.total_medals) ? prev : current);
    const participatingCountries = standings.length;

    return {
        totalMedals,
        leadingCountry: {
            id: leadingCountry.id,
            name: leadingCountry.name,
            total_medals: leadingCountry.total_medals
        },
        participatingCountries
    };
};

const getTop10Countries = async () => {
    const standings = await getMedalStandings();
    // The API already provides data ranked, so we just take the first 10
    return standings.slice(0, 10).map(country => ({
        rank: country.rank,
        id: country.id,
        name: country.name,
        gold_medals: country.gold_medals,
        silver_medals: country.silver_medals,
        bronze_medals: country.bronze_medals,
        total_medals: country.total_medals
    }));
};

const getTop5Comparison = async () => {
    const standings = await getMedalStandings();
    // For comparison, we take the top 5 by total medals
    // The API's rank_total_medals can be used here. Let's filter by rank_total_medals <= 5
    const top5Countries = standings
        .filter(country => country.rank_total_medals <= 5)
        .sort((a, b) => a.rank_total_medals - b.rank_total_medals);

    return top5Countries.map(country => ({
        id: country.id,
        name: country.name,
        gold_medals: country.gold_medals,
        silver_medals: country.silver_medals,
        bronze_medals: country.bronze_medals
    }));
};

module.exports = { getMedalStandings, getCardData, getTop10Countries, getTop5Comparison };
