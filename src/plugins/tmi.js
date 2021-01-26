import tmi from 'tmi.js'

// eslint-disable-next-line new-cap
const client = new tmi.client({
  connection: {
    reconnect: true,
    secure: true
  },
  channels: process.env.VUE_APP_CHANNEL_NAME.split(' ')
})

client.connect()

client.on('connected', () => console.info('Connected'))

export default client
