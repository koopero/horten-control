const { resolve } = require('path')

const hortenServer = require('horten-server').global()

hortenServer.configure({
  root: resolve( __dirname, 'demo' ),
  index: '/control/index.yaml',
  persist: 'data/persist.yaml',
  dirs: ['control'],
})

hortenServer.open()
