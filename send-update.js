const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  FROM_WHATSAPP_NUMBER,
  TO_WHATSAPP_NUMBER
} = require('./config');
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: FROM_WHATSAPP_NUMBER,
    to: TO_WHATSAPP_NUMBER
  })
  .then(message => console.log(message))
  .done();
