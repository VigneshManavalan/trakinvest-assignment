const express = require("express")
const app = express()
const mongoose = require('mongoose');
const Record = require("./Models/RecordSchema")
const connectToDatabase = () => {
    const mongoDB = 'mongodb://127.0.0.1:27017/records';
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error',()=>{console.log("Error")});
    db.once('open', () =>{
        console.log("Successfully connected to Records DB");
    });
}

app.post("/records",(req,res)=>{
    //TODO Create record and generate id
    //TODO store in mongodb
    //TODO publish to RabbitMQ

})

app.get("/records/:id",(req,res)=>{
    const id = req.params.id
})

connectToDatabase()