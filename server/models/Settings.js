const {Schema, model} = require('mongoose');

const schema = new Schema ({
    nameCompany: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = model('Settings', schema, 'settings');