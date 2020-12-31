const express = require("express")
const app = express()
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
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
app.use(bodyParser.json())
const amqp = require("amqplib");


const  produceMessage =async (message)=> {

    try {
        const rabbitMQServer = "amqp://localhost:5672"
        const connection = await amqp.connect(rabbitMQServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("records");
        await channel.sendToQueue("records", Buffer.from(message))
        console.log(`Record was sent successfully ${message}`);
        await channel.close();
        await connection.close();
    }
    catch (error){
        console.error(error)
    }

}
app.post("/records",(req,res)=>{
    const email = req.body.email
    const name = req.body.name

    const recordToInsert = new Record({
        email,
        name
    })

    recordToInsert.save().then(data=>{
        produceMessage(data._id)
        res.json(data._id)})

})

app.get("/records/:id",async (req,res)=>{
    const id = req.params.id
    try{
        const recordById = await Record.findOne({_id:id})
        res.json(recordById)
    }
    catch(error){
        res.json("Record not found")
    }
})

connectToDatabase()

app.listen(4000,()=>{console.log("Record Service Listening on 4000")})