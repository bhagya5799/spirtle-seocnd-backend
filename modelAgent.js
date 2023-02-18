const mongoose = require('mongoose')

const AgentData = mongoose.Schema ({
    limit: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model("agentData", AgentData)