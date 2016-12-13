const H = require('horten')

new H.Tracer({
  path: '/',
  listening: true
})

var React = require('react')
var HortenControl = require('../src/HortenControl')

var ReactDOM = require('react-dom')

ReactDOM.render(
  <HortenControl src="test.md"/>
, document.getElementById('app') )
