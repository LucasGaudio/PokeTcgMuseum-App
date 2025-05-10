require('dotenv').config();
const pokemon = require('pokemontcgsdk');

// Check if API key exists
if (!process.env.REACT_APP_POKEMONTCG_KEY) {
    console.error('Error: REACT_APP_POKEMONTCG_KEY is not set in .env file');
    process.exit(1);
}
// Configure the Pokemon TCG SDK
pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

const BATCH_SIZE = 100;

async function fetchCards(supertype) {
    let allCards = [];
    let page = 1;
    let hasMore = true;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    while (hasMore) {
        try {
            console.log(`Fetching ${supertype} cards page ${page}...`);
            const response = await pokemon.card.all({ 
                q: `supertype:${supertype}`, 
                pageSize: BATCH_SIZE,
                page: page
            });

            if (response && response.length > 0) {
                allCards = [...allCards, ...response];
                console.log(`Successfully fetched ${response.length} cards`);
                page++;
                retryCount = 0; // Reset retry count on successful request
            } else {
                hasMore = false;
            }
        } catch (error) {
            console.error(`Error fetching ${supertype} cards page ${page}:`, error.message);
            
            if (retryCount < MAX_RETRIES) {
                retryCount++;
                console.log(`Retrying... (${retryCount}/${MAX_RETRIES})`);
                // Wait for 2 seconds before retrying
                await new Promise(resolve => setTimeout(resolve, 2000));
            } else {
                console.error(`Failed to fetch ${supertype} cards after ${MAX_RETRIES} retries`);
                hasMore = false;
            }
        }
    }

    return allCards;
}

module.exports = { fetchCards };