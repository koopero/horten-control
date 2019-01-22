const H = require('horten')

new H.Tracer({
  path: '/',
  listening: true
})

require('../style/index.less')

var React = require('react')
var Page = require('../controls/Page')

var ReactDOM = require('react-dom')

ReactDOM.render(
  <Page/>
, document.getElementById('app') )
