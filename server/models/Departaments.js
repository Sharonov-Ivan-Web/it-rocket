const {Schema, model} = require('mongoose');

const schema = new Schema ({
    name: {
        type: [String],
        trim: true,
        required: true
    },
    employees: {
        type: [Schema.Types.ObjectId],
        trim: true,
        required: false,
    },
    head: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: false,
    },
    parent: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: false,
    }
})

module.exports = model('Departaments', schema, 'departaments');