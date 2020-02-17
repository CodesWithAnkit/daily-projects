const cron = require('node-cron');

const accountSid = 'ACa39594147b3bb33f5b56dbb8fd2e7a0c';
const authToken = '90b4807499414c219436921b4866bd7a';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+18609565185',
    to: '+917979069133'
  })
  .then(message => console.log(message));

// cron.schedule('0 * * * *', () => {
//   console.log('aldsjlkj');
// });
