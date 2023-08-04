require('dotenv').config();

const TWILIO_ID = process.env.TWILIOID;
const TWILIO_SK = process.env.TWILIOTOKEN;

const client = require('twilio')(TWILIO_ID, TWILIO_SK);

let controller = {
    sendWh: async function (req, res, cellnumber, text) {
        try {
            const message = await client.messages.create({
                body: text,
                from: 'whatsapp:+14155238886',
                to: `whatsapp:+57${cellnumber}`
            });
            console.log(message.sid);
           /*  return res.status(200).json({ message: message.body, origin: message.from }); */
           
        } catch (error) {
            console.error('Message not delivered because:', error);
            /* return res.status(500).send(error); */
            
        }
    },
};

module.exports = controller;
