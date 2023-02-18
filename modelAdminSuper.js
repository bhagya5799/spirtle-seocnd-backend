const mongoose = require('mongoose')

const AdminSuper = mongoose.Schema({
    name: {
        type: String,

        
    },
    email: {
        type: String,
        
     
        
    },
    password: {
        type: String,
        

        
    },
    id: {
        type: String
        
       
    }
})

module.exports = mongoose.model("adminSuper", AdminSuper)