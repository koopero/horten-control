import H from 'horten'

new H.Tracer({
  path: '/',
  listening: true
})

var React = require('react')
var Page = require('../src/control/Page')

var ReactDOM = require('react-dom')

ReactDOM.render(
  <Page/>
  , document.getElementById('app') )
