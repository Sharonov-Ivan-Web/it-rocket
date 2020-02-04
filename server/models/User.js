const {Schema, model} = require('mongoose');

const schema = new Schema ({
    login: {
        type: Integer,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('User', schema);