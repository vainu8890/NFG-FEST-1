require('dotenv').config()
let config = process.env;

module.exports = function (env = config.ENVIRONMENT) {
    return config;
}