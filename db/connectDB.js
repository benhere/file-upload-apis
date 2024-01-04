
const mongoose = require('mongoose');

const connectionSetup = (url) => {
    return mongoose.connect(url)
};

module.exports = connectionSetup;