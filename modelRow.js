const mongoose = require('mongoose')

const Row = mongoose.Schema({
    RowNumber: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("row", Row)

