
const mongoose = require('mongoose')

const TicketDetails = mongoose.Schema  ({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    agentId: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("ticketDetails", TicketDetails)