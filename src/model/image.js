const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    content : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('image', imageSchema);