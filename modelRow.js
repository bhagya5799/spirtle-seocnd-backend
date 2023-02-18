const mongoose = require('mongoose')

const RowData = mongoose.Schema({
    RowNumber: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("rowData", RowData)

