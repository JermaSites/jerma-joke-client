import tmi from 'tmi.js'

// eslint-disable-next-line new-cap
const client = new tmi.client({ channels: ['#moduspwnens'] })

client.connect()

client.on('connected', () => console.log('Connected'))

export default client
