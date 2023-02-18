const { response } = require('express')
const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors')
const  AdminSuper = require('./modelAdminSuper')

const app=express()
// app.use(express.json())
app.use(cors())

app.use(express.json());
const mongooseData = mongoose.connect('mongodb+srv://NandaKumar:Nanda7328@cluster0.9j7nchf.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log('db connected.....')
).catch(err => console.log(err, "DB error running"))

app.post("/", async (request, response) => {
    const { name, password, email, id } = request.body

    try {
        const newData = new AdminSuper({ name, email, password, id })
        await newData.save()
        const resVal = await AdminSuper.find()
        response.send(resVal)
    }
    catch (err) {
        console.log(err.message)
    }
})

app.get('/',(request,response) => {
    response.send('hello world')
})

app.listen(process.env.PORT || 3009, () => console.log('port running '))