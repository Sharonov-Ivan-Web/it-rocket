const {Schema, model} = require('mongoose');

const schema = new Schema ({
    login: {
        type: Number,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    middleName: {
        type: String,
        trim: true,
        required: false
    },
    birthday: {
        type: Date,
        required: false
    },
    phones: {
        type: [Number],
        required: true
    },
    emails: {
        type: [String],
        required: false
    },
    position: {
        type: String,
        required: false,
    },
    aministrator: {
        type: Boolean,
        required: false
    }
})

module.exports = model('Employees', schema, 'employees');