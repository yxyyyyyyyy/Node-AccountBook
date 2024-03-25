const moogose = require('mongoose')

let AccountSchema = new moogose.Schema({
    title: {
        type: String,
        required: true
    },

    time: Date,
    type: {
        type: Number,
        default: -1
    },
    account: {
        type: Number,
        required: true
    },
    remark: String
})

let AccountModel = moogose.model('accounts' , AccountSchema)

module.exports = AccountModel