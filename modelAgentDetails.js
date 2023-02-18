const mongoose=require('mongoose')

const AgentDetails=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model('agentDetails', AgentDetails)
