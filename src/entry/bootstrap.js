import H from 'horten'

new H.Tracer({
  path: '/',
  listening: true
})

require('../style/index.less')

var React = require('react')
var Page = require('../controls/Page/').default

var ReactDOM = require('react-dom')

ReactDOM.render(
  <Page/>
  , document.getElementById('app') )
