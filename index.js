const { response, request } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const AdminSuper = require('./modelAdminSuper')
const AgentData =require('./modelAgent')
const TicketDetails=require('./modelTicket')
const AgentDetails=require('./modelAgentDetails')
const RowData=require('./modelRow')

const app = express()
app.use(cors())

app.use(express.json());
const mongooseData = mongoose.connect('mongodb+srv://bhagyashree:bhagya5799@cluster0.q2xpdj1.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log('db connected.....')
).catch(err => console.log(err, "DB error running"))

app.post("/add", async (request, response) => {
    const { id, password, email, username } = request.body

    try {
        const newData = new AdminSuper({ id, password, email, username })
        await newData.save()
        const resVal = await AdminSuper.find()
        response.send(resVal)
    }
    catch (err) {
        console.log(err.message)
    }
})

app.post('/super-admin-login', async (request, response) => {
    const { password, email } = request.body
    try {
        const superAdmin = await AdminSuper.find()
        let loginResult = false
        let id = null
        superAdmin.map(eachData => {
            if (eachData.password === password && eachData.email === email) {
                loginResult = true
                id = eachData.id
            }
        })

        if (loginResult === true) {
            response.send({ status: true, msg: "login Successful", id: id })
        }
        else {
            response.send({ status: false, msg: "password or email wrong" })
            response.status(400)
        }
    }
    catch (err) {
        console.log(err.message)
    }
})

app.get('/getAdminDetails', async (request, response) => {
    try {
        const getData = await AdminSuper.find()
        response.send(getData)
    }
    catch (err) {
        response.send(err.message)
    }
})

app.post('/agent-login', async (request, response) => {
    const { password, email } = request.body
    try {
        const agent = await AgentData.find()
        let loginResult = false
        let id = null
        let limit = null
        console.log(agent)
        agent.map(eachData => {
            if (eachData.password === password && eachData.email === email) {
                loginResult = true
                id = eachData.id
                limit = eachData.limit
            }
        })

        if (loginResult === true) {
            response.send({ status: true, msg: "login successful", id: id, limit: limit })
        }
        else {
            response.send({ status: false, msg: "password or email wrong" })
            response.status(400)
        }
    }
    catch (err) {
        console.log(err.message)
    }
})


// crete Agent
app.post('/agent-data-create', async (request, response) => {
    const { id, email, password, limit } = request.body
    try {
        const getAgentEmail = await AgentData.find()
        let resultAgent = false
        getAgentEmail.map(eachAgent => {
            if (eachAgent.email === email) {
                resultAgent = true
            }
        })
        if (resultAgent === true) {
            response.send({ status: false, msg: "Agent already exist" })
            response.status(400)
        }
        else {
            const newAgent = new AgentData({ id, email, password, limit })
            await newAgent.save()
            response.send({ status: true, msg: "Agent add success" })
        }
    }
    catch (err) {
        console.log(err.message)
    }
})


app.delete('/delete-agent/:id', async (request, response) => {
    const { id } = request.params
    try {
        await AgentData.findOneAndDelete({ id: id })
        response.send({ status: true, msg: "Agent Delete success" })
    }
    catch (err) {
        console.log(err.message)
    }

})



// send ticketdetails
app.post('/book-ticket', async(request,response) => {
    const { name, age, seatNumber, id, agentId, gender } = request.body
    try {
        const book = new TicketDetails({ name, age, seatNumber, id, agentId, gender })
        await book.save()
        response.send({ status: true, msg: "Booking success" })
    }
    catch (err) {
        console.log(err.message)
    }
})

// get all Ticketdetails
app.get('/getTicketDetails',async(request,response) =>{
    try {
        const getData = await TicketDetails.find()
        response.send(getData)
    }
    catch (err) {
        response.send(err.message)
    }
})


// get booking Agent
app.get('/get-booking-agent/:id', async (request, response) => {
    const { id } = request.params
    try {
        const agentBooking = await TicketDetails.find({ agentId: id })
        response.send(agentBooking)
    }
    catch (err) {
        console.log(err.message)
    }
})


// post agentDetails
app.post('/send-agent-details',async(request,response) => {
    const { name, dateOfBirth, phoneNumber, address, profilePic, id } = request.body
    try{
        const agentPerson = new AgentDetails({ name, dateOfBirth, phoneNumber, address, profilePic, id })
        await agentPerson.save()
        response.send({ status: true, msg: "successfully adding" })
    }
    catch(err){
        response.send(err.message)
    }
})

// getone Agent
app.get('/get-oneAgent/:id',async(request,response) => {
    const {id}=request.params
    try{
        const agentBooking = await AgentDetails.find({ id: id })
        response.send(agentBooking)
    }
    catch(err){
        response.send(err.message)
    }
})

app.delete('/delete-a/:id', async (request, response) => {
    const { id } = request.params
    try {
        await AgentDetails.findOneAndDelete({ id: id })
        response.send({ status: true, msg: "Agent Delete success" })
    }
    catch (err) {
        console.log(err.message)
    }

})


app.put('/addRow', async (request, response) => {
    const { RowNumber } = request.body
    try {
        await RowData.updateOne({ RowNumber: RowNumber })
        response.send({ status: true, msg: "row Successfully added" })
    }
    catch (err) {
        console.log(err.message)
    }
})

app.get('/get-Row', async (request, response) => {
    try {
        const rowData = await RowData.find()
        let rowNum = null
        console.log(rowData)
        // rowData.map(eachRow => {
        //     if (eachRow.RowNumber) {
        //         rowNum = eachRow.RowNumber
        //     }
        // })
        response.send({ status: true, rowNum: rowNum })
    }
    catch (err) {
        console.log(err.message)
    }
})

app.listen(process.env.PORT || 3009, () => console.log('port running '))