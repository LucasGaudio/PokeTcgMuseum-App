const { fetchCards } = require('./fetchCards.js');
require('dotenv').config();
const pokemon = require('pokemontcgsdk');
const fs = require('fs');
const path = require('path');

// Check if API key exists
if (!process.env.REACT_APP_POKEMONTCG_KEY) {
    console.error('Error: REACT_APP_POKEMONTCG_KEY is not set in .env file');
    process.exit(1);
}

// Configure the Pokemon TCG SDK
pokemon.configure({ apiKey: process.env.REACT_APP_POKEMONTCG_KEY });

async function generateEnergyData() {
    try {
        console.log('Starting energy card data generation...');
        console.log('API Key:', process.env.REACT_APP_POKEMONTCG_KEY ? 'Present' : 'Missing');

        console.log('\nFetching Energy cards...');
        const energyCards = await fetchCards('Energy');
        console.log(`Found ${energyCards.length} Energy cards`);

        const cardData = [...new Set(energyCards.map(card => card.name))].map(name => ({ name }));

        // Create the assets directory if it doesn't exist
        const assetsDir = path.join(__dirname, '../src/assets/json');
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }

        // Write the data to a JSON file
        const filePath = path.join(assetsDir, 'energyData.json');
        fs.writeFileSync(filePath, JSON.stringify(cardData, null, 2));
        console.log('\nEnergy card data written to:', filePath);
        console.log('Total energy cards found:', cardData.length);
    } catch (error) {
        console.error('Error generating energy card data:', error);
        process.exit(1);
    }
}

generateEnergyData(); 