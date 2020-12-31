
const amqp = require("amqplib");

connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("records");
        
        channel.consume("records", message => {
            
            console.log(`Recieved Record with ID ${message.content.toString()}`)
            channel.ackAll()
            
        })

        console.log("Ready to consume records")
    
    }
    catch (ex){
        console.error(ex)
    }

}