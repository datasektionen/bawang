import app from './server'
import http from 'http'

const server = http.createServer(app)

let currentApp = app
const port = process.env.SLUTA_FIPPLA_MED_MINA_ENV_VARIABLER_RAZZLE__PORT || 3000
server.listen(port, error => {
  if (error) {
    console.log(error)
  }

  console.log('🚀 started on port ', port)
})

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!')

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...')
    server.removeListener('request', currentApp)
    const newApp = require('./server').default
    server.on('request', newApp)
    currentApp = newApp
  })
}
