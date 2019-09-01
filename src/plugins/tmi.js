import tmi from 'tmi.js'

// eslint-disable-next-line new-cap
const client = new tmi.client({
  connection: {
    reconnect: true,
    secure: true
  },
  channels: [process.env.VUE_APP_CHANNEL_NAME]
})

client.connect()

client.on('connected', () => console.log('Connected'))

export default client
