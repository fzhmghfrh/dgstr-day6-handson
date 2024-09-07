const dotenv = require('dotenv');
const path = require('path');

function loadEnv() {
    const envPath = path.resolve(__dirname, '../.env');
    const result = dotenv.config({ path: envPath });

    if (result.error) {
        throw result.error;
    }

    console.log('Loaded environment variables from .env file');
}   

module.exports = loadEnv;