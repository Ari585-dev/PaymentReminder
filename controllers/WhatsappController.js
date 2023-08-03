require('dotenv').config();

const TWILIO_ID = process.env.TWILIOID;
const TWILIO_SK = process.env.TWILIOTOKEN;

const client = require('twilio')(TWILIO_ID, TWILIO_SK);

let controller = {
    sendWh: async function (req, res) {
        try {
            const message = await client.messages.create({
                body: 'Hola desde NodeJS',
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+573209928242'
            });
            console.log(message.sid);
            return res.status(200).json({ message: message.body, origin: message.from });
           
        } catch (error) {
            console.error('Message not delivered because:', error);
            return res.status(500).send(error);
            
        }
    },
};

module.exports = controller;
